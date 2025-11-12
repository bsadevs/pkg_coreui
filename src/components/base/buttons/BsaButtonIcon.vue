<script setup lang="ts">
import { computed } from 'vue';
import type { BaseComponentProps, Variant, Size, ButtonType } from '@/types/common';
import BsaIcons from '@/components/base/icons/BsaIcons.vue';

interface Props extends BaseComponentProps {
    icon: string;
    type?: ButtonType;
    variant?: Variant;
    size?: Size;
    tooltip?: string;
    loading?: boolean;
    rounded?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    type: 'button',
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    rounded: true,
});

const emit = defineEmits<{
    click: [event: MouseEvent];
}>();

const buttonClasses = computed(() => {
    const sizeClasses = {
        sm: 'w-8 h-8 text-sm',
        md: 'w-10 h-10 text-base',
        lg: 'w-12 h-12 text-lg',
        xl: 'w-14 h-14 text-xl',
    };

    const variantClasses = {
        primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
        secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500',
        success: 'bg-success-600 text-white hover:bg-success-700 focus:ring-success-500',
        warning: 'bg-warning-600 text-white hover:bg-warning-700 focus:ring-warning-500',
        danger: 'bg-danger-600 text-white hover:bg-danger-700 focus:ring-danger-500',
        info: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    };

    return [
        'inline-flex items-center justify-center',
        'transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        sizeClasses[props.size],
        variantClasses[props.variant],
        props.rounded ? 'rounded-full' : 'rounded-lg',
        !props.disabled && !props.loading ? 'hover:shadow-md hover:transform hover:scale-110' : '',
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
    <button :type="type" :disabled="disabled || loading" :class="buttonClasses" :title="tooltip" @click="onClick">
        <BsaIcons v-if="loading" icon="Spinner" class="animate-spin" />
        <BsaIcons v-else :icon="icon" />
    </button>
</template>
