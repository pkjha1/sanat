"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Loader2 } from "lucide-react"

export default function ContactPage() {
  const { toast } = useToast()
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
      duration: 5000,
    })

    // Reset form after 2 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    }, 2000)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white pt-24 pb-16">
      <div className="container px-4 md:px-6">
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-5xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Get in Touch</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have questions about our teachings, events, or how to get involved? We're here to help you on your
              spiritual journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="col-span-1">
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-6">
                      <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                        <MapPin className="h-6 w-6 text-amber-600" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Visit Us</h3>
                      <p className="text-gray-600">
                        Blissful Life Ashram
                        <br />
                        123 Serenity Lane
                        <br />
                        Rishikesh, Uttarakhand 249201
                        <br />
                        India
                      </p>
                    </div>
                    <div className="mt-auto">
                      <Button variant="outline" className="w-full">
                        Get Directions
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="col-span-1">
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-6">
                      <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                        <Phone className="h-6 w-6 text-amber-600" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Call Us</h3>
                      <p className="text-gray-600 mb-2">
                        General Inquiries:
                        <br />
                        <a href="tel:+911234567890" className="text-amber-600 hover:underline">
                          +91 123 456 7890
                        </a>
                      </p>
                      <p className="text-gray-600">
                        Ashram Office:
                        <br />
                        <a href="tel:+911234567891" className="text-amber-600 hover:underline">
                          +91 123 456 7891
                        </a>
                      </p>
                    </div>
                    <div className="mt-auto">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>Available 9 AM - 6 PM IST</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="col-span-1">
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-6">
                      <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                        <Mail className="h-6 w-6 text-amber-600" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Email Us</h3>
                      <p className="text-gray-600 mb-2">
                        General Inquiries:
                        <br />
                        <a href="mailto:info@blissfullife.org" className="text-amber-600 hover:underline">
                          info@blissfullife.org
                        </a>
                      </p>
                      <p className="text-gray-600">
                        Support:
                        <br />
                        <a href="mailto:support@blissfullife.org" className="text-amber-600 hover:underline">
                          support@blissfullife.org
                        </a>
                      </p>
                    </div>
                    <div className="mt-auto">
                      <div className="text-sm text-gray-500">We typically respond within 24-48 hours</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <motion.div variants={itemVariants} className="lg:col-span-3">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center py-12"
                    >
                      <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle2 className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                      <p className="text-gray-600 text-center">
                        Thank you for reaching out. We'll get back to you as soon as possible.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">
                            Your Name
                          </label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="John Doe"
                            required
                            value={formState.name}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">
                            Email Address
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            required
                            value={formState.email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium">
                          Subject
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          placeholder="How can we help you?"
                          required
                          value={formState.subject}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">
                          Message
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Please provide details about your inquiry..."
                          rows={5}
                          required
                          value={formState.message}
                          onChange={handleChange}
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="lg:col-span-2">
              <Card className="h-full">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Meditation Retreat",
                        date: "June 15-20, 2023",
                        location: "Rishikesh Ashram",
                      },
                      {
                        title: "Bhagavad Gita Discourse",
                        date: "July 5, 2023",
                        location: "Online Webinar",
                      },
                      {
                        title: "Yoga & Wellness Workshop",
                        date: "July 22-23, 2023",
                        location: "Delhi Center",
                      },
                    ].map((event, index) => (
                      <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                        <h3 className="font-bold">{event.title}</h3>
                        <p className="text-sm text-gray-600">{event.date}</p>
                        <p className="text-sm text-gray-600">{event.location}</p>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-6">
                    View All Events
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="mt-12 bg-amber-50 rounded-xl p-6 border border-amber-100">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  question: "How can I join the Blissful Life community?",
                  answer:
                    "You can join our community by creating an account on our website, attending our events, or visiting our ashram in Rishikesh.",
                },
                {
                  question: "Are there opportunities to volunteer?",
                  answer:
                    "Yes, we welcome volunteers for various activities including event organization, content creation, and ashram maintenance. Please contact us for details.",
                },
                {
                  question: "Do you offer online courses?",
                  answer:
                    "Yes, we offer a variety of online courses on meditation, yoga, and spiritual teachings. Check our Teachings section for more information.",
                },
                {
                  question: "How can I support Blissful Life's mission?",
                  answer:
                    "You can support us through donations, volunteering, or by simply sharing our content with others who might benefit from it.",
                },
              ].map((faq, index) => (
                <div key={index}>
                  <h3 className="font-bold mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

