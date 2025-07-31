import type { Metadata } from "next"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { SpeedHistory } from "@/components/speed-history"

export const metadata: Metadata = {
  title: "History",
  description: "View your past speed test results.",
}

export default async function HistoryPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p className="text-muted-foreground">Please sign in to view your speed test history.</p>
      </div>
    )
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

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">Speed Test History</h1>
      <SpeedHistory initialHistory={formattedSpeedTests} />
    </div>
  )
}
