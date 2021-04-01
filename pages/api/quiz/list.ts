import { getSession } from 'next-auth/client'

import prisma from 'lib/prisma'
import today from 'utils/today'
import { JSONResponse } from 'utils/jsonResponse'

export default async (req, res) => {
  if (req.method !== 'POST') {
    JSONResponse(res, 400)
  }
  const session = await getSession({ req })
  if (!session) {
    JSONResponse(res, 403)
  }
  const {
    lastSession: { userId },
    projectId
  } = session
  const response = await prisma.quiz.findMany({
    where: {
      AND: [
        {
          publishedAt: {
            lte: new Date(today())
          }
        },
        {
          expiredAt: {
            gte: new Date(today())
          }
        }
      ]
    },
    select: {
      name: true,
      quizQuestion: {
        where: {
          projectId: '1'
        },
        select: {
          label: true,
          quizAnswer: {
            select: {
              label: true,
              id: true
            }
          },
          quizSession: {
            take: 1,
            where: {
              userId,
              projectId
            },
            select: {
              answer: {
                select: {
                  isCorrect: true
                }
              }
            }
          }
        }
      }
    }
  })
  res.send(response)
  res.end()
}
