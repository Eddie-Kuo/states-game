import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Layout() {
  return (
    // Required after Expo SDK 50
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
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
              <Ionicons name='person-circle' color={color} size={size} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
