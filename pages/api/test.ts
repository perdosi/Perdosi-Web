// import { getSession, getCsrfToken } from 'next-auth/client'
// import jwt from 'next-auth/jwt'
import argon2 from 'argon2'

// import prisma from "lib/prisma"

// const secret = process.env.SECRET

export default async (req, res) => {
  const response = await argon2.hash('password')
  // const response = await prisma.session.findFirst({
  //   where: {
  //     expiredAt: {
  //       gt: new Date().toISOString()
  //     }
  //   },
  //   orderBy: {
  //     createdAt: 'desc'
  //   }
  // })
  // const response = await prisma.option.findFirst({
  //   where: {
  //     name: "PROJECT_ID"
  //   }
  // })

  // const encodedHash = response.password
  // const password = Buffer.from("12345678");
  // const isCorrect = await argon2i.verify(encodedHash, password);
  // console.log(isCorrect)
  // const response = await prisma.pricingGroup.findMany({
  //   include: {
  //     pricing: true
  //   }
  // })
  // const response = await prisma.user.create({
  //   data : {
  //     email: "sigit.prabowo95+1111@gmail.com",
  //     password: "test"
  //   }
  // })
  res.send(response)
  res.end()
}
