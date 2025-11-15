<script setup lang="ts">
import { computed } from 'vue';
import { iconsMap } from './iconsMap';

const props = defineProps<{
    icon?: any;
    size?: string;
    color?: string;
}>();

const IconComponent = computed(() => {
    if (typeof props.icon === 'string') {
        return iconsMap[props.icon] || iconsMap['X'];
    } else {
        return props.icon;
    }
});
</script>

<template>
    <component v-if="IconComponent" :is="IconComponent"
        :class="`${props.size || 'w-6 h-6'} ${props.color || 'text-white-700'}`" />
</template>
