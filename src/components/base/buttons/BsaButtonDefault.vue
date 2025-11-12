<script setup lang="ts">
import { computed } from 'vue';
import type { BaseComponentProps, Variant, Size, ButtonType } from '@/types/common';
import BsaIcons from '@/components/base/icons/BsaIcons.vue';

interface Props extends BaseComponentProps {
    type?: ButtonType;
    variant?: Variant;
    size?: Size;
    label?: string;
    icon?: string;
    iconPosition?: 'left' | 'right';
    loading?: boolean;
    block?: boolean;
    outlined?: boolean;
    rounded?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    type: 'button',
    variant: 'primary',
    size: 'md',
    iconPosition: 'left',
    disabled: false,
    loading: false,
    block: false,
    outlined: false,
    rounded: false,
});

const emit = defineEmits<{
    click: [event: MouseEvent];
}>();

const buttonClasses = computed(() => {
    const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
        xl: 'px-8 py-4 text-xl',
    };

    const variantClasses = props.outlined
        ? {
            primary:
                'border-2 border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20',
            secondary:
                'border-2 border-secondary-600 dark:border-secondary-400 text-secondary-600 dark:text-secondary-400 hover:bg-secondary-50 dark:hover:bg-secondary-900/20',
            success:
                'border-2 border-success-600 dark:border-success-400 text-success-600 dark:text-success-400 hover:bg-success-50 dark:hover:bg-success-900/20',
            warning:
                'border-2 border-warning-600 dark:border-warning-400 text-warning-600 dark:text-warning-400 hover:bg-warning-50 dark:hover:bg-warning-900/20',
            danger: 'border-2 border-danger-600 dark:border-danger-400 text-danger-600 dark:text-danger-400 hover:bg-danger-50 dark:hover:bg-danger-900/20',
            info: 'border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20',
        }
        : {
            primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
            secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500',
            success: 'bg-success-600 text-white hover:bg-success-700 focus:ring-success-500',
            warning: 'bg-warning-600 text-white hover:bg-warning-700 focus:ring-warning-500',
            danger: 'bg-danger-600 text-white hover:bg-danger-700 focus:ring-danger-500',
            info: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
        };

    return [
        'inline-flex items-center justify-center font-medium',
        'transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none',
        sizeClasses[props.size],
        variantClasses[props.variant],
        props.rounded ? 'rounded-full' : 'rounded-lg',
        props.block ? 'w-full' : '',
        !props.disabled && !props.loading ? 'hover:shadow-md hover:transform hover:scale-105' : '',
        props.class,
    ];
});

const onClick = (event: MouseEvent) => {
    if (!props.disabled && !props.loading) {
        emit('click', event);
    }
};
</script>

<template>
    <button :type="type" :disabled="disabled || loading" :class="buttonClasses" @click="onClick">
        <BsaIcons v-if="loading" icon="Spinner" class="animate-spin mr-2" />
        <BsaIcons v-else-if="icon && iconPosition === 'left'" :icon="icon" class="mr-2" />
        <span v-if="$slots.default || label">
            <slot>{{ label }}</slot>
        </span>
        <BsaIcons v-if="icon && iconPosition === 'right' && !loading" :icon="icon" class="ml-2" />
    </button>
</template>
