<script setup lang="ts">
import { BsaContainer, BsaCard, BsaButtonBadge, BsaButtonDefault, BsaButtonIcon, BsaButtonPanel, BsaIcons } from '@/components';
</script>

<template>
    <BsaContainer title="Button Components" description="Examples of all button variants and styles">
        <div class="space-y-6">
            <!-- Notification Badge -->
            <BsaCard title="Notification Badge">
                <div class="space-y-4">
                    <div class="flex items-center gap-4 flex-wrap">
                        <BsaButtonBadge :count="4" icon="Bell" />
                        <BsaButtonBadge :count="8" icon="Bell" size="sm" />
                        <BsaButtonBadge :count="12" icon="Bell" size="lg" pulse />
                        <BsaButtonBadge :count="16" icon="Mail" />
                        <BsaButtonBadge :count="20" icon="Mail" show-dot ping />
                    </div>
                </div>
            </BsaCard>

            <!-- Default Buttons -->
            <BsaCard title="Button Variants">
                <BsaButtonPanel align="left" gap="md">
                    <BsaButtonDefault label="Primary" variant="primary" />
                    <BsaButtonDefault label="Secondary" variant="secondary" />
                    <BsaButtonDefault label="Success" variant="success" />
                    <BsaButtonDefault label="Warning" variant="warning" />
                    <BsaButtonDefault label="Danger" variant="danger" />
                    <BsaButtonDefault label="Info" variant="info" />
                </BsaButtonPanel>
            </BsaCard>

            <!-- Outlined Buttons -->
            <BsaCard title="Outlined Buttons">
                <BsaButtonPanel align="left">
                    <BsaButtonDefault label="Primary" variant="primary" outlined />
                    <BsaButtonDefault label="Secondary" variant="secondary" outlined />
                    <BsaButtonDefault label="Success" variant="success" outlined />
                    <BsaButtonDefault label="Warning" variant="warning" outlined />
                    <BsaButtonDefault label="Danger" variant="danger" outlined />
                </BsaButtonPanel>
            </BsaCard>

            <!-- Buttons with Icons -->
            <BsaCard title="Buttons with Icons">
                <BsaButtonPanel align="left">
                    <BsaButtonDefault label="Save" icon="Save" variant="primary" />
                    <BsaButtonDefault label="Delete" icon="Trash2" variant="danger" />
                    <BsaButtonDefault label="Edit" icon="Edit2" variant="secondary" />
                    <BsaButtonDefault label="Download" icon="Download" variant="success" icon-position="right" />
                </BsaButtonPanel>
            </BsaCard>

            <!-- Button Sizes -->
            <BsaCard title="Button Sizes">
                <BsaButtonPanel align="left">
                    <BsaButtonDefault label="Small" size="sm" />
                    <BsaButtonDefault label="Medium" size="md" />
                    <BsaButtonDefault label="Large" size="lg" />
                    <BsaButtonDefault label="Extra Large" size="xl" />
                </BsaButtonPanel>
            </BsaCard>

            <!-- Icon Buttons -->
            <BsaCard title="Icon Buttons">
                <BsaButtonPanel align="left">
                    <BsaButtonIcon icon="Home" variant="primary" tooltip="Home" />
                    <BsaButtonIcon icon="Search" variant="secondary" tooltip="Search" />
                    <BsaButtonIcon icon="X" variant="info" tooltip="Settings" />
                    <BsaButtonIcon icon="Bell" variant="warning" tooltip="Notifications" />
                    <BsaButtonIcon icon="Trash2" variant="danger" tooltip="Delete" />
                </BsaButtonPanel>
            </BsaCard>

            <!-- Icon Button Sizes -->
            <BsaCard title="Icon Button Sizes">
                <BsaButtonPanel align="left">
                    <BsaButtonIcon icon="Star" size="sm" />
                    <BsaButtonIcon icon="Star" size="md" />
                    <BsaButtonIcon icon="Star" size="lg" />
                    <BsaButtonIcon icon="Star" size="xl" />
                </BsaButtonPanel>
            </BsaCard>

            <!-- Loading & Disabled States -->
            <BsaCard title="Button States">
                <BsaButtonPanel align="left">
                    <BsaButtonDefault label="Normal" variant="primary" />
                    <BsaButtonDefault label="Loading" variant="primary" loading />
                    <BsaButtonDefault label="Disabled" variant="primary" disabled />
                </BsaButtonPanel>
            </BsaCard>

            <!-- Block Buttons -->
            <BsaCard title="Block Buttons">
                <div class="space-y-6">
                    <BsaButtonDefault label="Block Button" variant="primary" block />
                    <BsaButtonDefault label="Block Button with Icon" icon="Check" variant="success" block />
                    <BsaButtonDefault label="Another Block Button" icon="Star" variant="info" block />
                </div>
            </BsaCard>

            <!-- Rounded Buttons -->
            <BsaCard title="Rounded Buttons">
                <BsaButtonPanel align="left">
                    <BsaButtonDefault label="Rounded" variant="primary" rounded />
                    <BsaButtonDefault label="Rounded Outlined" variant="secondary" outlined rounded />
                    <BsaButtonIcon icon="Heart" variant="danger" rounded />
                </BsaButtonPanel>
            </BsaCard>

            <!-- Button Panels -->
            <BsaCard title="Button Panels (Alignment)">
                <div class="space-y-4">
                    <div>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Left Aligned:</p>
                        <BsaButtonPanel align="left">
                            <BsaButtonDefault label="Cancel" variant="secondary" outlined />
                            <BsaButtonDefault label="Save" variant="primary" />
                        </BsaButtonPanel>
                    </div>

                    <div>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Right Aligned:</p>
                        <BsaButtonPanel align="right">
                            <BsaButtonDefault label="Cancel" variant="secondary" outlined />
                            <BsaButtonDefault label="Save" variant="primary" />
                        </BsaButtonPanel>
                    </div>

                    <div>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Space Between:</p>
                        <BsaButtonPanel align="between">
                            <BsaButtonDefault label="Back" variant="secondary" outlined />
                            <BsaButtonDefault label="Next" variant="primary" />
                        </BsaButtonPanel>
                    </div>
                </div>
            </BsaCard>
        </div>
    </BsaContainer>
</template>
