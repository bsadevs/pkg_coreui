<script setup lang="ts">
import { computed } from 'vue';

interface Props {
    title?: string;
    subtitle?: string;
    icon?: string;
    iconColor?: string;
    showHeader?: boolean;
    showFooter?: boolean;
    padding?: boolean | 'none' | 'sm' | 'md' | 'lg';
    shadow?: boolean | 'sm' | 'md' | 'lg' | 'xl';
    border?: boolean;
    hoverable?: boolean;
    class?: string;
}

const props = withDefaults(defineProps<Props>(), {
    showHeader: true,
    showFooter: false,
    padding: 'md',
    shadow: true,
    border: true,
    hoverable: false,
});

const cardClasses = computed(() => {
    const shadowClasses = {
        false: '',
        true: 'shadow-md',
        sm: 'shadow-sm',
        md: 'shadow-md',
        lg: 'shadow-lg',
        xl: 'shadow-xl',
    };

    return [
        'bg-white dark:bg-gray-800 rounded-lg overflow-hidden transition-colors duration-300',
        props.border ? 'border border-gray-200 dark:border-gray-700' : '',
        shadowClasses[String(props.shadow) as keyof typeof shadowClasses],
        props.hoverable ? 'transition-shadow hover:shadow-lg' : '',
        props.class,
    ];
});

const headerClasses = computed(() => {
    const paddingClasses = {
        none: 'p-0',
        false: 'p-0',
        true: 'p-4',
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
    };

    return [
        'border-b border-gray-200 dark:border-gray-700',
        paddingClasses[String(props.padding) as keyof typeof paddingClasses],
    ];
});

const bodyClasses = computed(() => {
    const paddingClasses = {
        none: 'p-0',
        false: 'p-0',
        true: 'p-4',
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
    };

    return paddingClasses[String(props.padding) as keyof typeof paddingClasses];
});

const footerClasses = computed(() => {
    const paddingClasses = {
        none: 'p-0',
        false: 'p-0',
        true: 'p-4',
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
    };

    return [
        'border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900',
        paddingClasses[String(props.padding) as keyof typeof paddingClasses],
    ];
});
</script>

<template>
    <div class="bsa-card" :class="cardClasses">
        <div v-if="showHeader || $slots.header" class="bsa-card-header" :class="headerClasses">
            <slot name="header">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <i v-if="icon" :class="icon" class="text-2xl" :style="{ color: iconColor }"></i>
                        <div>
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">{{ title }}</h3>
                            <p v-if="subtitle" class="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                                {{ subtitle }}
                            </p>
                        </div>
                    </div>
                    <div v-if="$slots.actions" class="flex gap-2">
                        <slot name="actions"></slot>
                    </div>
                </div>
            </slot>
        </div>

        <div class="bsa-card-body" :class="bodyClasses">
            <slot></slot>
        </div>

        <div v-if="showFooter || $slots.footer" class="bsa-card-footer" :class="footerClasses">
            <slot name="footer"></slot>
        </div>
    </div>
</template>
