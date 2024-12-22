import { FileText, Upload, Zap } from "lucide-react";

export default function HowItWorks() {
  const videoUrl = process.env.NEXT_PUBLIC_VIDEO_URL;
  return (
    <section className="py-20 bg-gray-50" id="how-it-works">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Step
            icon={<Upload className="w-12 h-12 text-primary" />}
            title="Upload Documents"
            description="Submit your CV and the job description you're applying for through our secure platform."
          />
          <Step
            icon={<Zap className="w-12 h-12 text-primary" />}
            title="AI Enhancement"
            description="Our AI analyzes the job description and intelligently inserts relevant keywords into your CV, optimizing it for ATS."
          />
          <Step
            icon={<FileText className="w-12 h-12 text-primary" />}
            title="Download ATS-Friendly CV"
            description="Receive your enhanced, ATS-optimized CV ready to submit for your dream job application."
          />
        </div>
        <div className="max-w-2xl mx-auto mt-12 pt-20">
          {" "}
          {/* Reduced from max-w-3xl */}
          <div className="relative w-full h-0 pb-[56.25%]">
            {" "}
            {/* 16:9 aspect ratio */}
            <video
              controls
              className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
              src={videoUrl}
              title="How It Works Demo"
              poster="/image.png"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}

function Step({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
