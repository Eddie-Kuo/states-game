import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import AvatarImage from './AvatarImage';

const CustomHomeHeaderLeft = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        position: 'absolute',
        bottom: -40,
        left: 20,
        gap: 6,
      }}>
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
        <Ionicons name='menu' size={28} color={'black'} />
      </TouchableOpacity>
      <AvatarImage
        styleProps={{
          width: 60,
          height: 60,
          borderRadius: 50,
          alignSelf: 'center',
          borderWidth: 2,
          borderColor: '#fff',
        }}
      />
    </View>
  );
};

export default CustomHomeHeaderLeft;

const styles = StyleSheet.create({});
