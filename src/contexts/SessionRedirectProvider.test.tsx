import * as sessionStore from '@/stores/sessionStore';
import { render } from '@testing-library/react-native';
import { useRouter, useSegments } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';
import { SessionRedirectProvider } from './SessionRedirectProvider';

jest.mock('expo-router', () => ({
    useRouter: jest.fn(),
    useSegments: jest.fn(),
}));

jest.mock('@/stores/sessionStore', () => ({
    useSessionStore: jest.fn(),
}));

describe('SessionRedirectProvider', () => {
    const mockReplace = jest.fn();
    beforeEach(() => {
        jest.clearAllMocks();
        (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace });
    });

    it('redireciona para / se não autenticado em rota protegida', () => {
        (sessionStore.useSessionStore as unknown as jest.Mock).mockReturnValue({ accessToken: null });
        (useSegments as jest.Mock).mockReturnValue(['(protected)']);
        render(
            <SessionRedirectProvider>
                <TestComponent />
            </SessionRedirectProvider>
        );
        expect(mockReplace).toHaveBeenCalledWith('/');
    });

    it('redireciona para /home se autenticado em rota pública', () => {
        (sessionStore.useSessionStore as unknown as jest.Mock).mockReturnValue({ accessToken: 'token' });
        (useSegments as jest.Mock).mockReturnValue(['']);
        render(
            <SessionRedirectProvider>
                <TestComponent />
            </SessionRedirectProvider>
        );
        expect(mockReplace).toHaveBeenCalledWith('/(protected)/home');
    });

    it('renderiza filhos normalmente se rota e auth corretos', () => {
        (sessionStore.useSessionStore as unknown as jest.Mock).mockReturnValue({ accessToken: 'token' });
        (useSegments as jest.Mock).mockReturnValue(['(protected)']);
        const { getByTestId } = render(
            <SessionRedirectProvider>
                <TestComponent />
            </SessionRedirectProvider>
        );
        expect(getByTestId('test-component')).toBeTruthy();
        expect(mockReplace).not.toHaveBeenCalled();
    });
});

function TestComponent() {
    return <Text testID="test-component">Test</Text>;
}
