"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function PricingSection() {
  const { user, isLoaded } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const tiers = [
    {
      name: "Trial",
      price: "Free",
      description:
        "Individuals looking to optimize a couple of CVs for a specific job application.",
      features: ["Optimize up to 5 CVs", "Basic keyword"],
    },
    {
      name: "Basic",
      price: "$15",
      description:
        "Job seekers actively applying to multiple jobs or those with multiple CV versions.",
      features: [
        "Optimize up to 15 CVs",
        "Advanced keyword",
        "Priority support",
      ],
    },
    {
      name: "Recommended",
      price: "$30",
      description:
        "Frequent job seekers, career coaches, or anyone applying to numerous job listings and needing extensive keyword optimization.",
      features: [
        "Optimize up to 40 CVs",
        "Advanced keyword",
        "Priority support",
        "Access to future features",
      ],
    },
  ];

  const handleGetStarted = () => {
    if (!user) {
      router.push("/sign-up"); // Navigate to the signup page
      return;
    }

    setIsModalOpen(true);
  };

  const handleCloseModal = async () => {
    setIsModalOpen(false);
    try {
      if (user) {
        const { emailAddresses } = user;
        const email = emailAddresses[0]?.emailAddress;
        const response = await fetch("/api/feedback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            interested: false,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to save feedback");
        }
      }
    } catch (error) {
      console.error("Error saving feedback:", error);
      // You might want to show an error toast here
    }
  };

  const handleKeepMeUpdated = async () => {
    setIsModalOpen(false);

    try {
      if (user) {
        const { emailAddresses } = user;
        const email = emailAddresses[0]?.emailAddress;
        const response = await fetch("/api/feedback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            interested: true,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to save feedback");
        }
      }
    } catch (error) {
      console.error("Error saving feedback:", error);
      // You might want to show an error toast here
    }
  };

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
                {tier.name === "Trial" && !user ? (
                  <Button
                    className="w-full bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white shadow-md transition-all duration-200"
                    onClick={handleGetStarted}
                  >
                    Get Started
                  </Button>
                ) : tier.name !== "Trial" ? (
                  <Button
                    className="w-full bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white shadow-md transition-all duration-200"
                    onClick={handleGetStarted}
                  >
                    Get Started
                  </Button>
                ) : null}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excited to Get Started?</DialogTitle>
            <DialogDescription>
              We're thrilled you're interested! We're currently fine-tuning this
              feature to make it perfect for you. Be among the first to know
              when it's live!
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <Button
              type="button"
              variant="secondary"
              onClick={handleKeepMeUpdated}
            >
              Yes, Keep Me Updated!
            </Button>
            <Button type="button" variant="outline" onClick={handleCloseModal}>
              No Thanks
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
