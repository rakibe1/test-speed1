"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useSpeedTest } from "@/hooks/use-speed-test"
import { Wifi, Download, Upload, Clock } from "lucide-react"

export function SpeedTestInterface() {
  const { isRunning, results, progress, status, startTest } = useSpeedTest()

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Wifi className="h-6 w-6" />
            Speed Test
          </CardTitle>
          <CardDescription>Click the button below to test your internet connection speed</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Start Test Button */}
          <div className="text-center">
            <Button onClick={startTest} disabled={isRunning} size="lg" className="w-full sm:w-auto">
              {isRunning ? "Testing..." : "Start Speed Test"}
            </Button>
          </div>

          {/* Progress Bar */}
          {isRunning && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-muted-foreground text-center">{status}</p>
            </div>
          )}

          {/* Results */}
          {results && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Download className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <div className="text-2xl font-bold">{results.download}</div>
                  <div className="text-sm text-muted-foreground">Mbps Download</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <div className="text-2xl font-bold">{results.upload}</div>
                  <div className="text-sm text-muted-foreground">Mbps Upload</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                  <div className="text-2xl font-bold">{results.ping}</div>
                  <div className="text-sm text-muted-foreground">ms Ping</div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
