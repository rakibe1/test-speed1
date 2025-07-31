import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const userId = session.user.id

    const speedTests = await prisma.speedTest.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 50, // Limit to last 50 tests
    })

    const formattedSpeedTests = speedTests.map((test) => ({
      id: test.id,
      timestamp: test.createdAt,
      downloadSpeed: test.downloadSpeed,
      uploadSpeed: test.uploadSpeed,
      ping: test.ping,
      serverInfo: test.serverInfo ? JSON.parse(test.serverInfo as string) : null,
    }))

    return NextResponse.json(formattedSpeedTests)
  } catch (error) {
    console.error("Error fetching speed test history:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
