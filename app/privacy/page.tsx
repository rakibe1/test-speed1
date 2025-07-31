import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-lg text-gray-700 dark:text-gray-300">
          <p>
            Your privacy is critically important to us. At KTSC Speed Testing App, we have a few fundamental principles:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>
              We don&apos;t ask you for personal information unless we truly need it. (We can&apos;t stand services that
              ask you for things like your gender or income level for no apparent reason.)
            </li>
            <li>
              We don&apos;t share your personal information with anyone except to comply with the law, develop our
              products, or protect our rights.
            </li>
            <li>
              We don&apos;t store personal information on our servers unless required for the on-going operation of one
              of our services.
            </li>
          </ul>
          <Separator />
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Website Visitors</h2>
          <p>
            Like most website operators, KTSC Speed Testing App collects non-personally-identifying information of the
            sort that web browsers and servers typically make available, such as the browser type, language preference,
            referring site, and the date and time of each visitor request. KTSC Speed Testing App&apos;s purpose in
            collecting non-personally identifying information is to better understand how KTSC Speed Testing App&apos;s
            visitors use its website. From time to time, KTSC Speed Testing App may release non-personally-identifying
            information in the aggregate, e.g., by publishing a report on trends in the usage of its website.
          </p>
          <p>
            KTSC Speed Testing App also collects potentially personally-identifying information like Internet Protocol
            (IP) addresses for logged in users and for users leaving comments on our blogs. KTSC Speed Testing App only
            discloses logged in user and commenter IP addresses under the same circumstances that it uses and discloses
            personally-identifying information as described below.
          </p>
          <Separator />
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Gathering of Personally-Identifying Information
          </h2>
          <p>
            Certain visitors to KTSC Speed Testing App&apos;s websites choose to interact with KTSC Speed Testing App in
            ways that require KTSC Speed Testing App to gather personally-identifying information. The amount and type
            of information that KTSC Speed Testing App gathers depends on the nature of the interaction. For example, we
            ask visitors who sign up for an account to provide a username and email address. Those who engage in
            transactions with KTSC Speed Testing App are asked to provide additional information, including as necessary
            the personal and financial information required to process those transactions. In each case, KTSC Speed
            Testing App collects such information only insofar as is necessary or appropriate to fulfill the purpose of
            the visitor&apos;s interaction with KTSC Speed Testing App. KTSC Speed Testing App does not disclose
            personally-identifying information other than as described below. And visitors can always refuse to supply
            personally-identifying information, with the caveat that it may prevent them from engaging in certain
            website-related activities.
          </p>
          <Separator />
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Aggregated Statistics</h2>
          <p>
            KTSC Speed Testing App may collect statistics about the behavior of visitors to its websites. For instance,
            KTSC Speed Testing App may monitor the most popular speed tests or use spam screened by the Akismet service
            to help identify spam. KTSC Speed Testing App may display this information publicly or provide it to others.
            However, KTSC Speed Testing App does not disclose personally-identifying information other than as described
            below.
          </p>
          <Separator />
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Privacy Policy Changes</h2>
          <p>
            Although most changes are likely to be minor, KTSC Speed Testing App may change its Privacy Policy from time
            to time, and in KTSC Speed Testing App&apos;s sole discretion. KTSC Speed Testing App encourages visitors to
            frequently check this page for any changes to its Privacy Policy. Your continued use of this site after any
            change in this Privacy Policy will constitute your acceptance of such change.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
