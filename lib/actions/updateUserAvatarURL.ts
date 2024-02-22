import { supabase } from '../initSupabase';

/**
 * Responsible for populating the user's avatar_url in profiles table
 * @param data string
 * @param userId string
 */

export const updateUserAvatarURL = async (data: string, userId: string) => {
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
    .eq('id', userId);

  if (error) {
    console.log('Error updating user avatar:', error.message);
  }
};
