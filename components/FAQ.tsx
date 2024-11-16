"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
// FAQ data
const faqs = [
  {
    question: "What is this app and how does it work?",
    answer:
      "Our app helps job seekers optimize their CVs for Applicant Tracking Systems (ATS). You upload your CV and the job description, and our app generates a new version of your CV with relevant keywords inserted in a hidden format, improving its chances of passing ATS filters and getting noticed by recruiters.",
  },
  {
    question: "Why is using keywords important for my CV?",
    answer:
      "ATS software scans resumes for specific keywords that match the job description. Including relevant keywords helps ensure your CV gets past these filters and reaches the hiring team.",
  },
  {
    question: "Will the keywords be visible to anyone reviewing my CV",
    answer:
      "No. The keywords are inserted in a hidden part of the document (invisible text or other non-obtrusive methods). They won’t be visible to human readers but will be detected by ATS systems.",
  },
  {
    question: "How do you determine which keywords to add to my CV?",
    answer:
      "We use OpenAI's advanced language model to analyze the job description you provide and extract the most relevant keywords. These keywords are then automatically added to your CV in a hidden format, ensuring they don't interfere with the visual presentation of your resume but still make it ATS-friendly.",
  },
  {
    question: "How do I get started",
    answer:
      "Simply sign up, upload your CV and job description, and our system will automatically insert relevant keywords. Within minutes, you’ll have a new, ATS-optimized version of your CV ready for download.",
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
    <div className="w-full max-w-3xl mx-auto p-4 py-20" id="faq">
      <h2 className="text-3xl font-bold text-center mb-6">
        Frequently Asked Questions
      </h2>

      <Accordion type="single" collapsible className="w-full">
        {filteredFaqs.map((faq, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {filteredFaqs.length === 0 && (
        <p className="text-center text-muted-foreground">
          No matching questions found.
        </p>
      )}
    </div>
  );
}
