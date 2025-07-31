"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { useSpeedTest } from "@/hooks/use-speed-test"
import { SignInModal } from "@/components/auth/signin-modal"
import { Download, Upload, Wifi, Play, Square, RotateCcw, User } from "lucide-react"

export default function SpeedTestInterface() {
  const { data: session } = useSession()
  const { state, currentValues, finalResults, progress, startTest, stopTest, resetTest } = useSpeedTest()
  const [showSignInModal, setShowSignInModal] = useState(false)

  const getStatusMessage = () => {
    switch (state) {
      case "idle":
        return "Ready to test your connection speed"
      case "starting":
        return "Initializing speed test..."
      case "testing":
        return "Running speed test, please wait..."
      case "finished":
        return "Speed test completed!"
      case "error":
        return "Speed test encountered an error."
      default:
        return "Initializing..."
    }
  }

  const handleStartTest = async () => {
    await startTest()
  }

  const isRunning = state === "starting" || state === "testing"

  // Determine which values to display: final results if available, otherwise current
  const displayDownload = finalResults ? finalResults.downloadSpeed : currentValues.download
  const displayUpload = finalResults ? finalResults.uploadSpeed : currentValues.upload
  const displayPing = finalResults ? finalResults.ping : currentValues.ping

  return (
    <div className="space-y-6">
      {/* Authentication Status */}
      {!session && (
        <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium">Sign in to save your test history</span>
              </div>
              <Button size="sm" onClick={() => setShowSignInModal(true)}>
                Sign In
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Status and Progress */}
      <div className="text-center space-y-4">
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">{getStatusMessage()}</p>
        {isRunning && <Progress value={progress} className="w-full h-3" />}
        {state === "error" && <Progress value={progress} className="w-full h-3 bg-red-500" />}
      </div>

      {/* Speed Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="flex items-center justify-center mb-3">
              <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
                <Download className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-blue-600">{displayDownload.toFixed(1)}</div>
              <div className="text-sm text-gray-500">Mbps Download</div>
            </div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <div className="flex items-center justify-center mb-3">
              <div className="p-2 rounded-full bg-green-100 dark:bg-green-900">
                <Upload className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-green-600">{displayUpload.toFixed(1)}</div>
              <div className="text-sm text-gray-500">Mbps Upload</div>
            </div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <div className="flex items-center justify-center mb-3">
              <div className="p-2 rounded-full bg-orange-100 dark:bg-orange-900">
                <Wifi className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-orange-600">{Math.round(displayPing)}</div>
              <div className="text-sm text-gray-500">ms Ping</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex justify-center space-x-4">
        {(state === "idle" || state === "finished" || state === "error") && (
          <Button onClick={handleStartTest} size="lg" className="px-8">
            <Play className="mr-2 h-5 w-5" />
            Start Test
          </Button>
        )}

        {isRunning && (
          <Button onClick={stopTest} variant="destructive" size="lg" className="px-8">
            <Square className="mr-2 h-5 w-5" />
            Stop Test
          </Button>
        )}

        {(state === "finished" || state === "error") && (
          <Button onClick={resetTest} variant="outline" size="lg" className="px-8 bg-transparent">
            <RotateCcw className="mr-2 h-5 w-5" />
            Reset
          </Button>
        )}
      </div>

      <SignInModal open={showSignInModal} onOpenChange={setShowSignInModal} />
    </div>
  )
}
