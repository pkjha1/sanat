import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, KeyRound, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await resetPassword(email);
      setIsSuccess(true);
    } catch (error: any) {
      setError(error.message || 'Failed to send password reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="container max-w-md mx-auto py-12">
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">Sanatani</span>
          </Link>
        </div>
        
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Check your email</CardTitle>
            <CardDescription className="text-center">
              We've sent you a password reset link
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <KeyRound className="h-8 w-8 text-primary" />
            </div>
            <p>
              We've sent a password reset link to <span className="font-medium">{email}</span>.
            </p>
            <p className="text-muted-foreground">
              Please check your email and follow the instructions to reset your password.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button asChild variant="outline">
              <Link to="/auth/login" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Login
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-md mx-auto py-12">
      <div className="flex justify-center mb-8">
        <Link to="/" className="flex items-center gap-2">
          <BookOpen className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold">Sanatani</span>
        </Link>
      </div>
      
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
          <CardDescription>
            Enter your email address and we'll send you a password reset link
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md text-destructive text-sm">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full"></div>
              ) : (
                'Send Reset Link'
              )}
            </Button>
            <Button
              variant="ghost"
              asChild
              className="gap-2"
            >
              <Link to="/auth/login">
                <ArrowLeft className="h-4 w-4" />
                Back to Login
              </Link>
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}