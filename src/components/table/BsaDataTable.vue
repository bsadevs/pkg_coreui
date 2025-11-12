<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import type { DataTableProps, TableAction } from './table.types';
import BsaTableActions from './BsaTableActions.vue';
import BsaIcons from '@/components/base/icons/BsaIcons.vue';

export interface Props extends DataTableProps {
    searchable?: boolean;
    searchIconOnly?: boolean;
    emptyMessage?: string;
    actions?: TableAction[];
    showAddButton?: boolean;
    addButtonLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
    loading: false,
    paginator: true,
    rows: 10,
    rowsPerPageOptions: () => [10, 25, 50, 100],
    totalRecords: 0,
    lazy: false,
    stripedRows: true,
    showGridlines: false,
    responsiveLayout: 'scroll',
    scrollable: false,
    virtualScroll: false,
    exportable: false,
    searchable: true,
    searchIconOnly: false,
    dataKey: 'id',
    showAddButton: false,
    addButtonLabel: 'Add',
});

const emit = defineEmits<{
    'update:selection': [value: any];
    page: [event: { page: number; rows: number; first: number }];
    sort: [event: { field: string; order: 'asc' | 'desc' }];
    filter: [event: any];
    'row-select': [event: { data: any }];
    'row-unselect': [event: { data: any }];
    'global-search': [value: string];
    add: [];
}>();

const globalSearchValue = ref('');
const filters = ref({});
const showSearchInput = ref(false);

const filteredData = computed(() => {
    if (!props.searchable || !globalSearchValue.value.trim()) {
        return props.data;
    }

    const searchTerm = globalSearchValue.value.toLowerCase().trim();

    return props.data.filter((item: any) => {
        return props.columns.some((col) => {
            const value = item[col.field];
            if (value == null) return false;
            return String(value).toLowerCase().includes(searchTerm);
        });
    });
});

const computedTotalRecords = computed(() => {
    return props.searchable && globalSearchValue.value.trim()
        ? filteredData.value.length
        : props.totalRecords || props.data.length;
});

// Auto-focus search input when it becomes visible
watch(showSearchInput, (newVal) => {
    if (newVal && props.searchIconOnly) {
        nextTick(() => {
            const input = document.querySelector('.bsa-data-table input[type="text"]') as HTMLInputElement;
            if (input) {
                input.focus();
            }
        });
    }
});

const onSelectionChange = (value: any) => {
    emit('update:selection', value);
};

const onPage = (event: any) => {
    emit('page', {
        page: event.page,
        rows: event.rows,
        first: event.first,
    });
};

const onSort = (event: any) => {
    emit('sort', {
        field: event.sortField,
        order: event.sortOrder === 1 ? 'asc' : 'desc',
    });
};

const onFilter = (event: any) => {
    emit('filter', event);
};

const onRowSelect = (event: any) => {
    emit('row-select', event);
};

const onRowUnselect = (event: any) => {
    emit('row-unselect', event);
};

const onGlobalSearch = () => {
    emit('global-search', globalSearchValue.value);
};

const onAdd = () => {
    emit('add');
};

const exportCSV = () => {
    // Simple CSV export implementation
    const csvContent = generateCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `export_${Date.now()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const generateCSV = (): string => {
    if (!props.data || props.data.length === 0) return '';

    // Headers
    const headers = props.columns.map((col) => col.header).join(',');

    // Rows
    const rows = props.data.map((row) => {
        return props.columns
            .map((col) => {
                const value = row[col.field];
                // Escape commas and quotes
                if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
                    return `"${value.replace(/"/g, '""')}"`;
                }
                return value ?? '';
            })
            .join(',');
    });

    return [headers, ...rows].join('\n');
};
</script>

