import { usePlayerProgress } from '@/api/games';
import { useAuth } from '@/context/AuthProvider';
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

  const { data: playerProgress } = usePlayerProgress({
    userId: user?.id,
    gameId: id,
  });

  useEffect(() => {
    if (playerProgress) {
      const stateNames = Object.entries(playerProgress.progress);
      setStates(stateNames);
    }
  }, [playerProgress]);

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
    <View
      style={{
        width: '100%',
        justifyContent: 'flex-start',
        padding: 10,
      }}>
      <FlatList data={states} renderItem={renderList} />
    </View>
  );
};

export default StatesList;

const styles = StyleSheet.create({});
