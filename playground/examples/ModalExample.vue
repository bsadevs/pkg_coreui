<script setup lang="ts">
import { ref } from 'vue';
import {
    BsaContainer,
    BsaCard,
    BsaButtonDefault,
    BsaButtonPanel,
    BsaModalDialog,
    BsaForm,
    BsaFormRow,
    BsaInputText,
} from '@/components';
import { useModal, useConfirmDialog } from '@/composables/modal/useModal';

const basicModal = useModal();
const largeModal = useModal();
const smallModal = useModal();
const formModal = useModal();
const editModal = useModal();
const passwordModal = useModal();
const galleryModal = useModal();
const videoModal = useModal();
const termsModal = useModal();
const confirmDialog = useConfirmDialog();

const userData = ref({
    name: '',
    email: '',
});

const onBasicConfirm = () => {
    console.log('Basic modal confirmed');
    basicModal.close();
};

const onFormSubmit = (data: any) => {
    console.log('Form submitted:', data);
    formModal.close();
    userData.value = { name: '', email: '' };
};

const openConfirmDialog = async () => {
    const result = await confirmDialog.confirm(
        'Delete User',
        'Are you sure you want to delete this user? This action cannot be undone.',
    );

    if (result) {
        alert('User deleted!');
    }
};

const openWarningDialog = async () => {
    const result = await confirmDialog.confirm(
        'Unsaved Changes',
        'You have unsaved changes. Are you sure you want to leave this page?',
    );

    if (result) {
        alert('Navigating away...');
    }
};

const openSuccessDialog = async () => {
    const result = await confirmDialog.confirm(
        'Success!',
        'Your operation completed successfully. Would you like to continue?',
    );

    if (result) {
        alert('Continuing...');
    }
};
</script>

<template>
    <BsaContainer title="Modal Example" description="Example usage of BsaModalDialog component">
        <BsaCard title="Modal Examples">
            <div class="space-y-6">
                <!-- Basic Modals -->
                <div>
                    <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-100 mb-3">Basic Modals</h3>
                    <BsaButtonPanel gap="md">
                        <BsaButtonDefault label="Basic Modal" icon="Info" @click="basicModal.open()" />

                        <BsaButtonDefault label="Large Modal" icon="Plus" variant="info" @click="largeModal.open()" />

                        <BsaButtonDefault label="Small Modal" icon="Minus" variant="secondary"
                            @click="smallModal.open()" />
                    </BsaButtonPanel>
                </div>

                <!-- Form Modals -->
                <div>
                    <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-100 mb-3">Form Modals</h3>
                    <BsaButtonPanel gap="md">
                        <BsaButtonDefault label="Create User" icon="Plus" variant="success" @click="formModal.open()" />

                        <BsaButtonDefault label="Edit Profile" icon="Edit" variant="info" @click="editModal.open()" />

                        <BsaButtonDefault label="Change Password" icon="Lock" variant="secondary"
                            @click="passwordModal.open()" />
                    </BsaButtonPanel>
                </div>

                <!-- Dialog Modals -->
                <div>
                    <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-100 mb-3">Dialog Modals</h3>
                    <BsaButtonPanel gap="md">
                        <BsaButtonDefault label="Confirm Delete" icon="Trash2" variant="danger"
                            @click="openConfirmDialog" />

                        <BsaButtonDefault label="Warning Dialog" icon="X" variant="warning"
                            @click="openWarningDialog" />

                        <BsaButtonDefault label="Success Dialog" icon="X" variant="success"
                            @click="openSuccessDialog" />
                    </BsaButtonPanel>
                </div>

                <!-- Special Modals -->
                <div>
                    <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-100 mb-3">Special Modals</h3>
                    <BsaButtonPanel gap="md">
                        <BsaButtonDefault label="Image Gallery" icon="X" variant="info" @click="galleryModal.open()" />

                        <BsaButtonDefault label="Video Player" icon="X" variant="secondary"
                            @click="videoModal.open()" />

                        <BsaButtonDefault label="Terms & Conditions" icon="X" variant="secondary"
                            @click="termsModal.open()" />
                    </BsaButtonPanel>
                </div>
            </div>
        </BsaCard>

        <!-- Basic Modal -->
        <BsaModalDialog v-model="basicModal.isOpen.value" title="Basic Modal" subtitle="This is a simple modal example"
            icon="Info" @confirm="onBasicConfirm">
            <p class="text-gray-700 dark:text-gray-300">
                This is the modal content. You can put any content here including forms, tables, or custom components.
            </p>
        </BsaModalDialog>

        <!-- Large Modal -->
        <BsaModalDialog v-model="largeModal.isOpen.value" title="Large Modal Example"
            subtitle="This modal uses the large size variant" size="xl">
            <div class="space-y-4">
                <p class="text-gray-700 dark:text-gray-300">
                    This is a large modal that can accommodate more content. Perfect for displaying detailed
                    information, large forms, or complex layouts.
                </p>
                <div class="grid grid-cols-2 gap-4">
                    <div v-for="i in 4" :key="i"
                        class="h-32 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        <span class="text-gray-500 dark:text-gray-300">Content Block {{ i }}</span>
                    </div>
                </div>
            </div>
        </BsaModalDialog>

        <!-- Small Modal -->
        <BsaModalDialog v-model="smallModal.isOpen.value" title="Quick Action" size="sm">
            <p class="text-gray-700 dark:text-gray-300">
                This is a small modal perfect for quick confirmations or simple messages.
            </p>
        </BsaModalDialog>

        <!-- Form Modal -->
        <BsaModalDialog v-model="formModal.isOpen.value" title="Create User" size="lg" :show-cancel="false"
            :show-confirm="false">
            <BsaForm v-model="userData" :show-header="false" @submit="onFormSubmit" @cancel="formModal.close()">
                <BsaFormRow :columns="1">
                    <BsaInputText v-model="userData.name" label="Name" placeholder="Enter name" required />

                    <BsaInputText v-model="userData.email" type="email" label="Email" placeholder="Enter email"
                        required />
                </BsaFormRow>
            </BsaForm>
        </BsaModalDialog>

        <!-- Edit Modal -->
        <BsaModalDialog v-model="editModal.isOpen.value" title="Edit Profile" icon="Edit" size="md">
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                    <input type="text" value="John Doe"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bio</label>
                    <textarea rows="3"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
