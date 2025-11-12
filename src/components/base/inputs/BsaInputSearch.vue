<script setup lang="ts">
import { computed } from 'vue';
import type { BaseComponentProps } from '@/types/common';
import BsaIcons from '@/components/base/icons/BsaIcons.vue';

interface Props extends BaseComponentProps {
    modelValue?: string;
    label?: string;
    placeholder?: string;
    hint?: string;
    loading?: boolean;
    debounce?: number;
}

const props = withDefaults(defineProps<Props>(), {
    disabled: false,
    loading: false,
    debounce: 300,
});

const emit = defineEmits<{
    'update:modelValue': [value: string];
    search: [value: string];
    clear: [];
}>();

let debounceTimeout: ReturnType<typeof setTimeout> | null = null;

const inputId = computed(() => props.id || `search-${Math.random().toString(36).substr(2, 9)}`);

const containerClass = computed(() => props.class);

const onInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    emit('update:modelValue', value);

    // Debounced search
    if (debounceTimeout) {
        clearTimeout(debounceTimeout);
    }

    debounceTimeout = setTimeout(() => {
        emit('search', value);
    }, props.debounce);
};

const onSearch = () => {
    if (debounceTimeout) {
        clearTimeout(debounceTimeout);
    }
    emit('search', props.modelValue || '');
};

const clear = () => {
    if (debounceTimeout) {
        clearTimeout(debounceTimeout);
    }
    emit('update:modelValue', '');
    emit('clear');
    emit('search', '');
};
</script>

<template>
    <div class="bsa-input-search" :class="containerClass">
        <label v-if="label" :for="inputId" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {{ label }}
        </label>

        <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BsaIcons icon="Search" class="text-gray-400 dark:text-gray-300" />
            </div>

            <input :id="inputId" type="search" :value="modelValue" :placeholder="placeholder || 'Search...'"
                :disabled="disabled"
                class="block w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400"
                :class="{
                    'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed': disabled,
                }" @input="onInput" @keydown.enter="onSearch" @keydown.esc="clear" />

            <div v-if="modelValue || loading" class="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button v-if="!loading && modelValue" type="button"
                    class="text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-100"
                    @click="clear">
                    <BsaIcons icon="X" class="text-gray-400 dark:text-gray-300" />
                </button>
                <BsaIcons icon="Loader" class="animate-spin text-primary-500 dark:text-primary-400" />
            </div>
        </div>

        <p v-if="hint" class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {{ hint }}
        </p>
    </div>
</template>
