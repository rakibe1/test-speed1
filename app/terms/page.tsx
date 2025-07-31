import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Terms of Service</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-lg text-gray-700 dark:text-gray-300">
          <p>
            Welcome to KTSC Speed Testing App! These terms and conditions outline the rules and regulations for the use
            of KTSC Speed Testing App&apos;s Website, located at [Your Website URL].
          </p>
          <p>
            By accessing this website we assume you accept these terms and conditions. Do not continue to use KTSC Speed
            Testing App if you do not agree to take all of the terms and conditions stated on this page.
          </p>
          <Separator />
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Cookies</h2>
          <p>
            We employ the use of cookies. By accessing KTSC Speed Testing App, you agreed to use cookies in agreement
            with the KTSC Speed Testing App&apos;s Privacy Policy.
          </p>
          <p>
            Most interactive websites use cookies to let us retrieve the user&apos;s details for each visit. Cookies are
            used by our website to enable the functionality of certain areas to make it easier for people visiting our
            website. Some of our affiliate/advertising partners may also use cookies.
          </p>
          <Separator />
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">License</h2>
          <p>
            Unless otherwise stated, KTSC Speed Testing App and/or its licensors own the intellectual property rights
            for all material on KTSC Speed Testing App. All intellectual property rights are reserved. You may access
            this from KTSC Speed Testing App for your own personal use subjected to restrictions set in these terms and
            conditions.
          </p>
          <p>You must not:</p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>Republish material from KTSC Speed Testing App</li>
            <li>Sell, rent or sub-license material from KTSC Speed Testing App</li>
            <li>Reproduce, duplicate or copy material from KTSC Speed Testing App</li>
            <li>Redistribute content from KTSC Speed Testing App</li>
          </ul>
          <p>This Agreement shall begin on the date hereof.</p>
          <Separator />
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Hyperlinking to our Content</h2>
          <p>
            The following organizations may link to our Website without prior written approval: Government agencies;
            Search engines; News organizations; Online directory distributors may link to our Website in the same manner
            as they hyperlink to the Websites of other listed businesses; and System wide Accredited Businesses except
            soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not
            hyperlink to our Web site.
          </p>
          <p>
            We may consider and approve other link requests from the following types of organizations: commonly-known
            consumer and/or business information sources; dot.com community sites; associations or other groups
            representing charities; online directory distributors; internet portals; accounting, law and consulting
            firms; and educational institutions and trade associations.
          </p>
          <Separator />
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Content Liability</h2>
          <p>
            We shall not be held responsible for any content that appears on your Website. You agree to protect and
            defend us against all claims that are rising on your Website. No link(s) should appear on any Website that
            may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates
            the infringement or other violation of, any third party rights.
          </p>
          <Separator />
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Reservation of Rights</h2>
          <p>
            We reserve the right to request that you remove all links or any particular link to our Website. You approve
            to immediately remove all links to our Website upon request. We also reserve the right to amen these terms
            and conditions and it&apos;s linking policy at any time. By continuously linking to our Website, you agree
            to be bound to and follow these linking terms and conditions.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
