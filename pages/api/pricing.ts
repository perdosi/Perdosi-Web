import prisma from "../../lib/prisma"

export default async (_, res) => {
  const pg = await prisma.pricingGroup.findMany({
    include: {
      pricing: true
    }
  })
  let response = []
  pg.forEach((g) => g.pricing.forEach(({ name, id, totalMember, amount }, oid) => {
    response.push({ is_parent: (oid === 0 ), group_name: g.name, name, id, totalMember, amount })
  }))
  res.send(response)
  res.end()
}