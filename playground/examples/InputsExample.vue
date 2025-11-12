<script setup lang="ts">
import { ref } from 'vue';
import { BsaContainer, BsaCard, BsaInputText, BsaInputSelect, BsaInputSearch, BsaInputDate } from '@/components';

const formData = ref({
    name: '',
    email: '',
    password: '',
    country: '',
    interests: [],
    birthDate: '',
    appointmentTime: '',
});

const searchQuery = ref('');

const countries = [
    { label: 'United States', value: 'us' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'Canada', value: 'ca' },
    { label: 'Australia', value: 'au' },
    { label: 'Germany', value: 'de' },
];

const interests = [
    { label: 'Technology', value: 'tech' },
    { label: 'Sports', value: 'sports' },
    { label: 'Music', value: 'music' },
    { label: 'Travel', value: 'travel' },
    { label: 'Reading', value: 'reading' },
];

const onSearch = (query: string) => {
    console.log('Searching for:', query);
};
</script>

<template>
    <BsaContainer title="Input Components" description="Examples of all input components">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Text Input -->
            <BsaCard title="Text Input">
                <div class="space-y-4">
                    <BsaInputText v-model="formData.name" label="Name" placeholder="Enter your name" icon="User" />

                    <BsaInputText v-model="formData.email" type="email" label="Email" placeholder="Enter your email"
                        icon="Mail" clearable />

                    <BsaInputText v-model="formData.password" type="password" label="Password"
                        placeholder="Enter password" icon="Lock" hint="At least 8 characters" />
                </div>
            </BsaCard>

            <!-- Select Input -->
            <BsaCard title="Select Input">
                <div class="space-y-4">
                    <BsaInputSelect v-model="formData.country" label="Country" :options="countries"
                        placeholder="Select country" />

                    <BsaInputSelect v-model="formData.interests" label="Interests (Multiple)" :options="interests"
                        multiple placeholder="Select interests" />
                </div>
            </BsaCard>

            <!-- Search Input -->
            <BsaCard title="Search Input">
                <div class="space-y-4">
                    <BsaInputSearch v-model="searchQuery" label="Search Users" placeholder="Type to search..."
                        @search="onSearch" />

                    <div v-if="searchQuery" class="text-sm text-gray-600 dark:text-gray-400">
                        Searching for:
                        <span class="font-medium text-gray-900 dark:text-gray-100">{{ searchQuery }}</span>
                    </div>
                </div>
            </BsaCard>

            <!-- Date Input -->
            <BsaCard title="Date Input">
                <div class="space-y-4">
                    <BsaInputDate v-model="formData.birthDate" label="Birth Date" mode="date" />

                    <BsaInputDate v-model="formData.appointmentTime" label="Appointment" mode="datetime-local" />
                </div>
            </BsaCard>
        </div>

        <!-- Preview Data -->
        <BsaCard title="Form Data Preview" class="mt-6">
            <pre
                class="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 rounded text-sm overflow-auto">{{ JSON.stringify(formData, null, 2) }}</pre>
        </BsaCard>
    </BsaContainer>
</template>
