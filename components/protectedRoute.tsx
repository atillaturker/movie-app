import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import Loading from "./loading";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuth, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuth) {
      router.replace("/login");
    }
  }, [isAuth, isLoading]);

  if (isLoading) return <Loading />;
  if (!isAuth) return null;

  return <>{children}</>;
}
