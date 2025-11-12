import { ref, computed } from 'vue';
import type { ValidationRule, ValidationError } from '@/types/common';

export function useFormValidation(rules: Record<string, ValidationRule>) {
    const errors = ref<ValidationError[]>([]);
    const touched = ref<Set<string>>(new Set());

    const validate = (field: string, value: any): string | null => {
        const rule = rules[field];
        if (!rule) return null;

        // Required validation
        if (rule.required) {
            if (value === null || value === undefined || value === '') {
                return rule.message || `${field} is required`;
            }
        }

        // Skip other validations if value is empty and not required
        if (!rule.required && (value === null || value === undefined || value === '')) {
            return null;
        }

        // MinLength validation
        if (rule.minLength && typeof value === 'string') {
            if (value.length < rule.minLength) {
                return rule.message || `${field} must be at least ${rule.minLength} characters`;
            }
        }

        // MaxLength validation
        if (rule.maxLength && typeof value === 'string') {
            if (value.length > rule.maxLength) {
                return rule.message || `${field} must be at most ${rule.maxLength} characters`;
            }
        }

        // Pattern validation
        if (rule.pattern && typeof value === 'string') {
            if (!rule.pattern.test(value)) {
                return rule.message || `${field} format is invalid`;
            }
        }

        // Custom validation
        if (rule.custom) {
            const result = rule.custom(value);
            if (result !== true) {
                return typeof result === 'string' ? result : rule.message || `${field} is invalid`;
            }
        }

        return null;
    };

    const validateField = (field: string, value: any): boolean => {
        const error = validate(field, value);

        // Remove existing error for this field
        errors.value = errors.value.filter((e) => e.field !== field);

        // Add new error if exists
        if (error) {
            errors.value.push({ field, message: error });
            return false;
        }

        return true;
    };

    const validateAll = (data: Record<string, any>): boolean => {
        errors.value = [];

        Object.keys(rules).forEach((field) => {
            const value = data[field];
            const error = validate(field, value);

            if (error) {
                errors.value.push({ field, message: error });
            }
        });

        return errors.value.length === 0;
    };

    const touchField = (field: string) => {
        touched.value.add(field);
    };

    const untouchField = (field: string) => {
        touched.value.delete(field);
    };

    const touchAll = () => {
        Object.keys(rules).forEach((field) => touched.value.add(field));
    };

    const reset = () => {
        errors.value = [];
        touched.value.clear();
    };

    const getFieldError = (field: string): string | undefined => {
        return errors.value.find((e) => e.field === field)?.message;
    };

    const hasFieldError = (field: string): boolean => {
        return errors.value.some((e) => e.field === field);
    };

    const isFieldTouched = (field: string): boolean => {
        return touched.value.has(field);
    };

    const isValid = computed(() => errors.value.length === 0);
    const hasErrors = computed(() => errors.value.length > 0);

    return {
        errors,
        touched,
        isValid,
        hasErrors,
        validate,
        validateField,
        validateAll,
        touchField,
        untouchField,
        touchAll,
        reset,
        getFieldError,
        hasFieldError,
        isFieldTouched,
    };
}

// Common validation patterns
export const ValidationPatterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[\d\s\-\+\(\)]+$/,
    url: /^https?:\/\/.+/,
    alphanumeric: /^[a-zA-Z0-9]+$/,
    numeric: /^\d+$/,
    alphabetic: /^[a-zA-Z]+$/,
};
