import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about our speed testing application.",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-4xl font-bold">About KTSC Speed Test</h1>
      <div className="prose dark:prose-invert">
        <p>
          Welcome to KTSC Speed Test, your reliable tool for measuring internet connection performance. In today's
          fast-paced digital world, a stable and fast internet connection is crucial for work, entertainment, and
          communication. Our application provides you with accurate insights into your download speed, upload speed, and
          ping latency.
        </p>
        <h2 className="mt-8 text-2xl font-semibold">Our Mission</h2>
        <p>
          Our mission is to empower users with the knowledge they need to understand their internet service. By
          providing a simple, intuitive, and accurate speed test, we aim to help you diagnose connectivity issues,
          verify your ISP's promises, and ensure you're getting the performance you pay for.
        </p>
        <h2 className="mt-8 text-2xl font-semibold">How It Works</h2>
        <p>
          Our speed test utilizes the `fast-speedtest-api` library to perform comprehensive tests. When you click "Start
          Test", our system connects to optimal servers to measure:
        </p>
        <ul>
          <li>
            <strong>Download Speed:</strong> How quickly your device can retrieve data from the internet. This is
            important for streaming, browsing, and downloading files.
          </li>
          <li>
            <strong>Upload Speed:</strong> How quickly your device can send data to the internet. Crucial for video
            calls, online gaming, and uploading content.
          </li>
          <li>
            <strong>Ping (Latency):</strong> The reaction time of your connection – how fast you get a response after
            you've sent out a request. Lower ping is better for real-time applications like gaming.
          </li>
        </ul>
        <h2 className="mt-8 text-2xl font-semibold">Privacy and Data</h2>
        <p>
          We value your privacy. While we record test results to provide aggregated system statistics, your IP address
          is hashed for anonymity. If you choose to sign in, your test history will be saved to your account, allowing
          you to track your performance over time.
        </p>
        <p className="mt-4">
          Thank you for choosing KTSC Speed Test. We hope our tool helps you get the most out of your internet!
        </p>
      </div>
    </div>
  )
}
