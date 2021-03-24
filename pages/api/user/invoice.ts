import { getSession } from "next-auth/client"

import prisma from "lib/prisma"
import { JSONResponse } from "utils/jsonResponse"

export default async (req, res) => {
  const session = await getSession({ req })
  if (!session) {
    JSONResponse(res, 403)
  }
  const { lastSession: { userId, user: { groupId } }, projectId } = session
  try {
    const response = await prisma.paymentConfirmation.findFirst({
      where: {
        OR: [
          {
            groupId: {
              not: null,
              equals: groupId
            }
          },
          {
            userId
          }
        ],
        projectId
      },
      include: {
        pricing: {
          select: {
            amount: true
          }
        }
      }
    })
    JSONResponse(res, 200, { data: {
      settlement: response?.settlement,
      accountNumber: response?.accountNumber,
      accountName: response?.accountName,
      receiptUrl: response?.receiptUrl,
      amount: response?.pricing?.amount
    }
  })
  } catch (error) {
    JSONResponse(res, 500)
  }
}