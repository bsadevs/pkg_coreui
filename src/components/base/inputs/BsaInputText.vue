<script setup lang="ts">
import { computed } from 'vue';
import type { BaseComponentProps } from '@/types/common';
import BsaIcons from '@/components/base/icons/BsaIcons.vue';

interface Props extends BaseComponentProps {
    modelValue?: string | number;
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
    label?: string;
    placeholder?: string;
    hint?: string;
    error?: string;
    required?: boolean;
    readonly?: boolean;
    icon?: string;
    clearable?: boolean;
    autocomplete?: string;
    maxlength?: number;
    minlength?: number;
    size?: 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<Props>(), {
    type: 'text',
    disabled: false,
    readonly: false,
    required: false,
    clearable: false,
    size: 'md',
});

const emit = defineEmits<{
    'update:modelValue': [value: string | number];
    blur: [event: FocusEvent];
    focus: [event: FocusEvent];
    enter: [event: KeyboardEvent];
    clear: [];
}>();

const inputId = computed(() => props.id || `input-${Math.random().toString(36).substr(2, 9)}`);

const containerClass = computed(() => props.class);

const inputClasses = computed(() => {
    const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2',
        lg: 'px-5 py-3 text-lg',
    };

    return [
        'block w-full rounded-lg border transition-colors duration-200',
        'focus:outline-none focus:ring-2 focus:ring-offset-0',
        sizeClasses[props.size],
        props.icon || '$slots.icon' ? 'pl-10' : '',
        props.clearable && props.modelValue ? 'pr-10' : '',
        props.error
            ? 'border-danger-300 text-danger-900 placeholder-danger-300 focus:ring-danger-500 focus:border-danger-500'
            : 'border-gray-300 dark:border-gray-600 focus:ring-primary-500 focus:border-primary-500 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400',
        props.disabled
            ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            : 'bg-white dark:bg-gray-700',
        props.readonly ? 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300' : '',
    ];
});

const onInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const value = props.type === 'number' ? Number(target.value) : target.value;
    emit('update:modelValue', value);
};

const onBlur = (event: FocusEvent) => {
    emit('blur', event);
};

const onFocus = (event: FocusEvent) => {
    emit('focus', event);
};

const onEnter = (event: KeyboardEvent) => {
    emit('enter', event);
};

const clear = () => {
    emit('update:modelValue', '');
    emit('clear');
};
</script>

<template>
    <div class="bsa-input-text" :class="containerClass">
        <label v-if="label" :for="inputId" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            :class="{ 'text-danger-600': error }">
            {{ label }}
            <span v-if="required" class="text-danger-500">*</span>
        </label>

        <div class="relative">
            <input :id="inputId" :type="type" :value="modelValue" :placeholder="placeholder" :disabled="disabled"
                :readonly="readonly" :required="required" :autocomplete="autocomplete" :maxlength="maxlength"
                :minlength="minlength" :class="inputClasses" @input="onInput" @blur="onBlur" @focus="onFocus"
                @keydown.enter="onEnter" />

            <div v-if="icon || $slots.icon"
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <slot name="icon">
                    <BsaIcons v-if="icon" :icon="icon" class="text-gray-400 dark:text-gray-300" />
                </slot>
            </div>

            <div v-if="clearable && modelValue" class="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button type="button"
                    class="text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-100"
                    @click="clear">
                    <BsaIcons icon="X" />
                </button>
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