<template>
    <div class="bsa-data-table">
        <!-- Global Search and Actions -->
        <div v-if="searchable || showAddButton || exportable || $slots['header-actions']" class="mb-4">
            <div class="flex gap-2">
                <!-- Icon-only search mode -->
                <template v-if="searchable && searchIconOnly">
                    <input v-show="showSearchInput" v-model="globalSearchValue" type="text" placeholder="Search..."
                        class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all"
                        @input="onGlobalSearch" @blur="
                            () => {
                                if (!globalSearchValue) showSearchInput = false;
                            }
                        " />
                    <div v-show="!showSearchInput" class="flex-1"></div>
                </template>
                <!-- Full search input mode -->
                <input v-else-if="searchable && !searchIconOnly" v-model="globalSearchValue" type="text"
                    placeholder="Search..."
                    class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    @input="onGlobalSearch" />
                <div v-else-if="!searchable" class="flex-1"></div>

                <!-- Custom header actions slot -->
                <slot name="header-actions"></slot>

                <!-- Search icon button (icon-only mode) -->
                <button v-if="searchable && searchIconOnly"
                    class="px-4 py-2 bg-gray-600 dark:bg-gray-500 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
                    :class="{
                        'bg-primary-600 dark:bg-primary-600 hover:bg-primary-700 dark:hover:bg-primary-700':
                            showSearchInput || globalSearchValue,
                    }" @click="showSearchInput = !showSearchInput" title="Search">
                    <BsaIcons icon="Search" />
                </button>

                <button v-if="showAddButton"
                    class="px-4 py-2 bg-primary-600 dark:bg-primary-500 text-white rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors flex items-center"
                    @click="onAdd">
                    <BsaIcons icon="Plus" class="mr-2" />
                    {{ addButtonLabel }}
                </button>
                <button v-if="exportable"
                    class="px-4 py-2 bg-secondary-600 dark:bg-secondary-500 text-white rounded-lg hover:bg-secondary-700 dark:hover:bg-secondary-600 transition-colors flex items-center"
                    @click="exportCSV">
                    <BsaIcons icon="Download" class="mr-2" />
                    Export
                </button>
            </div>
        </div>

        <!-- DataTable -->
        <DataTable :value="filteredData" :loading="loading" :paginator="paginator" :rows="rows"
            :rows-per-page-options="rowsPerPageOptions" :total-records="computedTotalRecords" :lazy="lazy"
            :selection="selection" :selection-mode="selectionMode" :data-key="dataKey" :striped-rows="stripedRows"
            :show-gridlines="showGridlines" :responsive-layout="responsiveLayout" :scrollable="scrollable"
            :scroll-height="scrollHeight" :virtual-scroll="virtualScroll" :global-filter-fields="globalFilterFields"
            :filters="filters" class="bsa-datatable" @update:selection="onSelectionChange" @page="onPage" @sort="onSort"
            @filter="onFilter" @row-select="onRowSelect" @row-unselect="onRowUnselect">
            <!-- Selection Column -->
            <Column v-if="selectionMode" selection-mode="multiple" header-style="width: 3rem" :exportable="false" />

            <!-- Actions Column (FIRST Column) -->
            <Column v-if="$slots.actions || actions?.length" header="Actions" :exportable="false" frozen
                align-frozen="left" class="bsa-actions-column" :style="{ width: '100px' }">
                <template #body="{ data: rowData }">
                    <slot name="actions" :data="rowData">
                        <BsaTableActions v-if="actions" :actions="actions" :row-data="rowData" />
                    </slot>
                </template>
            </Column>

            <!-- Dynamic Columns -->
            <Column v-for="col in columns" :key="col.field" :field="col.field" :header="col.header"
                :sortable="col.sortable !== false" :filter-field="col.field"
                :show-filter-menu="col.filterable !== false" :filter-match-mode="col.filterMatchMode || 'contains'"
                :style="{ width: col.width }" :frozen="col.frozen" :class="col.class" :align="col.align">
                <!-- Custom Header Template -->
                <template v-if="col.headerTemplate" #header>
                    <slot :name="`header-${col.field}`" :column="col">
                        {{ col.header }}
                    </slot>
                </template>

                <!-- Custom Body Template -->
                <template v-if="col.bodyTemplate || $slots[`body-${col.field}`]" #body="{ data: rowData }">
                    <slot :name="`body-${col.field}`" :data="rowData" :field="col.field">
                        {{ rowData[col.field] }}
                    </slot>
                </template>
            </Column>

            <!-- Empty State -->
            <template #empty>
                <div class="text-center py-8 text-gray-500 dark:text-gray-400">
                    <BsaIcons icon="Inbox" class="text-4xl mb-3 block text-gray-500 dark:text-gray-400" />
                    <p class="text-lg">{{ emptyMessage || 'No records found' }}</p>
                </div>
            </template>

            <!-- Loading State -->
            <template #loading>
                <div class="text-center py-8">
                    <BsaIcons icon="Loader" class="animate-spin text-4xl text-primary-500 dark:text-primary-400" />
                </div>
            </template>
        </DataTable>
    </div>
</template>


<style scoped>
/*
.bsa-data-table {
    width: 100%;
}

.bsa-data-table .bsa-datatable {
    border-radius: 0.5rem;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    border: 1px solid #e5e7eb;
}

.dark .bsa-data-table .bsa-datatable {
    border-color: #374151;
}

.bsa-data-table .bsa-actions-column {
    min-width: 120px;
}

.bsa-data-table .bsa-actions-column td {
    padding-left: 0.25rem !important;
    padding-right: 0.25rem !important;
}
    */
</style>
