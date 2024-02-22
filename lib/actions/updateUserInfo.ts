import { supabase } from '../initSupabase';

type updateUserInfoProps = {
  firstName: string;
  lastName: string;
  username: string;
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
