<template>
    <div class="bsa-form-row grid gap-4 mb-4" :class="gridClasses">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
    columns?: 1 | 2 | 3 | 4 | 6 | 12;
    gap?: 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<Props>(), {
    columns: 2,
    gap: 'md',
});

const gridClasses = computed(() => {
    const columnClasses = {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
        6: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-6',
        12: 'grid-cols-12',
    };

    const gapClasses = {
        sm: 'gap-2',
        md: 'gap-4',
        lg: 'gap-6',
    };

    return [columnClasses[props.columns], gapClasses[props.gap]];
});
</script>
