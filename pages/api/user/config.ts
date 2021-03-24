import prisma from "lib/prisma"

export default async (req, res) => {
  const response = await prisma.paymentConfirmation.groupBy({ by: ["groupId", "id"] })
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