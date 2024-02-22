import AvatarImage from '@/components/AvatarImage';
import ProfileEditInput from '@/components/ProfileEditInput';
import { useAuth } from '@/context/AuthProvider';
import { getUserInfo } from '@/lib/actions/getUserInfo';
import { selectNewImage } from '@/lib/actions/selectNewImage';
import { updateUserInfo } from '@/lib/actions/updateUserInfo';
import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * Responsible for rendering out the form to allow users to edit their profile
 * - handles the state of the individual input fields
 * - function to update userData on submit
 */

export const ProfileEditModal = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { user } = useAuth();
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string | undefined>();
  const [username, setUsername] = useState<string | undefined>();

  const fetchUserData = async () => {
    if (!user) return;
    const data = await getUserInfo(user.id);
    return data;
  };

  const { data: userInfo } = useQuery({
    queryKey: ['userInfo'],
    queryFn: fetchUserData,
  });

  const { mutateAsync: updateUser } = useMutation({
    mutationFn: updateUserInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
    },
  });

  const { mutateAsync: updateUserAvatarImage } = useMutation({
    mutationFn: selectNewImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
    },
  });

  const handleUpdateUserInfo = async () => {
    const userId = userInfo!.id;
    try {
      await updateUser({ firstName, lastName, username, userId });
    } catch (error) {
      console.log('🚀 ~ handleUpdateUserInfo ~ error:', error);
    } finally {
      router.back();
    }
  };

  const handleUpdateUserImage = async () => {
    if (!userInfo) return;
    const userId = userInfo.id;
    try {
      await updateUserAvatarImage(userId);
    } catch (error) {
      console.log('🚀 ~ handleUpdateUserImage ~ error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <AvatarImage styleProps={styles.image}>
          <TouchableOpacity
            onPress={handleUpdateUserImage}
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              padding: 5,
              borderWidth: 0.2,
              backgroundColor: '#fff',
              borderRadius: 25,
            }}>
            <Ionicons name='camera-outline' size={20} color={'grey'} />
          </TouchableOpacity>
        </AvatarImage>
      </View>
      <Text style={styles.emailText}>{userInfo?.email}</Text>

      <ProfileEditInput
        label={'First Name'}
        value={firstName}
        onChangeText={setFirstName}
        placeholder={userInfo?.first_name}
      />
      <ProfileEditInput
        label={'Last Name'}
        value={lastName}
        onChangeText={setLastName}
        placeholder={userInfo?.last_name}
      />
      <ProfileEditInput
        label={'Username'}
        value={username}
        onChangeText={setUsername}
        placeholder={userInfo?.username}
      />
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleUpdateUserInfo}>
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
