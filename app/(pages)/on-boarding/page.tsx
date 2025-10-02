"use client";

import { AlertTriangle, Briefcase, Check, ChevronLeft, ChevronRight, Factory, Globe, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const steps = [
  {
    id: 1,
    title: "Account Type",
    description: "Select your account type",
  },
  {
    id: 2,
    title: "Account Info",
    description: "Setup your account settings",
  },
  {
    id: 3,
    title: "Business Details",
    description: "Setup your business details",
  },
  {
    id: 4,
    title: "Billing Details",
    description: "Provide your payment info",
  },
  {
    id: 5,
    title: "Completed",
    description: "Your account is created",
  },
];

export default function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    accountType: "corporate",
    teamSize: "10-50",
    teamName: "",
    accountPlan: "developer",
    companyName: "",
    industry: "",
    website: "",
    nameOnCard: "Max Doe",
    cardNumber: "4111 1111 1111 1111",
    expirationMonth: "",
    expirationYear: "",
    cvv: "",
    saveCard: true,
  });

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <CardHeader className="px-0 pt-0">
              <CardTitle>Choose Account Type</CardTitle>
              <CardDescription>
                If you need more info, please check out{" "}
                <Link className="text-purple-600 hover:underline" href="#">
                  Help Page
                </Link>
                .
              </CardDescription>
            </CardHeader>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Card
                className={cn(
                  "cursor-pointer transition-all",
                  formData.accountType === "personal" ? "border-purple-500 bg-muted ring-2 ring-purple-500" : "border-gray-200 hover:shadow-md"
                )}
                onClick={() => updateFormData("accountType", "personal")}
              >
                <CardContent className="flex items-start space-x-4 p-6">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                      <User className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-muted-foreground">Personal Account</h3>
                    <p className="text-muted-foreground text-sm">If you need more info, please check it out</p>
                  </div>
                </CardContent>
              </Card>

              <Card
                className={cn(
                  "cursor-pointer transition-all",
                  formData.accountType === "corporate" ? "border-purple-500 bg-muted ring-2 ring-purple-500" : "border-gray-200 hover:shadow-md"
                )}
                onClick={() => updateFormData("accountType", "corporate")}
              >
                <CardContent className="flex items-start space-x-4 p-6">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                      <Briefcase className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-muted-foreground">Corporate Account</h3>
                    <p className="text-muted-foreground text-sm">Create corporate account to manage users</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <CardHeader className="px-0 pt-0">
              <CardTitle>Account Info</CardTitle>
              <CardDescription>
                If you need more info, please check out{" "}
                <Link className="text-purple-600 hover:underline" href="#">
                  Help Page
                </Link>
                .
              </CardDescription>
            </CardHeader>

            <div className="space-y-6">
              <div>
                <Label className="mb-4 block text-base">Specify Team Size</Label>
                <div className="grid grid-cols-4 gap-3">
                  {["1-1", "2-10", "10-50", "50+"].map((size) => (
                    <button
                      className={cn(
                        "rounded-lg border-2 p-4 text-center transition-all",
                        formData.teamSize === size ? "border-purple-500 bg-muted ring-2 ring-purple-500" : "border-gray-200 text-gray-700 hover:border-gray-300"
                      )}
                      key={size}
                      onClick={() => updateFormData("teamSize", size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-gray-500 text-sm">Customers will see this shortened version of your statement descriptor</p>
              </div>

              <div>
                <Label className="text-base" htmlFor="teamName">
                  Team Account Name
                </Label>
                <Input className="mt-2" id="teamName" onChange={(e) => updateFormData("teamName", e.target.value)} value={formData.teamName} />
              </div>

              <div>
                <Label className="mb-4 block text-base">Select Account Plan</Label>
                <RadioGroup className="space-y-3" onValueChange={(value) => updateFormData("accountPlan", value)} value={formData.accountPlan}>
                  <div className="flex items-center space-x-3 rounded-lg border p-4">
                    <Factory className="h-6 w-6 text-gray-400" />
                    <div className="flex-1">
                      <div className="font-medium">Company Account</div>
                      <div className="text-gray-500 text-sm">Use images to enhance your post flow</div>
                    </div>
                    <RadioGroupItem value="company" />
                  </div>
                  <div className="flex items-center space-x-3 rounded-lg border p-4">
                    <User className="h-6 w-6 text-gray-400" />
                    <div className="flex-1">
                      <div className="font-medium">Developer Account</div>
                      <div className="text-gray-500 text-sm">Use images to your post time</div>
                    </div>
                    <RadioGroupItem value="developer" />
                  </div>
                  <div className="flex items-center space-x-3 rounded-lg border p-4">
                    <Globe className="h-6 w-6 text-gray-400" />
                    <div className="flex-1">
                      <div className="font-medium">Testing Account</div>
                      <div className="text-gray-500 text-sm">Use images to enhance time travel rivers</div>
                    </div>
                    <RadioGroupItem value="testing" />
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <CardHeader className="px-0 pt-0">
              <CardTitle>Business Details</CardTitle>
              <CardDescription>
                If you need more info, please check out{" "}
                <Link className="text-purple-600 hover:underline" href="#">
                  Help Page
                </Link>
                .
              </CardDescription>
            </CardHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  className="mt-2"
                  id="companyName"
                  onChange={(e) => updateFormData("companyName", e.target.value)}
                  placeholder="Enter your company name"
                  value={formData.companyName}
                />
              </div>
              <div>
                <Label htmlFor="industry">Industry</Label>
                <Select onValueChange={(value) => updateFormData("industry", value)} value={formData.industry}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  className="mt-2"
                  id="website"
                  onChange={(e) => updateFormData("website", e.target.value)}
                  placeholder="https://yourcompany.com"
                  value={formData.website}
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <CardHeader className="px-0 pt-0">
              <CardTitle>Billing Details</CardTitle>
              <CardDescription>
                If you need more info, please check out{" "}
                <Link className="text-purple-600 hover:underline" href="#">
                  Help Page
                </Link>
                .
              </CardDescription>
            </CardHeader>

            <div className="space-y-6">
              <div>
                <Label className="font-medium text-base" htmlFor="nameOnCard">
                  Name On Card <span className="text-red-500">*</span>
                </Label>
                <Input className="mt-2" id="nameOnCard" onChange={(e) => updateFormData("nameOnCard", e.target.value)} value={formData.nameOnCard} />
              </div>

              <div>
                <Label className="font-medium text-base" htmlFor="cardNumber">
                  Card Number <span className="text-red-500">*</span>
                </Label>
                <div className="relative mt-2">
                  <Input className="pr-20" id="cardNumber" onChange={(e) => updateFormData("cardNumber", e.target.value)} value={formData.cardNumber} />
                  <div className="-translate-y-1/2 absolute top-1/2 right-3 flex transform space-x-1">
                    <div className="flex h-5 w-8 items-center justify-center rounded bg-blue-600 font-bold text-white text-xs">VISA</div>
                    <div className="h-5 w-8 rounded bg-red-500" />
                    <div className="h-5 w-8 rounded bg-blue-400" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-medium text-base">
                    Expiration Date <span className="text-red-500">*</span>
                  </Label>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <Select onValueChange={(value) => updateFormData("expirationMonth", value || "")} value={formData.expirationMonth || undefined}>
                      <SelectTrigger>
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => (
                          <SelectItem key={i + 1} value={String(i + 1).padStart(2, "0")}>
                            {String(i + 1).padStart(2, "0")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select onValueChange={(value) => updateFormData("expirationYear", value || "")} value={formData.expirationYear || undefined}>
                      <SelectTrigger>
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 10 }, (_, i) => (
                          <SelectItem key={2024 + i} value={String(2024 + i)}>
                            {2024 + i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label className="font-medium text-base" htmlFor="cvv">
                    CVV <span className="text-red-500">*</span>
                  </Label>
                  <Input className="mt-2" id="cvv" onChange={(e) => updateFormData("cvv", e.target.value)} placeholder="CVV" value={formData.cvv} />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Save Card for further billing?</div>
                  <div className="text-gray-500 text-sm">If you need more info, please check budget planning</div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch checked={formData.saveCard} onCheckedChange={(checked) => updateFormData("saveCard", checked)} />
                  <span className="text-gray-600 text-sm">Save Card</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <CardHeader className="px-0 pt-0">
              <CardTitle>Your Are Done!</CardTitle>
              <CardDescription>
                If you need more info, please{" "}
                <Link className="text-purple-600 hover:underline" href="#">
                  Sign In
                </Link>
                .
              </CardDescription>
            </CardHeader>

            <div className="space-y-4">
              <p className="text-gray-700">
                Writing headlines for blog posts is as much an art as it is a science and probably warrants its own post, but for all advise is with what works
                for your great & amazing audience.
              </p>

              <Alert className="border-yellow-200 bg-yellow-50">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-800">
                  <strong>We need your attention!</strong>
                  <br />
                  To start using great tools, please,{" "}
                  <Link className="font-medium text-purple-600 hover:underline" href="#">
                    Create Team Platform
                  </Link>
                </AlertDescription>
              </Alert>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader className="pb-0">
          {/* Step Indicator */}
          <div className="mb-6 flex items-center justify-between">
            {steps.map((step) => (
              <div className="relative flex flex-1 flex-col items-center" key={step.id}>
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full font-semibold text-sm transition-colors duration-300",
                    currentStep > step.id ? "bg-purple-600 text-white" : currentStep === step.id ? "bg-purple-500 text-white" : "bg-gray-200 text-gray-600"
                  )}
                >
                  {currentStep > step.id ? <Check className="h-5 w-5" /> : step.id}
                </div>
                <div className={cn("mt-2 text-center font-medium text-sm", currentStep >= step.id ? "text-gray-800" : "text-gray-500")}>{step.title}</div>
                {step.id < steps.length && (
                  <div
                    className={cn(
                      "-translate-y-1/2 absolute top-5 left-[calc(50%+20px)] h-0.5 w-[calc(100%-40px)] bg-gray-200 transition-colors duration-300",
                      currentStep > step.id && "bg-purple-400"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </CardHeader>

        <CardContent className="p-6 md:p-8">
          {renderStepContent()}

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between border-t pt-6">
            <Button disabled={currentStep === 1} onClick={handlePrevious} variant="outline">
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </Button>

            {currentStep < 5 ? (
              <Button onClick={handleNext}>
                <span>{currentStep === 4 ? "Submit" : "Continue"}</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
