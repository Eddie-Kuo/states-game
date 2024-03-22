import { supabase } from '../initSupabase';

export const updateSeenState = async (data: any) => {
  try {
    const { data: updatedGameData, error } = await supabase
      .from('players')
      .update({
        progress: data.playerProgress.progress,
      })
      .match({ game_id: data.gameId, user_id: data.userId });

    if (error) {
      console.log('🚀 ~ mutationFn ~ error:', error);
    }

    return updatedGameData;
  } catch (error) {
    console.log('🚀 ~ updateSeenState ~ error:', error);
  }
};
