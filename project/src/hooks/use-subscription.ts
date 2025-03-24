import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export function useSubscription(userId?: string, module?: string) {
  const [hasAccess, setHasAccess] = useState(false);
  const [subscription, setSubscription] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      setHasAccess(false);
      return;
    }

    async function checkSubscription() {
      try {
        // Get the user's active subscription
        const { data: subscriptionData, error: subscriptionError } = await supabase
          .from('user_subscriptions')
          .select(`
            *,
            subscription_plan:subscription_plan_id(
              id,
              name,
              price,
              modules
            )
          `)
          .eq('user_id', userId)
          .eq('status', 'active')
          .maybeSingle(); // Use maybeSingle() instead of single() to handle no results gracefully

        if (subscriptionError) {
          console.error('Error fetching subscription:', subscriptionError);
          setHasAccess(false);
        } else {
          setSubscription(subscriptionData);
          
          // If a module is specified, check if the user has access to it
          if (module && subscriptionData) {
            const modules = subscriptionData.subscription_plan?.modules || [];
            setHasAccess(modules.includes(module));
          } else if (subscriptionData) {
            // If no module is specified, user has access if they have any active subscription
            setHasAccess(true);
          } else {
            setHasAccess(false);
          }
        }
      } catch (error) {
        console.error('Error in subscription check:', error);
        setHasAccess(false);
      } finally {
        setIsLoading(false);
      }
    }

    checkSubscription();
  }, [userId, module]);

  return { hasAccess, subscription, isLoading };
}