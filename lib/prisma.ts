import { PrismaClient } from "@prisma/client"

declare global {
  var prismaGlobal: PrismaClient | undefined
}

export const prisma = prismaGlobal || new PrismaClient()

if (process.env.NODE_ENV !== "production") prismaGlobal = prisma
