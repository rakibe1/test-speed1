"use client"

import { useState, useEffect, useCallback } from "react"
import { useSession } from "next-auth/react"
import { format } from "date-fns"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import type { TestResults } from "@/hooks/use-speed-test"

interface SpeedHistoryProps {
  initialHistory: TestResults[]
}

export function SpeedHistory({ initialHistory }: SpeedHistoryProps) {
  const { data: session } = useSession()
  const [history, setHistory] = useState<TestResults[]>(initialHistory)
  const [loading, setLoading] = useState(false)

  const fetchHistory = useCallback(async () => {
    if (session?.user) {
      setLoading(true)
      try {
        const response = await fetch("/api/speed-test/history")
        if (!response.ok) {
          throw new Error("Failed to fetch history")
        }
        const data: TestResults[] = await response.json()
        setHistory(data)
      } catch (error) {
        console.error("Error fetching history:", error)
        // Optionally show a toast error
      } finally {
        setLoading(false)
      }
    } else {
      // Load from local storage if not authenticated
      try {
        const existing = localStorage.getItem("ktsc-speed-history")
        setHistory(existing ? JSON.parse(existing) : [])
      } catch (error) {
        console.error("Failed to load history from localStorage:", error)
        setHistory([])
      }
    }
  }, [session])

  useEffect(() => {
    fetchHistory()

    // Listen for custom event to update history from local storage
    const handleHistoryUpdate = () => {
      if (!session) {
        fetchHistory()
      }
    }
    window.addEventListener("historyUpdate", handleHistoryUpdate)

    return () => {
      window.removeEventListener("historyUpdate", handleHistoryUpdate)
    }
  }, [fetchHistory, session])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Test History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Download (Mbps)</TableHead>
                <TableHead>Upload (Mbps)</TableHead>
                <TableHead>Ping (ms)</TableHead>
                <TableHead>Server</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton className="h-4 w-24" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-20" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-20" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-16" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-32" />
                    </TableCell>
                  </TableRow>
                ))
              ) : history.length > 0 ? (
                history.map((test) => (
                  <TableRow key={test.id}>
                    <TableCell>{format(new Date(test.timestamp), "MMM dd, yyyy HH:mm")}</TableCell>
                    <TableCell>{test.downloadSpeed.toFixed(2)}</TableCell>
                    <TableCell>{test.uploadSpeed.toFixed(2)}</TableCell>
                    <TableCell>{test.ping}</TableCell>
                    <TableCell>
                      {test.serverInfo ? `${test.serverInfo.name}, ${test.serverInfo.location}` : "N/A"}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No speed test history found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
