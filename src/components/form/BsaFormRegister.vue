<script setup lang="ts">
import { ref } from 'vue';
import BsaForm from './BsaForm.vue';
import BsaFormRow from './BsaFormRow.vue';
import BsaInputText from '../base/inputs/BsaInputText.vue';
import BsaInputDate from '../base/inputs/BsaInputDate.vue';
import BsaIcons from '@/components/base/icons/BsaIcons.vue';
import { Apple } from 'lucide-vue-next';
import type { ValidationError } from '@/types/common';

interface Props {
    loading?: boolean;
}

withDefaults(defineProps<Props>(), {
    loading: false,
});

const emit = defineEmits<{
    submit: [data: Record<string, any>];
    cancel: [];
}>();

const formData = ref({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    birthDate: '',
    acceptTerms: false,
});

const errors = ref<ValidationError[]>([]);

const getFieldError = (field: string): string | undefined => {
    return errors.value.find((e) => e.field === field)?.message;
};

const onSubmit = (data: Record<string, any>) => {
    // Custom validation
    errors.value = [];

    if (data.password !== data.confirmPassword) {
        errors.value.push({
            field: 'confirmPassword',
            message: 'Passwords do not match',
        });
        return;
    }

    if (data.password.length < 8) {
        errors.value.push({
            field: 'password',
            message: 'Password must be at least 8 characters',
        });
        return;
    }

    if (!data.acceptTerms) {
        alert('You must accept the terms and conditions');
        return;
    }

    emit('submit', data);
};

const onCancel = () => {
    emit('cancel');
};
</script>

<template>
    <BsaForm v-model="formData" title="Create Account" subtitle="Fill in the information below to register"
        icon="UserPlus" :loading="loading" @submit="onSubmit" @cancel="onCancel">
        <BsaFormRow :columns="2">
            <BsaInputText v-model="formData.firstName" label="First Name" placeholder="Enter first name" required
                :error="getFieldError('firstName')" />

            <BsaInputText v-model="formData.lastName" label="Last Name" placeholder="Enter last name" required
                :error="getFieldError('lastName')" />
        </BsaFormRow>

        <BsaFormRow :columns="1">
            <BsaInputText v-model="formData.email" type="email" label="Email Address" placeholder="Enter email"
                icon="Mail" required :error="getFieldError('email')" />

            <BsaInputText v-model="formData.password" type="password" label="Password" placeholder="Enter password"
                icon="Lock" required :error="getFieldError('password')" hint="Must be at least 8 characters" />

            <BsaInputText v-model="formData.confirmPassword" type="password" label="Confirm Password"
                placeholder="Confirm password" icon="Lock" required :error="getFieldError('confirmPassword')" />
        </BsaFormRow>

        <BsaFormRow :columns="2">
            <BsaInputText v-model="formData.phone" type="tel" label="Phone Number" placeholder="Enter phone number"
                icon="Phone" />

            <BsaInputDate v-model="formData.birthDate" label="Birth Date" placeholder="Select date" />
        </BsaFormRow>

        <div class="mb-4">
            <label class="flex items-center gap-2">
                <input v-model="formData.acceptTerms" type="checkbox"
                    class="w-4 h-4 text-primary-600 rounded focus:ring-primary-500" />
                <span class="text-sm text-gray-700 dark:text-gray-300">
                    I accept the
                    <a href="#" class="text-primary-600 dark:text-primary-400 hover:underline">Terms and Conditions</a>
                </span>
            </label>
        </div>
    </BsaForm>
</template>
