"use client";

import { ArrowRight, SearchIcon } from "lucide-react";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

type FAQAccordionProps = {
  items: FAQItem[];
};

export const FAQ = ({ items }: FAQAccordionProps) => {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <Accordion className="space-y-4" collapsible type="single">
        {items.map((item) => (
          <AccordionItem
            className="rounded-lg border border-border bg-card px-4 shadow-sm transition-shadow duration-200 hover:shadow-md"
            key={item.id}
            value={item.id}
          >
            <AccordionTrigger className="py-4 text-left font-medium text-lg hover:no-underline">{item.question}</AccordionTrigger>
            <AccordionContent className="pb-6 text-base text-muted-foreground leading-relaxed">{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

type HelpCenterCardProps = {
  title: string;
  description: string;
  linkText: string;
  href: string;
};

export const ListItem = ({ title, description, linkText, href }: HelpCenterCardProps) => {
  return (
    <Card className="h-full border-border bg-card pb-0 transition-shadow duration-200 hover:shadow-lg">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex h-full flex-col border-t py-3">
        <Link className="group flex items-center justify-between font-medium text-link transition-colors duration-200 hover:underline" href={href}>
          {linkText}
          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </CardContent>
    </Card>
  );
};

export const Search = () => {
  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
        <SearchIcon className="size-5 text-muted-foreground" />
      </div>
      <Input
        className="h-14 rounded-full border-search-border bg-background pl-12 text-base text-hero-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-hero-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-hero"
        placeholder="Enter a question, topic or keyword"
        type="text"
      />
    </div>
  );
};

const faqItems = [
  {
    id: "trial",
    question: "Is there a 14-days trial?",
    answer:
      "Yes, we offer a 14-day free trial for all new users. You can access all premium features during this period without any limitations. No credit card required to start your trial.",
  },
  {
    id: "premium",
    question: "What's the benefits of the Premium Membership?",
    answer:
      "Premium members get access to advanced features, priority support, unlimited usage, exclusive content, and early access to new features. You also get dedicated account management and custom integrations.",
  },
  {
    id: "billing",
    question: "How does billing work?",
    answer:
      "We offer flexible billing options including monthly and annual plans. Annual subscribers get a 20% discount. All plans include a 30-day money-back guarantee.",
  },
  {
    id: "support",
    question: "What kind of support do you offer?",
    answer:
      "We provide 24/7 email support for all users, live chat for premium members, and dedicated phone support for enterprise customers. Our average response time is under 2 hours.",
  },
];

export default function HelpCenterPage() {
  return (
    <div>
      <div className="relative bg-muted">
        <div className="relative mx-auto h-full px-4 py-16 md:py-24">
          <div className="mb-12 text-center">
            <h1 className="mb-6 font-bold text-4xl leading-tight md:text-5xl">How can we help you today?</h1>
            <p className="mx-auto max-w-3xl text-balance text-lg text-muted-foreground leading-relaxed">
              Search for a topic or question, check out our FAQs and guides, contact us for detailed support
            </p>
          </div>

          <div className="mb-16">
            <Search />
          </div>

          <div className="-mb-36 mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
            <ListItem description="Frequently asked questions and answers" href="#faqs" linkText="Go to FAQs" title="FAQs" />
            <ListItem description="Articles and resources to guide you" href="/guides" linkText="Check guides" title="Guides" />
            <ListItem description="Contact us for more detailed support" href="/contact" linkText="Contact us" title="Support" />
          </div>
        </div>
      </div>

      <div className="bg-faq py-16 md:py-32" id="faqs">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-bold text-2xl text-foreground md:text-3xl">Most frequently asked questions</h2>
            <p className="mx-auto max-w-3xl text-muted-foreground">Here are the most frequently asked questions you may check before getting started</p>
          </div>

          <FAQ items={faqItems} />
        </div>
      </div>
    </div>
  );
}
