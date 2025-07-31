"use client"

import { useState, useCallback, useRef } from "react"
import { useSession } from "next-auth/react"
import { toast } from "sonner"

// Updated TestState to reflect simplified progress
export type TestState = "idle" | "starting" | "testing" | "finished" | "error"

export type TestResults = {
  id: string
  timestamp: Date
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

export type CurrentValues = {
  download: number
  upload: number
  ping: number
}

export function useSpeedTest() {
  const { data: session } = useSession()
  const [state, setState] = useState<TestState>("idle")
  const [currentValues, setCurrentValues] = useState<CurrentValues>({
    download: 0,
    upload: 0,
    ping: 0,
  })
  const [finalResults, setFinalResults] = useState<TestResults | null>(null)
  const [progress, setProgress] = useState(0)
  const eventSourceRef = useRef<EventSource | null>(null)

  const saveToLocalStorage = useCallback((results: TestResults) => {
    try {
      const existing = localStorage.getItem("ktsc-speed-history")
      const history = existing ? JSON.parse(existing) : []
      const newHistory = [results, ...history].slice(0, 50) // Keep last 50 tests
      localStorage.setItem("ktsc-speed-history", JSON.stringify(newHistory))

      // Trigger history update event
      window.dispatchEvent(new CustomEvent("historyUpdate"))
    } catch (error) {
      console.error("Failed to save to localStorage:", error)
    }
  }, [])

  const startTest = useCallback(async () => {
    if (state !== "idle" && state !== "finished" && state !== "error") return

    setState("starting")
    setProgress(0)
    setCurrentValues({ download: 0, upload: 0, ping: 0 }) // Reset current values
    setFinalResults(null)

    if (!session) {
      toast.info("Sign in to save your test results to history!")
    }

    // Close any existing EventSource
    if (eventSourceRef.current) {
      eventSourceRef.current.close()
    }

    try {
      eventSourceRef.current = new EventSource("/api/speed-test")

      eventSourceRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data)
        console.log("Received SSE:", data)

        switch (data.status) {
          case "starting":
            setState("starting")
            setProgress(10) // Initial progress
            break
          case "testing":
            setState("testing")
            setProgress(50) // Mid-test progress
            // Note: fast-speedtest-api does not stream intermediate values.
            // currentValues will only update with final results.
            break
          case "finished":
            setState("finished")
            setFinalResults(data.results)
            // Update current values with final results for display consistency
            setCurrentValues({
              download: data.results.downloadSpeed,
              upload: data.results.uploadSpeed,
              ping: data.results.ping,
            })
            setProgress(100)
            // Save to local storage only if not authenticated
            if (!session) {
              saveToLocalStorage(data.results)
            }
            toast.success(data.message)
            eventSourceRef.current?.close()
            break
          case "error":
            setState("error")
            toast.error(data.message || "An unknown error occurred during the test.")
            setProgress(0) // Reset progress on error
            eventSourceRef.current?.close()
            break
          default:
            break
        }
      }

      eventSourceRef.current.onerror = (error) => {
        console.error("EventSource error:", error)
        setState("error")
        toast.error("Connection to speed test server lost or failed.")
        setProgress(0) // Reset progress on error
        eventSourceRef.current?.close()
      }

      eventSourceRef.current.onopen = () => {
        console.log("EventSource connection opened.")
      }

      eventSourceRef.current.onclose = () => {
        console.log("EventSource connection closed.")
      }
    } catch (error) {
      console.error("Failed to start speed test:", error)
      setState("error")
      toast.error("Failed to initiate speed test.")
      setProgress(0) // Reset progress on error
    }
  }, [state, session, saveToLocalStorage])

  const stopTest = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close()
    }
    setState("idle")
    setProgress(0)
    setCurrentValues({ download: 0, upload: 0, ping: 0 })
    setFinalResults(null)
    toast.info("Speed test stopped.")
  }, [])

  const resetTest = useCallback(() => {
    stopTest() // Stop any ongoing test and reset state
    setState("idle")
    setProgress(0)
    setCurrentValues({ download: 0, upload: 0, ping: 0 })
    setFinalResults(null)
  }, [stopTest])

  return {
    state,
    currentValues,
    finalResults,
    progress,
    startTest,
    stopTest,
    resetTest,
  }
}
