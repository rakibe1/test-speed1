import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const systemStats = await prisma.systemStats.findMany({
      orderBy: { date: "desc" },
      take: 7, // Last 7 days of stats
    })

    const totalTests = await prisma.speedTest.count()
    const totalUsers = await prisma.user.count()

    const averageDownload = await prisma.speedTest.aggregate({
      _avg: { downloadSpeed: true },
    })
    const averageUpload = await prisma.speedTest.aggregate({
      _avg: { uploadSpeed: true },
    })
    const averagePing = await prisma.speedTest.aggregate({
      _avg: { ping: true },
    })

    return NextResponse.json({
      systemStats,
      totalTests: totalTests,
      totalUsers: totalUsers,
      overallAverageDownload: averageDownload._avg.downloadSpeed,
      overallAverageUpload: averageUpload._avg.uploadSpeed,
      overallAveragePing: averagePing._avg.ping,
    })
  } catch (error) {
    console.error("Error fetching system stats:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
