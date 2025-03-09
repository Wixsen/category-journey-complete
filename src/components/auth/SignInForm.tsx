
import React from 'react';
import { CreditCard, Lock, Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SignInFormProps {
  aadhar: string;
  password: string;
  showPassword: boolean;
  validationErrors: Record<string, string>;
  handleAadharChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  togglePasswordVisibility: () => void;
  resetValidationError: (field: string) => void;
}

const SignInForm: React.FC<SignInFormProps> = ({
  aadhar,
  password,
  showPassword,
  validationErrors,
  handleAadharChange,
  handlePasswordChange,
  togglePasswordVisibility,
  resetValidationError
}) => {
  return (
    <>
      <div className="space-y-2">
        <div className="relative">
          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Aadhar"
            required
            className={`pl-10 ${validationErrors.aadhar ? 'border-destructive' : ''}`}
            value={aadhar}
            onChange={handleAadharChange}
            onFocus={() => resetValidationError('aadhar')}
            maxLength={12}
          />
          {validationErrors.aadhar && (
            <p className="text-destructive text-xs mt-1">{validationErrors.aadhar}</p>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            className="pl-10 pr-10"
            value={password}
            onChange={handlePasswordChange}
            name='password'
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3 text-muted-foreground"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </>
  );
};

export default SignInForm;
