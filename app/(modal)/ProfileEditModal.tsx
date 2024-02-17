import { getUserInfo } from '@/actions/getUserInfo';
import ProfileEditInput from '@/components/ProfileEditInput';
import { useAuth } from '@/context/AuthProvider';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface UserInfo {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
}

export const ProfileEditModal = () => {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState<UserInfo | null>();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      const data = await getUserInfo(user.id);
      setUserInfo(data);
    };
    fetchUserData();
  }, []);

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
      <Text style={{ color: 'gray' }}>{userInfo?.email}</Text>

      <ProfileEditInput label={'First Name'}>
        {userInfo?.first_name ? userInfo.first_name : 'First Name'}
      </ProfileEditInput>
      <ProfileEditInput label={'Last Name'}>
        {userInfo?.last_name ? userInfo.last_name : 'Last Name'}
      </ProfileEditInput>
      <ProfileEditInput label={'Username'}>
        {userInfo?.username ? userInfo.username : 'Username'}
      </ProfileEditInput>
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
