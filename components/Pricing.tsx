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
      name: "Basic",
      price: "$9",
      description: "Essential features for small teams",
      features: [
        "Up to 5 users",
        "5GB storage",
        "Basic support",
        "Core features",
      ],
    },
    {
      name: "Pro",
      price: "$29",
      description: "Advanced features for growing businesses",
      features: [
        "Up to 20 users",
        "50GB storage",
        "Priority support",
        "Advanced analytics",
        "Custom integrations",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Tailored solutions for large organizations",
      features: [
        "Unlimited users",
        "Unlimited storage",
        "24/7 dedicated support",
        "Advanced security",
        "Custom development",
        "On-premise option",
      ],
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Choose Your Plan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <Card
              key={index}
              className="flex flex-col transition-all duration-200 hover:shadow-lg"
            >
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  {tier.name}
                </CardTitle>
                <CardDescription className="text-xl font-semibold">
                  {tier.price}/month
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-600 mb-4">{tier.description}</p>
                <ul className="space-y-2">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  {tier.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
