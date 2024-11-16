import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Component() {
  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Terms of Service
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] w-full pr-4">
            <div className="space-y-6">
              <p className="text-sm text-muted-foreground">
                Effective Date: [Insert Date]
              </p>

              <p>
                Welcome to [Your SaaS Name]! These Terms of Service govern your
                access to and use of our platform, website, and services. By
                using our services, you agree to these terms. If you do not
                agree, please refrain from using our services.
              </p>

              <section>
                <h2 className="text-xl font-semibold mb-2">
                  1. Acceptance of Terms
                </h2>
                <p>
                  By registering for or using our services, you confirm that you
                  are at least 18 years old or have the legal capacity to enter
                  into these terms.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">
                  2. Services Provided
                </h2>
                <p>
                  We provide [brief description of your SaaS]. The specifics of
                  our services are detailed on our website at [insert website
                  URL].
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">
                  3. Account Responsibilities
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    You are responsible for maintaining the confidentiality of
                    your account credentials.
                  </li>
                  <li>
                    You agree to provide accurate and up-to-date information.
                  </li>
                  <li>
                    You may not use the service for illegal or unauthorized
                    purposes.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">
                  4. Pricing and Payment
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Our subscription plans and pricing are listed on [insert
                    link].
                  </li>
                  <li>
                    Payments are processed securely via [insert payment
                    processor].
                  </li>
                  <li>Subscriptions renew automatically unless canceled.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">5. User Conduct</h2>
                <p>You agree not to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use the service in violation of applicable laws.</li>
                  <li>Attempt to disrupt or hack the platform.</li>
                  <li>Share, sell, or sublicense your account.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">6. Termination</h2>
                <p>
                  We reserve the right to terminate your account for violating
                  these terms or for any misuse of our services.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">
                  7. Limitation of Liability
                </h2>
                <p>
                  [Your SaaS Name] is not liable for indirect or incidental
                  damages arising from your use of the service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">8. Governing Law</h2>
                <p>
                  These terms are governed by the laws of [Your Country/State].
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">9. Contact</h2>
                <p>For questions, contact us at [support@yourdomain.com].</p>
              </section>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
