import { supabase } from '@/lib/initSupabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGameList = (userId: string) => {
  return useQuery({
    queryKey: ['games'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('games')
        .select('id')
        .or(`player_one_id.eq.${userId},player_two_id.eq.${userId}`);
      if (error) {
        console.log('🚀 ~ queryFn: ~ error:', error);
        throw new Error(error.message);
      }
      const indexArr: any = [];

      data.map((element) => indexArr.push(element.id));

      console.log('GAME_IDS', indexArr);
      return data;
    },
  });
};

export const useStartNewGame = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: any) {
      console.log(data.userId);
      const { data: gameData, error } = await supabase
        .from('games')
        .insert({ player_one_id: data.userId, player_two_id: data.opponentId })
        .select()
        .single();

      if (error) {
        console.log('🚀 ~ mutationFn ~ error:', error);
        throw new Error(error.message);
      }
      console.log('GAME_DATA', gameData.id);

      return gameData.id;
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ['games'] });
    },
  });
};
