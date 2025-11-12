import { ref, computed } from 'vue';
import type { FilterData } from '@/types/common';

export function useTableFilters() {
    const filters = ref<FilterData[]>([]);
    const globalFilter = ref<string>('');

    // Add or update a filter
    const setFilter = (field: string, value: any, matchMode?: FilterData['matchMode']) => {
        const existingIndex = filters.value.findIndex((f) => f.field === field);

        if (existingIndex >= 0) {
            // Update existing filter
            filters.value[existingIndex] = {
                field,
                value,
                matchMode: matchMode || filters.value[existingIndex].matchMode,
            };
        } else {
            // Add new filter
            filters.value.push({
                field,
                value,
                matchMode: matchMode || 'contains',
            });
        }
    };

    // Remove a filter
    const removeFilter = (field: string) => {
        filters.value = filters.value.filter((f) => f.field !== field);
    };

    // Clear all filters
    const clearFilters = () => {
        filters.value = [];
    };

    // Clear global filter
    const clearGlobalFilter = () => {
        globalFilter.value = '';
    };

    // Clear all filters and global filter
    const clearAll = () => {
        clearFilters();
        clearGlobalFilter();
    };

    // Get filter value for a field
    const getFilterValue = (field: string): any => {
        const filter = filters.value.find((f) => f.field === field);
        return filter?.value;
    };

    // Check if a field has a filter
    const hasFilter = (field: string): boolean => {
        return filters.value.some((f) => f.field === field);
    };

    // Filter data locally (client-side)
    const filterData = <T extends Record<string, any>>(data: T[]): T[] => {
        let filtered = [...data];

        // Apply field filters
        filters.value.forEach((filter) => {
            filtered = filtered.filter((item) => {
                const fieldValue = item[filter.field];
                const filterValue = filter.value;

                if (fieldValue === null || fieldValue === undefined) return false;

                const fieldStr = String(fieldValue).toLowerCase();
                const filterStr = String(filterValue).toLowerCase();

                switch (filter.matchMode) {
                    case 'startsWith':
                        return fieldStr.startsWith(filterStr);
                    case 'endsWith':
                        return fieldStr.endsWith(filterStr);
                    case 'contains':
                        return fieldStr.includes(filterStr);
                    case 'notContains':
                        return !fieldStr.includes(filterStr);
                    case 'equals':
                        return fieldStr === filterStr;
                    case 'notEquals':
                        return fieldStr !== filterStr;
                    case 'in':
                        return Array.isArray(filterValue) && filterValue.includes(fieldValue);
                    default:
                        return fieldStr.includes(filterStr);
                }
            });
        });

        // Apply global filter
        if (globalFilter.value) {
            const globalFilterStr = globalFilter.value.toLowerCase();
            filtered = filtered.filter((item) => {
                return Object.values(item).some((value) => {
                    if (value === null || value === undefined) return false;
                    return String(value).toLowerCase().includes(globalFilterStr);
                });
            });
        }

        return filtered;
    };

    // Computed
    const hasFilters = computed(() => filters.value.length > 0);
    const hasGlobalFilter = computed(() => globalFilter.value !== '');
    const hasAnyFilter = computed(() => hasFilters.value || hasGlobalFilter.value);
    const activeFiltersCount = computed(() => filters.value.length);

    return {
        // State
        filters,
        globalFilter,

        // Computed
        hasFilters,
        hasGlobalFilter,
        hasAnyFilter,
        activeFiltersCount,

        // Methods
        setFilter,
        removeFilter,
        clearFilters,
        clearGlobalFilter,
        clearAll,
        getFilterValue,
        hasFilter,
        filterData,
    };
}
