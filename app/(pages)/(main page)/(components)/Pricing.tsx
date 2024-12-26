"use client";

import { use, useEffect, useState } from "react";
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
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
} from "@/components/ui/toast";
import { Check } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function PricingSection() {
  const { user, isLoaded } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState<{
    open: boolean;
    title: string;
    description: string;
    variant?: "default" | "destructive";
  }>({
    open: false,
    title: "",
    description: "",
    variant: "default",
  });
  const [tier, setTier] = useState<string | undefined>(undefined);
  const router = useRouter();
  const [showPayPal, setShowPayPal] = useState(false);
  const [selectedTier, setSelectedTier] = useState("");

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
      price: "$5",
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
      price: "$10",
      description:
        "Frequent job seekers, career coaches, or anyone applying to numerous job listings and needing extensive keyword optimization.",
      features: [
        "Optimize up to 50 CVs",
        "Advanced keyword",
        "Priority support",
        "Access to future features",
      ],
    },
  ];

  const showToast = (
    title: string,
    description: string,
    variant: "default" | "destructive" = "default"
  ) => {
    setToast({ open: true, title, description, variant });
    // Automatically hide toast after 5 seconds
    setTimeout(() => {
      setToast((prev) => ({ ...prev, open: false }));
    }, 5000);
  };

  const handleGetStarted = (tier?: string) => {
    if (!user) {
      router.push("/sign-up");
      return;
    }

    if (tier === "Trial") {
      // Handle trial tier logic
      return;
    }

    setSelectedTier(tier || "");
    setShowPayPal(true);
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
            tier: tier,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to save feedback");
        }

        showToast(
          "Feedback Received",
          "Thank you for your response. We appreciate your input."
        );
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        showToast(
          "Error",
          "You already have a pending request. Please try again later."
        );
      } else {
        showToast(
          "Error",
          "You already have a pending request. Please try again later."
        );
      }
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
            tier: tier,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to save feedback");
        }

        showToast(
          "Thank You!",
          "We'll keep you updated on the latest features."
        );
      }
    } catch (error) {
      showToast(
        "Error",
        "You already have a pending request. Please try again later."
      );
    }
  };

  const createOrder = async () => {
    try {
      const response = await fetch("/api/paypal/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tier: selectedTier,
        }),
      });
      const order = await response.json();
      console.log("Order:", order);
      return order.id;
    } catch (error) {
      console.error("Failed to create order:", error);
    }
  };

  const onApprove = async (data: { orderID?: string }) => {
    try {
      console.log("PayPal Approval Data:", data);

      if (!data.orderID) {
        throw new Error("No orderID received from PayPal");
      }

      const response = await fetch("/api/paypal/orders/capture", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderID: data.orderID,
          tier: selectedTier,
        }),
      });
      console.log("Response:", response);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to capture payment");
      }

      const orderData = await response.json();
      if (orderData.status === "COMPLETED") {
        showToast(
          "Payment Successful",
          `Thank you for purchasing the ${selectedTier} plan!`
        );
        setIsModalOpen(false);
        router.refresh();
      }
    } catch (error) {
      console.error("Payment capture error:", error);
      showToast(
        "Error",
        "There was a problem processing your payment.",
        "destructive"
      );
    }
  };

  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
        currency: "USD",
      }}
    >
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
                  <CardTitle className="text-xl font-bold">
                    {tier.name}
                  </CardTitle>
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
                      onClick={() => handleGetStarted(tier.name)}
                    >
                      Get Started
                    </Button>
                  ) : tier.name !== "Trial" ? (
                    <Button
                      className="w-full bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white shadow-md transition-all duration-200"
                      onClick={() => handleGetStarted(tier.name)}
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
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {showPayPal
                  ? "Complete Your Purchase"
                  : "Excited to Get Started?"}
              </DialogTitle>
              <DialogDescription>
                {showPayPal
                  ? `Complete your payment for the ${selectedTier} plan`
                  : "We're currently fine-tuning this feature to make it perfect for you. Be among the first to know when it's live!"}
              </DialogDescription>
            </DialogHeader>
            {showPayPal ? (
              <div className="mt-4 max-w-full">
                <PayPalButtons
                  createOrder={createOrder}
                  onApprove={onApprove}
                  style={{ layout: "vertical" }}
                />
              </div>
            ) : (
              <DialogFooter className="sm:justify-start">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleKeepMeUpdated}
                >
                  Yes, Keep Me Updated!
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseModal}
                >
                  No Thanks
                </Button>
              </DialogFooter>
            )}
          </DialogContent>
        </Dialog>
      </section>

      <ToastProvider>
        <ToastViewport>
          {toast.open && (
            <Toast
              open={toast.open}
              onOpenChange={(open) => setToast((prev) => ({ ...prev, open }))}
              variant={toast.variant}
            >
              <div className="grid gap-1">
                <ToastTitle>{toast.title}</ToastTitle>
                <ToastDescription>{toast.description}</ToastDescription>
              </div>
              <ToastClose />
            </Toast>
          )}
        </ToastViewport>
      </ToastProvider>
    </PayPalScriptProvider>
  );
}
