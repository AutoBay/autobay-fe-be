"use client";
import NumberFlow from "@number-flow/react";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const plans = [
  {
    id: "starter",
    name: "Launch 500",
    price: {
      monthly: 35,
      yearly: 28,
    },
    description: "Up to 500 Listings. Full features included.",
    features: [
      "Dashboard & Reporting",
      "Discover & List",
      "Catalog & Listings Management",
      "Orders & Auto Ordering",
      "Monitoring & Alerts",
      "Tracking Number Updates",
      "Learning Center",
      "Performance Reviews",
      "Dedicated Support",
    ],
    cta: "Subscribe to Starter",
    popular: false,
  },
  {
    id: "drive-1000",
    name: "Drive 1,000",
    price: { monthly: 55, yearly: 44 },
    description: "Up to 1,000 Listings. Includes Tracking Number Conversion (+$10/month).",
    features: [
      "Dashboard & Reporting",
      "Discover & List",
      "Catalog & Listings Management",
      "Orders & Auto Ordering",
      "Monitoring & Alerts",
      "Tracking Number Updates",
      "Learning Center",
      "Performance Reviews",
      "Dedicated Support",
    ],
    cta: "Get started",
    popular: true,
  },
  {
    id: "cruise-3000",
    name: "Cruise 3,000",
    price: { monthly: 95, yearly: 76 },
    description: "Up to 3,000 Listings. Advanced Reports & Monitoring. Tracking Number Conversion (+$15/month).",
    features: [
      "Dashboard & Reporting",
      "Discover & List",
      "Catalog & Listings Management",
      "Orders & Auto Ordering",
      "Monitoring & Alerts",
      "Tracking Number Updates",
      "Learning Center",
      "Performance Reviews",
      "Dedicated Support",
    ],
    cta: "Get started",
    popular: false,
  },
  {
    id: "turbo-5000",
    name: "Turbo 5,000",
    price: { monthly: 150, yearly: 120 },
    description: "Up to 5,000 Listings. Priority Support. Tracking Number Conversion (+$20/month).",
    features: [
      "Dashboard & Reporting",
      "Discover & List",
      "Catalog & Listings Management",
      "Orders & Auto Ordering",
      "Monitoring & Alerts",
      "Tracking Number Updates",
      "Learning Center",
      "Performance Reviews",
      "Dedicated Support",
    ],
    cta: "Get started",
    popular: false,
  },
  {
    id: "nitro-7500",
    name: "Nitro 7,500",
    price: { monthly: 215, yearly: 172 },
    description: "Up to 7,500 Listings. Dedicated Account Review. Tracking Number Conversion (+$25/month).",
    features: [
      "Dashboard & Reporting",
      "Discover & List",
      "Catalog & Listings Management",
      "Orders & Auto Ordering",
      "Monitoring & Alerts",
      "Tracking Number Updates",
      "Learning Center",
      "Performance Reviews",
      "Dedicated Support",
    ],
    cta: "Get started",
    popular: false,
  },
  {
    id: "velocity-10000",
    name: "Velocity 10,000",
    price: { monthly: 285, yearly: 228 },
    description: "Up to 10,000 Listings. Full API Access. Tracking Number Conversion (+$30/month).",
    features: [
      "Dashboard & Reporting",
      "Discover & List",
      "Catalog & Listings Management",
      "Orders & Auto Ordering",
      "Monitoring & Alerts",
      "Tracking Number Updates",
      "Learning Center",
      "Performance Reviews",
      "Dedicated Support",
    ],
    cta: "Get started",
    popular: false,
  },
  {
    id: "hyper-25000",
    name: "Hyper 25,000",
    price: { monthly: 625, yearly: 500 },
    description: "Up to 25,000 Listings. Custom Integrations. Tracking Number Conversion (+$40/month).",
    features: [
      "Dashboard & Reporting",
      "Discover & List",
      "Catalog & Listings Management",
      "Orders & Auto Ordering",
      "Monitoring & Alerts",
      "Tracking Number Updates",
      "Learning Center",
      "Performance Reviews",
      "Dedicated Support",
    ],
    cta: "Get started",
    popular: false,
  },
  {
    id: "vortex-50000",
    name: "Vortex 50,000",
    price: { monthly: 1150, yearly: 920 },
    description: "Up to 50,000 Listings. Enterprise SLA Support. Tracking Number Conversion (+$50/month).",
    features: [
      "Dashboard & Reporting",
      "Discover & List",
      "Catalog & Listings Management",
      "Orders & Auto Ordering",
      "Monitoring & Alerts",
      "Tracking Number Updates",
      "Learning Center",
      "Performance Reviews",
      "Dedicated Support",
    ],
    cta: "Get started",
    popular: false,
  },
  {
    id: "apex-100000",
    name: "Apex 100,000",
    price: { monthly: 2250, yearly: 1800 },
    description: "Up to 100,000 Listings. White-label Capabilities. Tracking Number Conversion (+$60/month).",
    features: [
      "Dashboard & Reporting",
      "Discover & List",
      "Catalog & Listings Management",
      "Orders & Auto Ordering",
      "Monitoring & Alerts",
      "Tracking Number Updates",
      "Learning Center",
      "Performance Reviews",
      "Dedicated Support",
    ],
    cta: "Get started",
    popular: false,
  },
  {
    id: "titan-250000",
    name: "Titan 250,000",
    price: { monthly: 5500, yearly: 4400 },
    description: "Up to 250,000 Listings. Enterprise Customization & Dedicated Manager. Tracking Number Conversion (+$75/month).",
    features: [
      "Dashboard & Reporting",
      "Discover & List",
      "Catalog & Listings Management",
      "Orders & Auto Ordering",
      "Monitoring & Alerts",
      "Tracking Number Updates",
      "Learning Center",
      "Performance Reviews",
      "Dedicated Support",
    ],
    cta: "Get started",
    popular: false,
  },
  {
    id: "galaxy-500000",
    name: "Galaxy 500,000",
    price: { monthly: 9950, yearly: 7960 },
    description: "Up to 500,000 Listings. Enterprise Suite Access. 24/7 Support & Dedicated Infrastructure. Tracking Number Conversion (Included).",
    features: [
      "Dashboard & Reporting",
      "Discover & List",
      "Catalog & Listings Management",
      "Orders & Auto Ordering",
      "Monitoring & Alerts",
      "Tracking Number Updates",
      "Learning Center",
      "Performance Reviews",
      "Dedicated Support",
    ],
    cta: "Get started",
    popular: false,
  },
];
const Example = () => {
  const [frequency, setFrequency] = useState<string>("monthly");
  return (
    <div className="not-prose flex flex-col gap-16 px-8 py-24 text-center">
      <div className="flex flex-col items-center justify-center gap-8">
        <h1 className="mb-0 text-balance font-medium text-5xl tracking-tighter!">Simple, transparent pricing</h1>
        <p className="mx-auto mt-0 mb-0 max-w-2xl text-balance text-lg text-muted-foreground">
          Managing a business is hard enough, so why not make your life easier? Our pricing plans are simple, transparent and scale with you.
        </p>
        <Tabs defaultValue={frequency} onValueChange={setFrequency}>
          <TabsList>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger className="gap-1" value="yearly">
              <span>Yearly</span>
              <Badge className="px-1.5" variant={frequency === "monthly" ? "outline" : "destructive"}>
                <NumberFlow
                  className="text-xs"
                  format={{
                    style: "percent",
                    compactDisplay: "short",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,

                  }}
                  value={frequency === "monthly" ? 0 : 0.2}
                />
              </Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex w-full gap-2">
          {plans.slice(0, 3).map((plan) => {
            const price = plan.price[frequency as keyof typeof plan.price];
            return (
              <Card className={cn("relative w-full justify-between text-left", plan.popular && "ring-2 ring-amber-500")} key={plan.id}>
                {plan.popular && <Badge className="-translate-x-1/2 -translate-y-1/2 absolute top-0 left-1/2 rounded-full bg-amber-500">Popular</Badge>}
                <CardHeader>
                  <CardTitle className="font-medium text-xl">{plan.name}</CardTitle>
                  <CardDescription>
                    <p>{plan.description}</p>
                    {typeof price === "number" ? (
                      <NumberFlow
                        className="font-medium text-foreground"
                        format={{
                          style: "currency",
                          currency: "USD",
                          minimumFractionDigits: 0,
                        }}
                        suffix={frequency === "yearly" ? "/month" : "/month"}
                        value={price}
                      />
                    ) : (
                      <span className="font-medium text-foreground">{price}.</span>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-2">
                  {plan.features.map((feature, index) => (
                    <div className="flex items-center gap-2 text-muted-foreground text-sm" key={index}>
                      <BadgeCheck className="h-4 w-4" color={"green"} />
                      {feature}
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant={plan.popular ? "default" : "secondary"}>
                    {plan.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
          {/* Custom Plan Card */}
          <Card className="relative w-full justify-between text-left ring-2 ring-primary">
            <Badge className="-translate-x-1/2 -translate-y-1/2 absolute top-0 left-1/2 rounded-full">Custom Plan</Badge>
            <CardHeader>
              <CardTitle className="font-medium text-xl">Custom Plan</CardTitle>
              <CardDescription>
                <p>Select the plan that best fits your needs.</p>
                <Select
                  onValueChange={(value) => {
                    const selectedPlan = plans.find((p) => p.id === value);
                    if (selectedPlan && typeof selectedPlan.price[frequency as keyof typeof selectedPlan.price] === "number") {
                      // You might want to store the selected plan's price in a state.
                      // For now, just display it.
                    }
                  }}
                >
                  <SelectTrigger className="mt-2 w-full text-left">
                    <SelectValue placeholder="Select your plan" />
                  </SelectTrigger>
                  <SelectContent>
                    {plans.slice(3).map((plan) => (
                      <SelectItem className="text-left" key={plan.id} value={plan.id}>
                        {plan.name} -{" "}
                        {typeof plan.price[frequency as keyof typeof plan.price] === "number"
                          ? frequency === "yearly" // Removed .toFixed(2)
                            ? `$${plan.price[frequency as keyof typeof plan.price]}/month`
                            : `$${plan.price[frequency as keyof typeof plan.price]}/month`
                          : plan.price[frequency as keyof typeof plan.price]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {/* Display selected plan's price dynamically */}
                {/* This part would need state management to show the selected plan's price */}
                <span className="mt-2 block font-medium text-foreground">
                  {/* Placeholder for dynamic price display */}
                  {/* For example: {selectedCustomPlanPrice ? `$${selectedCustomPlanPrice.toFixed(2)}/month` : "Select a plan"} */}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <BadgeCheck className="h-4 w-4" color={"green"} /> Dashboard & Reporting
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <BadgeCheck className="h-4 w-4" color={"green"} /> Discover & List
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <BadgeCheck className="h-4 w-4" color={"green"} /> Catalog & Listings Management
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <BadgeCheck className="h-4 w-4" color={"green"} /> Orders & Auto Ordering
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <BadgeCheck className="h-4 w-4" color={"green"} /> Monitoring & Alerts
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <BadgeCheck className="h-4 w-4" color={"green"} /> Tracking Number Updates
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <BadgeCheck className="h-4 w-4" color={"green"} /> Learning Center
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <BadgeCheck className="h-4 w-4" color={"green"} /> Performance Reviews
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <BadgeCheck className="h-4 w-4" color={"green"} /> Dedicated Support
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="default">
                Get started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default Example;
