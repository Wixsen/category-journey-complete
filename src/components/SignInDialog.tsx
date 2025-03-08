
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface SignInDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SignInDialog: React.FC<SignInDialogProps> = ({ open, onOpenChange }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would implement actual auth logic here
    toast({
      title: isSignIn ? "Signed in successfully" : "Account created successfully",
      description: isSignIn 
        ? "Welcome back to AgriRoad!" 
        : "Welcome to AgriRoad! Your account has been created.",
    });
    
    onOpenChange(false);
    setEmail('');
    setPassword('');
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          {isSignIn ? "Sign In" : "Create Account"}
        </DialogTitle>
        <DialogDescription>
          {isSignIn 
            ? "Sign in to your account to access your profile and orders."
            : "Create a new account to start shopping on AgriRoad."
          }
        </DialogDescription>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-2">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="email"
                placeholder="Email"
                required
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                className="pl-10 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          {isSignIn && (
            <div className="text-right">
              <Button variant="link" className="text-agri-green p-0 h-auto">
                Forgot password?
              </Button>
            </div>
          )}
          
          <Button type="submit" className="w-full bg-agri-green hover:bg-agri-dark-green">
            {isSignIn ? "Sign In" : "Create Account"}
          </Button>
        </form>
        
        <div className="text-center pt-2">
          <p className="text-sm text-gray-500">
            {isSignIn ? "Don't have an account?" : "Already have an account?"}
            <Button 
              variant="link" 
              className="text-agri-green p-0 h-auto ml-1"
              onClick={() => setIsSignIn(!isSignIn)}
            >
              {isSignIn ? "Create one" : "Sign in"}
            </Button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignInDialog;
