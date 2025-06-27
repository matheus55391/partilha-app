import { useSessionStore } from '@/stores/session-store';
import { useRouter, useSegments } from 'expo-router';
import React, { ReactNode, useEffect } from 'react';

interface Props {
  children: ReactNode;
}

export function SessionRedirectProvider({ children }: Props) {
  const { accessToken } = useSessionStore();
  const segments = useSegments();
  const router = useRouter();

  const isProtectedRoute = segments[0] === '(protected)';

  useEffect(() => {
    if (isProtectedRoute && !accessToken) {
      router.replace('/');
    } else if (!isProtectedRoute && accessToken) {
      router.replace('/(protected)/home');
    }
  }, [accessToken, isProtectedRoute, router]);

  return <>{children}</>;
}
