import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  try {
    const userId = session.user.id
    const history = await prisma.speedTest.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 50, // Limit to last 50 tests for history
    })

    // Parse serverInfo JSON string back to object
    const formattedHistory = history.map((test) => ({
      ...test,
      serverInfo: test.serverInfo ? JSON.parse(test.serverInfo) : null,
    }))

    return NextResponse.json(formattedHistory)
  } catch (error) {
    console.error("Error fetching speed test history:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
