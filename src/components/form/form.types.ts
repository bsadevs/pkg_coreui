import type { ValidationRule, ValidationError } from '@/types/common';

export interface FormField {
    name: string;
    label: string;
    type: 'text' | 'email' | 'password' | 'number' | 'select' | 'date' | 'textarea' | 'checkbox' | 'radio';
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    options?: Array<{ label: string; value: any }>;
    validation?: ValidationRule;
    col?: number; // Grid column span (1-12)
    class?: string;
}

export interface FormConfig {
    fields: FormField[];
    initialData?: Record<string, any>;
    mode?: 'create' | 'edit' | 'view';
    showHeader?: boolean;
    showFooter?: boolean;
    submitLabel?: string;
    cancelLabel?: string;
    resetLabel?: string;
}

export interface FormEmits {
    submit: (data: Record<string, any>) => void;
    cancel: () => void;
    reset: () => void;
    change: (field: string, value: any) => void;
    validate: (errors: ValidationError[]) => void;
}

export interface FormHeaderProps {
    title?: string;
    subtitle?: string;
    icon?: string;
}

export interface FormFooterProps {
    submitLabel?: string;
    cancelLabel?: string;
    resetLabel?: string;
    showSubmit?: boolean;
    showCancel?: boolean;
    showReset?: boolean;
    submitDisabled?: boolean;
    loading?: boolean;
}
