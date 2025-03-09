import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { User, Lock, Eye, EyeOff, Phone, CreditCard, Home } from 'lucide-react';
import axios from 'axios';

interface SignInDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface CreateAccountData {
  name: string;
  phnumber: string;
  aadhar: string;
  address: string;
  password: string;
}

const SignInDialog: React.FC<SignInDialogProps> = ({ open, onOpenChange }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [aadhar, setAadhar] = useState('');
  const [password, setPassword] = useState('');
  const [createAccountData, setCreateAccountData] = useState<CreateAccountData>({
    name: '',
    phnumber: '',
    aadhar: '',
    address: '',
    password: '',
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedCreateAccountData = localStorage.getItem('createAccountData');
    const storedAadhar = localStorage.getItem('aadhar');
    const storedPassword = localStorage.getItem('password');

    if (storedCreateAccountData) {
      setCreateAccountData(JSON.parse(storedCreateAccountData));
    }

    if (storedAadhar) {
      setAadhar(storedAadhar);
    }

    if (storedPassword) {
      setPassword(storedPassword);
    }
  }, []);

  // Save to localStorage whenever createAccountData, Aadhar, or password changes
  useEffect(() => {
    if (!isSignIn) {
      localStorage.setItem('createAccountData', JSON.stringify(createAccountData));
    } 
     if (isSignIn) {
      localStorage.setItem('aadhar', aadhar);
      localStorage.setItem('password', password);
    }
  }, [createAccountData, aadhar, password, isSignIn]);

  const handleCreateAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCreateAccountData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSignIn) {
      // Sign-in logic (Aadhar and Password)
      if (!aadhar || !password) {
        toast({
          title: 'Error',
          description: 'Please enter both Aadhar and Password.',
          variant: 'destructive',
        });
        return;
      }
      // Here you can add your sign in logic, such as api calls.
          toast({
              title: "Signed in successfully",
              description: "Welcome back to AgriRoad!",
            });
            window.location.href = '/';
    } else {
      // Check if all fields are filled for create account
      if (
        !createAccountData.name ||
        !createAccountData.phnumber ||
        !createAccountData.aadhar ||
        !createAccountData.address ||
        !createAccountData.password
      ) {
        toast({
          title: 'Error',
          description: 'Please fill in all the fields for creating an account.',
          variant: 'destructive',
        });
        return;
      }
      // Post the createAccountData to the backend server
      try {
        const response = await axios.post('https://agriroad-chat-tybs.onrender.com/user/adduser', createAccountData);
        if (response.status === 200) {
           toast({
              title: "Account created successfully",
              description: "Welcome to AgriRoad! Your account has been created.",
            });
             window.location.href = '/';
           
        } else {
          toast({
            title: 'Error',
            description: 'Failed to create account.',
            variant: 'destructive',
          });
        }
      } catch (error) {
         toast({
            title: 'Error',
            description: 'Failed to create account.',
            variant: 'destructive',
          });
        console.error('Error creating account:', error);
      }
    }
       // Add a small delay to allow the useEffect to run before cleaning up
  
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
          {!isSignIn && (
            <>
              <div className="space-y-2">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Name"
                    required
                    className="pl-10"
                    name="name"
                    value={createAccountData.name}
                    onChange={handleCreateAccountChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="number"
                    placeholder="Phone Number"
                    required
                    className="pl-10"
                    name="phnumber"
                    value={createAccountData.phnumber}
                    onChange={handleCreateAccountChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Aadhar"
                    required
                    className="pl-10"
                    name="aadhar"
                    value={createAccountData.aadhar}
                    onChange={handleCreateAccountChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Address"
                    required
                    className="pl-10"
                    name="address"
                    value={createAccountData.address}
                    onChange={handleCreateAccountChange}
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
                    value={createAccountData.password}
                    onChange={handleCreateAccountChange}
                    name='password'
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
            </>
          )}
          {isSignIn && (
            <>
              <div className="space-y-2">
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Aadhar"
                    required
                    className="pl-10"
                    value={aadhar}
                    onChange={(e) => setAadhar(e.target.value)}
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
                    name='password'
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
            </>
          )}

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
