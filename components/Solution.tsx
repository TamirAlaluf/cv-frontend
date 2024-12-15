import { Zap, Search, TrendingUp, Sparkles } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Quick and Easy to Use",
    description:
      "No need to repeatedly edit or verify your resume — just upload, optimize, and submit your application with confidence.",
  },
  {
    icon: Search,
    title: "Genius Hidden Keyword Technology",
    description:
      "Our revolutionary AI seamlessly embeds essential keywords invisibly within your CV. Your resume looks identical, but it's supercharged for ATS success!",
  },
  {
    icon: TrendingUp,
    title: "Maximize Your Chances",
    description:
      "ResuMate significantly increases your chances of passing ATS filters and catching the attention of hiring managers.",
  },
  {
    icon: Sparkles,
    title: "Works with Any Template",
    description:
      "ResuMate seamlessly integrates with any CV design from Canva, Word, or other tools. Your template stays professional and polished while we enhance it.",
  },
];

export default function SolutionSection() {
  return (
    <section className="py-16 bg-white pb-80">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Why Choose ResuMate?
          </h2>
          <p className="text-xl text-gray-600">
            Effortless Optimization for Every Job Application
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <feature.icon className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0" />
                <h3 className="text-lg font-semibold text-gray-900">
                  {feature.title.split(" ").map((word, i) =>
                    word.toLowerCase() === "easy" ||
                    word.toLowerCase() === "hidden" ||
                    word.toLowerCase() === "maximize" ||
                    word.toLowerCase() === "any" ||
                    word.toLowerCase() === "template" ? (
                      <span key={i} className="text-blue-600">
                        {word}{" "}
                      </span>
                    ) : (
                      word + " "
                    )
                  )}
                </h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
