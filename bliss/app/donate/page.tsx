"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Check, Heart, Info, Landmark, Repeat, Zap } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

export default function DonatePage() {
  const { toast } = useToast()
  const [donationAmount, setDonationAmount] = useState<number | string>(1000)
  const [customAmount, setCustomAmount] = useState("")
  const [isRecurring, setIsRecurring] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [progress, setProgress] = useState(65)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedCause, setSelectedCause] = useState("education")

  // Animate progress bar on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(65)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Donation Successful!",
        description: `Thank you for your ${isRecurring ? "monthly" : "one-time"} donation of ₹${donationAmount}.`,
        variant: "default",
      })
    }, 1500)
  }

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === "") {
      setCustomAmount("")
      setDonationAmount("")
    } else {
      const numericValue = value.replace(/[^0-9]/g, "")
      setCustomAmount(numericValue)
      setDonationAmount(Number.parseInt(numericValue, 10))
    }
  }

  const handlePresetAmount = (amount: number) => {
    setDonationAmount(amount)
    setCustomAmount("")
  }

  const causes = [
    {
      id: "education",
      title: "Education",
      description: "Support educational programs and resources",
      icon: <Zap className="h-5 w-5" />,
      raised: "₹3,45,000",
      goal: "₹5,00,000",
      percent: 69,
    },
    {
      id: "temples",
      title: "Temple Preservation",
      description: "Help preserve ancient temples and heritage sites",
      icon: <Landmark className="h-5 w-5" />,
      raised: "₹2,75,000",
      goal: "₹4,00,000",
      percent: 68,
    },
    {
      id: "community",
      title: "Community Programs",
      description: "Fund community outreach and support programs",
      icon: <Heart className="h-5 w-5" />,
      raised: "₹1,25,000",
      goal: "₹2,50,000",
      percent: 50,
    },
  ]

  const selectedCauseData = causes.find((cause) => cause.id === selectedCause)

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-amber-500 to-amber-600 text-white">
              <CardTitle className="text-2xl md:text-3xl">Make a Donation</CardTitle>
              <CardDescription className="text-amber-100">Your contribution makes a difference</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleDonationSubmit}>
                <div className="space-y-6">
                  <div>
                    <Label className="text-base font-medium">Select a Cause</Label>
                    <div className="mt-3 grid gap-3 md:grid-cols-3">
                      {causes.map((cause) => (
                        <Card
                          key={cause.id}
                          className={`cursor-pointer transition-all hover:border-amber-500 ${selectedCause === cause.id ? "border-2 border-amber-500 bg-amber-50" : ""}`}
                          onClick={() => setSelectedCause(cause.id)}
                        >
                          <CardContent className="p-4 text-center">
                            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                              {cause.icon}
                            </div>
                            <h3 className="font-medium">{cause.title}</h3>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-medium">Choose Amount</Label>
                    <div className="mt-3 grid grid-cols-3 gap-3 md:grid-cols-6">
                      {[100, 500, 1000, 2000, 5000].map((amount) => (
                        <Button
                          key={amount}
                          type="button"
                          variant={donationAmount === amount ? "default" : "outline"}
                          className={donationAmount === amount ? "bg-amber-600 hover:bg-amber-700" : ""}
                          onClick={() => handlePresetAmount(amount)}
                        >
                          ₹{amount}
                        </Button>
                      ))}
                      <div className="col-span-3 md:col-span-1">
                        <Input
                          type="text"
                          placeholder="Custom"
                          value={customAmount}
                          onChange={handleCustomAmountChange}
                          className="h-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="recurring" checked={isRecurring} onCheckedChange={setIsRecurring} />
                    <Label htmlFor="recurring" className="flex items-center gap-1.5">
                      <Repeat className="h-4 w-4" />
                      Make this a monthly donation
                    </Label>
                  </div>

                  <div>
                    <Label className="text-base font-medium">Payment Method</Label>
                    <Tabs defaultValue="card" className="mt-3" onValueChange={setPaymentMethod}>
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="card">Credit Card</TabsTrigger>
                        <TabsTrigger value="upi">UPI</TabsTrigger>
                        <TabsTrigger value="netbanking">Net Banking</TabsTrigger>
                      </TabsList>
                      <TabsContent value="card" className="space-y-4 pt-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="name">Name on Card</Label>
                            <Input id="name" placeholder="John Doe" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="card">Card Number</Label>
                            <Input id="card" placeholder="4242 4242 4242 4242" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input id="expiry" placeholder="MM/YY" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvc">CVC</Label>
                            <Input id="cvc" placeholder="123" />
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="upi" className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <Label htmlFor="upi">UPI ID</Label>
                          <Input id="upi" placeholder="yourname@upi" />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                          {["Google Pay", "PhonePe", "Paytm", "BHIM"].map((app) => (
                            <Card key={app} className="cursor-pointer text-center hover:border-amber-500">
                              <CardContent className="p-4">
                                <div className="mx-auto mb-2 h-12 w-12 rounded-full bg-gray-100"></div>
                                <p className="text-xs">{app}</p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </TabsContent>
                      <TabsContent value="netbanking" className="space-y-4 pt-4">
                        <RadioGroup defaultValue="sbi">
                          {[
                            { id: "sbi", name: "State Bank of India" },
                            { id: "hdfc", name: "HDFC Bank" },
                            { id: "icici", name: "ICICI Bank" },
                            { id: "axis", name: "Axis Bank" },
                          ].map((bank) => (
                            <div key={bank.id} className="flex items-center space-x-2">
                              <RadioGroupItem value={bank.id} id={bank.id} />
                              <Label htmlFor={bank.id}>{bank.name}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="mt-6 w-full bg-amber-600 hover:bg-amber-700"
                  disabled={isSubmitting || !donationAmount}
                >
                  {isSubmitting ? (
                    <>Processing...</>
                  ) : (
                    <>
                      Donate ₹{donationAmount} {isRecurring && "Monthly"}
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="bg-muted/50 px-6 py-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <Info className="mr-2 h-4 w-4" />
                Your donation is eligible for tax exemption under Section 80G
              </div>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Campaign Progress</CardTitle>
              <CardDescription>Help us reach our goal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {selectedCauseData && (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{selectedCauseData.title}</span>
                    <span className="text-sm text-muted-foreground">
                      {selectedCauseData.raised} of {selectedCauseData.goal}
                    </span>
                  </div>
                  <Progress value={selectedCauseData.percent} className="h-2" />
                </div>
              )}

              <div className="rounded-lg bg-muted p-4">
                <h3 className="mb-2 font-semibold">Your Impact</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-green-500" />
                    <span className="text-sm">₹500 provides educational materials for 5 children</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-green-500" />
                    <span className="text-sm">₹1,000 helps preserve ancient manuscripts</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-green-500" />
                    <span className="text-sm">₹2,000 supports a community program for a week</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Donors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Rahul S.", amount: "₹2,000", time: "2 hours ago" },
                  { name: "Priya M.", amount: "₹5,000", time: "5 hours ago" },
                  { name: "Anonymous", amount: "₹1,000", time: "1 day ago" },
                  { name: "Vikram J.", amount: "₹10,000", time: "2 days ago" },
                ].map((donor, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                        <Heart className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{donor.name}</p>
                        <p className="text-xs text-muted-foreground">{donor.time}</p>
                      </div>
                    </div>
                    <p className="font-medium">{donor.amount}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Separator className="my-12" />

      <motion.div
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="lg:col-span-2">
          <h2 className="mb-6 text-2xl font-bold">How Your Donation Helps</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Education",
                description: "Provides educational resources, scholarships, and learning materials",
                icon: <Zap className="h-6 w-6" />,
              },
              {
                title: "Preservation",
                description: "Helps preserve ancient texts, temples, and cultural heritage",
                icon: <Landmark className="h-6 w-6" />,
              },
              {
                title: "Community",
                description: "Supports community programs, events, and outreach initiatives",
                icon: <Heart className="h-6 w-6" />,
              },
            ].map((item, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                    {item.icon}
                  </div>
                  <h3 className="mb-2 text-lg font-medium">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Testimonials</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  quote: "The educational programs supported by these donations have transformed our village school.",
                  author: "Rajesh K., Headmaster",
                },
                {
                  quote:
                    "Thanks to the preservation efforts, our ancient temple manuscripts are now digitized and accessible.",
                  author: "Dr. Meena S., Historian",
                },
                {
                  quote: "The community programs have brought people together and revived our cultural traditions.",
                  author: "Anita P., Community Leader",
                },
              ].map((testimonial, index) => (
                <div key={index} className="rounded-lg bg-muted p-4">
                  <p className="mb-2 italic text-sm">"{testimonial.quote}"</p>
                  <p className="text-right text-xs font-medium">— {testimonial.author}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="mt-12 text-center">
        <p className="text-sm text-muted-foreground">
          For large donations or corporate partnerships, please contact us at{" "}
          <a href="mailto:donations@example.com" className="text-amber-600 hover:underline">
            donations@example.com
          </a>
        </p>
      </div>
    </div>
  )
}

