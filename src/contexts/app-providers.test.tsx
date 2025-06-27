import { render } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';
import { AppProviders } from './app-providers';

jest.mock('@/hooks/useColorScheme', () => ({
    useColorScheme: () => ({ isDarkColorScheme: false }),
}));

jest.mock('@react-navigation/native', () => ({
    ThemeProvider: ({ children }: any) => <>{children}</>,
    DefaultTheme: {},
    DarkTheme: {},
}));

jest.mock('expo-status-bar', () => ({
    StatusBar: () => null,
}));

jest.mock('./ReactQueryProvider', () => ({
    ReactQueryProvider: ({ children }: any) => <>{children}</>,
}));

jest.mock('./SessionRedirectProvider', () => ({
    SessionRedirectProvider: ({ children }: any) => <>{children}</>,
}));

describe('AppProviders', () => {
    it('renderiza os filhos quando o esquema de cor está carregado', () => {
        const { getByTestId } = render(
            <AppProviders>
                <TestComponent />
            </AppProviders>
        );
        expect(getByTestId('test-component')).toBeTruthy();
    });
});

function TestComponent() {
    return <Text testID="test-component">Test</Text>;
}
