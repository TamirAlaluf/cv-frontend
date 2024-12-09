import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Component() {
  const sections = [
    {
      title: "Information We Collect",
      content: (
        <ul className="list-disc pl-6 space-y-2">
          <li>
            **Personal Information**: Includes your name, email address, and
            other details you provide during registration.
          </li>
          <li>
            **Usage Data**: Information such as IP address, browser type, and
            device used to access our services.
          </li>
          <li>
            **Cookies and Tracking**: Data collected through cookies and similar
            technologies.
          </li>
        </ul>
      ),
    },
    {
      title: "How We Use Your Information",
      content: (
        <ul className="list-disc pl-6 space-y-2">
          <li>Provide and improve our services.</li>
          <li>Process payments and transactions.</li>
          <li>Communicate updates, promotions, and support.</li>
          <li>Ensure platform security and compliance.</li>
        </ul>
      ),
    },
    {
      title: "Sharing Your Information",
      content: (
        <p>
          We do not sell or rent your personal information. We may share your
          data with:
        </p>
      ),
    },
    {
      title: "Your Choices",
      content: (
        <ul className="list-disc pl-6 space-y-2">
          <li>
            You can update or delete your information through your account
            settings.
          </li>
          <li>Opt-out of marketing emails via the unsubscribe link.</li>
          <li>Manage cookie preferences via your browser settings.</li>
        </ul>
      ),
    },
    {
      title: "Data Retention",
      content: (
        <p>
          We retain your information only as long as necessary to provide our
          services or comply with legal obligations.
        </p>
      ),
    },
    {
      title: "Security of Your Information",
      content: (
        <p>
          We implement industry-standard measures to protect your data. However,
          no method of transmission is entirely secure.
        </p>
      ),
    },
    {
      title: "Children’s Privacy",
      content: (
        <p>
          Our services are not intended for users under the age of 13. We do not
          knowingly collect data from children.
        </p>
      ),
    },
    {
      title: "Changes to This Policy",
      content: (
        <p>
          We may update this Privacy Policy. Changes will be posted on this page
          with the updated effective date.
        </p>
      ),
    },
    {
      title: "Contact",
      content: (
        <p>
          If you have questions about this policy, contact us at
          <a
            href="mailto:resumateapp@gmail.com"
            className="text-blue-500 underline"
          >
            {" "}
            resumateapp@gmail.com
          </a>
          .
        </p>
      ),
    },
  ];

  return (
    <div className="container mx-auto py-10 pt-20 h-screen">
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
              {sections.map((section, index) => (
                <section key={index}>
                  <h2 className="text-xl font-semibold mb-2">
                    {index + 1}. {section.title}
                  </h2>
                  {section.content}
                </section>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
