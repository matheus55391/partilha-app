import { useSessionStore } from "@/stores/session-store";
import { Redirect, Stack } from "expo-router";

export default function ProtectedLayout() {
    const accessToken = useSessionStore((state) => state.accessToken);

    if (!accessToken) {
        return <Redirect href="/" />;
    }

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="home" options={{ headerShown: false }} />
            <Stack.Screen name="profile" options={{ headerShown: false }} />
            <Stack.Screen name="group" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
        </Stack>
    );
}
