import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Our privacy policy regarding your data.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-4xl font-bold">Privacy Policy</h1>
      <div className="prose dark:prose-invert">
        <p>
          At KTSC Speed Test, we are committed to protecting your privacy. This Privacy Policy explains how we collect,
          use, and disclose information when you use our speed testing application.
        </p>

        <h2 className="mt-8 text-2xl font-semibold">Information We Collect</h2>
        <p>When you use our speed test, we collect the following information:</p>
        <ul>
          <li>
            <strong>Speed Test Results:</strong> This includes your download speed, upload speed, and ping latency.
          </li>
          <li>
            <strong>Server Information:</strong> Details about the speed test server used, such as its ID, name,
            location, and country.
          </li>
          <li>
            <strong>IP Address:</strong> Your IP address is collected to determine your general location for server
            selection and aggregated statistics. For privacy, your IP address is hashed before storage, meaning the
            original IP cannot be retrieved.
          </li>
          <li>
            <strong>User Agent:</strong> Information about your browser and operating system, which helps us understand
            usage patterns and debug issues.
          </li>
        </ul>
        <p>
          If you choose to sign in using Google, we collect your name, email address, and profile picture as provided by
          Google, solely for the purpose of creating and managing your account and associating your speed test history
          with your profile.
        </p>

        <h2 className="mt-8 text-2xl font-semibold">How We Use Your Information</h2>
        <p>We use the collected information for the following purposes:</p>
        <ul>
          <li>To provide and operate the speed testing service.</li>
          <li>To display your individual speed test results.</li>
          <li>To analyze and improve the performance and accuracy of our speed test.</li>
          <li>
            To generate aggregated, anonymized system statistics (e.g., average speeds across all users) to understand
            overall network performance trends.
          </li>
          <li>If you are signed in, to save your speed test history to your account for your personal review.</li>
          <li>To detect and prevent fraudulent or abusive activity.</li>
        </ul>

        <h2 className="mt-8 text-2xl font-semibold">Data Sharing and Disclosure</h2>
        <p>
          We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. We
          may share aggregated and anonymized data (which cannot be used to identify you) with third parties for
          research, analysis, or reporting purposes.
        </p>
        <p>
          We may disclose your information if required to do so by law or in response to valid requests by public
          authorities (e.g., a court order or government agency request).
        </p>

        <h2 className="mt-8 text-2xl font-semibold">Data Security</h2>
        <p>
          We implement a variety of security measures to maintain the safety of your personal information when you place
          an order or enter, submit, or access your personal information. However, no method of transmission over the
          Internet or method of electronic storage is 100% secure.
        </p>

        <h2 className="mt-8 text-2xl font-semibold">Your Choices</h2>
        <ul>
          <li>
            You can use our speed test without signing in. In this case, your test results will be saved locally in your
            browser's storage (for recent tests) but will not be permanently associated with a user account on our
            servers.
          </li>
          <li>If you have an account, you can review your test history in your dashboard.</li>
        </ul>

        <h2 className="mt-8 text-2xl font-semibold">Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
          Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
        </p>

        <h2 className="mt-8 text-2xl font-semibold">Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at:
          <br />
          <a href="mailto:privacy@ktscspeedtest.com">privacy@ktscspeedtest.com</a>
        </p>
      </div>
    </div>
  )
}
