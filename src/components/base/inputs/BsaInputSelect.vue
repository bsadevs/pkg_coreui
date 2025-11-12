<script setup lang="ts">
import { computed } from 'vue';
import type { BaseComponentProps, SelectOption } from '@/types/common';
import BsaIcons from '@/components/base/icons/BsaIcons.vue';

interface Props extends BaseComponentProps {
    modelValue?: string | number | boolean | Array<string | number | boolean>;
    options: SelectOption[];
    label?: string;
    placeholder?: string;
    hint?: string;
    error?: string;
    required?: boolean;
    multiple?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<Props>(), {
    disabled: false,
    required: false,
    multiple: false,
    size: 'md',
});

const emit = defineEmits<{
    'update:modelValue': [value: string | number | boolean | Array<string | number | boolean>];
    change: [value: string | number | boolean | Array<string | number | boolean>];
    blur: [event: FocusEvent];
    focus: [event: FocusEvent];
}>();

const selectId = computed(() => props.id || `select-${Math.random().toString(36).substr(2, 9)}`);

const containerClass = computed(() => props.class);

const selectClasses = computed(() => {
    const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2',
        lg: 'px-5 py-3 text-lg',
    };

    return [
        'block w-full rounded-lg border transition-colors duration-200',
        'focus:outline-none focus:ring-2 focus:ring-offset-0',
        'appearance-none pr-10',
        sizeClasses[props.size],
        props.error
            ? 'border-danger-300 text-danger-900 focus:ring-danger-500 focus:border-danger-500'
            : 'border-gray-300 dark:border-gray-600 focus:ring-primary-500 focus:border-primary-500 text-gray-900 dark:text-gray-100',
        props.disabled
            ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            : 'bg-white dark:bg-gray-700',
    ];
});

const onChange = (event: Event) => {
    const target = event.target as HTMLSelectElement;

    if (props.multiple) {
        const selectedOptions = Array.from(target.selectedOptions).map((opt) => opt.value);
        emit('update:modelValue', selectedOptions);
        emit('change', selectedOptions);
    } else {
        const value = target.value;
        emit('update:modelValue', value);
        emit('change', value);
    }
};

const onBlur = (event: FocusEvent) => {
    emit('blur', event);
};

const onFocus = (event: FocusEvent) => {
    emit('focus', event);
};
</script>

<template>
    <div class="bsa-input-select" :class="containerClass">
        <label v-if="label" :for="selectId" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            :class="{ 'text-danger-600': error }">
            {{ label }}
            <span v-if="required" class="text-danger-500">*</span>
        </label>

        <div class="relative">
            <select :id="selectId" :value="modelValue" :disabled="disabled" :required="required" :multiple="multiple"
                :class="selectClasses" @change="onChange" @blur="onBlur" @focus="onFocus">
                <option v-if="placeholder && !multiple" value="" disabled
                    class="bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                    {{ placeholder }}
                </option>

                <option v-for="option in options" :key="String(option.value)" :value="option.value"
                    :disabled="option.disabled" class="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                    {{ option.label }}
                </option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <BsaIcons icon="ChevronDown" class="text-gray-400 dark:text-gray-300 text-xs" />
            </div>
        </div>

        <p v-if="hint && !error" class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {{ hint }}
        </p>

        <p v-if="error" class="mt-1 text-sm text-danger-600">
            {{ error }}
        </p>
    </div>
</template>
