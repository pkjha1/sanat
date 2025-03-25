import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  HeartHandshake, 
  Landmark, 
  BookOpen, 
  Headphones, 
  GraduationCap, 
  Coffee, 
  DollarSign,
  CheckCircle2,
  CreditCard,
  Wallet,
  CalendarDays,
  Users,
} from 'lucide-react';

export function DonatePage() {
  const [donationAmount, setDonationAmount] = useState<number | ''>('');
  const [customAmount, setCustomAmount] = useState<number | ''>('');
  const [selectedFrequency, setSelectedFrequency] = useState<'one-time' | 'monthly'>('one-time');
  const [selectedCause, setSelectedCause] = useState<string>('general');
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleDonationClick = (amount: number) => {
    setDonationAmount(amount);
    setCustomAmount('');
  };
  
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setCustomAmount('');
      setDonationAmount('');
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        setCustomAmount(numValue);
        setDonationAmount(numValue);
      }
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setShowSuccess(false);
      setDonationAmount('');
      setCustomAmount('');
    }, 5000);
  };
  
  const causes = [
    { id: 'general', name: 'General Fund', icon: HeartHandshake, description: 'Support all our activities and initiatives for preserving Sanatan Dharma.' },
    { id: 'temples', name: 'Temple Preservation', icon: Landmark, description: 'Help restore and maintain ancient temples and spiritual sites.' },
    { id: 'books', name: 'Sacred Text Digitization', icon: BookOpen, description: 'Fund the digital preservation of rare sacred texts and manuscripts.' },
    { id: 'audiobooks', name: 'Audiobook Production', icon: Headphones, description: 'Support the creation of high-quality spiritual audiobooks.' },
    { id: 'education', name: 'Spiritual Education', icon: GraduationCap, description: 'Provide educational resources to schools and institutions.' },
  ];
  
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Support Our Mission</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your generous donation helps us preserve and share the timeless wisdom of Sanatan Dharma with the world.
          </p>
        </div>
        
        {showSuccess ? (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-6 pb-6 text-center">
              <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-green-700 mb-2">Thank You For Your Donation!</h2>
              <p className="text-green-600 mb-4">
                Your contribution of ${typeof donationAmount === 'number' ? donationAmount.toFixed(2) : '0.00'} has been received.
              </p>
              <p className="text-green-600">
                A receipt has been sent to your email address.
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Make a Donation</CardTitle>
              <CardDescription>Support our work with a one-time or recurring donation.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  {/* Donation Frequency */}
                  <div>
                    <Label className="mb-2 block">Donation Frequency</Label>
                    <Tabs defaultValue="one-time" onValueChange={(value) => setSelectedFrequency(value as 'one-time' | 'monthly')}>
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="one-time" className="gap-2">
                          <DollarSign className="h-4 w-4" />
                          One-time
                        </TabsTrigger>
                        <TabsTrigger value="monthly" className="gap-2">
                          <CalendarDays className="h-4 w-4" />
                          Monthly
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  
                  {/* Donation Cause */}
                  <div>
                    <Label className="mb-2 block">Select a Cause</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {causes.map((cause) => (
                        <div
                          key={cause.id}
                          className={`p-4 border rounded-md cursor-pointer transition-colors ${
                            selectedCause === cause.id
                              ? 'border-primary bg-primary/5'
                              : 'hover:border-primary/50'
                          }`}
                          onClick={() => setSelectedCause(cause.id)}
                        >
                          <div className="flex items-start gap-3">
                            <cause.icon className={`h-5 w-5 mt-0.5 ${
                              selectedCause === cause.id ? 'text-primary' : 'text-muted-foreground'
                            }`} />
                            <div>
                              <p className={`font-medium ${
                                selectedCause === cause.id ? 'text-primary' : ''
                              }`}>{cause.name}</p>
                              <p className="text-sm text-muted-foreground">{cause.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Donation Amount */}
                  <div>
                    <Label className="mb-2 block">Select Amount</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                      {[21, 51, 101, 251].map((amount) => (
                        <Button
                          key={amount}
                          type="button"
                          variant={donationAmount === amount ? 'default' : 'outline'}
                          className="h-16 text-lg"
                          onClick={() => handleDonationClick(amount)}
                        >
                          ${amount}
                        </Button>
                      ))}
                    </div>
                    
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input 
                        type="number"
                        placeholder="Custom Amount"
                        className="pl-10"
                        value={customAmount === '' ? '' : customAmount}
                        onChange={handleCustomAmountChange}
                      />
                    </div>
                  </div>
                  
                  {/* Payment Details */}
                  <div className="space-y-4 border-t pt-6 mt-6">
                    <h3 className="text-lg font-medium">Payment Details</h3>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label htmlFor="name">Name on Card</Label>
                        <Input id="name" placeholder="John Doe" required />
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="john@example.com" required />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="card">Card Information</Label>
                        <div className="rounded-md border px-3 py-2 bg-background focus-within:ring-1 focus-within:ring-primary">
                          <div className="flex items-center">
                            <CreditCard className="h-5 w-5 text-muted-foreground mr-2" />
                            <Input 
                              id="card" 
                              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0" 
                              placeholder="Card number"
                              required
                            />
                          </div>
                          <div className="flex mt-2">
                            <Input 
                              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0" 
                              placeholder="MM / YY"
                              required
                            />
                            <Input 
                              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 text-right" 
                              placeholder="CVC"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full mt-8 py-6 text-lg"
                  disabled={!donationAmount}
                >
                  {selectedFrequency === 'one-time' ? 'Donate' : 'Subscribe'} {donationAmount ? `$${typeof donationAmount === 'number' ? donationAmount.toFixed(2) : donationAmount}` : ''} {selectedFrequency === 'monthly' ? 'Monthly' : ''}
                </Button>
                
                <div className="mt-4 text-center text-xs text-muted-foreground flex justify-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span>Your payment information is secure and encrypted.</span>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>10,000+</CardTitle>
              <CardDescription>Donors supporting our mission</CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>500+</CardTitle>
              <CardDescription>Rare texts digitized and preserved</CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                <Landmark className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>25+</CardTitle>
              <CardDescription>Temple restoration projects funded</CardDescription>
            </CardHeader>
          </Card>
        </div>
        
        <div className="mt-12 text-center p-8 border rounded-lg bg-muted/30">
          <h3 className="text-xl font-medium mb-2">Questions about donating?</h3>
          <p className="text-muted-foreground mb-4">Reach out to our donor support team for assistance.</p>
          <Button variant="outline">Contact Donor Support</Button>
        </div>
      </div>
    </div>
  );
}