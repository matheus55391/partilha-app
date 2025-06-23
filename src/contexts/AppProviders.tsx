import { NAV_THEME } from '@/constants';
import { ReactQueryProvider } from '@/contexts/ReactQueryProvider';
import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { ReactNode } from 'react';
import { Platform } from 'react-native';
import { SessionRedirectProvider } from './SessionRedirectProvider';

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

interface Props {
  children: ReactNode;
}

export function AppProviders({ children }: Props) {
  const hasMounted = React.useRef(false);
  const { isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === 'web') {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add('bg-background');
    }
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }
  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
      <ReactQueryProvider>
        <SessionRedirectProvider>
          {children}
        </SessionRedirectProvider>
      </ReactQueryProvider>
    </ThemeProvider>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === 'web' && typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;
