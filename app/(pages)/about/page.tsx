import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Component() {
  const sections = [
    {
      title: "Our Mission",
      content: (
        <p>
          ResuMate is dedicated to empowering job seekers by transforming their
          CVs into ATS-optimized documents that get noticed. We believe everyone
          deserves a fair chance to showcase their skills and land their dream
          job.
        </p>
      ),
    },
    {
      title: "How ResuMate Works",
      content: (
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Upload Your CV:</strong> Easily upload your current resume.
          </li>
          <li>
            <strong>Add Job Description:</strong> Paste the job description
            you&apos;re targeting.
          </li>
          <li>
            <strong>AI-Powered Optimization:</strong> Our advanced algorithm
            analyzes and enhances your CV with strategic keyword insertion.
          </li>
          <li>
            <strong>Download Optimized CV:</strong> Receive a professionally
            tailored resume designed to pass ATS filters.
          </li>
        </ul>
      ),
    },
    {
      title: "The ATS Challenge",
      content: (
        <p>
          Many qualified candidates never reach human recruiters because of
          Applicant Tracking Systems (ATS). These automated screening tools
          filter out resumes that don&apos;t match specific keywords, often
          overlooking talented professionals.
        </p>
      ),
    },
    {
      title: "Our Technology",
      content: (
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Advanced Natural Language Processing:</strong> Our AI
            understands context and strategically places keywords.
          </li>
          <li>
            <strong>Industry-Specific Insights:</strong> Tailored optimization
            across multiple professional domains.
          </li>
          <li>
            <strong>Preservation of Original Content:</strong> We enhance, not
            replace, your unique professional narrative.
          </li>
        </ul>
      ),
    },
    {
      title: "Who We Help",
      content: (
        <ul className="list-disc pl-6 space-y-2">
          <li>Recent graduates entering the job market</li>
          <li>Career changers seeking new opportunities</li>
          <li>Professionals looking to advance their careers</li>
          <li>International candidates applying to global roles</li>
        </ul>
      ),
    },
    {
      title: "Privacy and Security",
      content: (
        <p>
          Your personal information and documents are treated with the utmost
          confidentiality. We use industry-standard encryption and never store
          your documents longer than necessary.
        </p>
      ),
    },
    {
      title: "Our Commitment",
      content: (
        <p>
          ResuMate is more than a tool—it&apos;s your partner in professional
          growth. We continuously improve our technology to help you stand out
          in a competitive job market.
        </p>
      ),
    },
  ];

  return (
    <div className="container mx-auto py-10 pt-20 h-screen">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            About ResuMate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] w-full pr-4">
            <div className="space-y-6">
              <p>
                Welcome to ResuMate, your intelligent CV optimization platform
                designed to help you navigate the complex world of modern job
                applications.
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
