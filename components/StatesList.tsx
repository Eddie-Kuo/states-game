import { useAuth } from '@/context/AuthProvider';
import { supabase } from '@/lib/initSupabase';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import StateCard from './StateCard';

type StatesListProps = {
  gameId: string;
};

const StatesList = ({ gameId }: StatesListProps) => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useAuth();
  const [states, setStates] = useState<any>();
  const [playerProgress, setPlayerProgress] =
    useState<Record<string, boolean>>();

  useEffect(() => {
    const fetchPlayerProgress = async () => {
      const { data, error } = await supabase
        .from('players')
        .select('progress')
        .match({ user_id: user?.id, game_id: gameId })
        .single();

      if (data) {
        setPlayerProgress(data);
        setStates(Object.entries(data.progress));
      }
      if (error) {
        console.log('🚀 ~ usePlayerProgress ~ error:', error);
      }

      return data;
    };

    fetchPlayerProgress();
  }, []);

  const renderList: ListRenderItem<[string, boolean]> = ({ item }) => {
    const [stateName, seen] = item;
    return (
      <StateCard
        stateName={stateName}
        seen={seen}
        playerProgress={playerProgress}
        gameId={id}
      />
    );
  };
  return (
    <View style={styles.container}>
      <FlatList data={states} renderItem={renderList} />
    </View>
  );
};

export default StatesList;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'flex-start',
    padding: 10,
    paddingBottom: 60,
  },
});
