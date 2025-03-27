"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import SubscriptionFAQ from "@/components/subscription/subscription-faq"

export default function SubscriptionPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  const plans = [
    {
      name: "Basic",
      description: "Essential features for spiritual growth",
      price: billingCycle === "monthly" ? 9.99 : 99.99,
      features: [
        "Access to all basic teachings",
        "10 audiobook downloads per month",
        "Basic meditation guides",
        "Email support",
      ],
      popular: false,
    },
    {
      name: "Premium",
      description: "Enhanced spiritual journey experience",
      price: billingCycle === "monthly" ? 19.99 : 199.99,
      features: [
        "Access to all teachings and exclusive content",
        "Unlimited audiobook downloads",
        "Advanced meditation guides",
        "Priority email support",
        "Monthly virtual events",
        "Personalized spiritual guidance",
      ],
      popular: true,
    },
    {
      name: "Family",
      description: "Share the journey with your loved ones",
      price: billingCycle === "monthly" ? 29.99 : 299.99,
      features: [
        "Everything in Premium for up to 5 family members",
        "Family meditation sessions",
        "Shared spiritual journey tracking",
        "Dedicated family support",
        "Quarterly family retreat access",
      ],
      popular: false,
    },
  ]

  return (
    <div className="container max-w-6xl py-10">
      <div className="mx-auto mb-10 max-w-md text-center">
        <h1 className="mb-4 text-3xl font-bold tracking-tight">Subscription Plans</h1>
        <p className="text-muted-foreground">Choose the perfect subscription plan to enhance your spiritual journey</p>
      </div>

      <div className="mb-8 flex justify-center">
        <Tabs defaultValue="monthly" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="monthly" onClick={() => setBillingCycle("monthly")}>
              Monthly
            </TabsTrigger>
            <TabsTrigger value="yearly" onClick={() => setBillingCycle("yearly")}>
              Yearly <Badge className="ml-2 bg-primary/20 text-primary">Save 15%</Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.name} className={`flex flex-col ${plan.popular ? "border-primary shadow-lg" : ""}`}>
            {plan.popular && (
              <div className="absolute right-4 top-0 -translate-y-1/2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                Most Popular
              </div>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="mb-4">
                <span className="text-3xl font-bold">${plan.price}</span>
                <span className="text-muted-foreground">/{billingCycle === "monthly" ? "month" : "year"}</span>
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                Subscribe Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="mb-6 text-center text-2xl font-bold">Frequently Asked Questions</h2>
        <SubscriptionFAQ />
      </div>
    </div>
  )
}

