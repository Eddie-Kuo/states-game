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

      if (!data) {
        return;
      }

      const { data: playerOne } = await supabase
        .from('players')
        .select()
        .match({ user_id: data.player_ids[0], game_id: gameId })
        .single();
      const { data: playerTwo } = await supabase
        .from('players')
        .select()
        .match({ user_id: data.player_ids[1], game_id: gameId })
        .single();

      const { data: playerOneInfo } = await supabase
        .from('profiles')
        .select()
        .match({
          id: playerOne.user_id,
        })
        .single();
      const { data: playerTwoInfo } = await supabase
        .from('profiles')
        .select()
        .match({
          id: playerTwo.user_id,
        })
        .single();

      if (error) {
        console.log('🚀 ~ queryFn: ~ error:', error);
        throw new Error(error.message);
      }
      return {
        playerOne,
        playerTwo,
        playerOneInfo,
        playerTwoInfo,
      };
    },
  });
};

export const useStartNewGame = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: any) {
      const { data: gameData, error } = await supabase
        .from('games')
        .insert({
          player_ids: [data.userId, data.opponentId],
          player_one_id: data.userId,
          player_two_id: data.opponentId,
        })
        .select()
        .single();

      // creating entries in players table
      await supabase
        .from('players')
        .insert({ user_id: data.userId, game_id: gameData.id })
        .select('id')
        .single();

      await supabase
        .from('players')
        .insert({ user_id: data.opponentId, game_id: gameData.id })
        .select('id')
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
