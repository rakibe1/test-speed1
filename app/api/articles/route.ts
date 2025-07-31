import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const articleCreateSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  published: z.boolean().default(false),
})

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const searchQuery = searchParams.get("search") || ""

    const articles = await prisma.article.findMany({
      where: {
        published: true,
        OR: [
          {
            title: {
              contains: searchQuery,
              mode: "insensitive",
            },
          },
          {
            content: {
              contains: searchQuery,
              mode: "insensitive",
            },
          },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: true,
      },
    })

    return NextResponse.json(articles)
  } catch (error) {
    console.error(error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 403 })
    }

    const json = await req.json()
    const body = articleCreateSchema.parse(json)

    const newArticle = await prisma.article.create({
      data: {
        title: body.title,
        content: body.content,
        published: body.published,
        authorId: session.user.id,
      },
    })

    return NextResponse.json(newArticle, { status: 201 })
  } catch (error) {
    console.error(error)
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 })
    }
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
