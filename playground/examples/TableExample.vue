<script setup lang="ts">
import { ref, onMounted } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import PrimeVue from 'primevue/config';

import {
    BsaContainer,
    BsaCard,
    BsaDataTable,
    BsaModalDialog,
    BsaInputText,
    BsaInputSelect,
    BsaButtonDefault,
} from '@/components';
import type { TableColumn, TableAction } from '@/components/table/table.types';
import type { SelectOption } from '@/types/common';
import { useTablePersistence } from '@/composables/table/useTablePersistence';

interface User {
    id: number;
    product: string;
    status: 'active' | 'inactive';
    createdDate: string;
}

const loading = ref(false);
const showDeleteModal = ref(false);
const userToDelete = ref<User | null>(null);
const showAddModal = ref(false);
const isEditMode = ref(false);
const editingUser = ref<User | null>(null);
const newUserDescription = ref('');
const newUserStatus = ref<'active' | 'inactive'>('active');
const activeTab = ref<'principal' | 'stock' | 'price' | 'tax' | 'production' | 'observation' | 'composition'>(
    'principal',
);
const isTabMenuCollapsed = ref(false);

// Form data for each tab
const formData = ref({
    principal: {
        ims_categories_text: '',
        ims_groups_text: '',
        type_product: '',
        identification: '',
        bar_code: '',
        helper_code: '',
    },
    stock: {
        ims_measures_text: '',
        gross_weight: '',
        net_weight: '',
        quantity_stock: '',
        quantity_stock_min: '',
        quantity_stock_max: '',
        quantity_committed: '',
    },
    price: {
        price_sale: '',
        price_cost: '',
        price_cost_total: '',
        value_profit: '',
        contribution_margin: '',
    },
    tax: {
        ims_ncm_text: '',
        ims_taxes_text: '',
        honor: '',
    },
    production: {
        ppc_lots_text: '',
        lot_number: '',
        design: '',
    },
    observation: {
        adm_entities_text: '',
        image: '',
        observation: '',
    },
    composition: {
        note: 'LEAVE FOR LATER: IMS_COMPOSITIONS DETAIL TABLE SCREEN',
    },
});

// Initial default data
const defaultUsers: User[] = [
    { id: 1, product: 'Product A', status: 'active', createdDate: '2025-01-15' },
    { id: 2, product: 'Product B', status: 'active', createdDate: '2025-02-20' },
    { id: 3, product: 'Product C', status: 'inactive', createdDate: '2025-03-10' },
    { id: 4, product: 'Product D', status: 'active', createdDate: '2025-04-05' },
];

const users = ref<User[]>([...defaultUsers]);

// Set up persistence with localStorage
const { restore, clear, hasStoredData } = useTablePersistence(users, {
    key: 'bsa-datatable-users',
    storage: 'local', // Use 'local' for localStorage or 'session' for sessionStorage
});

// Restore data from localStorage on mount
onMounted(() => {
    const wasRestored = restore();
    if (wasRestored) {
        console.log('Data restored from localStorage');
    } else {
        console.log('No stored data found, using default data');
    }
});

const columns: TableColumn[] = [
    { field: 'id', header: 'ID', sortable: true, width: '80px' },
    { field: 'product', header: 'Product', sortable: true, filterable: true },
    { field: 'status', header: 'Status', bodyTemplate: 'status' },
    { field: 'createdDate', header: 'Included', sortable: true, bodyTemplate: 'createdDate' },
];

const statusOptions: SelectOption[] = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
];

// Table actions - displayed as icon-only buttons, label shown as tooltip
const actions: TableAction[] = [
    {
        label: 'Edit', // Tooltip text
        icon: 'Pencil', // Icon only (no text shown)
        variant: 'primary',
        onClick: (row: User) => {
            onEdit(row);
        },
    },
    {
        label: 'Delete', // Tooltip text
        icon: 'Trash2', // Icon only (no text shown)
        variant: 'danger',
        onClick: (row: User) => {
            userToDelete.value = row;
            showDeleteModal.value = true;
        },
    },
];

const onPage = (event: any) => {
    console.log('Page changed:', event);
};

