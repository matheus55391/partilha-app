import { NAV_THEME } from '@/constants';
import { ReactQueryProvider } from '@/contexts/ReactQueryProvider';
import { SessionRedirectProvider } from '@/contexts/SessionRedirectProvider';
import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from '@react-navigation/native';
import React, { ReactNode } from 'react';

const LIGHT_THEME: Theme = {
    ...DefaultTheme,
    colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
    ...DarkTheme,
    colors: NAV_THEME.dark,
};

interface TestProvidersProps {
    children: ReactNode;
    isDarkMode?: boolean;
}

export function TestProviders({ children, isDarkMode = false }: TestProvidersProps) {
    return (
        <ThemeProvider value={isDarkMode ? DARK_THEME : LIGHT_THEME}>
            <ReactQueryProvider>
                <SessionRedirectProvider>
                    {children}
                </SessionRedirectProvider>
            </ReactQueryProvider>
        </ThemeProvider>
    );
}
