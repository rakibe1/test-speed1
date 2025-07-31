"use client"

import { useState, useEffect, useCallback } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"
import { useSession } from "next-auth/react"
import { Skeleton } from "@/components/ui/skeleton"

export type TestResults = {
  id: string
  timestamp: string // ISO string from DB
  downloadSpeed: number
  uploadSpeed: number
  ping: number
  serverInfo?: {
    id: number
    name: string
    location: string
    country: string
  } | null
}

export function SpeedHistory() {
  const { data: session } = useSession()
  const [history, setHistory] = useState<TestResults[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchHistory = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      if (session?.user) {
        // Fetch from API for authenticated users
        const res = await fetch("/api/speed-test/history")
        if (!res.ok) {
          throw new Error(`Failed to fetch history: ${res.statusText}`)
        }
        const data = await res.json()
        setHistory(data)
      } else {
        // Load from localStorage for unauthenticated users
        const existing = localStorage.getItem("ktsc-speed-history")
        setHistory(existing ? JSON.parse(existing) : [])
      }
    } catch (err: any) {
      console.error("Error fetching/loading history:", err)
      setError(err.message || "Failed to load speed test history.")
    } finally {
      setLoading(false)
    }
  }, [session])

  useEffect(() => {
    fetchHistory()

    // Listen for custom event to update history from localStorage
    const handleHistoryUpdate = () => {
      if (!session?.user) {
        // Only update from localStorage if not authenticated
        fetchHistory()
      }
    }
    window.addEventListener("historyUpdate", handleHistoryUpdate)

    return () => {
      window.removeEventListener("historyUpdate", handleHistoryUpdate)
    }
  }, [fetchHistory, session])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/3 mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-48 w-full" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>
  }

  if (history.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No History</CardTitle>
          <CardDescription>Run a speed test to see your results here!</CardDescription>
        </CardHeader>
        <CardContent>
          {!session?.user && (
            <p className="text-sm text-gray-500">Sign in to save your history permanently across devices.</p>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Speed Tests</CardTitle>
        <CardDescription>Your last {history.length} speed test results.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Download</TableHead>
                <TableHead>Upload</TableHead>
                <TableHead>Ping</TableHead>
                <TableHead>Server</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((test) => (
                <TableRow key={test.id}>
                  <TableCell>{format(new Date(test.timestamp), "MMM dd, yyyy HH:mm")}</TableCell>
                  <TableCell>{test.downloadSpeed.toFixed(2)} Mbps</TableCell>
                  <TableCell>{test.uploadSpeed.toFixed(2)} Mbps</TableCell>
                  <TableCell>{test.ping} ms</TableCell>
                  <TableCell>
                    {test.serverInfo ? `${test.serverInfo.name}, ${test.serverInfo.location}` : "N/A"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
