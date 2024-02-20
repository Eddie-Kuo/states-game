import ProfileEditInput from '@/components/ProfileEditInput';
import { useAuth } from '@/context/AuthProvider';
import { getUserInfo } from '@/lib/actions/getUserInfo';
import { supabase } from '@/lib/initSupabase';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * Responsible for rendering out the form to allow users to edit their profile
 * - prefetches the data of the current user + pre populates fields
 * - handles the state of the individual input fields
 */

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
  const [firstName, setFirstName] = useState<string | undefined>('');
  const [lastName, setLastName] = useState<string | undefined>('');
  const [username, setUsername] = useState<string | undefined>('');

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      const data = await getUserInfo(user.id);
      setUserInfo(data);
      setFirstName(data?.first_name);
      setLastName(data?.last_name);
      setUsername(data?.username);
    };
    fetchUserData();
  }, []);

  const updateUserInfo = async () => {
    const { error } = await supabase
      .from('profiles')
      .update({
        first_name: firstName,
        last_name: lastName,
        username,
      })
      .eq('id', userInfo?.id);

    if (error) {
      console.log('Error updating user information:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('@/assets/images/placeholder.jpg')}
          style={styles.image}
        />
      </View>
      <Text style={styles.emailText}>{userInfo?.email}</Text>

      <ProfileEditInput
        label={'First Name'}
        value={firstName}
        onChangeText={setFirstName}
      />
      <ProfileEditInput
        label={'Last Name'}
        value={lastName}
        onChangeText={setLastName}
      />
      <ProfileEditInput
        label={'Username'}
        value={username}
        onChangeText={setUsername}
      />
      <TouchableOpacity style={styles.submitButton} onPress={updateUserInfo}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileEditModal;

const styles = StyleSheet.create({
  container: { paddingTop: 20, gap: 10, alignItems: 'center' },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    borderWidth: 0.2,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  emailText: { color: 'gray' },
  submitButton: {
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
  },
  submitButtonText: { color: 'white', fontWeight: 'bold' },
});
