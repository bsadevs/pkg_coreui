import { watch, type Ref } from 'vue';

export interface PersistenceConfig {
    key: string;
    storage?: 'local' | 'session';
}

/**
 * Composable for persisting table data to localStorage or sessionStorage
 *
 * @param data - Reactive data to persist
 * @param config - Configuration options
 * @returns Object with restore and clear methods
 */
export function useTablePersistence<T = any>(data: Ref<T[]>, config: PersistenceConfig) {
    const { key, storage = 'local' } = config;
    const storageApi = storage === 'local' ? localStorage : sessionStorage;

    /**
     * Save data to storage
     */
    const save = () => {
        try {
            const serialized = JSON.stringify(data.value);
            storageApi.setItem(key, serialized);
        } catch (error) {
            console.error('Failed to save data to storage:', error);
        }
    };

    /**
     * Restore data from storage
     * @returns true if data was restored, false otherwise
     */
    const restore = (): boolean => {
        try {
            const stored = storageApi.getItem(key);
            if (stored) {
                const parsed = JSON.parse(stored);
                data.value = parsed;
                return true;
            }
            return false;
        } catch (error) {
            console.error('Failed to restore data from storage:', error);
            return false;
        }
    };

    /**
     * Clear data from storage
     */
    const clear = () => {
        try {
            storageApi.removeItem(key);
        } catch (error) {
            console.error('Failed to clear data from storage:', error);
        }
    };

    /**
     * Check if data exists in storage
     */
    const hasStoredData = (): boolean => {
        return storageApi.getItem(key) !== null;
    };

    // Watch for changes and auto-save
    watch(
        data,
        () => {
            save();
        },
        { deep: true },
    );

    return {
        save,
        restore,
        clear,
        hasStoredData,
    };
}
