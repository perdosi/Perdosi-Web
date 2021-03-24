import prisma from "lib/prisma"
import { JSONResponse } from "utils/jsonResponse"

export default async (req, res) => {
  if (!req.body || req.method !== 'POST') {
    JSONResponse(res, 400)
  }
  const { email } = req.body
  try {
    const { sessions } = await prisma.user.findFirst({
      where: {
        email
      },
      include: {
        sessions: {
          select: {
            id: true
          },
          take: 1,
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    })
    await prisma.session.update({
      where: {
        id: sessions[0].id
      },
      data: {
        expiredAt: new Date().toISOString()
      }
    })
    JSONResponse(res, 200)
  } catch (error) {
    JSONResponse(res, 200)
  }
}