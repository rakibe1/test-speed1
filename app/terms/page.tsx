import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Our terms and conditions for using the service.",
}

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-4xl font-bold">Terms of Service</h1>
      <div className="prose dark:prose-invert">
        <p>
          Welcome to KTSC Speed Test! These Terms of Service ("Terms") govern your use of our internet speed testing
          application (the "Service"). By accessing or using the Service, you agree to be bound by these Terms.
        </p>

        <h2 className="mt-8 text-2xl font-semibold">1. Acceptance of Terms</h2>
        <p>
          By accessing and using the KTSC Speed Test Service, you acknowledge that you have read, understood, and agree
          to be bound by these Terms, as well as our Privacy Policy. If you do not agree with any part of these Terms,
          you must not use the Service.
        </p>

        <h2 className="mt-8 text-2xl font-semibold">2. Description of Service</h2>
        <p>
          KTSC Speed Test provides a tool to measure your internet connection's download speed, upload speed, and ping
          latency. The Service is provided "as is" and "as available" without any warranties of any kind, either express
          or implied. We do not guarantee the accuracy, completeness, or reliability of any test results.
        </p>

        <h2 className="mt-8 text-2xl font-semibold">3. User Conduct</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the Service for any unlawful purpose or in any way that violates these Terms.</li>
          <li>Interfere with or disrupt the integrity or performance of the Service.</li>
          <li>Attempt to gain unauthorized access to the Service or its related systems or networks.</li>
          <li>Use the Service to transmit any harmful, illegal, or offensive content.</li>
        </ul>

        <h2 className="mt-8 text-2xl font-semibold">4. Intellectual Property</h2>
        <p>
          All content, features, and functionality on the Service, including but not limited to text, graphics, logos,
          and software, are the exclusive property of KTSC Speed Test and are protected by intellectual property laws.
          You may not reproduce, distribute, modify, or create derivative works of any part of the Service without our
          prior written consent.
        </p>

        <h2 className="mt-8 text-2xl font-semibold">5. Disclaimer of Warranties</h2>
        <p>
          The Service is provided on an "as is" and "as available" basis. KTSC Speed Test makes no warranties, express
          or implied, regarding the Service, including but not limited to warranties of merchantability, fitness for a
          particular purpose, and non-infringement. We do not warrant that the Service will be uninterrupted,
          error-free, or secure.
        </p>

        <h2 className="mt-8 text-2xl font-semibold">6. Limitation of Liability</h2>
        <p>
          In no event shall KTSC Speed Test be liable for any direct, indirect, incidental, special, consequential, or
          punitive damages, including but not limited to loss of profits, data, or goodwill, arising out of or in
          connection with your use of the Service, even if we have been advised of the possibility of such damages.
        </p>

        <h2 className="mt-8 text-2xl font-semibold">7. Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless KTSC Speed Test, its affiliates, officers, directors, employees, and
          agents from and against any and all claims, liabilities, damages, losses, and expenses, including reasonable
          attorneys' fees, arising out of or in any way connected with your access to or use of the Service.
        </p>

        <h2 className="mt-8 text-2xl font-semibold">8. Changes to Terms</h2>
        <p>
          We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide
          at least 30 days' notice prior to any new terms taking effect. By continuing to access or use our Service
          after those revisions become effective, you agree to be bound by the revised terms.
        </p>

        <h2 className="mt-8 text-2xl font-semibold">9. Governing Law</h2>
        <p>
          These Terms shall be governed and construed in accordance with the laws of [Your Country/State], without
          regard to its conflict of law provisions.
        </p>

        <h2 className="mt-8 text-2xl font-semibold">10. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at:
          <br />
          <a href="mailto:terms@ktscspeedtest.com">terms@ktscspeedtest.com</a>
        </p>
      </div>
    </div>
  )
}
