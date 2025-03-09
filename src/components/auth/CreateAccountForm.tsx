
import React from 'react';
import { User, Phone, CreditCard, Home, Lock, Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface CreateAccountData {
  name: string;
  phnumber: string;
  aadhar: string;
  address: string;
  password: string;
}

interface CreateAccountFormProps {
  formData: CreateAccountData;
  showPassword: boolean;
  validationErrors: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  togglePasswordVisibility: () => void;
  resetValidationError: (field: string) => void;
}

const CreateAccountForm: React.FC<CreateAccountFormProps> = ({
  formData,
  showPassword,
  validationErrors,
  handleChange,
  togglePasswordVisibility,
  resetValidationError
}) => {
  return (
    <>
      <div className="space-y-2">
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Name"
            required
            className="pl-10"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onFocus={() => resetValidationError('name')}
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Phone Number"
            required
            className={`pl-10 ${validationErrors.phnumber ? 'border-destructive' : ''}`}
            name="phnumber"
            value={formData.phnumber}
            onChange={handleChange}
            onFocus={() => resetValidationError('phnumber')}
            maxLength={10}
          />
          {validationErrors.phnumber && (
            <p className="text-destructive text-xs mt-1">{validationErrors.phnumber}</p>
          )}
        </div>
      </div>

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
            name="aadhar"
            value={formData.aadhar}
            onChange={handleChange}
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
          <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Address"
            required
            className="pl-10"
            name="address"
            value={formData.address}
            onChange={handleChange}
            onFocus={() => resetValidationError('address')}
          />
        </div>
      </div>
      <div className="space-y-2">
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            className={`pl-10 pr-10 ${validationErrors.password ? 'border-destructive' : ''}`}
            value={formData.password}
            onChange={handleChange}
            name='password'
            onFocus={() => resetValidationError('password')}
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
          {validationErrors.password && (
            <p className="text-destructive text-xs mt-1">{validationErrors.password}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateAccountForm;
