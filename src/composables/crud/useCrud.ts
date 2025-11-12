import { ref, computed, type Ref } from 'vue';
import type { CrudConfig, ApiResponse } from '@/types/common';

export function useCrud<T = any>(config: CrudConfig) {
    const { entityName, apiEndpoint, idField = 'id' } = config;

    const items = ref<T[]>([]) as Ref<T[]>;
    const currentItem = ref<T | null>(null);
    const loading = ref(false);
    const error = ref<string | null>(null);

    // Fetch all items
    const fetchAll = async (): Promise<T[]> => {
        loading.value = true;
        error.value = null;

        try {
            const response = await fetch(apiEndpoint);
            const data: ApiResponse<T[]> = await response.json();

            if (data.success) {
                items.value = data.data;
                return data.data;
            } else {
                throw new Error(data.message || `Failed to fetch ${entityName}`);
            }
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Unknown error';
            throw err;
        } finally {
            loading.value = false;
        }
    };

    // Fetch single item by ID
    const fetchById = async (id: string | number): Promise<T | null> => {
        loading.value = true;
        error.value = null;

        try {
            const response = await fetch(`${apiEndpoint}/${id}`);
            const data: ApiResponse<T> = await response.json();

            if (data.success) {
                currentItem.value = data.data;
                return data.data;
            } else {
                throw new Error(data.message || `Failed to fetch ${entityName}`);
            }
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Unknown error';
            throw err;
        } finally {
            loading.value = false;
        }
    };

    // Create new item
    const create = async (item: Partial<T>): Promise<T> => {
        loading.value = true;
        error.value = null;

        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item),
            });
            const data: ApiResponse<T> = await response.json();

            if (data.success) {
                items.value.push(data.data);
                currentItem.value = data.data;
                return data.data;
            } else {
                throw new Error(data.message || `Failed to create ${entityName}`);
            }
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Unknown error';
            throw err;
        } finally {
            loading.value = false;
        }
    };

    // Update existing item
    const update = async (id: string | number, item: Partial<T>): Promise<T> => {
        loading.value = true;
        error.value = null;

        try {
            const response = await fetch(`${apiEndpoint}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item),
            });
            const data: ApiResponse<T> = await response.json();

            if (data.success) {
                const index = items.value.findIndex((i: any) => i[idField] === id);
                if (index !== -1) {
                    items.value[index] = data.data;
                }
                currentItem.value = data.data;
                return data.data;
            } else {
                throw new Error(data.message || `Failed to update ${entityName}`);
            }
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Unknown error';
            throw err;
        } finally {
            loading.value = false;
        }
    };

    // Delete item
    const remove = async (id: string | number): Promise<boolean> => {
        loading.value = true;
        error.value = null;

        try {
            const response = await fetch(`${apiEndpoint}/${id}`, {
                method: 'DELETE',
            });
            const data: ApiResponse<boolean> = await response.json();

            if (data.success) {
                items.value = items.value.filter((i: any) => i[idField] !== id);
                if (currentItem.value && (currentItem.value as any)[idField] === id) {
                    currentItem.value = null;
                }
                return true;
            } else {
                throw new Error(data.message || `Failed to delete ${entityName}`);
            }
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Unknown error';
            throw err;
        } finally {
            loading.value = false;
        }
    };

    // Computed
    const hasItems = computed(() => items.value.length > 0);
    const isEmpty = computed(() => items.value.length === 0);

    return {
        // State
        items,
        currentItem,
        loading,
        error,

        // Computed
        hasItems,
        isEmpty,

        // Methods
        fetchAll,
        fetchById,
        create,
        update,
        remove,
        delete: remove, // Alias
    };
}
