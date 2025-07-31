"use client"

import type React from "react"
import { useState } from "react"
import { Card, Button, Icon } from "antd"
import { DownloadOutlined, UploadOutlined, WifiOutlined, UserOutlined } from "@ant-design/icons"

const SpeedTestInterface: React.FC = () => {
  const [downloadSpeed, setDownloadSpeed] = useState<number | null>(null)
  const [uploadSpeed, setUploadSpeed] = useState<number | null>(null)
  const [ping, setPing] = useState<number | null>(null)
  const [authStatus, setAuthStatus] = useState<string>("Not Authenticated")
  const [isTesting, setIsTesting] = useState<boolean>(false)

  const startTest = () => {
    setIsTesting(true)
    // Simulate speed test
    setTimeout(() => {
      setDownloadSpeed(50)
      setUploadSpeed(30)
      setPing(20)
      setIsTesting(false)
    }, 3000)
  }

  const stopTest = () => {
    setIsTesting(false)
  }

  const resetTest = () => {
    setDownloadSpeed(null)
    setUploadSpeed(null)
    setPing(null)
    setAuthStatus("Not Authenticated")
  }

  return (
    <div>
      <Card
        title="Authentication Status"
        bordered={false}
        className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950"
      >
        <Icon component={UserOutlined} className="text-blue-600" />
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">{authStatus}</p>
      </Card>
      <Card title="Speed Test Results" bordered={false}>
        <div className="flex justify-between items-center">
          <div>
            <Icon component={DownloadOutlined} className="text-blue-500" />
            <div className="text-3xl font-bold">{downloadSpeed ? `${downloadSpeed} Mbps` : "N/A"}</div>
            <div className="text-sm text-muted-foreground">Mbps Download</div>
          </div>
          <div>
            <Icon component={UploadOutlined} className="text-green-500" />
            <div className="text-3xl font-bold">{uploadSpeed ? `${uploadSpeed} Mbps` : "N/A"}</div>
            <div className="text-sm text-muted-foreground">Mbps Upload</div>
          </div>
          <div>
            <Icon component={WifiOutlined} className="text-orange-500" />
            <div className="text-3xl font-bold">{ping ? `${ping} ms` : "N/A"}</div>
            <div className="text-sm text-muted-foreground">ms Ping</div>
          </div>
        </div>
      </Card>
      <div className="flex justify-center space-x-4">
        <Button onClick={startTest} disabled={isTesting}>
          Start Test
        </Button>
        <Button onClick={stopTest} disabled={!isTesting}>
          Stop Test
        </Button>
        <Button onClick={resetTest}>Reset</Button>
      </div>
    </div>
  )
}

export default SpeedTestInterface
