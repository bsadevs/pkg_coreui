<script setup lang="ts">
import { computed } from 'vue';
import BsaIcons from '@/components/base/icons/BsaIcons.vue';
import { ChevronRight } from 'lucide-vue-next';

interface Breadcrumb {
    label: string;
    to?: string;
}

interface Props {
    title?: string;
    description?: string;
    breadcrumbs?: Breadcrumb[];
    showBreadcrumb?: boolean;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
    padding?: boolean;
    class?: string;
}

const props = withDefaults(defineProps<Props>(), {
    showBreadcrumb: true,
    maxWidth: 'full',
    padding: true,
});

const containerClasses = computed(() => {
    const maxWidthClasses = {
        sm: 'max-w-screen-sm',
        md: 'max-w-screen-md',
        lg: 'max-w-screen-lg',
        xl: 'max-w-screen-xl',
        '2xl': 'max-w-screen-2xl',
        full: 'w-full',
    };

    return ['mx-auto', maxWidthClasses[props.maxWidth], props.padding ? 'p-6' : '', props.class];
});
</script>

<template>
    <div class="bsa-page-container" :class="containerClasses">
        <div v-if="showBreadcrumb || $slots.breadcrumb" class="mb-4">
            <slot name="breadcrumb">
                <nav class="flex" aria-label="Breadcrumb">
                    <ol class="inline-flex items-center space-x-1 md:space-x-3">
                        <li v-for="(item, index) in breadcrumbs" :key="index" class="inline-flex items-center">
                            <BsaIcons v-if="index > 0" :icon="ChevronRight" class="text-gray-400 text-xs mx-2" />
                            <a v-if="item.to" :href="item.to"
                                class="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                                {{ item.label }}
                            </a>
                            <span v-else class="text-sm font-medium text-gray-500 dark:text-gray-400">
                                {{ item.label }}
                            </span>
                        </li>
                    </ol>
                </nav>
            </slot>
        </div>

        <div v-if="title || $slots.header" class="mb-6">
            <slot name="header">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">{{ title }}</h1>
                        <p v-if="description" class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            {{ description }}
                        </p>
                    </div>
                    <div v-if="$slots.actions" class="flex gap-2">
                        <slot name="actions"></slot>
                    </div>
                </div>
            </slot>
        </div>

        <div class="bsa-page-content">
            <slot></slot>
        </div>

        <div v-if="$slots.footer" class="mt-6">
            <slot name="footer"></slot>
        </div>
    </div>
</template>
