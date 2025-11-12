export type Size = 'sm' | 'md' | 'lg' | 'xl';
export type Variant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
export type ButtonType = 'button' | 'submit' | 'reset';

export interface BaseComponentProps {
    id?: string;
    class?: string;
    disabled?: boolean;
}

export interface SelectOption {
    label: string;
    value: string | number | boolean;
    disabled?: boolean;
}

export interface ValidationRule {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: any) => boolean | string;
    message?: string;
}

export interface ValidationError {
    field: string;
    message: string;
}

export interface PaginationData {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
}

export interface SortData {
    field: string;
    order: 'asc' | 'desc';
}

export interface FilterData {
    field: string;
    value: any;
    matchMode?: 'startsWith' | 'contains' | 'notContains' | 'endsWith' | 'equals' | 'notEquals' | 'in';
}

export interface ApiResponse<T = any> {
    data: T;
    success: boolean;
    message?: string;
    errors?: ValidationError[];
}

export interface CrudConfig {
    entityName: string;
    apiEndpoint: string;
    idField?: string;
}
