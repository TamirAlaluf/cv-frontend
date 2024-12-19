import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | ResuMate',
  description: 'ResuMate terms of service. Understand your rights and obligations when using our CV optimization platform.',
  keywords: ['terms of service', 'user agreement', 'legal terms', 'ResuMate terms'],
  openGraph: {
    title: 'Terms of Service | ResuMate',
    description: 'ResuMate terms of service. Understand your rights and obligations when using our CV optimization platform.',
    type: 'website',
    url: 'https://resumateapp.com/tos',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service | ResuMate',
    description: 'ResuMate terms of service. Understand your rights and obligations when using our CV optimization platform.',
  },
};

const sections = [
  {
    title: "Acceptance of Terms",
    content:
      "By registering for or using our services, you confirm that you are at least 14 years old or have the legal capacity to enter into these terms.",
  },
  {
    title: "Services Provided",
    content:
      "We provide an app that helps job seekers optimize their CVs for Applicant Tracking Systems (ATS). You upload your CV and the job description, and our app generates a new version of your CV with relevant keywords inserted in a hidden format, improving its chances of passing ATS filters and getting noticed by recruiters.",
  },
  {
    title: "Account Responsibilities",
    content: (
      <ul className="list-disc pl-6 space-y-2">
        <li>
          You are responsible for maintaining the confidentiality of your
          account credentials.
        </li>
        <li>You agree to provide accurate and up-to-date information.</li>
        <li>
          You may not use the service for illegal or unauthorized purposes.
        </li>
      </ul>
    ),
  },
  {
    title: "Pricing and Payment",
    content: (
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
    ),
  },
  {
    title: "Refund Policy",
    content: (
      <>
        <p>
          We offer refunds based on the number of uses you have consumed in your
          subscription plan. If you have not used any features of the service or
          have used less than [insert number] uses, you are eligible for a full
          refund. Refund requests must be submitted within [insert number of
          days] days from the date of purchase.
        </p>
        <p>
          If you have used more than [insert number] uses, your subscription
          will be considered non-refundable. Please contact our support team at
          [support@yourdomain.com] for assistance with any refund inquiries.
        </p>
      </>
    ),
  },
  {
    title: "User Conduct",
    content: (
      <ul className="list-disc pl-6 space-y-2">
        <li>Use the service in violation of applicable laws.</li>
        <li>Attempt to disrupt or hack the platform.</li>
        <li>Share, sell, or sublicense your account.</li>
      </ul>
    ),
  },
  {
    title: "Termination",
    content:
      "We reserve the right to terminate your account for violating these terms or for any misuse of our services.",
  },
  {
    title: "Limitation of Liability",
    content:
      "ResuMate is not liable for indirect or incidental damages arising from your use of the service.",
  },
  {
    title: "Governing Law",
    content: "These terms are governed by the laws of Israel.",
  },
  {
    title: "Contact",
    content: (
      <p>
        For questions, contact us at{" "}
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

export default function Component() {
  return (
    <div className="container mx-auto py-10 pt-20 h-screen">
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

              {sections.map((section, index) => (
                <section key={index}>
                  <h2 className="text-xl font-semibold mb-2">
                    {index + 1}. {section.title}
                  </h2>
                  <div>{section.content}</div>
                </section>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
