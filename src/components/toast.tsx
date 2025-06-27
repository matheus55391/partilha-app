import React, { useEffect } from 'react';
import { Animated, Text, View } from 'react-native';

interface ToastProps {
    message: string;
    type: 'error' | 'success' | 'info';
    visible: boolean;
    onHide: () => void;
    duration?: number;
}

export function Toast({ message, type, visible, onHide, duration = 3000 }: ToastProps) {
    const opacity = React.useRef(new Animated.Value(0)).current;
    const translateY = React.useRef(new Animated.Value(-100)).current;

    useEffect(() => {
        if (visible) {
            // Animar entrada
            Animated.parallel([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();

            // Auto hide após duration
            const timer = setTimeout(() => {
                hideToast();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [visible]);

    const hideToast = () => {
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: -100,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start(() => {
            onHide();
        });
    };

    if (!visible) {
        return null;
    }

    const getToastStyle = () => {
        switch (type) {
            case 'error':
                return 'bg-[#e74c3c] border-[#c0392b]';
            case 'success':
                return 'bg-[#27ae60] border-[#229954]';
            case 'info':
                return 'bg-[#3498db] border-[#2980b9]';
            default:
                return 'bg-[#e74c3c] border-[#c0392b]';
        }
    };

    return (
        <View className="absolute top-0 left-0 right-0 z-50 px-4 pt-12">
            <Animated.View
                style={{
                    opacity,
                    transform: [{ translateY }],
                }}
                className={`rounded-lg p-4 border-l-4 shadow-lg ${getToastStyle()}`}
            >
                <Text className="text-white font-medium text-base">
                    {message}
                </Text>
            </Animated.View>
        </View>
    );
}
