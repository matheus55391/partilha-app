import { render } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';
import { TestProviders } from './TestProviders';

// Mock NAV_THEME para evitar dependência externa em teste unitário
jest.mock('@/constants', () => ({
    NAV_THEME: {
        light: { background: 'white', text: 'black' },
        dark: { background: 'black', text: 'white' },
    },
}));

describe('TestProviders', () => {
    it('renderiza children corretamente no modo claro', () => {
        const { getByText } = render(
            <TestProviders>
                <Text>Conteúdo de teste</Text>
            </TestProviders>
        );
        expect(getByText('Conteúdo de teste')).toBeTruthy();
    });

    it('renderiza children corretamente no modo escuro', () => {
        const { getByText } = render(
            <TestProviders isDarkMode>
                <Text>Modo escuro</Text>
            </TestProviders>
        );
        expect(getByText('Modo escuro')).toBeTruthy();
    });
});
