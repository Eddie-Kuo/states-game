import { supabase } from '../initSupabase';

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
