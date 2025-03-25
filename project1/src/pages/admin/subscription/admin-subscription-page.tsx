import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { format } from 'date-fns';
import { supabase } from '@/lib/supabase';
import {
  Users,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  Filter,
  Search,
  ArrowUpDown,
  MoreHorizontal,
  DollarSign
} from 'lucide-react';

export function AdminSubscriptionPage() {
  const [plans, setPlans] = useState<any[]>([]);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'plans' | 'subscriptions'>('plans');
  const [isEditingPlan, setIsEditingPlan] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<any>(null);
  
  // Form state for plan editing
  const [planName, setPlanName] = useState('');
  const [planDescription, setPlanDescription] = useState('');
  const [planPrice, setPlanPrice] = useState('');
  const [planDuration, setPlanDuration] = useState('30');
  const [modules, setModules] = useState({
    books: false,
    teachings: false,
    audiobooks: false,
    stories: false,
    meditation: false
  });
  const [isActive, setIsActive] = useState(true);
  
  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch subscription plans
      const { data: plansData, error: plansError } = await supabase
        .from('subscription_plans')
        .select('*')
        .order('price');
      
      if (plansError) throw plansError;
      setPlans(plansData || []);
      
      // Fetch user subscriptions
      const { data: subsData, error: subsError } = await supabase
        .from('user_subscriptions')
        .select(`
          *,
          subscription_plan:subscription_plan_id(name, price)
        `)
        .order('created_at', { ascending: false });
      
      if (subsError) throw subsError;
      setSubscriptions(subsData || []);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleEditPlan = (plan: any) => {
    setCurrentPlan(plan);
    setPlanName(plan.name);
    setPlanDescription(plan.description || '');
    setPlanPrice(plan.price.toString());
    setPlanDuration(plan.duration_days.toString());
    setIsActive(plan.is_active);
    
    // Set module checkboxes
    const planModules = plan.modules || [];
    setModules({
      books: planModules.includes('books'),
      teachings: planModules.includes('teachings'),
      audiobooks: planModules.includes('audiobooks'),
      stories: planModules.includes('stories'),
      meditation: planModules.includes('meditation')
    });
    
    setIsEditingPlan(true);
  };
  
  const handleCreatePlan = () => {
    setCurrentPlan(null);
    setPlanName('');
    setPlanDescription('');
    setPlanPrice('');
    setPlanDuration('30');
    setIsActive(true);
    setModules({
      books: false,
      teachings: false,
      audiobooks: false,
      stories: false,
      meditation: false
    });
    
    setIsEditingPlan(true);
  };
  
  const handleSavePlan = async () => {
    try {
      // Create array of enabled modules
      const moduleArray = Object.entries(modules)
        .filter(([_, isEnabled]) => isEnabled)
        .map(([name]) => name);
      
      const planData = {
        name: planName,
        description: planDescription,
        price: parseFloat(planPrice),
        duration_days: parseInt(planDuration),
        modules: moduleArray,
        is_active: isActive,
        updated_at: new Date().toISOString()
      };
      
      if (currentPlan) {
        // Update existing plan
        const { error } = await supabase
          .from('subscription_plans')
          .update(planData)
          .eq('id', currentPlan.id);
        
        if (error) throw error;
      } else {
        // Create new plan
        const { error } = await supabase
          .from('subscription_plans')
          .insert(planData);
        
        if (error) throw error;
      }
      
      // Refresh data and reset form
      fetchData();
      setIsEditingPlan(false);
      
    } catch (error) {
      console.error('Error saving plan:', error);
      alert('Error saving subscription plan. Please try again.');
    }
  };
  
  const handleDeletePlan = async (planId: string) => {
    if (!confirm('Are you sure you want to delete this plan? This action cannot be undone.')) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('subscription_plans')
        .delete()
        .eq('id', planId);
      
      if (error) throw error;
      
      // Refresh data
      fetchData();
      
    } catch (error) {
      console.error('Error deleting plan:', error);
      alert('Error deleting subscription plan. Please try again.');
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin h-8 w-8 border-b-2 border-primary rounded-full"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Subscription Management</h1>
        <p className="text-muted-foreground">
          Manage subscription plans and user subscriptions
        </p>
      </header>
      
      <div className="border-b flex">
        <Button 
          variant="ghost" 
          className={`rounded-none border-b-2 ${activeTab === 'plans' ? 'border-primary' : 'border-transparent'}`}
          onClick={() => setActiveTab('plans')}
        >
          Plans
        </Button>
        <Button 
          variant="ghost" 
          className={`rounded-none border-b-2 ${activeTab === 'subscriptions' ? 'border-primary' : 'border-transparent'}`}
          onClick={() => setActiveTab('subscriptions')}
        >
          User Subscriptions
        </Button>
      </div>
      
      {activeTab === 'plans' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Subscription Plans</h2>
            <Button onClick={handleCreatePlan} className="gap-2">
              <Plus className="h-4 w-4" />
              Add New Plan
            </Button>
          </div>
          
          {isEditingPlan ? (
            <Card>
              <CardHeader>
                <CardTitle>{currentPlan ? 'Edit Plan' : 'Create New Plan'}</CardTitle>
                <CardDescription>
                  {currentPlan ? 'Update subscription plan details' : 'Configure a new subscription plan'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="plan-name">Plan Name</Label>
                    <Input 
                      id="plan-name" 
                      value={planName} 
                      onChange={(e) => setPlanName(e.target.value)} 
                      placeholder="e.g. Basic, Premium"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="plan-price">Price ($ per month)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="plan-price" 
                        type="number" 
                        value={planPrice} 
                        onChange={(e) => setPlanPrice(e.target.value)}
                        placeholder="9.99"
                        step="0.01"
                        min="0"
                        className="pl-8"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="plan-description">Description</Label>
                  <Input 
                    id="plan-description" 
                    value={planDescription} 
                    onChange={(e) => setPlanDescription(e.target.value)}
                    placeholder="Brief description of the plan"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="plan-duration">Duration (days)</Label>
                    <Input 
                      id="plan-duration" 
                      type="number" 
                      value={planDuration} 
                      onChange={(e) => setPlanDuration(e.target.value)}
                      min="1"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="block mb-2">Plan Status</Label>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="is-active"
                        checked={isActive}
                        onCheckedChange={(checked) => setIsActive(checked === true)}
                      />
                      <label
                        htmlFor="is-active"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Active (visible to users)
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="block mb-2">Included Access</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="module-books"
                        checked={modules.books}
                        onCheckedChange={(checked) => setModules({...modules, books: checked === true})}
                      />
                      <label
                        htmlFor="module-books"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Books
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="module-teachings"
                        checked={modules.teachings}
                        onCheckedChange={(checked) => setModules({...modules, teachings: checked === true})}
                      />
                      <label
                        htmlFor="module-teachings"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Teachings
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="module-audiobooks"
                        checked={modules.audiobooks}
                        onCheckedChange={(checked) => setModules({...modules, audiobooks: checked === true})}
                      />
                      <label
                        htmlFor="module-audiobooks"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Audiobooks
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="module-stories"
                        checked={modules.stories}
                        onCheckedChange={(checked) => setModules({...modules, stories: checked === true})}
                      />
                      <label
                        htmlFor="module-stories"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Stories
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="module-meditation"
                        checked={modules.meditation}
                        onCheckedChange={(checked) => setModules({...modules, meditation: checked === true})}
                      />
                      <label
                        htmlFor="module-meditation"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Meditation
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
              <div className="flex justify-end gap-2 p-6 pt-0">
                <Button variant="outline" onClick={() => setIsEditingPlan(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSavePlan}>
                  {currentPlan ? 'Update Plan' : 'Create Plan'}
                </Button>
              </div>
            </Card>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 text-left font-medium">Name</th>
                    <th className="py-3 px-4 text-left font-medium">Price</th>
                    <th className="py-3 px-4 text-left font-medium">Duration</th>
                    <th className="py-3 px-4 text-left font-medium">Included Access</th>
                    <th className="py-3 px-4 text-left font-medium">Status</th>
                    <th className="py-3 px-4 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {plans.map((plan) => (
                    <tr key={plan.id} className="border-b">
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{plan.name}</div>
                          <div className="text-sm text-muted-foreground">{plan.description}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">${plan.price.toFixed(2)}/month</td>
                      <td className="py-3 px-4">{plan.duration_days} days</td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {(plan.modules || []).map((module: string) => (
                            <span 
                              key={module} 
                              className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full"
                            >
                              {module}
                            </span>
                          ))}
                          {(plan.modules || []).length === 0 && (
                            <span className="text-muted-foreground text-sm">None</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                          plan.is_active 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                        }`}>
                          {plan.is_active ? (
                            <>
                              <CheckCircle2 className="h-3 w-3" />
                              Active
                            </>
                          ) : (
                            <>
                              <XCircle className="h-3 w-3" />
                              Inactive
                            </>
                          )}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleEditPlan(plan)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeletePlan(plan.id)}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {plans.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-6 text-center text-muted-foreground">
                        No subscription plans found. Create your first plan to get started.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
      
      {activeTab === 'subscriptions' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">User Subscriptions</h2>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search subscribers..."
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 text-left font-medium">User</th>
                    <th className="py-3 px-4 text-left font-medium">
                      <Button variant="ghost" className="p-0 h-auto font-medium flex items-center gap-1">
                        Plan
                        <ArrowUpDown className="h-3 w-3" />
                      </Button>
                    </th>
                    <th className="py-3 px-4 text-left font-medium">Status</th>
                    <th className="py-3 px-4 text-left font-medium">Start Date</th>
                    <th className="py-3 px-4 text-left font-medium">End Date</th>
                    <th className="py-3 px-4 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions.map((sub) => (
                    <tr key={sub.id} className="border-b">
                      <td className="py-3 px-4">
                        {sub.user_id}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium">{sub.subscription_plan?.name || 'Unknown Plan'}</div>
                        <div className="text-sm text-muted-foreground">
                          ${sub.subscription_plan?.price.toFixed(2) || '0.00'}/month
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                          sub.status === 'active' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                            : sub.status === 'canceled'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                          {sub.status === 'active' ? (
                            <>
                              <CheckCircle2 className="h-3 w-3" />
                              Active
                            </>
                          ) : sub.status === 'canceled' ? (
                            <>
                              <XCircle className="h-3 w-3" />
                              Canceled
                            </>
                          ) : (
                            <>
                              <XCircle className="h-3 w-3" />
                              Expired
                            </>
                          )}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {format(new Date(sub.start_date), 'MMM d, yyyy')}
                      </td>
                      <td className="py-3 px-4">
                        {format(new Date(sub.end_date), 'MMM d, yyyy')}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {subscriptions.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-6 text-center text-muted-foreground">
                        No user subscriptions found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}