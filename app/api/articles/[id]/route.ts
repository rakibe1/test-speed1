import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const articlePatchSchema = z.object({
  title: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  published: z.boolean().optional(),
})

export async function GET(req: Request, context: { params: { id: string } }) {
  try {
    const { id } = context.params

    const article = await prisma.article.findUnique({
      where: { id },
      include: { author: true },
    })

    if (!article) {
      return new NextResponse("Article not found", { status: 404 })
    }

    return NextResponse.json(article)
  } catch (error) {
    console.error(error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export async function DELETE(req: Request, context: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 403 })
    }

    const { id } = context.params

    await prisma.article.delete({
      where: { id },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error(error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export async function PUT(req: Request, context: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 403 })
    }

    const { id } = context.params
    const json = await req.json()
    const body = articlePatchSchema.parse(json)

    const updatedArticle = await prisma.article.update({
      where: { id },
      data: {
        title: body.title,
        content: body.content,
        published: body.published,
      },
    })

    return NextResponse.json(updatedArticle)
  } catch (error) {
    console.error(error)
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 })
    }
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
