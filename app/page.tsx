import { Button } from "@/components/ui/button"
import SpeedTestInterface from "@/components/speed-test-interface"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Upload, Wifi } from "lucide-react"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Home - KTSC Speed Test",
  description: "Test your internet speed quickly and accurately.",
}

async function getSystemStats() {
  // Fetch data from your API route
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/speed-test/stats`, {
    next: { revalidate: 3600 }, // Revalidate every hour
  })

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.error("Failed to fetch system stats:", res.status, res.statusText)
    return {
      totalTests: 0,
      totalUsers: 0,
      averageDownload: 0,
      averageUpload: 0,
      averagePing: 0,
    }
  }

  return res.json()
}

export default function HomePage() {
  return (
    <div className="container mx-auto py-8">
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            Test Your Internet Speed
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            Get accurate measurements of your download, upload, and ping.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center w-full py-8">
          <SpeedTestInterface />
        </div>
      </section>

      <Separator className="my-12" />

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">Why Test Your Speed?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardHeader>
              <Download className="mx-auto h-12 w-12 text-blue-500 mb-4" />
              <CardTitle>Verify Your Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Ensure you're getting the download and upload speeds you pay for from your ISP.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <Upload className="mx-auto h-12 w-12 text-green-500 mb-4" />
              <CardTitle>Troubleshoot Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Identify if slow internet is due to your provider, Wi-Fi, or devices.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <Wifi className="mx-auto h-12 w-12 text-orange-500 mb-4" />
              <CardTitle>Optimize Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Understand your connection's capabilities for streaming, gaming, and video calls.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="my-12" />

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">Global Statistics</h2>
        <Suspense fallback={<StatsSkeleton />}>
          <SystemStats />
        </Suspense>
      </section>

      <Separator className="my-12" />

      <section className="text-center">
        <h2 className="text-3xl font-bold mb-4">Learn More About Internet Speed</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          Check out our articles to understand what affects your internet speed and how to improve it.
        </p>
        <Button asChild size="lg">
          <Link href="/articles">Read Our Articles</Link>
        </Button>
      </section>
    </div>
  )
}

async function SystemStats() {
  const stats = await getSystemStats()
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="text-center">
        <CardHeader>
          <CardTitle>Total Tests Run</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold text-primary">{stats.totalTests}</p>
        </CardContent>
      </Card>
      <Card className="text-center">
        <CardHeader>
          <CardTitle>Average Download Speed</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold text-blue-600">{stats.averageDownload?.toFixed(2) || "N/A"} Mbps</p>
        </CardContent>
      </Card>
      <Card className="text-center">
        <CardHeader>
          <CardTitle>Average Upload Speed</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold text-green-600">{stats.averageUpload?.toFixed(2) || "N/A"} Mbps</p>
        </CardContent>
      </Card>
      <Card className="text-center">
        <CardHeader>
          <CardTitle>Average Ping</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold text-orange-600">{stats.averagePing?.toFixed(0) || "N/A"} ms</p>
        </CardContent>
      </Card>
      <Card className="text-center">
        <CardHeader>
          <CardTitle>Total Users</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold text-primary">{stats.totalUsers}</p>
        </CardContent>
      </Card>
    </div>
  )
}

function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <Card key={i} className="text-center">
          <CardHeader>
            <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-12 w-1/2 mx-auto" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
