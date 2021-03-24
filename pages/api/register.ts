import axios from 'axios'
import argon2 from 'argon2'

import { JSONResponse } from 'utils/jsonResponse'
import prisma from 'lib/prisma'

export default async (req, res) => {
  if (!req.body || req.method !== 'POST') {
    JSONResponse(res, 400)
  }
  const { peserta, pricingId } = req.body
  if (!peserta || !pricingId) {
    JSONResponse(res, 400)
  }
  let group
  let projectId

  try {
    projectId = await prisma.option.findFirst({
      where: {
        name: {
          equals: 'PROJECT_ID'
        }
      },
      select: {
        value: true
      }
    })
    projectId = projectId.value.toString()
    // manage duplicate
    let isExist: any = await Promise.all(
      peserta.map(async ({ email }) => {
        const user = await prisma.user.findFirst({
          where: {
            email,
            projectId: {
              equals: projectId
            }
          }
        })
        return user
      })
    )
    isExist = isExist.filter(Boolean)
    if (isExist.length > 0) {
      JSONResponse(res, 422, {
        message: 'Peserta sudah terdaftar, silahkan login'
      })
    }

    if (peserta?.length > 1) {
      group = await prisma.group.create({
        data: {
          projectId
        }
      })
    }
  } catch (error) {
    JSONResponse(res, 500)
  }

  await Promise.all(
    peserta.map(
      async ({ name, institution, email, password, phoneNumber, address }) => {
        const hashpassword = await argon2.hash(password)
        let user
        try {
          user = await prisma.user.create({
            data: {
              email,
              password: hashpassword,
              groupId: group?.id || null,
              profile: {
                create: { name, institution, phoneNumber, address }
              },
              projectId,
              payment: {
                create: {
                  groupId: group?.id || null,
                  projectId,
                  pricingId
                }
              }
            }
          })
        } catch (error) {
          JSONResponse(res, 500)
        }
        return user
      }
    )
  )

  try {
    const { amount: total } = await prisma.pricing.findFirst({
      where: { id: pricingId }
    })
    await axios.post(process.env.NEXTAUTH_URL + `/register-success`, {
      peserta,
      total
    })
  } catch (error) {
    JSONResponse(res, 200)
  }

  JSONResponse(res, 200)
}
