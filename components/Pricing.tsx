import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

export default function PricingSection() {
  const tiers = [
    {
      name: "Trial",
      price: "Free",
      description:
        "Individuals looking to optimize a couple of CVs for a specific job application.",
      features: ["Optimize up to 2 CVs", "Basic keyword"],
    },
    {
      name: "Basic",
      price: "$15",
      description:
        "Job seekers actively applying to multiple jobs or those with multiple CV versions.",
      features: [
        "Optimize up to 10 CVs",
        "Advanced keyword",
        "Priority support",
        "Core features",
      ],
    },
    {
      name: "Recommended",
      price: "$30",
      description:
        "Frequent job seekers, career coaches, or anyone applying to numerous job listings and needing extensive keyword optimization.",
      features: [
        "Optimize up to 30 CVs",
        "Advanced keyword",
        "Priority support",
        "Core features",
        "Email consultation",
        "Access to future features",
      ],
    },
  ];

  return (
    <section className="py-16 bg-gray-50" id="pricing">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Choose Your Plan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
          {tiers.map((tier, index) => (
            <Card
              key={index}
              className="flex flex-col transition-all duration-200 hover:shadow-lg"
            >
              <CardHeader>
                <CardTitle className="text-xl font-bold">{tier.name}</CardTitle>
                <CardDescription className="text-lg font-semibold">
                  {tier.price}
                  {tier.price !== "Free" ? "/One-time payment" : ""}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-600 mb-4">{tier.description}</p>
                <ul className="space-y-2">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Get Started </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
