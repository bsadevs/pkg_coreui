import { ref, computed } from 'vue';
import type { PaginationData, SortData, FilterData, ApiResponse } from '@/types/common';

export interface PaginationConfig {
    apiEndpoint: string;
    initialPage?: number;
    initialPageSize?: number;
    lazy?: boolean;
}

export function useCrudPagination<T = any>(config: PaginationConfig) {
    const { apiEndpoint, initialPage = 1, initialPageSize = 10, lazy = true } = config;

    const items = ref<T[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    // Pagination state
    const page = ref(initialPage);
    const pageSize = ref(initialPageSize);
    const total = ref(0);
    const totalPages = ref(0);

    // Sorting state
    const sortField = ref<string>('');
    const sortOrder = ref<'asc' | 'desc'>('asc');

    // Filtering state
    const filters = ref<FilterData[]>([]);
    const globalFilter = ref<string>('');

    // Computed
    const pagination = computed<PaginationData>(() => ({
        page: page.value,
        pageSize: pageSize.value,
        total: total.value,
        totalPages: totalPages.value,
    }));

    const sorting = computed<SortData | null>(() => {
        if (!sortField.value) return null;
        return {
            field: sortField.value,
            order: sortOrder.value,
        };
    });

    const hasNextPage = computed(() => page.value < totalPages.value);
    const hasPreviousPage = computed(() => page.value > 1);
    const isEmpty = computed(() => items.value.length === 0);

    // Build query string
    const buildQueryString = (): string => {
        const params = new URLSearchParams();

        params.append('page', String(page.value));
        params.append('pageSize', String(pageSize.value));

        if (sortField.value) {
            params.append('sortField', sortField.value);
            params.append('sortOrder', sortOrder.value);
        }

        if (globalFilter.value) {
            params.append('search', globalFilter.value);
        }

        filters.value.forEach((filter, index) => {
            params.append(`filters[${index}][field]`, filter.field);
            params.append(`filters[${index}][value]`, String(filter.value));
            if (filter.matchMode) {
                params.append(`filters[${index}][matchMode]`, filter.matchMode);
            }
        });

        return params.toString();
    };

    // Fetch data
    const fetchData = async (): Promise<void> => {
        loading.value = true;
        error.value = null;

        try {
            const queryString = buildQueryString();
            const response = await fetch(`${apiEndpoint}?${queryString}`);
            const data: ApiResponse<{ items: T[]; total: number }> = await response.json();

            if (data.success) {
                items.value = data.data.items;
                total.value = data.data.total;
                totalPages.value = Math.ceil(data.data.total / pageSize.value);
            } else {
                throw new Error(data.message || 'Failed to fetch data');
            }
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Unknown error';
            throw err;
        } finally {
            loading.value = false;
        }
    };

    // Pagination methods
    const goToPage = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages.value) {
            page.value = newPage;
            if (lazy) {
                fetchData();
            }
        }
    };

    const nextPage = () => {
        if (hasNextPage.value) {
            goToPage(page.value + 1);
        }
    };

    const previousPage = () => {
        if (hasPreviousPage.value) {
            goToPage(page.value - 1);
        }
    };

    const changePageSize = (newPageSize: number) => {
        pageSize.value = newPageSize;
        page.value = 1; // Reset to first page
        if (lazy) {
            fetchData();
        }
    };

    // Sorting methods
    const setSort = (field: string, order: 'asc' | 'desc') => {
        sortField.value = field;
        sortOrder.value = order;
        page.value = 1; // Reset to first page
        if (lazy) {
            fetchData();
        }
    };

    const toggleSort = (field: string) => {
        if (sortField.value === field) {
            sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
        } else {
            sortField.value = field;
            sortOrder.value = 'asc';
        }
        page.value = 1;
        if (lazy) {
            fetchData();
        }
    };

    const clearSort = () => {
        sortField.value = '';
        sortOrder.value = 'asc';
        if (lazy) {
            fetchData();
        }
    };

    // Filtering methods
    const setFilters = (newFilters: FilterData[]) => {
        filters.value = newFilters;
        page.value = 1; // Reset to first page
        if (lazy) {
            fetchData();
        }
    };

    const addFilter = (filter: FilterData) => {
        filters.value.push(filter);
        page.value = 1;
        if (lazy) {
            fetchData();
        }
    };

    const removeFilter = (field: string) => {
        filters.value = filters.value.filter((f) => f.field !== field);
        page.value = 1;
        if (lazy) {
            fetchData();
        }
    };

    const clearFilters = () => {
        filters.value = [];
        globalFilter.value = '';
        page.value = 1;
        if (lazy) {
            fetchData();
        }
    };

    const setGlobalFilter = (value: string) => {
        globalFilter.value = value;
        page.value = 1;
        if (lazy) {
            fetchData();
        }
    };

    // Refresh data
    const refresh = () => {
        return fetchData();
    };

    const reset = () => {
        page.value = initialPage;
        pageSize.value = initialPageSize;
        sortField.value = '';
        sortOrder.value = 'asc';
        filters.value = [];
        globalFilter.value = '';
        if (lazy) {
            fetchData();
        }
    };

    return {
        // State
        items,
        loading,
        error,

        // Pagination
        page,
        pageSize,
        total,
        totalPages,
        pagination,
        hasNextPage,
        hasPreviousPage,

        // Sorting
        sortField,
        sortOrder,
        sorting,

        // Filtering
        filters,
        globalFilter,

        // Computed
        isEmpty,

        // Methods
        fetchData,
        refresh,
        reset,

        // Pagination methods
        goToPage,
        nextPage,
        previousPage,
        changePageSize,

        // Sorting methods
        setSort,
        toggleSort,
        clearSort,

        // Filtering methods
        setFilters,
        addFilter,
        removeFilter,
        clearFilters,
        setGlobalFilter,
    };
}
