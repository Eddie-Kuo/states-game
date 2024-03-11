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
        .eq('id', data.player_ids[0])
        .single();
      const { data: playerTwo } = await supabase
        .from('players')
        .select()
        .eq('id', data.player_ids[1])
        .single();

      if (error) {
        console.log('🚀 ~ queryFn: ~ error:', error);
        throw new Error(error.message);
      }
      return {
        playerOne,
        playerTwo,
      };
    },
  });
};

export const usePlayerProgress = ({ playerId, userId }: any) => {
  return useQuery({
    queryKey: ['playerProgress'],
    queryFn: async () => {
      const { data: playerProgress, error } = await supabase
        .from('players')
        .select('progress')
        .match({ id: playerId, user_id: userId })
        .single();

      if (error) {
        console.log('🚀 ~ mutationFn ~ error:', error);
      }

      console.log('🚀 ~ mutationFn ~ playerProgress:', playerProgress);
      return playerProgress;
    },
  });
};

export const useStartNewGame = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: any) {
      const { data: currUserPlayerId } = await supabase
        .from('players')
        .insert({ user_id: data.userId })
        .select('id')
        .single();

      const { data: oppUserPlayerId } = await supabase
        .from('players')
        .insert({ user_id: data.opponentId })
        .select('id')
        .single();

      const { data: gameData, error } = await supabase
        .from('games')
        .insert({
          player_ids: [currUserPlayerId!.id, oppUserPlayerId!.id],
          player_one_id: data.userId,
          player_two_id: data.opponentId,
        })
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

export const useSeenState = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: any) {
      const { data: updatedGameData, error } = await supabase
        .from('games')
        .update({
          player_one_progress: data.currentPlayer.playerProgress,
        })
        .eq('id', data.gameId);

      if (error) {
        console.log('🚀 ~ mutationFn ~ error:', error);
      }

      return updatedGameData;
    },

    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ['gameData'] });
    },
  });
};
