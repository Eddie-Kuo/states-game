import CustomDrawerContent from '@/components/CustomDrawerContent';
import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Layout() {
  return (
    // Required after Expo SDK 50
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={CustomDrawerContent}
        screenOptions={{
          drawerHideStatusBarOnOpen: true,
          headerStyle: {
            backgroundColor: 'transparent',
            elevation: 0, // for Android
            shadowOpacity: 0, // for iOS
            borderBottomWidth: 0,
          },
          drawerActiveBackgroundColor: 'lightslategrey',
          drawerActiveTintColor: '#fff',
          drawerStyle: {
            backgroundColor: '#fff',
          },
          drawerLabelStyle: {
            marginLeft: -15,
          },
        }}>
        <Drawer.Screen
          name='home'
          options={{
            drawerLabel: 'Home',
            title: '',
            drawerIcon: ({ color, size }) => (
              <Ionicons name='home' color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name='users'
          options={{
            drawerLabel: 'Users',
            title: '',
            drawerIcon: ({ color, size }) => (
              <Ionicons name='people' color={color} size={size} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
