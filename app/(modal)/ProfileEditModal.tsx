import ProfileEditInput from '@/components/ProfileEditInput';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ProfileEditModal = () => {
  return (
    <View style={{ paddingTop: 20, gap: 10, alignItems: 'center' }}>
      <View
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          alignSelf: 'center',
          borderWidth: 0.2,
        }}>
        <Image
          source={require('@/assets/images/placeholder.jpg')}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 50,
          }}
        />
      </View>
      <Text style={{ color: 'gray' }}>ThisIsMyEmail@Gmail.com</Text>

      <ProfileEditInput>First Name</ProfileEditInput>
      <ProfileEditInput>Last Name</ProfileEditInput>
      <ProfileEditInput>Username </ProfileEditInput>
      <TouchableOpacity
        style={{
          marginTop: 5,
          borderWidth: 0.3,
          width: '90%',
          alignItems: 'center',
          padding: 10,
          borderRadius: 10,
          backgroundColor: 'cadetblue',
          shadowColor: '#000',
          shadowOpacity: 0.3,
          shadowOffset: {
            height: 2,
            width: 2,
          },
        }}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileEditModal;

const styles = StyleSheet.create({});
