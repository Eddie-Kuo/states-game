import { UserInfo } from '@/app/(modal)/ProfileEditModal';
import { supabase } from '@/lib/initSupabase';

export const getUserInfo = async (userId: string): Promise<UserInfo | null> => {
  const { data, error } = await supabase
    .from('profiles')
    .select()
    .eq('id', userId);

  if (error) {
    console.log('Error fetching user info', error);
    return null;
  }

  return data[0];
};
