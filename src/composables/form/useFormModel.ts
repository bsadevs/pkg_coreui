import { ref, watch, computed } from 'vue';

export function useFormModel<T extends Record<string, any>>(initialData: T) {
    const formData = ref<T>({ ...initialData });
    const originalData = ref<T>({ ...initialData });
    const isDirty = ref(false);

    // Track which fields have been modified
    const dirtyFields = ref<Set<string>>(new Set());

    // Update a single field
    const updateField = (field: keyof T, value: any) => {
        formData.value[field] = value;
        dirtyFields.value.add(String(field));
        checkDirty();
    };

    // Update multiple fields
    const updateFields = (updates: Partial<T>) => {
        Object.keys(updates).forEach((key) => {
            formData.value[key as keyof T] = updates[key as keyof T] as any;
            dirtyFields.value.add(key);
        });
        checkDirty();
    };

    // Set all form data
    const setFormData = (data: T) => {
        formData.value = { ...data };
        checkDirty();
    };

    // Reset to original data
    const reset = () => {
        formData.value = { ...originalData.value };
        dirtyFields.value.clear();
        isDirty.value = false;
    };

    // Reset to new data and make it the original
    const resetTo = (data: T) => {
        formData.value = { ...data };
        originalData.value = { ...data };
        dirtyFields.value.clear();
        isDirty.value = false;
    };

    // Check if form is dirty
    const checkDirty = () => {
        isDirty.value = JSON.stringify(formData.value) !== JSON.stringify(originalData.value);
    };

    // Get changed fields
    const getChanges = (): Partial<T> => {
        const changes: Partial<T> = {};

        dirtyFields.value.forEach((field) => {
            const key = field as keyof T;
            if (formData.value[key] !== originalData.value[key]) {
                changes[key] = formData.value[key];
            }
        });

        return changes;
    };

    // Check if a specific field is dirty
    const isFieldDirty = (field: keyof T): boolean => {
        return formData.value[field] !== originalData.value[field];
    };

    // Revert a specific field
    const revertField = (field: keyof T) => {
        formData.value[field] = originalData.value[field];
        dirtyFields.value.delete(String(field));
        checkDirty();
    };

    // Computed
    const hasChanges = computed(() => isDirty.value);
    const changedFieldsList = computed(() => Array.from(dirtyFields.value));

    // Watch for changes
    watch(
        formData,
        () => {
            checkDirty();
        },
        { deep: true },
    );

    return {
        // State
        formData,
        originalData,
        isDirty,
        dirtyFields,

        // Computed
        hasChanges,
        changedFieldsList,

        // Methods
        updateField,
        updateFields,
        setFormData,
        reset,
        resetTo,
        getChanges,
        isFieldDirty,
        revertField,
    };
}
