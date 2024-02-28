/**
 * Responsible for updating the user's information in the profiles table
 */

import { selectNewImage } from '@/lib/actions/selectNewImage';
import { supabase } from '@/lib/initSupabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useUserList = (userId: string) => {
  return useQuery({
    queryKey: ['userList'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select()
        .neq('id', userId);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useUserInfo = (userId: string) => {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select()
        .eq('id', userId)
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useUpdateUserInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: any) {
      const { error, data: updatedUserInfo } = await supabase
        .from('profiles')
        .update({
          first_name: data.firstName,
          last_name: data.lastName,
          username: data.username,
        })
        .eq('id', data.userId);

      if (error) {
        throw new Error(error.message);
      }
      return updatedUserInfo;
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ['userInfo'] });
    },
  });
};

export const useUpdateUserAvatarImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(userId: string) {
      return selectNewImage(userId);
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ['userInfo'] });
    },
  });
};