Software developer...</textarea>
                </div>
            </div>
        </BsaModalDialog>

        <!-- Password Modal -->
        <BsaModalDialog v-model="passwordModal.isOpen.value" title="Change Password" icon="Lock" size="md">
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current
                        Password</label>
                    <input type="password"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New Password</label>
                    <input type="password"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm New
                        Password</label>
                    <input type="password"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
                </div>
            </div>
        </BsaModalDialog>

        <!-- Image Gallery Modal -->
        <BsaModalDialog v-model="galleryModal.isOpen.value" title="Image Gallery" size="xl" :show-footer="false">
            <div class="grid grid-cols-3 gap-4">
                <div v-for="i in 9" :key="i"
                    class="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <i class="Image text-4xl text-gray-400 dark:text-gray-500"></i>
                </div>
            </div>
        </BsaModalDialog>

        <!-- Video Player Modal -->
        <BsaModalDialog v-model="videoModal.isOpen.value" title="Video Player" size="xl" :show-footer="false">
            <div class="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                <i class="Play text-6xl text-white opacity-50"></i>
            </div>
        </BsaModalDialog>

        <!-- Terms Modal -->
        <BsaModalDialog v-model="termsModal.isOpen.value" title="Terms & Conditions" size="lg">
            <div class="space-y-4 max-h-96 overflow-y-auto pr-2">
                <h3 class="font-semibold text-gray-900 dark:text-gray-100">1. Acceptance of Terms</h3>
                <p class="text-gray-700 dark:text-gray-300 text-sm">
                    By accessing and using this service, you accept and agree to be bound by the terms and provision of
                    this agreement.
                </p>
                <h3 class="font-semibold text-gray-900 dark:text-gray-100">2. Use License</h3>
                <p class="text-gray-700 dark:text-gray-300 text-sm">
                    Permission is granted to temporarily download one copy of the materials for personal, non-commercial
                    transitory viewing only.
                </p>
                <h3 class="font-semibold text-gray-900 dark:text-gray-100">3. Disclaimer</h3>
                <p class="text-gray-700 dark:text-gray-300 text-sm">
                    The materials are provided on an 'as is' basis. We make no warranties, expressed or implied, and
                    hereby disclaim all other warranties.
                </p>
                <h3 class="font-semibold text-gray-900 dark:text-gray-100">4. Limitations</h3>
                <p class="text-gray-700 dark:text-gray-300 text-sm">
                    In no event shall the company or its suppliers be liable for any damages arising out of the use or
                    inability to use the materials.
                </p>
            </div>
        </BsaModalDialog>
    </BsaContainer>
</template>
