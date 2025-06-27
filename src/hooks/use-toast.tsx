import { useCallback, useState } from 'react';

interface ToastState {
    message: string;
    type: 'error' | 'success' | 'info';
    visible: boolean;
}

export function useToast() {
    const [toast, setToast] = useState<ToastState>({
        message: '',
        type: 'info',
        visible: false,
    });

    const showToast = useCallback((message: string, type: 'error' | 'success' | 'info' = 'info') => {
        setToast({
            message,
            type,
            visible: true,
        });
    }, []);

    const hideToast = useCallback(() => {
        setToast(prev => ({
            ...prev,
            visible: false,
        }));
    }, []);

    const showError = useCallback((message: string) => {
        showToast(message, 'error');
    }, [showToast]);

    const showSuccess = useCallback((message: string) => {
        showToast(message, 'success');
    }, [showToast]);

    const showInfo = useCallback((message: string) => {
        showToast(message, 'info');
    }, [showToast]);

    return {
        toast,
        showToast,
        hideToast,
        showError,
        showSuccess,
        showInfo,
    };
}
