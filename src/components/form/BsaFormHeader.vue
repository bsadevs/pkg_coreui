<template>
    <div class="bsa-form-header mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center gap-3">
            <div v-if="icon || $slots.icon" class="flex-shrink-0">
                <slot name="icon">
                    <i :class="icon" class="text-3xl text-primary-600 dark:text-primary-400"></i>
                </slot>
            </div>

            <div class="flex-1">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    <slot name="title">{{ title }}</slot>
                </h2>
                <p v-if="subtitle || $slots.subtitle" class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    <slot name="subtitle">{{ subtitle }}</slot>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { FormHeaderProps } from './form.types';

interface Props extends FormHeaderProps {}

withDefaults(defineProps<Props>(), {});
</script>
