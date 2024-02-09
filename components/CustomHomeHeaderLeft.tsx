import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

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
      <TouchableOpacity
        style={{
          width: 60,
          height: 60,
          borderRadius: 50,
          alignSelf: 'center',
          borderWidth: 2,
          borderColor: '#fff',
        }}>
        <Image
          source={require('@/assets/images/placeholder.jpg')}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 50,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CustomHomeHeaderLeft;

const styles = StyleSheet.create({});
