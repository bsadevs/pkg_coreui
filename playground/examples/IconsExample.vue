<script setup lang="ts">
import { BsaIcons } from '@/components';
import { Apple } from 'lucide-vue-next';
import { iconsMap } from '@/components/base/icons/iconsMap';
</script>

<template>
    <div class="flex flex-col gap-4">
        <div class="grid grid-cols-6 gap-4">
            <div v-for="(Icon, name) in iconsMap" :key="name" class="flex flex-col items-center gap-1">
                <component :is="Icon" class="w-6 h-6 text-blue-500" />
                <span class="text-xs text-gray-700">{{ name }}</span>
            </div>
        </div>
        <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2">
                Tailwind inline →
                <Apple class="w-6 h-6 text-yellow-500" />
            </div>
            <div class="flex items-center gap-2">
                BsaIcons defaults →
                <BsaIcons icon="Home" />
                <BsaIcons icon="Home" color="text-blue-500" />
                <BsaIcons icon="Home" size="w-5 h-5" color="text-green-500" />
                <BsaIcons icon="User" />
                <BsaIcons icon="ErrorName" color="text-red-500" />
            </div>
            <div class="flex items-center gap-2">
                BsaIcons with import →
                <BsaIcons :icon="Apple" />
            </div>
        </div>

    </div>
</template>
