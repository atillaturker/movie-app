import { useAuthStore } from "@/stores/authStore";
import { Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  const { getCurrentUser } = useAuthStore();
  useEffect(() => {
    getCurrentUser();
  }, []);
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="movie/[id]" options={{ headerShown: false }} />
    </Stack>
  );
}
