import { Slot } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

// async storage cached token
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch {
      return;
    }
  },
};

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

const RootLayout = () => {
  return <Slot />;
};

export default RootLayout;
