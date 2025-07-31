import type { Metadata } from "next"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SpeedHistory } from "@/components/speed-history"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your personal speed test dashboard.",
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/auth/signin")
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

  // Calculate average speeds and ping for the user
  const userStats = await prisma.speedTest.aggregate({
    where: { userId: userId },
    _avg: {
      downloadSpeed: true,
      uploadSpeed: true,
      ping: true,
    },
    _count: true,
  })

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-4xl font-bold">Welcome, {session.user.name || "User"}!</h1>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tests</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats._count}</div>
            <p className="text-xs text-muted-foreground">Your total speed tests</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Download</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {userStats._avg.downloadSpeed ? userStats._avg.downloadSpeed.toFixed(2) : "N/A"} Mbps
            </div>
            <p className="text-xs text-muted-foreground">Your average download speed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Upload</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {userStats._avg.uploadSpeed ? userStats._avg.uploadSpeed.toFixed(2) : "N/A"} Mbps
            </div>
            <p className="text-xs text-muted-foreground">Your average upload speed</p>
          </CardContent>
        </Card>
      </div>

      <h2 className="mb-4 text-2xl font-bold">Your Recent Tests</h2>
      <SpeedHistory initialHistory={formattedSpeedTests} />
    </div>
  )
}
