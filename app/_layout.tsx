// import { Slot, useRouter, useSegments } from 'expo-router';
// import * as SecureStore from 'expo-secure-store';
// import { useEffect } from 'react';

// // async storage cached token
// const tokenCache = {
//   async getToken(key: string) {
//     try {
//       return SecureStore.getItemAsync(key);
//     } catch {
//       return null;
//     }
//   },
//   async saveToken(key: string, value: string) {
//     try {
//       return SecureStore.setItemAsync(key, value);
//     } catch {
//       return;
//     }
//   },
// };

// const InitialLayout = () => {
//   const segments = useSegments();
//   const router = useRouter();

//   useEffect(() => {
//     if (!isLoaded) return;

//     // checks to see if we are already in the authenticated tab group
//     const inTabsGroup = segments[0] === '(auth)';
//     // if signed in and in authenticated tab group - redirect to home immediately
//     if (isSignedIn && !inTabsGroup) {
//       router.replace('/home');
//       // if we're not signed in, redirect to login page
//     } else if (!isSignedIn) {
//       router.replace('/login');
//     }
//   }, [isSignedIn]);
//   return <Slot />;
// };

// const RootLayout = () => {
//   return <Slot />;
// };

// export default RootLayout;

import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from '../context/AuthProvider';

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

  return <Slot />;
};

// Wrap the app with the AuthProvider
const RootLayout = () => {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
};

export default RootLayout;
