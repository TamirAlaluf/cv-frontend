import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  Network,
  TrendingDown,
  Clock,
  FileX,
  Search,
} from "lucide-react";

export default function ProblemSection() {
  const problems = [
    {
      icon: <Users className="h-5 w-5 text-blue-500" />,
      text: "Your friends around you are getting job offers, while you're still waiting for a callback.",
    },
    {
      icon: <Network className="h-5 w-5 text-purple-500" />,
      text: "It seems like everyone has connections to get to recruiters.",
    },
    {
      icon: <TrendingDown className="h-5 w-5 text-red-500" />,
      text: "You keep blaming the market situation.",
    },
    {
      icon: <FileX className="h-5 w-5 text-orange-500" />,
      text: "Your qualifications seem perfect, yet your applications keep getting rejected.",
    },
    {
      icon: <Search className="h-5 w-5 text-green-500" />,
      text: "You're left wondering if your CV is even being seen by human eyes.",
    },
  ];

  const rejectionEmails = [
    "We regret to inform you that your application has not been successful...",
    "Thank you for your interest. Unfortunately, we have decided not to proceed...",
    "We appreciate your application, but we have chosen candidates who better fit...",
    "After careful consideration, we will not be moving forward with your application...",
    "We have reviewed your profile and unfortunately, it does not match our current needs...",
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left column: Title, subtitle, and problem description */}
          <div>
            <h2 className="text-4xl font-bold mb-4">I KNOW YOU</h2>
            <p className="text-xl text-gray-600 mb-8">
              You&apos;re not alone in this challenging journey
            </p>
            <ul className="space-y-4">
              {problems.map((problem, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-3 mt-1 p-1 bg-gray-100 rounded-full">
                    {problem.icon}
                  </span>
                  <p className="text-gray-600">{problem.text}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Right column: Rejection email cards */}
          <div className="relative h-[600px]">
            {rejectionEmails.map((email, index) => (
              <Card
                key={index}
                className={`absolute shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer
                  ${
                    index === 0
                      ? "top-0 left-0"
                      : index === 1
                      ? "top-1/4 right-0"
                      : index === 2
                      ? "top-2/4 left-1/4"
                      : index === 3
                      ? "bottom-1/4 left-0"
                      : "bottom-0 right-1/4"
                  }`}
                style={{
                  width: "250px",
                  transform: `rotate(${Math.random() * 10 - 5}deg)`,
                }}
              >
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600 line-clamp-2">{email}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
