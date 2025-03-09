
export const validatePhoneNumber = (phone: string): boolean => {
  return /^\d{10}$/.test(phone);
};

export const validateAadhar = (aadhar: string): boolean => {
  return /^\d{12}$/.test(aadhar);
};

export const validateField = (name: string, value: string): string => {
  switch (name) {
    case 'phnumber':
      return validatePhoneNumber(value) ? '' : 'Phone number must be 10 digits';
    case 'aadhar':
      return validateAadhar(value) ? '' : 'Aadhar number must be 12 digits';
    case 'password':
      return value.length >= 6 ? '' : 'Password must be at least 6 characters';
    default:
      return '';
  }
};
