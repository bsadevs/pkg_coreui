import { ref } from 'vue';

export interface ModalOptions {
    title?: string;
    subtitle?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    closable?: boolean;
    closeOnOverlay?: boolean;
}

export function useModal(initialOptions: ModalOptions = {}) {
    const isOpen = ref(false);
    const options = ref<ModalOptions>(initialOptions);
    const result = ref<any>(null);

    const open = (newOptions?: ModalOptions) => {
        if (newOptions) {
            options.value = { ...options.value, ...newOptions };
        }
        isOpen.value = true;
        result.value = null;
    };

    const close = (data?: any) => {
        result.value = data;
        isOpen.value = false;
    };

    const toggle = () => {
        isOpen.value = !isOpen.value;
    };

    const setOptions = (newOptions: Partial<ModalOptions>) => {
        options.value = { ...options.value, ...newOptions };
    };

    return {
        isOpen,
        options,
        result,
        open,
        close,
        toggle,
        setOptions,
    };
}

// Helper for confirmation dialogs
export function useConfirmDialog() {
    const modal = useModal({
        size: 'sm',
        closable: true,
        closeOnOverlay: false,
    });

    const confirm = (
        title: string,
        message?: string,
        confirmText = 'Confirm',
        cancelText = 'Cancel',
    ): Promise<boolean> => {
        return new Promise((resolve) => {
            modal.open({ title, subtitle: message });

            const handleConfirm = () => {
                modal.close(true);
                resolve(true);
            };

            const handleCancel = () => {
                modal.close(false);
                resolve(false);
            };

            // Store handlers for component use
            (modal as any).handleConfirm = handleConfirm;
            (modal as any).handleCancel = handleCancel;
        });
    };

    return {
        ...modal,
        confirm,
    };
}
