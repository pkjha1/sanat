"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is included in my subscription?",
    answer:
      "Your subscription provides access to our extensive library of spiritual content, including teachings, audiobooks, meditation guides, and more. The specific features depend on your chosen plan.",
  },
  {
    question: "How does billing work?",
    answer:
      "We offer both monthly and yearly billing cycles. With yearly billing, you save 15% compared to the monthly rate. Your subscription will automatically renew at the end of each billing period unless canceled.",
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer:
      "Yes, you can change your subscription plan at any time. When upgrading, you'll be charged the prorated difference. When downgrading, the new rate will apply at the start of your next billing cycle.",
  },
  {
    question: "How do I cancel my subscription?",
    answer:
      "You can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period, after which it will not renew.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Yes, we offer a 7-day free trial for new subscribers. You can explore all the features of your chosen plan during this period before being charged.",
  },
  {
    question: "Can I share my subscription with others?",
    answer:
      "Individual plans are for personal use only. If you want to share with family members, we recommend our Family plan, which allows up to 5 users under a single subscription.",
  },
]

export default function SubscriptionFAQ() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

