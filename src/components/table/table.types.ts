import type { SortData, FilterData } from '@/types/common';

export interface TableColumn {
    field: string;
    header: string;
    sortable?: boolean;
    filterable?: boolean;
    filterMatchMode?: 'startsWith' | 'contains' | 'notContains' | 'endsWith' | 'equals' | 'notEquals' | 'in';
    bodyTemplate?: string;
    headerTemplate?: string;
    width?: string;
    frozen?: boolean;
    align?: 'left' | 'center' | 'right';
    class?: string;
}

export interface TableAction {
    label: string;
    icon?: string;
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
    visible?: (row: any) => boolean;
    disabled?: (row: any) => boolean;
    onClick: (row: any) => void;
}

export interface DataTableProps {
    data: any[];
    columns: TableColumn[];
    loading?: boolean;
    paginator?: boolean;
    rows?: number;
    rowsPerPageOptions?: number[];
    totalRecords?: number;
    lazy?: boolean;
    selection?: any;
    selectionMode?: 'single' | 'multiple';
    dataKey?: string;
    stripedRows?: boolean;
    showGridlines?: boolean;
    responsiveLayout?: 'scroll' | 'stack';
    scrollable?: boolean;
    scrollHeight?: string;
    virtualScroll?: boolean;
    exportable?: boolean;
    globalFilterFields?: string[];
}

export interface TableEmits {
    'update:selection': (value: any) => void;
    page: (event: { page: number; rows: number; first: number }) => void;
    sort: (event: SortData) => void;
    filter: (event: FilterData[]) => void;
    'row-select': (event: { data: any }) => void;
    'row-unselect': (event: { data: any }) => void;
}
