import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const CustomHomeHeaderLeft = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.customHeaderContainer}>
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
        <Ionicons name='menu' size={28} color={'black'} />
      </TouchableOpacity>
      {/* <AvatarImage styleProps={{ ...styles.avatarImage }} /> */}
    </View>
  );
};

export default CustomHomeHeaderLeft;

const styles = StyleSheet.create({
  customHeaderContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    gap: 6,
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
});
