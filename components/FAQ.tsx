"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Twitter, Mail } from "lucide-react";

// FAQ data
const faqs = [
  {
    question: "What does the app actually do?",
    answer:
      "ResuMate optimizes your CV for ATS by adding hidden keywords tailored to the job description, increasing your chances of passing automated filters.",
  },
  {
    question: "What is ATS?",
    answer:
      "ATS stands for Applicant Tracking System, software used by recruiters to filter and rank job applications based on keywords and relevance to the job description.",
  },
  {
    question: "How do you know what words to put in?",
    answer:
      "We use OpenAI's fine-tuned API to analyze the job description and extract role-specific keywords. This ensures accurate and tailored optimization for your CV.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "Yes, we offer a refund policy if you're not satisfied. Please check our terms for details.",
  },
  {
    question: "How can I check if the words are in if they are not visible?",
    answer:
      "You can copy and paste the text into a plain text editor to reveal the hidden keywords. Alternatively, use a text inspector or contact us for assistance.",
  },
  {
    question: "Does this guarantee that I will get an interview?",
    answer:
      "No, but it maximizes your chances by ensuring your CV passes ATS filters and aligns with job requirements.",
  },
  {
    question: "How do I get started",
    answer:
      "Simply sign up, upload your CV and job description, and our system will automatically insert relevant keywords. Within seconds, you'll have a new, ATS-optimized version of your CV ready for download.",
  },
];

export default function Component() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-4 py-20" id="faq">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <h2 className="text-3xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <p className="mb-4">Have another question?</p>
          <div className="flex space-x-4">
            <Button variant="outline" size="icon">
              <Twitter className="h-4 w-4" />
              <span className="sr-only">Contact on Twitter</span>
            </Button>
            <a href="mailto:resumateapp@gmail.com">
              <Button variant="outline" size="icon">
                <Mail className="h-4 w-4" />
                <span className="sr-only">Contact by email</span>
              </Button>
            </a>
          </div>
        </div>
        <div className="md:w-2/3">
          <Accordion type="single" collapsible className="w-full">
            {filteredFaqs.map((faq, index) => (
              <AccordionItem
                value={`item-${index}`}
                key={index}
                className="border-b border-gray-200"
              >
                <AccordionTrigger className="hover:no-underline">
                  <span className="text-lg font-bold text-gray-900 group-data-[state=open]:text-blue-500">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {filteredFaqs.length === 0 && (
            <p className="text-center text-muted-foreground">
              No matching questions found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
