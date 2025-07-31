"use client"

import { useState, useCallback } from "react"

interface SpeedTestResults {
  download: number
  upload: number
  ping: number
}

export function useSpeedTest() {
  const [isRunning, setIsRunning] = useState(false)
  const [results, setResults] = useState<SpeedTestResults | null>(null)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState("")

  const startTest = useCallback(async () => {
    setIsRunning(true)
    setResults(null)
    setProgress(0)
    setStatus("Initializing...")

    try {
      const eventSource = new EventSource("/api/speed-test")

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data)

        switch (data.type) {
          case "starting":
            setStatus("Starting speed test...")
            setProgress(10)
            break
          case "testing":
            setStatus("Testing connection speed...")
            setProgress(50)
            break
          case "finished":
            setStatus("Test completed!")
            setProgress(100)
            setResults({
              download: data.download || 0,
              upload: data.upload || 0,
              ping: data.ping || 0,
            })
            eventSource.close()
            setIsRunning(false)
            break
          case "error":
            setStatus("Test failed")
            setProgress(0)
            eventSource.close()
            setIsRunning(false)
            break
        }
      }

      eventSource.onerror = () => {
        setStatus("Connection error")
        setProgress(0)
        eventSource.close()
        setIsRunning(false)
      }
    } catch (error) {
      console.error("Speed test error:", error)
      setStatus("Test failed")
      setIsRunning(false)
    }
  }, [])

  return {
    isRunning,
    results,
    progress,
    status,
    startTest,
  }
}
