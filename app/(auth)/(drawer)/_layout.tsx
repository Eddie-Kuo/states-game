import AvatarImage from '@/components/AvatarImage';
import CustomDrawerContent from '@/components/CustomDrawerContent';
import CustomHomeHeaderLeft from '@/components/CustomHomeHeaderLeft';
import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import { Image, StyleSheet, View } from 'react-native';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const AuthenticatedLayout = () => {
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
            headerLeft: () => (
              <View>
                <CustomHomeHeaderLeft />
                <AvatarImage styleProps={{ ...styles.avatarImage }} />
              </View>
            ),

            headerBackground: () => {
              return (
                <Image
                  style={styles.backgroundImage}
                  source={{
                    uri: 'https://images.pexels.com/photos/1831234/pexels-photo-1831234.jpeg',
                  }}
                />
              );
            },
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
            headerLeft: () => <CustomHomeHeaderLeft />,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    zIndex: 0,
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    position: 'relative',
    bottom: -30,
    left: 50,
    zIndex: 100,
  },
});

const CustomScreenOptions = {
  drawerHideStatusBarOnOpen: true,
  headerStyle: {
    backgroundColor: 'transparent',
    elevation: 0, // for Android
    shadowOpacity: 0, // for iOS
    borderBottomWidth: 0,
  },
  drawerActiveBackgroundColor: '#AAABAE',
  drawerActiveTintColor: '#000',

  drawerStyle: {
    backgroundColor: '#fff',
  },
  drawerLabelStyle: {
    marginLeft: -15,
  },
};

export default AuthenticatedLayout;
