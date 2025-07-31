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

// GET /api/articles/:id
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const article = await prisma.article.findUnique({
      where: { id },
    })

    if (!article) {
      return NextResponse.json({ message: "Article not found" }, { status: 404 })
    }

    return NextResponse.json(article)
  } catch (error) {
    console.error("Error fetching article:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

// PUT /api/articles/:id
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id } = params
    const { title, content, published } = await request.json()

    const updatedArticle = await prisma.article.update({
      where: { id },
      data: { title, content, published },
    })

    return NextResponse.json(updatedArticle)
  } catch (error) {
    console.error("Error updating article:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

// DELETE /api/articles/:id
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id } = params
    await prisma.article.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Article deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting article:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
