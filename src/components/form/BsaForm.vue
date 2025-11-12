<template>
    <form class="bsa-form" :class="formClasses" @submit.prevent="onSubmit">
        <BsaFormHeader v-if="showHeader && (title || $slots.header)" :title="title" :subtitle="subtitle" :icon="icon">
            <template v-if="$slots.header" #default>
                <slot name="header"></slot>
            </template>
        </BsaFormHeader>

        <div class="bsa-form-body">
            <slot :form-data="formData" :errors="validationErrors"></slot>
        </div>

        <BsaFormFooter
            v-if="showFooter"
            :submit-label="submitLabel"
            :cancel-label="cancelLabel"
            :reset-label="resetLabel"
            :show-submit="showSubmit"
            :show-cancel="showCancel"
            :show-reset="showReset"
            :submit-disabled="submitDisabled || !isValid"
            :loading="loading"
            @submit="onSubmit"
            @cancel="onCancel"
            @reset="onReset"
        >
            <template v-if="$slots.footer" #default>
                <slot name="footer"></slot>
            </template>
        </BsaFormFooter>
    </form>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { FormField } from './form.types';
import type { ValidationError } from '@/types/common';
import BsaFormHeader from './BsaFormHeader.vue';
import BsaFormFooter from './BsaFormFooter.vue';

interface Props {
    modelValue?: Record<string, any>;
    fields?: FormField[];
    title?: string;
    subtitle?: string;
    icon?: string;
    mode?: 'create' | 'edit' | 'view';
    showHeader?: boolean;
    showFooter?: boolean;
    showSubmit?: boolean;
    showCancel?: boolean;
    showReset?: boolean;
    submitLabel?: string;
    cancelLabel?: string;
    resetLabel?: string;
    loading?: boolean;
    validate?: boolean;
    class?: string;
}

const props = withDefaults(defineProps<Props>(), {
    mode: 'create',
    showHeader: true,
    showFooter: true,
    showSubmit: true,
    showCancel: true,
    showReset: false,
    submitLabel: 'Submit',
    cancelLabel: 'Cancel',
    resetLabel: 'Reset',
    loading: false,
    validate: true,
});

const emit = defineEmits<{
    'update:modelValue': [value: Record<string, any>];
    submit: [data: Record<string, any>];
    cancel: [];
    reset: [];
    validate: [errors: ValidationError[]];
}>();

const formData = ref<Record<string, any>>(props.modelValue || {});
const validationErrors = ref<ValidationError[]>([]);
const touched = ref<Set<string>>(new Set());

const formClasses = computed(() => props.class);

const isValid = computed(() => {
    if (!props.validate) return true;
    return validationErrors.value.length === 0;
});

const submitDisabled = computed(() => {
    if (props.mode === 'view') return true;
    return false;
});

watch(
    () => props.modelValue,
    (newValue) => {
        if (newValue) {
            formData.value = { ...newValue };
        }
    },
    { deep: true },
);

watch(
    formData,
    (newValue) => {
        emit('update:modelValue', newValue);
        if (props.validate) {
            validateForm();
        }
    },
    { deep: true },
);

const validateForm = () => {
    const errors: ValidationError[] = [];

    if (props.fields) {
        props.fields.forEach((field) => {
            const value = formData.value[field.name];

            if (field.required && !value) {
                errors.push({
                    field: field.name,
                    message: `${field.label} is required`,
                });
            }

            if (field.validation) {
                const validation = field.validation;

                if (validation.minLength && value && value.length < validation.minLength) {
                    errors.push({
                        field: field.name,
                        message:
                            validation.message || `${field.label} must be at least ${validation.minLength} characters`,
                    });
                }

                if (validation.maxLength && value && value.length > validation.maxLength) {
                    errors.push({
                        field: field.name,
                        message:
                            validation.message || `${field.label} must be at most ${validation.maxLength} characters`,
                    });
                }

                if (validation.pattern && value && !validation.pattern.test(value)) {
                    errors.push({
                        field: field.name,
                        message: validation.message || `${field.label} format is invalid`,
                    });
                }

                if (validation.custom) {
                    const result = validation.custom(value);
                    if (result !== true) {
                        errors.push({
                            field: field.name,
                            message:
                                typeof result === 'string' ? result : validation.message || `${field.label} is invalid`,
                        });
                    }
                }
            }
        });
    }

    validationErrors.value = errors;
    emit('validate', errors);
    return errors.length === 0;
};

const onSubmit = () => {
    if (props.validate && !validateForm()) {
        return;
    }
    emit('submit', formData.value);
};

const onCancel = () => {
    emit('cancel');
};

const onReset = () => {
    formData.value = props.modelValue || {};
    validationErrors.value = [];
    touched.value.clear();
    emit('reset');
};

defineExpose({
    formData,
    validationErrors,
    validateForm,
    reset: onReset,
});
</script>
