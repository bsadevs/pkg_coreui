<script setup lang="ts">
import { computed } from 'vue';
import type { BaseComponentProps } from '@/types/common';
import BsaIcons from '@/components/base/icons/BsaIcons.vue';

interface Props extends BaseComponentProps {
    modelValue?: string | Date;
    mode?: 'date' | 'datetime-local' | 'time' | 'month' | 'week';
    label?: string;
    placeholder?: string;
    hint?: string;
    error?: string;
    required?: boolean;
    readonly?: boolean;
    min?: string;
    max?: string;
    size?: 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<Props>(), {
    mode: 'date',
    disabled: false,
    readonly: false,
    required: false,
    size: 'md',
});

const emit = defineEmits<{
    'update:modelValue': [value: string | Date];
    change: [value: string | Date];
    blur: [event: FocusEvent];
    focus: [event: FocusEvent];
}>();

const inputId = computed(() => props.id || `date-${Math.random().toString(36).substr(2, 9)}`);

const containerClass = computed(() => props.class);

const formattedValue = computed(() => {
    if (!props.modelValue) return '';

    if (props.modelValue instanceof Date) {
        return formatDateForInput(props.modelValue);
    }

    return props.modelValue;
});

const inputClasses = computed(() => {
    const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2',
        lg: 'px-5 py-3 text-lg',
    };

    return [
        'block w-full rounded-lg border transition-colors duration-200',
        'focus:outline-none focus:ring-2 focus:ring-offset-0',
        'pr-10',
        sizeClasses[props.size],
        props.error
            ? 'border-danger-300 text-danger-900 focus:ring-danger-500 focus:border-danger-500'
            : 'border-gray-300 dark:border-gray-600 focus:ring-primary-500 focus:border-primary-500 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400',
        props.disabled
            ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            : 'bg-white dark:bg-gray-700',
        props.readonly ? 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300' : '',
    ];
});

const formatDateForInput = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    switch (props.mode) {
        case 'date':
            return `${year}-${month}-${day}`;
        case 'datetime-local':
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${year}-${month}-${day}T${hours}:${minutes}`;
        case 'time':
            const h = String(date.getHours()).padStart(2, '0');
            const m = String(date.getMinutes()).padStart(2, '0');
            return `${h}:${m}`;
        case 'month':
            return `${year}-${month}`;
        case 'week':
            const week = getWeekNumber(date);
            return `${year}-W${String(week).padStart(2, '0')}`;
        default:
            return '';
    }
};

const getWeekNumber = (date: Date): number => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
};

const onInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    emit('update:modelValue', value);
};

const onChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    emit('change', value);
};

const onBlur = (event: FocusEvent) => {
    emit('blur', event);
};

const onFocus = (event: FocusEvent) => {
    emit('focus', event);
};
</script>

<template>
    <div class="bsa-input-date" :class="containerClass">
        <label v-if="label" :for="inputId" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            :class="{ 'text-danger-600': error }">
            {{ label }}
            <span v-if="required" class="text-danger-500">*</span>
        </label>

        <div class="relative">
            <input :id="inputId" :type="mode" :value="formattedValue" :placeholder="placeholder" :disabled="disabled"
                :readonly="readonly" :required="required" :min="min" :max="max" :class="inputClasses" @input="onInput"
                @blur="onBlur" @focus="onFocus" @change="onChange" />

            <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <BsaIcons icon="Calendar" class="text-gray-400 dark:text-gray-300" />
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
