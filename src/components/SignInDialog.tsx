
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { User } from 'lucide-react';
import axios from 'axios';
import { validateField } from '@/utils/validation';
import SignInForm from '@/components/auth/SignInForm';
import CreateAccountForm from '@/components/auth/CreateAccountForm';

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
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
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
    
    // Special handling for phone number to ensure only digits
    if (name === 'phnumber' && !/^\d*$/.test(value)) {
      return; // Don't update state if non-digit is entered
    }
    
    // Special handling for aadhar to ensure only digits
    if (name === 'aadhar' && !/^\d*$/.test(value)) {
      return; // Don't update state if non-digit is entered
    }
    
    setCreateAccountData(prevData => ({
      ...prevData,
      [name]: value,
    }));
    
    // Validate field and set error
    const error = validateField(name, value);
    setValidationErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleAadharChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow digits
    if (!/^\d*$/.test(value)) {
      return;
    }
    
    setAadhar(value);
    const error = validateField('aadhar', value);
    setValidationErrors(prev => ({
      ...prev,
      aadhar: error
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
      
      // Validate Aadhar
      if (!/^\d{12}$/.test(aadhar)) {
        toast({
          title: 'Error',
          description: 'Aadhar number must be 12 digits.',
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
      
      // Check validation errors
      const errors: Record<string, string> = {};
      
      if (!/^\d{10}$/.test(createAccountData.phnumber)) {
        errors.phnumber = 'Phone number must be 10 digits';
      }
      
      if (!/^\d{12}$/.test(createAccountData.aadhar)) {
        errors.aadhar = 'Aadhar number must be 12 digits';
      }
      
      if (createAccountData.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
      }
      
      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        toast({
          title: 'Validation Error',
          description: 'Please fix all validation errors before submitting.',
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
  };

  const resetValidationError = (field: string) => {
    setValidationErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] bg-card">
        <DialogTitle className="flex items-center gap-2 text-foreground">
          <User className="w-5 h-5" />
          {isSignIn ? "Sign In" : "Create Account"}
        </DialogTitle>
        <DialogDescription className="text-muted-foreground">
          {isSignIn
            ? "Sign in to your account to access your profile and orders."
            : "Create a new account to start shopping on AgriRoad."
          }
        </DialogDescription>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {!isSignIn ? (
            <CreateAccountForm 
              formData={createAccountData}
              showPassword={showPassword}
              validationErrors={validationErrors}
              handleChange={handleCreateAccountChange}
              togglePasswordVisibility={togglePasswordVisibility}
              resetValidationError={resetValidationError}
            />
          ) : (
            <SignInForm
              aadhar={aadhar}
              password={password}
              showPassword={showPassword}
              validationErrors={validationErrors}
              handleAadharChange={handleAadharChange}
              handlePasswordChange={handlePasswordChange}
              togglePasswordVisibility={togglePasswordVisibility}
              resetValidationError={resetValidationError}
            />
          )}

          {isSignIn && (
            <div className="text-right">
              <Button variant="link" className="text-primary p-0 h-auto">
                Forgot password?
              </Button>
            </div>
          )}

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            {isSignIn ? "Sign In" : "Create Account"}
          </Button>
        </form>

        <div className="text-center pt-2">
          <p className="text-sm text-muted-foreground">
            {isSignIn ? "Don't have an account?" : "Already have an account?"}
            <Button
              variant="link"
              className="text-primary p-0 h-auto ml-1"
              onClick={() => {
                setIsSignIn(!isSignIn);
                setValidationErrors({});
              }}
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