const onSort = (event: any) => {
    console.log('Sort changed:', event);
};

const onAdd = () => {
    isEditMode.value = false;
    editingUser.value = null;
    resetFormData();
    showAddModal.value = true;
};

const onEdit = (row: User) => {
    isEditMode.value = true;
    editingUser.value = row;

    // Populate form with row data
    newUserDescription.value = row.product;
    newUserStatus.value = row.status;

    // Reset tab to principal
    activeTab.value = 'principal';

    // Note: In a real application, you would fetch and populate all the formData fields
    // For now, we'll just show the basic info since the User interface doesn't have all fields

    showAddModal.value = true;
};

const resetFormData = () => {
    newUserDescription.value = '';
    newUserStatus.value = 'active';
    activeTab.value = 'principal';
    isTabMenuCollapsed.value = false;
    formData.value = {
        principal: {
            ims_categories_text: '',
            ims_groups_text: '',
            type_product: '',
            identification: '',
            bar_code: '',
            helper_code: '',
        },
        stock: {
            ims_measures_text: '',
            gross_weight: '',
            net_weight: '',
            quantity_stock: '',
            quantity_stock_min: '',
            quantity_stock_max: '',
            quantity_committed: '',
        },
        price: {
            price_sale: '',
            price_cost: '',
            price_cost_total: '',
            value_profit: '',
            contribution_margin: '',
        },
        tax: {
            ims_ncm_text: '',
            ims_taxes_text: '',
            honor: '',
        },
        production: {
            ppc_lots_text: '',
            lot_number: '',
            design: '',
        },
        observation: {
            adm_entities_text: '',
            image: '',
            observation: '',
        },
        composition: {
            note: 'LEAVE FOR LATER: IMS_COMPOSITIONS DETAIL TABLE SCREEN',
        },
    };
};

const handleCancelAdd = () => {
    showAddModal.value = false;
    isEditMode.value = false;
    editingUser.value = null;
    resetFormData();
};

const confirmAdd = () => {
    if (!newUserDescription.value.trim()) {
        return;
    }

    if (isEditMode.value && editingUser.value) {
        // Update existing user
        const index = users.value.findIndex((u) => u.id === editingUser.value!.id);
        if (index !== -1) {
            users.value[index] = {
                ...users.value[index],
                product: newUserDescription.value,
                status: newUserStatus.value,
            };

            console.log('Item updated with full data:', {
                basic: users.value[index],
                formData: formData.value,
            });
        }
    } else {
        // Create new user with auto-incremented ID
        const newId = Math.max(...users.value.map((u) => u.id)) + 1;
        const newUser: User = {
            id: newId,
            product: newUserDescription.value,
            status: newUserStatus.value,
            createdDate: new Date().toISOString().split('T')[0],
        };

        users.value.push(newUser);

        // Log all form data for debugging
        console.log('New item added with full data:', {
            basic: newUser,
            formData: formData.value,
        });
    }

    // Reset and close
    showAddModal.value = false;
    isEditMode.value = false;
    editingUser.value = null;
    resetFormData();
};

const cancelDelete = () => {
    showDeleteModal.value = false;
    userToDelete.value = null;
};

const confirmDelete = () => {
    if (userToDelete.value) {
        // Remove the user from the array
        const index = users.value.findIndex((u) => u.id === userToDelete.value!.id);
        if (index !== -1) {
            users.value.splice(index, 1);
        }
    }
    // Close the modal and reset
    showDeleteModal.value = false;
    userToDelete.value = null;
};

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const resetData = () => {
    // Clear localStorage
    clear();
    // Reset to default data
    users.value = [...defaultUsers];
    console.log('Data reset to defaults');
};
</script>

