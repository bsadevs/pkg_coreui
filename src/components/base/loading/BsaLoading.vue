<script setup lang="ts">
import { computed } from 'vue'
import BsaIcons from '@/components/base/icons/BsaIcons.vue';

interface Props {
    isLoading: boolean
    type?: 'spinner' | 'dots' | 'pulse' | 'bars' | 'circle' | 'bounce' | 'wave'
    size?: 'sm' | 'md' | 'lg' | 'xl'
    message?: string
    submessage?: string
    fullscreen?: boolean
    overlay?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    type: 'spinner',
    size: 'md',
    fullscreen: false,
    overlay: false
})

const sizeMap = {
    sm: '32px',
    md: '48px',
    lg: '64px',
    xl: '96px'
}

const sizeClasses = computed(() => {
    const classes = {
        sm: 'text-2xl',
        md: 'text-4xl',
        lg: 'text-6xl',
        xl: 'text-8xl'
    }
    return classes[props.size]
})

const dotSizeClasses = computed(() => {
    const classes = {
        sm: 'w-2 h-2',
        md: 'w-3 h-3',
        lg: 'w-4 h-4',
        xl: 'w-6 h-6'
    }
    return classes[props.size]
})

const containerClasses = computed(() => [
    props.fullscreen ? 'fixed inset-0 z-50' : 'relative',
    props.overlay ? 'bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90' : '',
    'flex items-center justify-center p-4'
])
</script>

<template>
    <div v-if="isLoading" class="bsa-loading" :class="containerClasses">
        <div class="flex flex-col items-center justify-center gap-4">
            <!-- Spinner -->
            <div v-if="type === 'spinner'" :class="['animate-spin', sizeClasses]">
                <BsaIcons icon="Spinner" class="text-primary-600 dark:text-primary-400" />
            </div>

            <!-- Dots -->
            <div v-if="type === 'dots'" class="flex gap-2">
                <div v-for="i in 3" :key="i"
                    :class="['rounded-full bg-primary-600 dark:bg-primary-400 animate-bounce', dotSizeClasses]"
                    :style="{ animationDelay: `${i * 0.1}s` }"></div>
            </div>

            <!-- Pulse -->
            <div v-if="type === 'pulse'"
                :class="['rounded-full bg-primary-600 dark:bg-primary-400 animate-pulse', sizeClasses]"></div>

            <!-- Bars -->
            <div v-if="type === 'bars'" class="flex gap-1 items-end" :style="{ height: sizeMap[size] }">
                <div v-for="i in 4" :key="i"
                    :class="['w-2 bg-primary-600 dark:bg-primary-400 rounded-full animate-pulse']" :style="{
                        height: '100%',
                        animationDelay: `${i * 0.15}s`,
                        animationDuration: '1s'
                    }"></div>
            </div>

            <!-- Circle Progress -->
            <div v-if="type === 'circle'" class="relative" :style="{ width: sizeMap[size], height: sizeMap[size] }">
                <svg class="animate-spin" viewBox="0 0 50 50">
                    <circle class="stroke-gray-200 dark:stroke-gray-700" cx="25" cy="25" r="20" fill="none"
                        stroke-width="4"></circle>
                    <circle class="stroke-primary-600 dark:stroke-primary-400" cx="25" cy="25" r="20" fill="none"
                        stroke-width="4" stroke-dasharray="80, 200" stroke-linecap="round"></circle>
                </svg>
            </div>

            <!-- Bounce -->
            <div v-if="type === 'bounce'" class="flex gap-2">
                <div v-for="i in 4" :key="i"
                    :class="['rounded-full bg-primary-600 dark:bg-primary-400', dotSizeClasses]" :style="{
                        animation: 'bounce-up 0.8s ease-in-out infinite',
                        animationDelay: `${i * 0.12}s`
                    }"></div>
            </div>

            <!-- Wave -->
            <div v-if="type === 'wave'" class="flex gap-1 items-center">
                <div v-for="i in 5" :key="i"
                    :class="['bg-primary-600 dark:bg-primary-400 rounded-full', dotSizeClasses]" :style="{
                        animation: 'wave 1.2s ease-in-out infinite',
                        animationDelay: `${i * 0.1}s`
                    }"></div>
            </div>

            <!-- Message -->
            <div v-if="message" class="text-center">
                <p class="text-gray-700 dark:text-gray-100 font-medium">{{ message }}</p>
                <p v-if="submessage" class="text-sm text-gray-500 dark:text-gray-300 mt-1">{{ submessage }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
@keyframes bounce {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-10px);
    }
}

@keyframes bounce-up {

    0%,
    100% {
        transform: translateY(0) scale(1);
    }

    50% {
        transform: translateY(-12px) scale(1.1);
    }
}

@keyframes wave {

    0%,
    40%,
    100% {
        transform: scaleY(0.4);
    }

    20% {
        transform: scaleY(1);
    }
}
</style>
