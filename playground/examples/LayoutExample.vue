<script setup lang="ts">
import { ref } from 'vue';
import { BsaContainer, BsaCard, BsaSection, BsaButtonDefault, BsaButtonIcon } from '@/components';


const breadcrumbs = [{ label: 'Home', to: '/' }, { label: 'Dashboard' }];

const statistics = [
    {
        title: 'Total Users',
        value: '1,234',
        change: '+12% from last month',
        icon: 'User',
        color: '#3b82f6',
    },
    {
        title: 'Revenue',
        value: '$45,231',
        change: '+8% from last month',
        icon: 'Money',
        color: '#22c55e',
    },
    {
        title: 'Orders',
        value: '892',
        change: '-3% from last month',
        icon: 'Cart',
        color: '#f59e0b',
    },
];

const activities = [
    {
        id: 1,
        title: 'New user registered',
        description: 'john.doe@example.com joined the platform',
        time: '2 hours ago',
        icon: 'Plus',
        iconColor: 'text-blue-600 dark:text-blue-400',
        bgColor: 'bg-blue-100 dark:bg-blue-900',
    },
    {
        id: 2,
        title: 'Order completed',
        description: 'Order #12345 has been completed',
        time: '4 hours ago',
        icon: 'Check',
        iconColor: 'text-green-600 dark:text-green-400',
        bgColor: 'bg-green-100 dark:bg-green-900',
    },
    {
        id: 3,
        title: 'Payment received',
        description: '$250 received from customer',
        time: '6 hours ago',
        icon: 'Money',
        iconColor: 'text-yellow-600 dark:text-yellow-400',
        bgColor: 'bg-yellow-100 dark:bg-yellow-900',
    },
];
</script>

<template>
    <BsaContainer title="Dashboard" description="Welcome to your dashboard" :breadcrumbs="breadcrumbs">
        <template #actions>
            <BsaButtonIcon icon="RotateCw" tooltip="Refresh" />
            <BsaButtonDefault label="New Item" icon="Plus" />
        </template>
        <!--Statistics Cards-->
        <BsaSection title=" Statistics" spacing="lg">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <BsaCard v-for="stat in statistics" :key="stat.title" :title="stat.title" :icon="stat.icon"
                    :icon-color="stat.color" hoverable>
                    <div class="text-3xl font-bold text-gray-900 dark:text-gray-100">{{ stat.value }}</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ stat.change }}</div>
                </BsaCard>
            </div>
        </BsaSection>

        <!-- Recent Activity -->
        <BsaSection title="Recent Activity" divider>
            <BsaCard>
                <div class="space-y-4">
                    <div v-for="activity in activities" :key="activity.id"
                        class="flex items-start gap-3 pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0">
                        <div :class="['w-10 h-10 rounded-full flex items-center justify-center', activity.bgColor]">
                            <i :class="[activity.icon, activity.iconColor]"></i>
                        </div>
                        <div class="flex-1">
                            <p class="font-medium text-gray-900 dark:text-gray-100">{{ activity.title }}</p>
                            <p class="text-sm text-gray-500 dark:text-gray-400">{{ activity.description }}
                            </p>
                            <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">{{ activity.time }}</p>
                        </div>
                    </div>
                </div>
            </BsaCard>
        </BsaSection>

        <!-- Footer -->
        <template #footer>
            <div class="text-center text-sm text-gray-500 dark:text-gray-400">
                © 2025 BSA Core UI. All rights reserved.
            </div>
        </template>
    </BsaContainer>
</template>
