import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { AuthProvider, useAuth } from '../context/AuthProvider';

// tanstack query
const queryClient = new QueryClient();

// Makes sure the user is authenticated before accessing protected pages
const InitialLayout = () => {
  const { session, initialized } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!initialized) return;

    // Check if the path/url is in the (auth) group
    const inAuthGroup = segments[0] === '(auth)';

    if (session && !inAuthGroup) {
      // Redirect authenticated users to the list page
      router.replace('/(auth)/home');
    } else if (!session) {
      // Redirect unauthenticated users to the login page
      router.replace('/(public)/login');
    }
  }, [session, initialized]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name='(modal)/modal'
        options={{
          presentation: 'modal',
          headerShown: true,
          headerTitle: 'Edit Profile',
          headerStyle: {
            backgroundColor: 'slategrey',
          },
          headerTitleStyle: {
            color: '#fff',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={{ color: '#fff', fontWeight: '300', fontSize: 18 }}>
                Cancel
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

// Wrap the app with the AuthProvider
const RootLayout = () => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <InitialLayout />
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default RootLayout;
