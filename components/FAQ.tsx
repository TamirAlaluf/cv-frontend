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
    question: "What is v0?",
    answer:
      "v0 is an advanced AI coding assistant created by Vercel. It's designed to emulate the world's most proficient developers and provide clear, efficient, and innovative coding solutions.",
  },
  {
    question: "What programming languages does v0 support?",
    answer:
      "v0 has knowledge spanning various programming languages, frameworks, and best practices, with a particular emphasis on React, Next.js App Router, and modern web development.",
  },
  {
    question: "Can v0 generate complete code snippets?",
    answer:
      "Yes, v0 can generate complete, functional code snippets that can be copied and pasted directly into a project. It focuses on writing full implementations rather than partial code or placeholders.",
  },
  {
    question: "Does v0 support accessibility features?",
    answer:
      "v0 implements accessibility best practices, including the use of semantic HTML elements, proper ARIA roles and attributes, and considerations for screen readers.",
  },
  {
    question: "Can v0 create diagrams or visualizations?",
    answer:
      "Yes, v0 can create diagrams using the Mermaid diagramming language to help illustrate complex concepts, processes, or architectures.",
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
    <div className="w-full max-w-3xl mx-auto p-4 py-20">
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
