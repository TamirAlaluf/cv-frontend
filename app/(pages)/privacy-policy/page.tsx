import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Component() {
  return (
    <div className="container mx-auto py-10 pt-20">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Privacy Policy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] w-full pr-4">
            <div className="space-y-6">
              <p className="text-sm text-muted-foreground">
                Effective Date: November 28, 2024
              </p>

              <p>
                At ResuMate, we value your privacy and are committed to
                protecting your personal information. This Privacy Policy
                explains how we collect, use, and safeguard your data.
              </p>

              <section>
                <h2 className="text-xl font-semibold mb-2">
                  1. Information We Collect
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    **Personal Information**: Includes your name, email address,
                    and other details you provide during registration.
                  </li>
                  <li>
                    **Usage Data**: Information such as IP address, browser
                    type, and device used to access our services.
                  </li>
                  <li>
                    **Cookies and Tracking**: Data collected through cookies and
                    similar technologies.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">
                  2. How We Use Your Information
                </h2>
                <p>We use your information to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide and improve our services.</li>
                  <li>Process payments and transactions.</li>
                  <li>Communicate updates, promotions, and support.</li>
                  <li>Ensure platform security and compliance.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">
                  3. Sharing Your Information
                </h2>
                <p>
                  We do not sell or rent your personal information. We may share
                  your data with:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Trusted third-party services (e.g., payment processors).
                  </li>
                  <li>Authorities, when required by law.</li>
                  <li>Business partners in case of a merger or acquisition.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">4. Your Choices</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    You can update or delete your information through your
                    account settings.
                  </li>
                  <li>Opt-out of marketing emails via the unsubscribe link.</li>
                  <li>Manage cookie preferences via your browser settings.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">
                  5. Data Retention
                </h2>
                <p>
                  We retain your information only as long as necessary to
                  provide our services or comply with legal obligations.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">
                  6. Security of Your Information
                </h2>
                <p>
                  We implement industry-standard measures to protect your data.
                  However, no method of transmission is entirely secure.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">
                  7. Children’s Privacy
                </h2>
                <p>
                  Our services are not intended for users under the age of 13.
                  We do not knowingly collect data from children.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">
                  8. Changes to This Policy
                </h2>
                <p>
                  We may update this Privacy Policy. Changes will be posted on
                  this page with the updated effective date.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">9. Contact</h2>
                <p>
                  If you have questions about this policy, contact us at
                  [support@yourdomain.com].
                </p>
              </section>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
