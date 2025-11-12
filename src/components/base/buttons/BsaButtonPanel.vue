<script setup lang="ts">
import { computed } from 'vue';

interface Props {
    align?: 'left' | 'center' | 'right' | 'between' | 'around';
    vertical?: boolean;
    wrap?: boolean;
    gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
    class?: string;
}

const props = withDefaults(defineProps<Props>(), {
    align: 'left',
    vertical: false,
    wrap: false,
    gap: 'md',
});

const panelClasses = computed(() => {
    const alignClasses = {
        left: 'justify-start',
        center: 'justify-center',
        right: 'justify-end',
        between: 'justify-between',
        around: 'justify-around',
    };

    const gapClasses = {
        none: 'gap-0',
        sm: 'gap-1',
        md: 'gap-2',
        lg: 'gap-4',
        xl: 'gap-6',
    };

    return [
        props.vertical ? 'flex-col' : 'flex-row',
        alignClasses[props.align],
        gapClasses[props.gap],
        props.wrap ? 'flex-wrap' : '',
        props.class,
    ];
});
</script>

<template>
    <div class="bsa-button-panel flex gap-2" :class="panelClasses">
        <slot></slot>
    </div>
</template>

<style scoped>
.bsa-button-panel {
    display: flex;
    align-items: center;
}
</style>
