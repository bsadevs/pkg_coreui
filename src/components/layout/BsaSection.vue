<script setup lang="ts">
import { computed } from 'vue';

interface Props {
    title?: string;
    description?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
    divider?: boolean;
    class?: string;
}

const props = withDefaults(defineProps<Props>(), {
    size: 'md',
    spacing: 'md',
    divider: false,
});

const sectionClasses = computed(() => {
    const spacingClasses = {
        none: '',
        sm: 'mb-4',
        md: 'mb-6',
        lg: 'mb-8',
        xl: 'mb-12',
    };

    return [
        spacingClasses[props.spacing],
        props.divider ? 'pb-6 border-b border-gray-200 dark:border-gray-700' : '',
        props.class,
    ];
});

const titleClasses = computed(() => {
    const sizeClasses = {
        sm: 'text-lg',
        md: 'text-xl',
        lg: 'text-2xl',
        xl: 'text-3xl',
    };

    return ['font-bold text-gray-900 dark:text-gray-100', sizeClasses[props.size]];
});
</script>

<template>
    <section class="bsa-section" :class="sectionClasses">
        <div v-if="title || $slots.header" class="bsa-section-header mb-4">
            <slot name="header">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 :class="titleClasses">{{ title }}</h2>
                        <p v-if="description" class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {{ description }}
                        </p>
                    </div>
                    <div v-if="$slots.actions">
                        <slot name="actions"></slot>
                    </div>
                </div>
            </slot>
        </div>

        <div class="bsa-section-content">
            <slot></slot>
        </div>
    </section>
</template>
