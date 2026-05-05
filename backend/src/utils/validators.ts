export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  // South African phone number format
  const phoneRegex = /^(\+27|0)[1-9]\d{8}$/;
  return phoneRegex.test(phone.replace(/\s|-/g, ''));
};

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

export const validateRequiredFields = (obj: any, fields: string[]): { valid: boolean; missing: string[] } => {
  const missing = fields.filter(field => !obj[field] || obj[field].toString().trim() === '');
  return {
    valid: missing.length === 0,
    missing
  };
};

export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 1000); // Limit length
};
