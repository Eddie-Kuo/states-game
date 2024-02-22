import { supabase } from '@/lib/initSupabase';
import { UserInfo } from '@/types';

/**
 * Responsible for fetching the user's account details from profiles table
 * @param userId string
 * @returns UserInfo object
 */

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
