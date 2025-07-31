import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const stats = await prisma.systemStats.findUnique({
      where: { date: today },
    })

    if (!stats) {
      return NextResponse.json({
        totalTests: 0,
        totalUsers: 0,
        averageDownload: 0,
        averageUpload: 0,
        averagePing: 0,
      })
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching system stats:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
