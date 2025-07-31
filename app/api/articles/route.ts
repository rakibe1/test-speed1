import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// GET /api/articles
export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(articles)
  } catch (error) {
    console.error("Error fetching articles:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

// POST /api/articles
export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  try {
    const { title, content, published } = await request.json()
    const newArticle = await prisma.article.create({
      data: { title, content, published },
    })
    return NextResponse.json(newArticle, { status: 201 })
  } catch (error) {
    console.error("Error creating article:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
