import { supabase } from '@/lib/initSupabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGameList = (userId: string) => {
  return useQuery({
    queryKey: ['games'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('games')
        .select()
        .or(`player_one_id.eq.${userId},player_two_id.eq.${userId}`);
      if (error) {
        console.log('🚀 ~ queryFn: ~ error:', error);
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useGameData = (gameId: string) => {
  return useQuery({
    queryKey: ['gameData'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('games')
        .select()
        .eq('id', gameId)
        .single();
      if (error) {
        console.log('🚀 ~ queryFn: ~ error:', error);
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useStartNewGame = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: any) {
      const { data: gameData, error } = await supabase
        .from('games')
        .insert({ player_one_id: data.userId, player_two_id: data.opponentId })
        .select()
        .single();

      if (error) {
        console.log('🚀 ~ mutationFn ~ error:', error);
        throw new Error(error.message);
      }

      return gameData;
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ['games'] });
    },
  });
};