<template>
    <div>
        <!-- Full Page Add/Edit View -->
        <div v-if="showAddModal" class="page-transition">
            <BsaContainer :title="isEditMode ? 'Edit Item' : 'Add New Item'"
                :description="isEditMode ? 'Update the details of the item' : 'Fill in the details to add a new item'">
                <BsaCard>
                    <!-- Description and Status on same row -->
                    <div class="space-y-4 p-6 bg-white dark:bg-gray-800 transition-colors">
                        <div class="grid grid-cols-2 gap-4">
                            <BsaInputText v-model="newUserDescription" label="Description"
                                placeholder="Enter product description" required />

                            <BsaInputSelect v-model="newUserStatus" label="Status" :options="statusOptions" required />
                        </div>

                        <!-- Tab Menu -->
                        <div class="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                            <div class="flex items-center justify-between">
                                <nav class="flex space-x-8" aria-label="Tabs">
                                    <button v-for="tab in [
                                        'principal',
                                        'stock',
                                        'price',
                                        'tax',
                                        'production',
                                        'observation',
                                        'composition',
                                    ] as const" :key="tab" @click="
                                        activeTab = tab as
                                        | 'principal'
                                        | 'stock'
                                        | 'price'
                                        | 'tax'
                                        | 'production'
                                        | 'observation'
                                        | 'composition'
                                        " :class="[
                                            'px-4 py-3 text-base font-medium capitalize transition-colors',
                                            activeTab === tab
                                                ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400 dark:border-primary-400'
                                                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200',
                                        ]">
                                        {{ tab }}
                                    </button>
                                </nav>
                                <!-- Collapse/Expand Toggle Button 'pi transition-transform duration-300',-->
                                <button @click="isTabMenuCollapsed = !isTabMenuCollapsed"
                                    class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                    :title="isTabMenuCollapsed ? 'Expand properties' : 'Collapse properties'">
                                    <i :class="[
                                        'X',
                                        isTabMenuCollapsed ? 'pi-angle-down' : 'pi-angle-up',
                                    ]" class="text-gray-600 dark:text-gray-400"></i>
                                </button>
                            </div>
                        </div>

                        <!-- Tab Content -->
                        <div class="tab-content-wrapper overflow-hidden transition-all duration-300 ease-in-out bg-white dark:bg-gray-800"
                            :class="{ 'is-collapsed': isTabMenuCollapsed }"
                            :style="{ height: isTabMenuCollapsed ? '0' : '350px' }">
                            <div v-show="!isTabMenuCollapsed" class="tab-content-inner pt-4 bg-white dark:bg-gray-800"
                                :style="{ height: '350px' }">
                                <!-- Principal Tab -->
                                <div v-if="activeTab === 'principal'" class="space-y-4">
                                    <div class="grid grid-cols-2 gap-4">
                                        <BsaInputText v-model="formData.principal.ims_categories_text"
                                            label="IMS Categories" placeholder="Enter category" />
                                        <BsaInputText v-model="formData.principal.ims_groups_text" label="IMS Groups"
                                            placeholder="Enter group" />
                                    </div>
                                    <div class="grid grid-cols-2 gap-4">
                                        <BsaInputText v-model="formData.principal.type_product" label="Type Product"
                                            placeholder="Enter product type" />
                                        <BsaInputText v-model="formData.principal.identification" label="Identification"
                                            placeholder="Enter identification" />
                                    </div>
                                    <div class="grid grid-cols-2 gap-4">
                                        <BsaInputText v-model="formData.principal.bar_code" label="Bar Code"
                                            placeholder="Enter bar code" />
                                        <BsaInputText v-model="formData.principal.helper_code" label="Helper Code"
                                            placeholder="Enter helper code" />
                                    </div>
                                </div>

                                <!-- Stock Tab -->
                                <div v-if="activeTab === 'stock'" class="space-y-4">
                                    <BsaInputText v-model="formData.stock.ims_measures_text" label="IMS Measures"
                                        placeholder="Enter measure" />
                                    <div class="grid grid-cols-2 gap-4">
                                        <BsaInputText v-model="formData.stock.gross_weight" type="number"
                                            label="Gross Weight" placeholder="0" />
                                        <BsaInputText v-model="formData.stock.net_weight" type="number"
                                            label="Net Weight" placeholder="0" />
                                    </div>
                                    <div class="grid grid-cols-2 gap-4">
                                        <BsaInputText v-model="formData.stock.quantity_stock" type="number"
                                            label="Quantity Stock" placeholder="0" />
                                        <BsaInputText v-model="formData.stock.quantity_stock_min" type="number"
                                            label="Quantity Stock Min" placeholder="0" />
                                    </div>
                                    <div class="grid grid-cols-2 gap-4">
                                        <BsaInputText v-model="formData.stock.quantity_stock_max" type="number"
                                            label="Quantity Stock Max" placeholder="0" />
                                        <BsaInputText v-model="formData.stock.quantity_committed" type="number"
                                            label="Quantity Committed" placeholder="0" />
                                    </div>
                                </div>

                                <!-- Price Tab -->
                                <div v-if="activeTab === 'price'" class="space-y-4">
                                    <div class="grid grid-cols-2 gap-4">
                                        <BsaInputText v-model="formData.price.price_sale" type="number"
                                            label="Price Sale" placeholder="0.00" />
                                        <BsaInputText v-model="formData.price.price_cost" type="number"
                                            label="Price Cost" placeholder="0.00" />
                                    </div>
                                    <div class="grid grid-cols-2 gap-4">
                                        <BsaInputText v-model="formData.price.price_cost_total" type="number"
                                            label="Price Cost Total" placeholder="0.00" />
                                        <BsaInputText v-model="formData.price.value_profit" type="number"
                                            label="Value Profit" placeholder="0.00" />
                                    </div>
                                    <BsaInputText v-model="formData.price.contribution_margin" type="number"
                                        label="Contribution Margin" placeholder="0.00" />
                                </div>

                                <!-- Tax Tab -->
                                <div v-if="activeTab === 'tax'" class="space-y-4">
                                    <BsaInputText v-model="formData.tax.ims_ncm_text" label="IMS NCM"
                                        placeholder="Enter NCM code" />
                                    <BsaInputText v-model="formData.tax.ims_taxes_text" label="IMS Taxes"
                                        placeholder="Enter tax information" />
                                    <BsaInputText v-model="formData.tax.honor" label="Honor"
                                        placeholder="Enter honor" />
                                </div>

                                <!-- Production Tab -->
                                <div v-if="activeTab === 'production'" class="space-y-4">
                                    <BsaInputText v-model="formData.production.ppc_lots_text" label="PPC Lots"
                                        placeholder="Enter lot information" />
                                    <div class="grid grid-cols-2 gap-4">
                                        <BsaInputText v-model="formData.production.lot_number" label="Lot Number"
                                            placeholder="Enter lot number" />
                                        <BsaInputText v-model="formData.production.design" label="Design"
                                            placeholder="Enter design" />
                                    </div>
                                </div>

                                <!-- Observation Tab -->
                                <div v-if="activeTab === 'observation'" class="space-y-4">
                                    <BsaInputText v-model="formData.observation.adm_entities_text" label="ADM Entities"
                                        placeholder="Enter entity information" />
                                    <BsaInputText v-model="formData.observation.image" label="Image"
                                        placeholder="Enter image URL or path" />
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Observation
                                        </label>
                                        <textarea v-model="formData.observation.observation" rows="4"
                                            placeholder="Enter observations"
                                            class="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-colors"></textarea>
                                    </div>
                                </div>

                                <!-- Composition Tab -->
                                <div v-if="activeTab === 'composition'" class="space-y-4">
                                    <div
                                        class="flex items-center justify-center p-8 bg-yellow-50 dark:bg-yellow-900/30 border-2 border-yellow-200 dark:border-yellow-700 rounded-lg transition-colors">
                                        <div class="text-center">
                                            <i
                                                class="Info text-4xl text-yellow-600 dark:text-yellow-400 mb-3 block"></i>
                                            <p class="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                                                LEAVE FOR LATER
                                            </p>
                                            <p class="text-sm text-yellow-700 dark:text-yellow-300">
                                                IMS_COMPOSITIONS DETAIL TABLE SCREEN
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div
                            class="flex items-center justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <BsaButtonDefault variant="secondary" outlined label="Cancel" @click="handleCancelAdd" />
                            <BsaButtonDefault variant="primary" :label="isEditMode ? 'Update' : 'Add'"
                                @click="confirmAdd" />
                        </div>
                    </div>
                </BsaCard>
            </BsaContainer>
        </div>

        <!-- Main Table View -->
        <BsaContainer v-else title="Data Table Example" description="Example usage of BsaDataTable component">
            <BsaCard>
                <BsaDataTable :data="users" :columns="columns" :loading="loading" :paginator="true" :rows="10"
                    :actions="actions" :searchable="true" :search-icon-only="true" :show-add-button="true"
                    add-button-label="Add" @page="onPage" @sort="onSort" @add="onAdd">
                    <!-- Reset Data button in header actions slot (next to search) -->
                    <template #header-actions>
                        <button
                            class="px-4 py-2 bg-gray-600 dark:bg-gray-500 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors flex items-center text-sm"
                            @click="resetData" :title="hasStoredData() ? 'Clear saved data and restore defaults' : 'No stored data to clear'
                                ">
                            <i class="RefreshCcw"></i>
                            Reset
                            <span v-if="hasStoredData()"
                                class="ml-2 bg-red-500 dark:bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">Saved</span>
                        </button>
                    </template>
                    <!-- Custom status column -->
                    <template #body-status="{ data }">
                        <span :class="{
                            'px-2 py-1 rounded-full text-xs font-medium': true,
                            'bg-success-100 dark:bg-success-900 text-success-700 dark:text-success-300':
                                data.status === 'active',
                            'bg-danger-100 dark:bg-danger-900 text-danger-700 dark:text-danger-300':
                                data.status === 'inactive',
                        }">
                            {{ data.status }}
                        </span>
                    </template>

                    <!-- Custom included column -->
                    <template #body-createdDate="{ data }">
                        <span class="text-gray-700 dark:text-gray-300">
                            {{ formatDate(data.createdDate) }}
                        </span>
                    </template>
                </BsaDataTable>
            </BsaCard>

            <!-- Delete Confirmation Modal -->
            <BsaModalDialog v-model="showDeleteModal" title="Confirm Delete"
                subtitle="Are you sure you want to delete this item?" icon="X" icon-color="#dc2626" size="sm"
                confirm-label="Delete" confirm-variant="danger" cancel-label="Cancel" @cancel="cancelDelete"
                @confirm="confirmDelete">
                <p class="text-gray-700 dark:text-gray-300">
                    This action cannot be undone. The selected item will be permanently removed.
                </p>
                <div v-if="userToDelete" class="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg transition-colors">
                    <p class="text-sm text-gray-900 dark:text-gray-100">
                        <strong>Product:</strong> {{ userToDelete.product }}
                    </p>
                    <p class="text-sm text-gray-900 dark:text-gray-100">
                        <strong>Status:</strong> {{ userToDelete.status }}
                    </p>
                    <p class="text-sm text-gray-900 dark:text-gray-100">
                        <strong>Included:</strong> {{ formatDate(userToDelete.createdDate) }}
                    </p>
                </div>
            </BsaModalDialog>
        </BsaContainer>
    </div>
</template>

<style scoped>
/* Page transition animations */
.page-transition {
    animation: fadeInUp 0.3s ease-out;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Tab content wrapper - prevents scrollbar during collapse/expand */
.tab-content-wrapper {
    overflow: hidden !important;
}

.tab-content-wrapper.is-collapsed {
    overflow: hidden !important;
}

.tab-content-inner {
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: thin;
    scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
    transition: background-color 0.3s ease;
}

.tab-content-inner::-webkit-scrollbar {
    width: 6px;
}

.tab-content-inner::-webkit-scrollbar-track {
    background: transparent;
}

.tab-content-inner::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0.5);
    border-radius: 3px;
    transition: background-color 0.2s ease;
}

.tab-content-inner::-webkit-scrollbar-thumb:hover {
    background-color: rgba(156, 163, 175, 0.7);
}

/* Dark mode scrollbar */
.dark .tab-content-inner {
    scrollbar-color: rgba(75, 85, 99, 0.6) transparent;
}

.dark .tab-content-inner::-webkit-scrollbar-thumb {
    background-color: rgba(75, 85, 99, 0.6);
}

.dark .tab-content-inner::-webkit-scrollbar-thumb:hover {
    background-color: rgba(75, 85, 99, 0.8);
}
</style>
