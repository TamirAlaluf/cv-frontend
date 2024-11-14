import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Experience the Future
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-prose">
              Our cutting-edge product revolutionizes the way you interact with
              technology. Watch the demo to see how it can transform your daily
              life.
            </p>
            <Button className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
              Get Started
            </Button>
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl">
            <video
              className="w-full h-auto"
              controls
              poster="/placeholder.svg?height=400&width=600"
            >
              <source
                src="https://example.com/demo-video.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
