import AvatarImage from '@/components/AvatarImage';
import ProfileEditInput from '@/components/ProfileEditInput';
import { useAuth } from '@/context/AuthProvider';
import { getUserInfo } from '@/lib/actions/getUserInfo';
import { supabase } from '@/lib/initSupabase';
import { UserInfo } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { decode } from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * Responsible for rendering out the form to allow users to edit their profile
 * - handles the state of the individual input fields
 * - function to update userData on submit
 * - function to handle image selection from camera roll
 * - function to download image public url and update user information
 */

export const ProfileEditModal = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState<UserInfo | null>();
  const [firstName, setFirstName] = useState(userInfo?.first_name);
  const [lastName, setLastName] = useState(userInfo?.last_name);
  const [username, setUsername] = useState(userInfo?.username);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      const data = await getUserInfo(user.id);
      setUserInfo(data);
    };

    fetchUserData();
  }, []);

  // this is where tanstack query would be useful
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

    router.back();
  };

  const updateUserAvatarURL = async (data: string) => {
    // get public url
    const { data: publicURL } = supabase.storage
      .from('avatars')
      .getPublicUrl(data);

    // update user avatar_url
    const { error } = await supabase
      .from('profiles')
      .update({
        avatar_url: publicURL.publicUrl,
      })
      .eq('id', userInfo?.id);

    if (error) {
      console.log('Error updating user avatar:', error.message);
    }
  };

  // Image picker function
  const onSelectImage = async () => {
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    };

    const result = await ImagePicker.launchImageLibraryAsync(options);

    if (!result.canceled) {
      const image = result.assets[0];
      const base64 = await FileSystem.readAsStringAsync(image.uri, {
        encoding: 'base64',
      });
      const filePath = `${user!.id}/${new Date().getTime()}.${
        image.type === 'image' ? 'png' : 'mp4'
      }`;
      const contentType = image.type === 'image' ? 'image/png' : 'video/mp4';
      const { data } = await supabase.storage
        .from('avatars')
        .upload(filePath, decode(base64), { contentType });
      updateUserAvatarURL(data!.path);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <AvatarImage styleProps={styles.image}>
          <TouchableOpacity
            onPress={onSelectImage}
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
