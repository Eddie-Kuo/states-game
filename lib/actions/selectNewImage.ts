import { decode } from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../initSupabase';
import { updateUserAvatarURL } from './updateUserAvatarURL';

export const selectNewImage = async (userId: string) => {
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
    const filePath = `${userId}/${new Date().getTime()}.${
      image.type === 'image' ? 'png' : 'mp4'
    }`;
    const contentType = image.type === 'image' ? 'image/png' : 'video/mp4';
    const { data } = await supabase.storage
      .from('avatars')
      .upload(filePath, decode(base64), { contentType });
    updateUserAvatarURL(data!.path, userId);
  }
};
