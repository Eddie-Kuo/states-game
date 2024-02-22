import { supabase } from '../initSupabase';

/**
 * Responsible for updating the user's information in the profiles table
 */

type updateUserInfoProps = {
  firstName: string | undefined;
  lastName: string | undefined;
  username: string | undefined;
  userId: string;
};

export const updateUserInfo = async ({
  firstName,
  lastName,
  username,
  userId,
}: updateUserInfoProps) => {
  const { error } = await supabase
    .from('profiles')
    .update({
      first_name: firstName,
      last_name: lastName,
      username,
    })
    .eq('id', userId);

  if (error) {
    console.log('Error updating user information:', error.message);
  }
};
