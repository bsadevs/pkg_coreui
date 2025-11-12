<script setup lang="ts">
import { ref } from 'vue';
import { BsaContainer, BsaCard, BsaButtonDefault, BsaButtonPanel } from '@/components';
import BsaLoading from '@/components/base/loading/BsaLoading.vue';

const loadingTypes = ['spinner', 'dots', 'bars', 'circle', 'bounce', 'wave'] as const;
type LoadingType = typeof loadingTypes[number];
const sizes = ['sm', 'md', 'lg', 'xl'] as const;
type LoadingSize = typeof sizes[number];


const isPageLoading = ref(false);
const buttonLoading = ref(false);
const cardLoading = ref(false);

const simulatePageLoad = () => {
    isPageLoading.value = true;
    setTimeout(() => {
        isPageLoading.value = false;
    }, 3000);
};

const simulateQuickLoad = () => {
    isPageLoading.value = true;
    setTimeout(() => {
        isPageLoading.value = false;
    }, 1000);
};

const simulateButtonAction = () => {
    buttonLoading.value = true;
    setTimeout(() => {
        buttonLoading.value = false;
    }, 2000);
};

const simulateCardLoad = () => {
    cardLoading.value = true;
    setTimeout(() => {
        cardLoading.value = false;
    }, 2500);
};
</script>

<template>
    <BsaContainer title="Loading Animations" description="Various loading indicators and page transitions">
        <div class="space-y-6">
            <!-- Loading Types -->
            <BsaCard title="Loading Animation Types">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div v-for="type in loadingTypes" :key="type"
                        class="flex flex-col items-center gap-4 p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-100 capitalize">{{ type }}</h4>
                        <BsaLoading :is-loading="true" :type="type as LoadingType" size="lg" />
                    </div>
                </div>
            </BsaCard>

            <!-- Loading Sizes -->
            <BsaCard title="Loading Sizes">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div v-for="size in sizes" :key="size"
                        class="flex items-center justify-center gap-6 p-8 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div class="text-center min-w-[120px]">
                            <BsaLoading :is-loading="true" type="circle" :size="size as LoadingSize" />
                            <p class="text-xs font-semibold text-gray-700 dark:text-gray-100 uppercase mt-3">
                                {{ size }}
                            </p>
                        </div>
                    </div>
                </div>
            </BsaCard>

            <!-- Loading with Messages -->
            <BsaCard title="Loading with Messages">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="p-8 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <BsaLoading :is-loading="true" type="circle" size="lg" message="Loading data..."
                            submessage="Please wait while we fetch your content" />
                    </div>

                    <div class="p-8 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <BsaLoading :is-loading="true" type="dots" size="lg" message="Processing..."
                            submessage="This may take a few moments" />
                    </div>
                </div>
            </BsaCard>

            <!-- Page Transition Demo -->
            <BsaCard title="Page Transition Loading">
                <div class="space-y-4">
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                        Simulate a page transition with loading overlay
                    </p>

                    <BsaButtonPanel align="left">
                        <BsaButtonDefault label="Show Page Loading" icon="RotateCw" @click="simulatePageLoad" />
                        <BsaButtonDefault label="Show Quick Load" icon="X" variant="secondary"
                            @click="simulateQuickLoad" />
                    </BsaButtonPanel>

                    <!-- Demo Content Area -->
                    <div class="mt-6 relative min-h-[300px] border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                        <div v-if="!isPageLoading">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Page Content</h3>
                            <p class="text-gray-600 dark:text-gray-400 mb-4">
                                This is your page content. Click the button above to simulate a page transition with
                                loading animation.
                            </p>
                            <div class="grid grid-cols-3 gap-4">
                                <div v-for="i in 6" :key="i" class="h-20 bg-gray-100 dark:bg-gray-700 rounded"></div>
                            </div>
                        </div>

                        <!-- Loading Overlay -->
                        <BsaLoading :is-loading="isPageLoading" type="circle" size="xl" message="Loading page..."
                            fullscreen overlay />
                    </div>
                </div>
            </BsaCard>

            <!-- Inline Loading Examples -->
            <BsaCard title="Inline Loading States">
                <div class="space-y-4">
                    <!-- Button with loading -->
                    <div>
                        <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-100 mb-3">
                            Button Loading States
                        </h4>
                        <BsaButtonPanel align="left" gap="lg">
                            <BsaButtonDefault label="Submit" :loading="buttonLoading" @click="simulateButtonAction" />
                            <BsaButtonDefault label="Save" variant="success" :loading="buttonLoading"
                                @click="simulateButtonAction" />
                            <BsaButtonDefault label="Delete" variant="danger" :loading="buttonLoading"
                                @click="simulateButtonAction" />
                        </BsaButtonPanel>
                    </div>

                    <!-- Card with loading -->
                    <div>
                        <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-100 mb-3">Card Loading State</h4>
                        <div class="relative border border-gray-200 dark:border-gray-700 rounded-lg p-6 min-h-[200px]">
                            <div v-if="!cardLoading">
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Card Title</h3>
                                <p class="text-gray-600 dark:text-gray-400 mb-4">Card content goes here...</p>
                                <BsaButtonDefault label="Load Data" size="sm" @click="simulateCardLoad" />
                            </div>

                            <BsaLoading :is-loading="cardLoading" type="dots" size="lg"
                                message="Loading card data..." />
                        </div>
                    </div>
                </div>
            </BsaCard>
        </div>
    </BsaContainer>
</template>
