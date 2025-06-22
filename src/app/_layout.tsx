import { Stack } from "expo-router";
import * as React from 'react';
import { AppProviders } from "../contexts/AppProviders";
import './global.css';


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router';

export default function RootLayout() {

  return (
    <AppProviders>
      <Stack screenOptions={{ headerShown: false }} >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="register"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(protected)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </AppProviders>
  );
}
