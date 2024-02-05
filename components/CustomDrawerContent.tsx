import { useAuth } from '@/context/AuthProvider';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CustomDrawerContent = (props: any) => {
  const { user, signOut } = useAuth();
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={{ backgroundColor: 'lightslategray' }}>
        <View style={{ padding: 20 }}>
          <Image
            source={require('../assets/images/placeholder.jpg')}
            style={{
              width: 100,
              height: 100,
              alignSelf: 'center',
              borderRadius: 50,
              borderWidth: 0.2,
            }}
          />
          <Text
            style={{
              alignSelf: 'center',
              fontWeight: '600',
              fontSize: 16,
              paddingTop: 10,
              color: 'aliceblue',
            }}>
            {user?.email}
          </Text>
        </View>
        <View style={{ paddingVertical: 10, backgroundColor: '#fff' }}>
          <DrawerItemList {...props} />
          {/* <DrawerItem label={'Logout'} onPress={() => signOut()} /> */}
        </View>
      </DrawerContentScrollView>

      <View
        style={{
          borderTopColor: '#dde3fe',
          borderTopWidth: 1,
          padding: 20,
          paddingBottom: 20 + bottom,
        }}>
        <TouchableOpacity
          onPress={signOut}
          style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <MaterialCommunityIcons
            name='account-arrow-left-outline'
            size={25}
            color='lightslategrey'
          />
          <Text style={{ fontWeight: '500', color: 'slategrey' }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawerContent;
