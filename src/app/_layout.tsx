import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { useSessionStore } from "@/stores/sessionStore";
import { Redirect, Stack, useSegments } from "expo-router";
import "./global.css";

export default function RootLayout() {
  const { accessToken } = useSessionStore();
  const segments = useSegments();

  const isProtectedRoute = segments[0] === "(protected)";

  // Se está tentando acessar rota protegida sem token: manda para login
  if (isProtectedRoute && !accessToken) {
    return <Redirect href="/" />;
  }

  // Se está no login/registro e já tem token, redireciona para /group
  if (!isProtectedRoute && accessToken) {
    return <Redirect href="/(protected)/group/[id]" />;
  }

  return (
    <ReactQueryProvider>
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
    </ReactQueryProvider>
  );
}
