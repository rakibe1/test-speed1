import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Contact Us</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Get in Touch</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Have questions, feedback, or need support? Reach out to us through any of the methods below.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <a href="mailto:support@ktsc.com" className="text-gray-700 dark:text-gray-300 hover:underline">
                    support@ktsc.com
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <a href="tel:+1234567890" className="text-gray-700 dark:text-gray-300 hover:underline">
                    +1 (234) 567-890
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="text-gray-700 dark:text-gray-300">123 Speed Test Lane, Internet City, IC 98765</span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Send us a Message</h2>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your Name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@example.com" />
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Subject of your message" />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Your message" rows={5} />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
