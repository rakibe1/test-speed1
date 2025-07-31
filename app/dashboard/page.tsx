import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { format } from "date-fns"

export const metadata = {
  title: "Dashboard - KTSC Speed Testing App",
  description: "Your personal dashboard for internet speed tests.",
}

async function getSystemStats() {
  const today = new Date()
  today.setHours(0, 0, 0, 0) // Normalize to start of day

  const stats = await prisma.systemStats.findUnique({
    where: { date: today },
  })
  return stats
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/signin")
  }

  const systemStats = await getSystemStats()

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Welcome, {session.user?.name || "User"}!</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Total Tests (Today)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{systemStats?.totalTests || 0}</p>
            <p className="text-sm text-gray-500">As of {format(new Date(), "PPP")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{systemStats?.totalUsers || 0}</p>
            <p className="text-sm text-gray-500">Registered users</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Avg. Download (Today)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {systemStats?.averageDownload ? systemStats.averageDownload.toFixed(2) : "0.00"} Mbps
            </p>
            <p className="text-sm text-gray-500">Global average</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Avg. Upload (Today)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {systemStats?.averageUpload ? systemStats.averageUpload.toFixed(2) : "0.00"} Mbps
            </p>
            <p className="text-sm text-gray-500">Global average</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Avg. Ping (Today)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {systemStats?.averagePing ? systemStats.averagePing.toFixed(0) : "0"} ms
            </p>
            <p className="text-sm text-gray-500">Global average</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Your Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 dark:text-gray-300">
            This section will display your most recent speed test results or other relevant user activity.
          </p>
          {/* Placeholder for recent activity list/chart */}
          <div className="mt-4 h-48 flex items-center justify-center border border-dashed rounded-md text-gray-400">
            No recent activity to display. Run a speed test!
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
