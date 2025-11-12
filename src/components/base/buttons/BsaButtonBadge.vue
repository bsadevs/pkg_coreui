<script setup lang="ts">
import { computed } from 'vue'
import BsaIcons from '@/components/base/icons/BsaIcons.vue';
import { Bell } from 'lucide-vue-next';

interface Props {
    icon?: string
    count?: number
    size?: 'sm' | 'md' | 'lg'
    pulse?: boolean
    ping?: boolean
    showDot?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    icon: 'Bell',
    count: 0,
    size: 'md',
    pulse: false,
    ping: false,
    showDot: false
})

const emit = defineEmits<{
    'click': [event: MouseEvent]
}>()

const sizeClasses = computed(() => {
    const sizes = {
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12'
    }
    return sizes[props.size]
})

const iconSizeClasses = computed(() => {
    const sizes = {
        sm: 'text-lg',
        md: 'text-xl',
        lg: 'text-2xl'
    }
    return `${sizes[props.size]} text-gray-700 dark:text-gray-200`
})

const badgeSizeClasses = computed(() => {
    const sizes = {
        sm: 'min-w-[16px] h-4 text-[9px] px-1',
        md: 'min-w-[18px] h-[18px] text-[10px] px-1',
        lg: 'min-w-[20px] h-5 text-xs px-1.5'
    }
    return sizes[props.size]
})

const badgePositionClasses = computed(() => {
    const positions = {
        sm: 'top-0 right-0',
        md: 'top-0 right-0.5',
        lg: 'top-0.5 right-0.5'
    }
    return positions[props.size]
})

const dotSizeClasses = computed(() => {
    const sizes = {
        sm: 'w-2 h-2',
        md: 'w-2.5 h-2.5',
        lg: 'w-3 h-3'
    }
    return sizes[props.size]
})

const dotPositionClasses = computed(() => {
    const positions = {
        sm: 'top-1 right-1',
        md: 'top-1.5 right-1.5',
        lg: 'top-2 right-2'
    }
    return positions[props.size]
})
</script>

<template>
    <button :class="[
        'bsa-notification-badge relative inline-flex items-center justify-center',
        'hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors',
        sizeClasses
    ]" @click="emit('click', $event)">
        <BsaIcons :icon="icon" :class="iconSizeClasses" />
        <!-- Badge Count -->
        <span v-if="count > 0" :class="[
            'absolute rounded-full bg-danger-500 text-white font-bold flex items-center justify-center',
            'border-2 border-white dark:border-gray-800',
            badgeSizeClasses,
            badgePositionClasses,
            { 'animate-pulse': pulse }
        ]">
            {{ count > 99 ? '99+' : count }}
        </span>

        <!-- Dot Indicator -->
        <span v-if="showDot && count === 0" :class="[
            'absolute rounded-full bg-danger-500',
            dotSizeClasses,
            dotPositionClasses,
            { 'animate-ping': ping }
        ]"></span>
    </button>
</template>
