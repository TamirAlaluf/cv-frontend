import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Component() {
  return (
    <div className="container mx-auto py-10 pt-20">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Terms of Service
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] w-full pr-4">
            <div className="space-y-6">
              <p className="text-sm text-muted-foreground">
                Effective Date: November 28, 2024
              </p>

              <p>
                Welcome to ResuMate! These Terms of Service govern your access
                to and use of our platform, website, and services. By using our
                services, you agree to these terms. If you do not agree, please
                refrain from using our services.
              </p>

              <section>
                <h2 className="text-xl font-semibold mb-2">
                  1. Acceptance of Terms
                </h2>
                <p>
                  By registering for or using our services, you confirm that you
                  are at least 14 years old or have the legal capacity to enter
                  into these terms.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">
                  2. Services Provided
                </h2>
                <p>
                  We provide an app that helps job seekers optimize their CVs
                  for Applicant Tracking Systems (ATS). You upload your CV and
                  the job description, and our app generates a new version of
                  your CV with relevant keywords inserted in a hidden format,
                  improving its chances of passing ATS filters and getting
                  noticed by recruiters. The specifics of our services are
                  detailed on our website at{" "}
                  <a
                    href="https://resumateapp.com/"
                    className="text-blue-500 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://resumateapp.com/
                  </a>
                  .
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
                    Our subscription plans and pricing are listed on{" "}
                    <a
                      href="https://resumateapp.com/"
                      className="text-blue-500 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://resumateapp.com/
                    </a>
                    .
                  </li>
                  <li>Payments are processed securely via Paddle.</li>
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
                  ResuMate is not liable for indirect or incidental damages
                  arising from your use of the service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">8. Governing Law</h2>
                <p>These terms are governed by the laws of Israel.</p>
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
