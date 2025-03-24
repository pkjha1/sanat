import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { BookOpen, BookText, Headphones, Video, Bot as Lotus, CheckCircle2, XCircle, Calendar, DollarSign, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { useSubscription } from '@/hooks/use-subscription';
import { supabase } from '@/lib/supabase';
import { format } from 'date-fns';

export function SubscriptionPage() {
  const { user } = useAuth();
  const location = useLocation();
  const [plans, setPlans] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { subscription, isLoading: isSubscriptionLoading } = useSubscription(user?.id);
  
  // Get the module param from the location state (if user was redirected here)
  const requestedModule = location.state?.module;

  useEffect(() => {
    async function fetchSubscriptionPlans() {
      try {
        const { data, error } = await supabase
          .from('subscription_plans')
          .select('*')
          .eq('is_active', true)
          .order('price');
        
        if (error) {
          throw error;
        }
        
        setPlans(data || []);
      } catch (error) {
        console.error('Error fetching subscription plans:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchSubscriptionPlans();
  }, []);
  
  const hasActiveSubscription = subscription !== null;
  
  const handleSubscribe = async (planId: string) => {
    try {
      if (!user) {
        alert('You must be logged in to subscribe');
        return;
      }
      
      // In a real app, this would redirect to a payment gateway
      // For demo purposes, we'll create a subscription directly
      
      // Calculate end date (30 days from now)
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 30);
      
      const { data, error } = await supabase
        .from('user_subscriptions')
        .insert({
          user_id: user.id,
          subscription_plan_id: planId,
          status: 'active',
          start_date: startDate.toISOString(),
          end_date: endDate.toISOString(),
          auto_renew: true
        })
        .select();
      
      if (error) {
        throw error;
      }
      
      // Reload the page to show updated subscription status
      window.location.reload();
      
    } catch (error) {
      console.error('Error creating subscription:', error);
      alert('There was an error processing your subscription. Please try again.');
    }
  };
  
  const getModuleIcon = (module: string) => {
    switch (module) {
      case 'books':
        return <BookOpen className="h-4 w-4" />;
      case 'teachings':
        return <Video className="h-4 w-4" />;
      case 'audiobooks':
        return <Headphones className="h-4 w-4" />;
      case 'stories':
        return <BookText className="h-4 w-4" />;
      case 'meditation':
        return <Lotus className="h-4 w-4" />;
      default:
        return <CheckCircle2 className="h-4 w-4" />;
    }
  };
  
  const isLoaded = !isLoading && !isSubscriptionLoading;
  
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Subscription</h1>
        <p className="text-muted-foreground">
          Manage your subscription to access premium content
        </p>
      </header>
      
      {!isLoaded ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin h-8 w-8 border-b-2 border-primary rounded-full"></div>
        </div>
      ) : (
        <>
          {requestedModule && !hasActiveSubscription && (
            <Card className="bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-800">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-amber-200 p-2 dark:bg-amber-800">
                    <span className="text-amber-700 dark:text-amber-200">
                      {getModuleIcon(requestedModule)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-amber-800 dark:text-amber-200">
                      Subscription Required
                    </h3>
                    <p className="text-amber-700 dark:text-amber-300 text-sm">
                      You need a subscription that includes the {requestedModule} module to access this content.
                      Choose a plan below to gain access.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Current Subscription Status */}
          {hasActiveSubscription ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Your Active Subscription</CardTitle>
                    <CardDescription>
                      {subscription.subscription_plan.name} Plan
                    </CardDescription>
                  </div>
                  <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="border rounded-md p-4">
                    <div className="text-sm font-medium flex items-center gap-2 text-muted-foreground mb-1">
                      <DollarSign className="h-4 w-4" />
                      <span>Subscription Cost</span>
                    </div>
                    <div className="text-2xl font-bold">
                      ${subscription.subscription_plan.price.toFixed(2)}/month
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <div className="text-sm font-medium flex items-center gap-2 text-muted-foreground mb-1">
                      <Calendar className="h-4 w-4" />
                      <span>Renewal Date</span>
                    </div>
                    <div className="text-lg font-bold">
                      {format(new Date(subscription.end_date), 'MMMM d, yyyy')}
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <div className="text-sm font-medium flex items-center gap-2 text-muted-foreground mb-1">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Auto-Renewal</span>
                    </div>
                    <div className="text-lg font-bold">
                      {subscription.auto_renew ? 'Enabled' : 'Disabled'}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 mt-6">
                  <h3 className="font-medium">Included Content Access:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {['books', 'teachings', 'audiobooks', 'stories', 'meditation'].map((module) => {
                      const hasAccess = subscription.subscription_plan.modules.includes(module);
                      return (
                        <div 
                          key={module} 
                          className={`flex items-center gap-2 p-2 rounded-md ${
                            hasAccess 
                              ? 'bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-400' 
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {hasAccess ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : (
                            <XCircle className="h-4 w-4" />
                          )}
                          <span className="capitalize">{module}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-4">
                <Button variant="outline">
                  Cancel Subscription
                </Button>
                <Button>
                  Manage Payment Details
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Choose a Subscription Plan</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <Card key={plan.id} className="flex flex-col h-full">
                    <CardHeader>
                      <CardTitle>{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                      <div className="mt-2">
                        <span className="text-3xl font-bold">${plan.price.toFixed(2)}</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <h4 className="font-medium mb-2">Included Content:</h4>
                      <ul className="space-y-2">
                        {['books', 'teachings', 'audiobooks', 'stories', 'meditation'].map((module) => {
                          const hasAccess = plan.modules.includes(module);
                          return (
                            <li 
                              key={module}
                              className={`flex items-center gap-2 ${!hasAccess && 'text-muted-foreground'}`}
                            >
                              {hasAccess ? (
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                              ) : (
                                <XCircle className="h-4 w-4 text-muted-foreground" />
                              )}
                              <span className="capitalize">{module}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full gap-2"
                        onClick={() => handleSubscribe(plan.id)}
                      >
                        Subscribe
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}