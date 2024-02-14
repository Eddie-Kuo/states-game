import ProfileEditInput from '@/components/ProfileEditInput';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const ProfileEditModal = () => {
  return (
    <View style={{ paddingTop: 20, gap: 10 }}>
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
      <ProfileEditInput>First Name</ProfileEditInput>
      <ProfileEditInput>Last Name</ProfileEditInput>
      <ProfileEditInput>Username </ProfileEditInput>
    </View>
  );
};

export default ProfileEditModal;

const styles = StyleSheet.create({});
