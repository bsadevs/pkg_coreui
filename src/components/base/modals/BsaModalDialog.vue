<script setup lang="ts">
import { computed, watch } from 'vue';
import type { Variant } from '@/types/common';
import BsaButtonDefault from '../buttons/BsaButtonDefault.vue';
import BsaIcons from '@/components/base/icons/BsaIcons.vue';

interface Props {
    modelValue: boolean;
    title?: string;
    subtitle?: string;
    icon?: string;
    iconColor?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    closable?: boolean;
    closeOnOverlay?: boolean;
    showHeader?: boolean;
    showFooter?: boolean;
    showCancel?: boolean;
    showConfirm?: boolean;
    cancelLabel?: string;
    confirmLabel?: string;
    confirmVariant?: Variant;
    loading?: boolean;
    scrollable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    size: 'md',
    closable: true,
    closeOnOverlay: true,
    showHeader: true,
    showFooter: true,
    showCancel: true,
    showConfirm: true,
    cancelLabel: 'Cancel',
    confirmLabel: 'Confirm',
    confirmVariant: 'primary',
    loading: false,
    scrollable: true,
});

const emit = defineEmits<{
    'update:modelValue': [value: boolean];
    close: [];
    cancel: [];
    confirm: [];
}>();

const isOpen = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
});

const modalClasses = computed(() => {
    const sizeClasses = {
        sm: 'max-w-sm w-full',
        md: 'max-w-md w-full',
        lg: 'max-w-2xl w-full',
        xl: 'max-w-4xl w-full',
        full: 'max-w-7xl w-full mx-4',
    };

    return [sizeClasses[props.size], 'max-h-[90vh] flex flex-col'];
});

const bodyClasses = computed(() => ['p-6', props.scrollable ? 'overflow-y-auto flex-1' : '']);

const close = () => {
    isOpen.value = false;
    emit('close');
};

const cancel = () => {
    emit('cancel');
    close();
};

const confirm = () => {
    emit('confirm');
};

const onOverlayClick = () => {
    if (props.closeOnOverlay && props.closable) {
        close();
    }
};

// Handle ESC key
const handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && isOpen.value && props.closable) {
        close();
    }
};

watch(isOpen, (value) => {
    if (value) {
        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';
    } else {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = '';
    }
});
</script>

<template>
    <Teleport to="body">
        <Transition name="modal">
            <div v-if="isOpen"
                class="bsa-modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
                @click.self="onOverlayClick">
                <div :class="modalClasses"
                    class="bg-white dark:bg-gray-800 rounded-lg shadow-xl transform transition-all" role="dialog"
                    aria-modal="true">
                    <!-- Header -->
                    <div v-if="showHeader"
                        class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                        <div class="flex items-center gap-3">
                            <BsaIcons v-if="icon" :icon="icon" :style="{ color: iconColor }" class="text-2xl" />
                            <div>
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                    <slot name="header">{{ title }}</slot>
                                </h3>
                                <p v-if="subtitle" class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                                    {{ subtitle }}
                                </p>
                            </div>
                        </div>
                        <button v-if="closable" type="button"
                            class="text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                            @click="close">
                            <BsaIcons icon="X" class="text-xl" />
                        </button>
                    </div>

                    <!-- Body -->
                    <div :class="bodyClasses" class="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                        <slot></slot>
                    </div>

                    <!-- Footer -->
                    <div v-if="showFooter || $slots.footer"
                        class="flex items-center justify-end gap-2 p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-b-lg">
                        <slot name="footer">
                            <BsaButtonDefault v-if="showCancel" variant="secondary" outlined :label="cancelLabel"
                                @click="cancel" />
                            <BsaButtonDefault v-if="showConfirm" :variant="confirmVariant" :label="confirmLabel"
                                :loading="loading" @click="confirm" />
                        </slot>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-active .bg-white,
.modal-leave-active .bg-white {
    transition: transform 0.3s ease;
}

.modal-enter-from .bg-white,
.modal-leave-to .bg-white {
    transform: scale(0.9);
}
</style>
