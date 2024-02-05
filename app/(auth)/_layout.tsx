import { Drawer } from 'expo-router/drawer';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import CustomDrawerContent from '@/components/CustomDrawerContent';

export default function Layout() {
  return (
    // Required after Expo SDK 50
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen name='home' />
        <Drawer.Screen name='users' />
      </Drawer>
    </GestureHandlerRootView>
  );
}
