import { getSession } from "next-auth/client"

import prisma from "lib/prisma"
import { JSONResponse } from "utils/jsonResponse"

export default async (req, res) => {
  if (!req.body || req.method !== 'POST') {
    JSONResponse(res, 400)
  }
  const session = await getSession({ req })
  if (!session) {
    JSONResponse(res, 403)
  }
  const { amount, accountNumber, accountName, receiptUrl } = req.body
  if (!amount || !accountName || !accountNumber || !receiptUrl) {
    JSONResponse(res, 400)
  }
  const { lastSession: { userId, user: { groupId } }, projectId } = session
  try {
    await prisma.paymentConfirmation.updateMany({
      where: {
        OR: [
          {
            groupId: {
              not: null,
              equals: groupId
            }
          },
          { userId },
          { projectId }
        ]
      },
      data: {
        accountName,
        accountNumber,
        amount,
        receiptUrl
      }
    })
  } catch (error) {
    console.log(error)
  }


  JSONResponse(res, 200)
}