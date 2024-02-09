import CustomDrawerContent from '@/components/CustomDrawerContent';
import CustomHomeHeaderLeft from '@/components/CustomHomeHeaderLeft';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { Image, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const AuthenticatedLayout = () => {
  const navigation = useNavigation();
  return (
    // Required after Expo SDK 50
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={CustomDrawerContent}
        screenOptions={{
          ...CustomScreenOptions,
        }}>
        <Drawer.Screen
          name='home'
          options={{
            drawerLabel: 'Home',
            title: '',
            drawerIcon: ({ color, size }) => (
              <Ionicons name='home' color={color} size={size} />
            ),

            headerLeft: () => <CustomHomeHeaderLeft />,
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
};

const CustomScreenOptions = {
  drawerHideStatusBarOnOpen: true,
  headerStyle: {
    backgroundColor: 'transparent',
    elevation: 0, // for Android
    shadowOpacity: 0, // for iOS
    borderBottomWidth: 0,
    height: 120,
  },
  drawerActiveBackgroundColor: 'lightslategrey',
  drawerActiveTintColor: '#fff',
  drawerStyle: {
    backgroundColor: '#fff',
  },
  drawerLabelStyle: {
    marginLeft: -15,
  },
  headerBackground: () => {
    return (
      <Image
        style={StyleSheet.absoluteFill}
        source={{
          uri: 'https://images.pexels.com/photos/1831234/pexels-photo-1831234.jpeg',
        }}
      />
    );
  },
};

export default AuthenticatedLayout;
