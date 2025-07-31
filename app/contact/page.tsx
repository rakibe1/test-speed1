import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with us.",
}

export default function ContactPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-4xl font-bold">Contact Us</h1>
      <div className="prose dark:prose-invert">
        <p>
          Have questions, feedback, or need support? We'd love to hear from you! Please reach out to us using the
          information below.
        </p>
        <h2 className="mt-8 text-2xl font-semibold">General Inquiries</h2>
        <p>
          For general questions about our speed testing application or partnership opportunities, please email us at:
        </p>
        <p className="font-medium">
          <a href="mailto:info@ktscspeedtest.com">info@ktscspeedtest.com</a>
        </p>
        <h2 className="mt-8 text-2xl font-semibold">Support</h2>
        <p>
          If you are experiencing issues with the speed test, have technical questions, or need assistance, our support
          team is here to help.
        </p>
        <p className="font-medium">
          <a href="mailto:support@ktscspeedtest.com">support@ktscspeedtest.com</a>
        </p>
        <h2 className="mt-8 text-2xl font-semibold">Business Hours</h2>
        <p>Our team is available to respond to inquiries during the following hours:</p>
        <p>Monday - Friday: 9:00 AM - 5:00 PM (EST)</p>
        <p>Weekends and Public Holidays: Closed</p>
        <p className="mt-4">We aim to respond to all inquiries within 24-48 business hours.</p>
      </div>
    </div>
  )
}
