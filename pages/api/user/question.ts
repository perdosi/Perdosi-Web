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
  const { question } = req.body
  if (!question) {
    JSONResponse(res, 400)
  }
  const { lastSession: { userId }, projectId } = session
  try {
    await prisma.questionBox.create({
      data: {
        userId,
        question,
        projectId
      }
    })
  } catch (error) {
    console.log(error)
  }


  JSONResponse(res, 200)
}