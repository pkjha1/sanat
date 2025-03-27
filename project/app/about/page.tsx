"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, BookOpen, Music, Map, Sparkles, Leaf, Globe, Sun, Moon, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function AboutPage() {
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState(0)

  // For animation purposes
  useEffect(() => {
    setMounted(true)
  }, [])

  // Auto-scroll animation for sections
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % 3)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  if (!mounted) return null

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <motion.header
        className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <motion.span
                className="inline-block font-bold text-xl"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Bliss
              </motion.span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/about" className="flex items-center text-sm font-medium text-amber-600">
                About
              </Link>
              <Link href="/contact" className="flex items-center text-sm font-medium text-muted-foreground">
                Contact
              </Link>
              <Link href="/books" className="flex items-center text-sm font-medium text-muted-foreground">
                Books
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Link href="/auth/login" passHref>
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup" passHref>
                <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                  Sign Up
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </motion.header>

      <main className="flex-1">
        {/* Hero Section */}
        <motion.div
          className="relative overflow-hidden bg-amber-100 py-16 md:py-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 z-0 opacity-20">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-amber-500"
                style={{
                  width: Math.random() * 50 + 10,
                  height: Math.random() * 50 + 10,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, Math.random() * 100 - 50],
                  x: [0, Math.random() * 100 - 50],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  duration: Math.random() * 10 + 10,
                }}
              />
            ))}
          </div>

          <div className="container relative z-10 max-w-5xl">
            <motion.div className="text-center space-y-6" variants={container} initial="hidden" animate="show">
              <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight" variants={item}>
                ABOUT BLISSFUL LIFE
              </motion.h1>

              <motion.p className="text-xl md:text-2xl font-medium text-amber-600" variants={item}>
                अनंत आनंद की यात्रा (The Journey to Infinite Bliss)
              </motion.p>

              <motion.p className="text-lg italic text-gray-600 max-w-2xl mx-auto" variants={item}>
                स्वस्ति अस्तु सर्वभूतानाम् – May all beings be at peace.
              </motion.p>

              <motion.div variants={item}>
                <motion.div
                  className="flex justify-center mt-8"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                >
                  <ChevronDown className="h-8 w-8 text-amber-600" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Introduction Section */}
        <section className="py-16 container max-w-4xl">
          <motion.div
            className="prose prose-lg max-w-none"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-xl leading-relaxed">
              Blissful Life is not just a platform; it is a <span className="text-amber-600 font-medium">दिव्य पथ</span>{" "}
              (divine path) guiding seekers towards <span className="text-amber-600 font-medium">आध्यात्मिक समृद्धि</span>{" "}
              (spiritual enrichment), self-realization, and eternal happiness. Rooted in the wisdom of Sanatan Dharma,
              it serves as a bridge between ancient sacred knowledge and the modern-day spiritual quest.
            </p>

            <p className="text-xl leading-relaxed">
              Under the guidance of Sadguru Riteshwarji Maharaj, Blissful Life offers a sanctuary where seekers can
              immerse themselves in <span className="text-amber-600 font-medium">शास्त्रज्ञान</span> (scriptural wisdom),{" "}
              <span className="text-amber-600 font-medium">ध्यान साधना</span> (meditative practices), and{" "}
              <span className="text-amber-600 font-medium">संस्कृतिक पुनरुत्थान</span> (cultural revival). This initiative is
              dedicated to awakening the dormant divinity within each soul, leading them toward{" "}
              <span className="text-amber-600 font-medium">अनंत आनंद</span> (infinite bliss).
            </p>
          </motion.div>
        </section>

        {/* Interactive Tabs Section */}
        <section className="py-12 bg-gradient-to-r from-amber-50 to-orange-50">
          <div className="container max-w-5xl">
            <Tabs defaultValue="mission" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="grid w-full max-w-md grid-cols-3">
                  <TabsTrigger
                    value="mission"
                    className={
                      activeSection === 0 ? "data-[state=active]:bg-amber-600 data-[state=active]:text-white" : ""
                    }
                    onClick={() => setActiveSection(0)}
                  >
                    <Leaf className="mr-2 h-4 w-4" />
                    Mission
                  </TabsTrigger>
                  <TabsTrigger
                    value="vision"
                    className={
                      activeSection === 1 ? "data-[state=active]:bg-amber-600 data-[state=active]:text-white" : ""
                    }
                    onClick={() => setActiveSection(1)}
                  >
                    <Globe className="mr-2 h-4 w-4" />
                    Vision
                  </TabsTrigger>
                  <TabsTrigger
                    value="values"
                    className={
                      activeSection === 2 ? "data-[state=active]:bg-amber-600 data-[state=active]:text-white" : ""
                    }
                    onClick={() => setActiveSection(2)}
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    Values
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="mission" className={activeSection === 0 ? "block" : "hidden"}>
                <motion.div
                  className="bg-white p-8 rounded-lg shadow-sm"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
                    <span className="mr-2">🌿</span> Our Mission –{" "}
                    <span className="text-amber-600">धर्मो रक्षति रक्षितः</span> (Dharma Protects Those Who Protect It)
                  </h2>

                  <p className="mb-6 text-lg">At Blissful Life, our mission is to:</p>

                  <motion.ul className="space-y-4" variants={container} initial="hidden" animate="show">
                    <motion.li
                      className="flex items-start bg-amber-50 p-4 rounded-md"
                      variants={item}
                      whileHover={{ scale: 1.02, backgroundColor: "#fef3c7" }}
                    >
                      <span className="text-green-600 mr-3 mt-1 flex-shrink-0">✅</span>
                      <span>Revive and spread Sanatan Dharma's eternal teachings.</span>
                    </motion.li>
                    <motion.li
                      className="flex items-start bg-amber-50 p-4 rounded-md"
                      variants={item}
                      whileHover={{ scale: 1.02, backgroundColor: "#fef3c7" }}
                    >
                      <span className="text-green-600 mr-3 mt-1 flex-shrink-0">✅</span>
                      <span>
                        Create a holistic platform for spiritual seekers through books, audio content, guided
                        meditation, and divine discourses.
                      </span>
                    </motion.li>
                    <motion.li
                      className="flex items-start bg-amber-50 p-4 rounded-md"
                      variants={item}
                      whileHover={{ scale: 1.02, backgroundColor: "#fef3c7" }}
                    >
                      <span className="text-green-600 mr-3 mt-1 flex-shrink-0">✅</span>
                      <span>Preserve and document ancient knowledge for future generations.</span>
                    </motion.li>
                    <motion.li
                      className="flex items-start bg-amber-50 p-4 rounded-md"
                      variants={item}
                      whileHover={{ scale: 1.02, backgroundColor: "#fef3c7" }}
                    >
                      <span className="text-green-600 mr-3 mt-1 flex-shrink-0">✅</span>
                      <span>Bridge the gap between material success and spiritual fulfillment.</span>
                    </motion.li>
                    <motion.li
                      className="flex items-start bg-amber-50 p-4 rounded-md"
                      variants={item}
                      whileHover={{ scale: 1.02, backgroundColor: "#fef3c7" }}
                    >
                      <span className="text-green-600 mr-3 mt-1 flex-shrink-0">✅</span>
                      <span>Make self-realization accessible to all, regardless of age, background, or beliefs.</span>
                    </motion.li>
                  </motion.ul>

                  <p className="mt-6 text-lg">
                    We firmly believe that <span className="text-amber-600 font-medium">धर्म</span> (righteousness),{" "}
                    <span className="text-amber-600 font-medium">ध्यान</span> (meditation), and{" "}
                    <span className="text-amber-600 font-medium">सेवा</span> (selfless service) form the foundation of a
                    truly blissful life.
                  </p>
                </motion.div>
              </TabsContent>

              <TabsContent value="vision" className={activeSection === 1 ? "block" : "hidden"}>
                <motion.div
                  className="bg-white p-8 rounded-lg shadow-sm"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
                    <span className="mr-2">🌏</span> Our Vision – <span className="text-amber-600">वसुधैव कुटुम्बकम्</span>{" "}
                    (The World is One Family)
                  </h2>

                  <p className="mb-8 text-lg">
                    We envision a world illuminated by wisdom, peace, and divine harmony, where every soul realizes its
                    true potential. Our long-term vision includes:
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      className="bg-amber-50 p-6 rounded-md shadow-sm border border-amber-100"
                      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    >
                      <h3 className="font-bold text-lg mb-3 flex items-center text-amber-800">
                        <BookOpen className="mr-2 h-5 w-5 text-amber-600" /> Spiritual Retreats
                      </h3>
                      <p>
                        Centers of holistic wellness where individuals can experience divine transformation through{" "}
                        <span className="text-amber-600 font-medium">योग</span> (yoga),{" "}
                        <span className="text-amber-600 font-medium">वेद अध्ययन</span> (Vedic studies), and{" "}
                        <span className="text-amber-600 font-medium">ध्यान</span> (meditation).
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-amber-50 p-6 rounded-md shadow-sm border border-amber-100"
                      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    >
                      <h3 className="font-bold text-lg mb-3 flex items-center text-amber-800">
                        <Music className="mr-2 h-5 w-5 text-amber-600" /> Digital Libraries
                      </h3>
                      <p>
                        Preserving sacred <span className="text-amber-600 font-medium">ग्रंथ</span> (scriptures),
                        discourses, and divine knowledge in an accessible format for all seekers.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-amber-50 p-6 rounded-md shadow-sm border border-amber-100"
                      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    >
                      <h3 className="font-bold text-lg mb-3 flex items-center text-amber-800">
                        <Sparkles className="mr-2 h-5 w-5 text-amber-600" /> Sanatan Universities
                      </h3>
                      <p>
                        Institutions where seekers can learn the depth of{" "}
                        <span className="text-amber-600 font-medium">श्रीमद्भगवद्गीता</span> (Bhagavad Gita),{" "}
                        <span className="text-amber-600 font-medium">वेद</span> (Vedas),{" "}
                        <span className="text-amber-600 font-medium">उपनिषद</span> (Upanishads),{" "}
                        <span className="text-amber-600 font-medium">रामायण</span> (Ramayana), and{" "}
                        <span className="text-amber-600 font-medium">महाभारत</span> (Mahabharata).
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-amber-50 p-6 rounded-md shadow-sm border border-amber-100"
                      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    >
                      <h3 className="font-bold text-lg mb-3 flex items-center text-amber-800">
                        <Map className="mr-2 h-5 w-5 text-amber-600" /> Sattvic Lifestyle
                      </h3>
                      <p>
                        Educating people on <span className="text-amber-600 font-medium">आयुर्वेद</span> (Ayurveda),{" "}
                        <span className="text-amber-600 font-medium">वैदिक ज्योतिष</span> (Vedic astrology),{" "}
                        <span className="text-amber-600 font-medium">संकीर्तन</span> (devotional chanting), and{" "}
                        <span className="text-amber-600 font-medium">यज्ञ</span> (sacred fire rituals).
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="values" className={activeSection === 2 ? "block" : "hidden"}>
                <motion.div
                  className="bg-white p-8 rounded-lg shadow-sm"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
                    <span className="mr-2">💫</span> Our Values – <span className="text-amber-600">सत्यं शिवं सुन्दरम्</span>{" "}
                    (Truth, Goodness, Beauty)
                  </h2>

                  <p className="mb-8 text-lg">
                    Our values are deeply rooted in the timeless principles of Sanatan Dharma, guiding every aspect of
                    our work:
                  </p>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-lg font-medium">
                        <span className="flex items-center">
                          <Sun className="mr-2 h-5 w-5 text-amber-600" />
                          <span>सत्य (Truth) - Commitment to Authenticity</span>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-base">
                        <p className="mb-4">
                          We are committed to presenting the teachings of Sanatan Dharma in their purest form, without
                          dilution or distortion. Our content is thoroughly researched and verified by scholars and
                          spiritual masters.
                        </p>
                        <div className="pl-4 border-l-2 border-amber-200 italic">
                          "सत्यमेव जयते" - Truth alone triumphs
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-lg font-medium">
                        <span className="flex items-center">
                          <Heart className="mr-2 h-5 w-5 text-amber-600" />
                          <span>करुणा (Compassion) - Service with Love</span>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-base">
                        <p className="mb-4">
                          Every initiative at Blissful Life is driven by compassion and a genuine desire to alleviate
                          suffering. We believe in serving humanity with love and kindness, recognizing the divine in
                          every being.
                        </p>
                        <div className="pl-4 border-l-2 border-amber-200 italic">
                          "परोपकाराय सतां विभूतयः" - The wealth of the noble is used for the benefit of others
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-lg font-medium">
                        <span className="flex items-center">
                          <Moon className="mr-2 h-5 w-5 text-amber-600" />
                          <span>शांति (Peace) - Inner Harmony</span>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-base">
                        <p className="mb-4">
                          We promote practices that cultivate inner peace and harmony. Through meditation, mindfulness,
                          and spiritual disciplines, we guide seekers toward a state of tranquility that transcends
                          external circumstances.
                        </p>
                        <div className="pl-4 border-l-2 border-amber-200 italic">
                          "ॐ शांतिः शांतिः शांतिः" - Peace in the mind, speech, and environment
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Join Us Section */}
        <section className="py-16 container max-w-4xl">
          <motion.div
            className="text-center space-y-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold">Join Our Spiritual Journey</h2>
            <p className="text-lg max-w-2xl mx-auto">
              Embark on a transformative journey with us. Subscribe to our newsletter, participate in our events, and
              become part of a community dedicated to spiritual growth and self-realization.
            </p>
            <div className="pt-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-6 text-lg h-auto">
                  Start Your Journey
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 bg-amber-50">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2023 Blissful Life. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="text-sm text-amber-600">
              About
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground">
              Contact
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

