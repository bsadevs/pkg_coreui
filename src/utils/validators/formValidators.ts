import type { ValidationRule } from '@/types/common';

export const required = (message?: string): ValidationRule => ({
    required: true,
    message: message || 'This field is required',
});

export const minLength = (min: number, message?: string): ValidationRule => ({
    minLength: min,
    message: message || `Must be at least ${min} characters`,
});

export const maxLength = (max: number, message?: string): ValidationRule => ({
    maxLength: max,
    message: message || `Must be at most ${max} characters`,
});

export const email = (message?: string): ValidationRule => ({
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: message || 'Invalid email address',
});

export const url = (message?: string): ValidationRule => ({
    pattern: /^https?:\/\/.+/,
    message: message || 'Invalid URL',
});

export const phone = (message?: string): ValidationRule => ({
    pattern: /^[\d\s\-\+\(\)]+$/,
    message: message || 'Invalid phone number',
});

export const numeric = (message?: string): ValidationRule => ({
    pattern: /^\d+$/,
    message: message || 'Must be numeric',
});

export const alphanumeric = (message?: string): ValidationRule => ({
    pattern: /^[a-zA-Z0-9]+$/,
    message: message || 'Must be alphanumeric',
});

export const alphabetic = (message?: string): ValidationRule => ({
    pattern: /^[a-zA-Z]+$/,
    message: message || 'Must be alphabetic',
});

export const minValue = (min: number, message?: string): ValidationRule => ({
    custom: (value: any) => {
        const num = Number(value);
        return !isNaN(num) && num >= min;
    },
    message: message || `Must be at least ${min}`,
});

export const maxValue = (max: number, message?: string): ValidationRule => ({
    custom: (value: any) => {
        const num = Number(value);
        return !isNaN(num) && num <= max;
    },
    message: message || `Must be at most ${max}`,
});

export const range = (min: number, max: number, message?: string): ValidationRule => ({
    custom: (value: any) => {
        const num = Number(value);
        return !isNaN(num) && num >= min && num <= max;
    },
    message: message || `Must be between ${min} and ${max}`,
});

export const password = (message?: string): ValidationRule => ({
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
    message: message || 'Password must be at least 8 characters with uppercase, lowercase, and number',
});

export const strongPassword = (message?: string): ValidationRule => ({
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    message:
        message || 'Password must be at least 8 characters with uppercase, lowercase, number, and special character',
});

export const matchField = (fieldName: string, fieldValue: any, message?: string): ValidationRule => ({
    custom: (value: any) => value === fieldValue,
    message: message || `Must match ${fieldName}`,
});

export const date = (message?: string): ValidationRule => ({
    custom: (value: any) => {
        const date = new Date(value);
        return !isNaN(date.getTime());
    },
    message: message || 'Invalid date',
});

export const futureDate = (message?: string): ValidationRule => ({
    custom: (value: any) => {
        const date = new Date(value);
        const now = new Date();
        return !isNaN(date.getTime()) && date > now;
    },
    message: message || 'Date must be in the future',
});

export const pastDate = (message?: string): ValidationRule => ({
    custom: (value: any) => {
        const date = new Date(value);
        const now = new Date();
        return !isNaN(date.getTime()) && date < now;
    },
    message: message || 'Date must be in the past',
});

export const creditCard = (message?: string): ValidationRule => ({
    custom: (value: any) => {
        // Luhn algorithm
        const cleaned = String(value).replace(/\D/g, '');
        if (cleaned.length < 13 || cleaned.length > 19) return false;

        let sum = 0;
        let isEven = false;

        for (let i = cleaned.length - 1; i >= 0; i--) {
            let digit = parseInt(cleaned[i]);

            if (isEven) {
                digit *= 2;
                if (digit > 9) digit -= 9;
            }

            sum += digit;
            isEven = !isEven;
        }

        return sum % 10 === 0;
    },
    message: message || 'Invalid credit card number',
});

export const zipCode = (message?: string): ValidationRule => ({
    pattern: /^\d{5}(-\d{4})?$/,
    message: message || 'Invalid ZIP code',
});

export const ssn = (message?: string): ValidationRule => ({
    pattern: /^\d{3}-\d{2}-\d{4}$/,
    message: message || 'Invalid SSN (format: XXX-XX-XXXX)',
});
