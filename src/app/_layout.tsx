import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <ReactQueryProvider >
      <Stack initialRouteName="login">
        <Stack.Screen
          name="login"
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
