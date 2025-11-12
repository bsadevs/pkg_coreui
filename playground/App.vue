<script setup lang="ts">
import { ref } from 'vue';
import LayoutExample from './examples/LayoutExample.vue';
import ButtonsExample from './examples/ButtonsExample.vue';
import InputsExample from './examples/InputsExample.vue';
import ModalExample from './examples/ModalExample.vue';
import FormExample from './examples/FormExample.vue';
import TableExample from './examples/TableExample.vue';
import LoadingExample from './examples/LoadingExample.vue';
import { Sun, Moon } from 'lucide-vue-next';

const tabs = ['Layout', 'Buttons', 'Inputs', 'Modal', 'Form', 'Table', 'Loading'];
const activeTab = ref('Layout');
const isTransitioning = ref(false);
const nextTabLabel = ref('');
const isDarkMode = ref(false);

const changeTab = (tab: string) => {
    if (activeTab.value === tab) return;

    nextTabLabel.value = tab;
    isTransitioning.value = true;

    setTimeout(() => {
        activeTab.value = tab;
        setTimeout(() => {
            isTransitioning.value = false;
        }, 300);
    }, 400);
};

const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
    if (isDarkMode.value) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
};
</script>

<template>
    <div :class="['min-h-screen transition-colors duration-300', isDarkMode ? 'bg-gray-900' : 'bg-gray-50']">

        <!-- Navigation -->
        <nav
            :class="['shadow-sm border-b transition-colors duration-300', isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200']">
            <div class="max-w-full sm:max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                <div class="flex flex-wrap md:flex-nowrap justify-between h-16 items-center gap-2">
                    <div class="flex items-center gap-2">
                        <h1 class="text-2xl font-bold text-primary-600">BSA Core UI</h1>
                        <span :class="['text-sm', isDarkMode ? 'text-gray-400' : 'text-gray-500']">Component
                            Playground</span>
                    </div>
                    <div class="flex flex-wrap md:flex-nowrap items-center gap-2">
                        <button v-for="tab in tabs" :key="tab" @click="changeTab(tab)" :class="[
                            'px-2 py-1 sm:px-4 sm:py-2 rounded-lg font-medium transition-colors text-sm',
                            activeTab === tab
                                ? 'bg-primary-100 text-primary-700'
                                : isDarkMode
                                    ? 'text-gray-300 hover:bg-gray-700'
                                    : 'text-gray-600 hover:bg-gray-100'
                        ]">
                            {{ tab }}
                        </button>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Content -->
        <div class="w-full max-w-full sm:max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-8">
            <transition name="page-fade" mode="out-in">
                <div v-if="activeTab === 'Table'" class="overflow-x-auto">
                    <TableExample />
                </div>
                <FormExample v-else-if="activeTab === 'Form'" />
                <ModalExample v-else-if="activeTab === 'Modal'" />
                <LayoutExample v-else-if="activeTab === 'Layout'" />
                <InputsExample v-else-if="activeTab === 'Inputs'" />
                <ButtonsExample v-else-if="activeTab === 'Buttons'" />
                <LoadingExample v-else-if="activeTab === 'Loading'" />
            </transition>
        </div>

        <!-- Loading Overlay -->
        <transition name="fade">
            <div v-if="isTransitioning"
                :class="['fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50', isDarkMode ? 'bg-gray-900/90' : 'bg-white/80']">
                <div class="text-center">
                    <div class="flex items-center justify-center gap-2 mb-4">
                        <div v-for="i in 3" :key="i"
                            :class="['w-4 h-4 rounded-full animate-bounce', isDarkMode ? 'bg-primary-400' : 'bg-primary-600']"
                            :style="{ animationDelay: `${i * 0.15}s` }"></div>
                    </div>
                    <p :class="['text-lg font-semibold mb-2', isDarkMode ? 'text-gray-100' : 'text-gray-900']">
                        Processing...</p>
                    <p :class="['text-sm', isDarkMode ? 'text-gray-400' : 'text-gray-600']">Loading {{ nextTabLabel }}
                    </p>
                </div>
            </div>
        </transition>
    </div>

    <!-- Dark Mode Toggle -->
    <button @click="toggleDarkMode" :class="[
        'fixed p-2 sm:p-3 rounded-full shadow-lg transition-all hover:scale-110 z-50 border-2',
        isDarkMode
            ? 'bg-gray-700 text-white border-white hover:bg-gray-600 hover:border-gray-100'
            : 'bg-gray-800 text-yellow-400 border-gray-700 hover:bg-gray-700 hover:border-gray-600'
    ]" style="top:5rem; right:1rem" title="Toggle Dark Mode">
        <BsaIcons :icon="isDarkMode ? 'Sun' : 'Moon'" size="text-xl" />
    </button>
</template>

<style>
.page-fade-enter-active,
.page-fade-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
}

.page-fade-enter-from {
    opacity: 0;
    transform: translateY(10px);
}

.page-fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
