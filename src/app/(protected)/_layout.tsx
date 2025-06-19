import { useSessionStore } from "@/stores/sessionStore";
import { Redirect, Stack } from "expo-router";

export default function ProtectedLayout() {
    const accessToken = useSessionStore((state) => state.accessToken);
    console.log("🚀 ~ ProtectedLayout ~ accessToken:", accessToken)
    if (!accessToken) {
        return <Redirect href="/login" />;
    }
    return (
        <Stack>
            <Stack.Screen name="home" options={{ headerShown: false }} />
            <Stack.Screen name="profile" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
        </Stack>
    );
}