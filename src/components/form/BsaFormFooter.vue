<template>
    <div class="bsa-form-footer mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <BsaButtonPanel :align="align">
            <slot>
                <BsaButtonDefault
                    v-if="showReset"
                    type="reset"
                    variant="secondary"
                    outlined
                    :label="resetLabel"
                    @click="onReset"
                />

                <BsaButtonDefault
                    v-if="showCancel"
                    type="button"
                    variant="secondary"
                    outlined
                    :label="cancelLabel"
                    @click="onCancel"
                />

                <BsaButtonDefault
                    v-if="showSubmit"
                    type="submit"
                    variant="primary"
                    :label="submitLabel"
                    :disabled="submitDisabled"
                    :loading="loading"
                    @click="onSubmit"
                />
            </slot>
        </BsaButtonPanel>
    </div>
</template>

<script setup lang="ts">
import type { FormFooterProps } from './form.types';
import BsaButtonDefault from '../base/buttons/BsaButtonDefault.vue';
import BsaButtonPanel from '../base/buttons/BsaButtonPanel.vue';

interface Props extends FormFooterProps {
    align?: 'left' | 'center' | 'right' | 'between';
}

withDefaults(defineProps<Props>(), {
    submitLabel: 'Submit',
    cancelLabel: 'Cancel',
    resetLabel: 'Reset',
    showSubmit: true,
    showCancel: true,
    showReset: false,
    submitDisabled: false,
    loading: false,
    align: 'right',
});

const emit = defineEmits<{
    submit: [];
    cancel: [];
    reset: [];
}>();

const onSubmit = () => {
    emit('submit');
};

const onCancel = () => {
    emit('cancel');
};

const onReset = () => {
    emit('reset');
};
</script>
