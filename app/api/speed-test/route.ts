import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import Speedtest from "fast-speedtest-api" // Import the new library

// Simple IP hashing for privacy
function hashIP(ip: string): string {
  let hash = 0
  for (let i = 0; i < ip.length; i++) {
    const char = ip.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return hash.toString(16)
}

// Update system statistics
async function updateSystemStats() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const stats = await prisma.speedTest.aggregate({
    _avg: {
      downloadSpeed: true,
      uploadSpeed: true,
      ping: true,
    },
    _count: true,
  })

  const userCount = await prisma.user.count()

  await prisma.systemStats.upsert({
    where: { date: today },
    update: {
      totalTests: stats._count,
      totalUsers: userCount,
      averageDownload: stats._avg.downloadSpeed,
      averageUpload: stats._avg.uploadSpeed,
      averagePing: stats._avg.ping,
    },
    create: {
      date: today,
      totalTests: stats._count,
      totalUsers: userCount,
      averageDownload: stats._avg.downloadSpeed,
      averageUpload: stats._avg.uploadSpeed,
      averagePing: stats._avg.ping,
    },
  })
}

export async function GET(request: NextRequest) {
  const encoder = new TextEncoder()
  const customReadable = new ReadableStream({
    async start(controller) {
      const sendEvent = (data: any, eventName = "message") => {
        controller.enqueue(encoder.encode(`event: ${eventName}\n`))
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`))
      }

      try {
        const userAgent = request.headers.get("user-agent")
        const forwardedFor = request.headers.get("x-forwarded-for")
        const realIp = request.headers.get("x-real-ip")
        const ipAddress = forwardedFor?.split(",")[0] || realIp || request.ip

        sendEvent({ type: "starting" })

        const speedtest = new Speedtest({
          token: process.env.SPEEDTEST_API_TOKEN || "YOUR_SPEEDTEST_API_TOKEN", // Replace with your token if needed
          verbose: false,
          timeout: 15000, // Max 15 seconds for the entire test
          // You can specify a server here if needed, e.g., serverId: 1234
        })

        setTimeout(() => {
          sendEvent({ type: "testing" })
        }, 1000)

        const data = await speedtest.getSpeed()

        // Correctly retrieve values from fast-speedtest-api
        const finalDownload = data.download // Already in Mbps
        const finalUpload = data.upload // Already in Mbps
        const finalPing = data.ping

        if (finalDownload === undefined || finalUpload === undefined || finalPing === undefined) {
          throw new Error("Speed test did not return valid results.")
        }

        const results = {
          type: "finished",
          download: Number.parseFloat(finalDownload.toFixed(2)),
          upload: Number.parseFloat(finalUpload.toFixed(2)),
          ping: Math.round(finalPing),
          serverInfo: data.server
            ? {
                id: data.server.id,
                name: data.server.name,
                location: data.server.location,
                country: data.server.country,
              }
            : null,
          ipAddress: ipAddress ? hashIP(ipAddress) : null,
          userAgent: userAgent || null,
        }

        // Save speed test record to database
        try {
          // Removed session check for saving to DB, userId is now null if no session
          const speedTestRecord = await prisma.speedTest.create({
            data: {
              userId: null, // Set to null for public tests
              downloadSpeed: results.download,
              uploadSpeed: results.upload,
              ping: results.ping,
              serverInfo: results.serverInfo ? JSON.stringify(results.serverInfo) : null,
              location: results.serverInfo?.location || null,
              ipAddress: results.ipAddress,
              userAgent: results.userAgent,
            },
          })
          sendEvent({
            ...results,
            id: speedTestRecord.id,
            timestamp: speedTestRecord.createdAt,
          })
          // Update system stats (async)
          updateSystemStats().catch(console.error)
        } catch (dbError) {
          console.error("Failed to save speed test to DB:", dbError)
          sendEvent({ type: "error", message: "Failed to save test results to database." })
        } finally {
          controller.close()
        }
      } catch (error: any) {
        console.error("API route error:", error)
        sendEvent({ type: "error", message: error.message || "Internal server error during test initiation." })
        controller.close()
      }
    },
    cancel() {
      // Handle client disconnect if necessary
      console.log("Client disconnected from speed test stream.")
    },
  })

  return new NextResponse(customReadable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  })
}
