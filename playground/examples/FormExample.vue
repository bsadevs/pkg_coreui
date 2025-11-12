<script setup lang="ts">
import { ref } from 'vue';
import { BsaContainer, BsaCard, BsaForm, BsaFormRow, BsaInputText, BsaInputSelect, BsaInputDate } from '@/components';

const loading = ref(false);

const formData = ref({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    startDate: '',
});

const roleOptions = [
    { label: 'Administrator', value: 'admin' },
    { label: 'Manager', value: 'manager' },
    { label: 'User', value: 'user' },
    { label: 'Guest', value: 'guest' },
];

const onSubmit = (data: any) => {
    loading.value = true;
    console.log('Form submitted:', data);

    setTimeout(() => {
        loading.value = false;
        alert('Form submitted successfully!');
    }, 1500);
};

const onCancel = () => {
    console.log('Form cancelled');
};
</script>

<template>
    <BsaContainer title="Form Example" description="Example usage of BsaForm component">
        <BsaCard>
            <BsaForm v-model="formData" title="User Information" subtitle="Please fill in your details" icon="User"
                :loading="loading" @submit="onSubmit" @cancel="onCancel">
                <BsaFormRow :columns="2">
                    <BsaInputText v-model="formData.firstName" label="First Name" placeholder="Enter first name"
                        required />

                    <BsaInputText v-model="formData.lastName" label="Last Name" placeholder="Enter last name"
                        required />
                </BsaFormRow>

                <BsaFormRow :columns="1">
                    <BsaInputText v-model="formData.email" type="email" label="Email Address" placeholder="Enter email"
                        icon="Mail" required />

                    <BsaInputSelect v-model="formData.role" label="Role" :options="roleOptions"
                        placeholder="Select role" required />

                    <BsaInputDate v-model="formData.startDate" label="Start Date" placeholder="Select date" />
                </BsaFormRow>
            </BsaForm>
        </BsaCard>
    </BsaContainer>
</template>
