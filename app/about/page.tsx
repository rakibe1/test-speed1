import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">About KTSC Speed Testing App</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-lg text-gray-700 dark:text-gray-300">
          <p>
            Welcome to the KTSC Speed Testing App! Our mission is to provide you with a fast, accurate, and reliable
            tool to measure your internet connection speed. In today's digital world, a stable and speedy internet
            connection is crucial for work, entertainment, and communication. We understand this need and have built
            this application to help you monitor your internet performance with ease.
          </p>
          <Separator />
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Our Technology</h2>
          <p>
            This application is built using the latest web technologies to ensure a smooth and responsive user
            experience. We leverage:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>
              <strong>Next.js:</strong> A powerful React framework for building performant and scalable web
              applications.
            </li>
            <li>
              <strong>Shadcn UI:</strong> A collection of beautifully designed and accessible UI components built with
              Radix UI and Tailwind CSS.
            </li>
            <li>
              <strong>`fast-speedtest-api`:</strong> A robust library for conducting accurate internet speed tests.
            </li>
            <li>
              <strong>Prisma:</strong> A modern database toolkit that simplifies database access and management.
            </li>
            <li>
              <strong>NextAuth.js:</strong> For secure and flexible authentication, allowing users to save their test
              history.
            </li>
          </ul>
          <Separator />
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">How It Works</h2>
          <p>
            When you click the "Start Test" button, our application connects to a nearby speed test server. It then
            measures your download speed (how fast you can pull data from the internet), upload speed (how fast you can
            send data to the internet), and ping (the reaction time of your connection). The results are displayed in
            real-time and, if you're signed in, saved to your personal history for future reference.
          </p>
          <Separator />
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Our Commitment</h2>
          <p>
            We are committed to providing a transparent and user-friendly experience. Your privacy is important to us;
            we only collect necessary data to perform the speed test and improve our service. We continuously work to
            enhance the accuracy and features of this app.
          </p>
          <p>
            Thank you for choosing KTSC Speed Testing App. We hope it helps you stay on top of your internet
            performance!
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
