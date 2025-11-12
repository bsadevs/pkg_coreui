<script setup lang="ts">
import { computed } from 'vue';
import type { TableAction } from './table.types';

interface Props {
    actions: TableAction[];
    rowData: any;
}

const props = defineProps<Props>();

const visibleActions = computed(() => {
    return props.actions.filter((action) => {
        if (typeof action.visible === 'function') {
            return action.visible(props.rowData);
        }
        return true;
    });
});

const getActionClasses = (action: TableAction): string => {
    const variant = action.variant || 'primary';

    const variantClasses = {
        primary: 'bg-blue-500 hover:bg-blue-600 text-white',
        secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
        success: 'bg-green-500 hover:bg-green-600 text-white',
        warning: 'bg-yellow-500 hover:bg-yellow-600 text-white',
        danger: 'bg-red-500 hover:bg-red-600 text-white',
        info: 'bg-blue-500 hover:bg-blue-600 text-white',
    };

    return variantClasses[variant];
};

const handleAction = (action: TableAction) => {
    if (action.disabled?.(props.rowData)) {
        return;
    }
    action.onClick(props.rowData);
};
</script>

<template>
    <div class="bsa-table-actions flex gap-2 justify-start">
        <button
            v-for="(action, index) in visibleActions"
            :key="index"
            :disabled="action.disabled?.(rowData) || false"
            :class="[
                'w-8 h-8 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                getActionClasses(action),
            ]"
            :title="action.label"
            @click="handleAction(action)"
        >
            <i v-if="action.icon" :class="action.icon"></i>
        </button>
    </div>
</template>

<style scoped>
.bsa-table-actions button {
    outline: none;
    box-shadow: 0 0 0 2px transparent;
}

.bsa-table-actions button:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--tw-ring-color);
    outline-offset: 1px;
}

.bsa-table-actions button:hover:not(:disabled) {
    box-shadow:
        0 4px 6px -1px rgb(0 0 0 / 0.1),
        0 2px 4px -2px rgb(0 0 0 / 0.1);
    transform: scale(1.05);
}
</style>
