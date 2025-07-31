import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SpeedHistory } from "@/components/speed-history"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

export const metadata = {
  title: "Test History - KTSC Speed Testing App",
  description: "View your past internet speed test results.",
}

export default async function HistoryPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/signin")
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Your Speed Test History</CardTitle>
          <CardContent className="text-center text-gray-700 dark:text-gray-300">
            Review your past internet speed test results.
          </CardContent>
        </CardHeader>
      </Card>
      <SpeedHistory />
    </div>
  )
}
