import { useGameData } from '@/api/games';
import { useAuth } from '@/context/AuthProvider';
import { Game } from '@/types';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

type Opponent = {
  id: string | undefined;
  progress: JSON | undefined;
};

const GameScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [gameContent, setGameContent] = useState<Game | null>();
  const [opponent, setOpponent] = useState<Opponent | null>();
  const { user } = useAuth();

  const { data: gameData } = useGameData(id);
  useEffect(() => {
    if (gameData) {
      setGameContent(gameData);

      // set the opponent info
      user?.id === gameData.player_one_id
        ? setOpponent({
            id: gameData.player_two_id,
            progress: gameData.player_two_progress,
          })
        : setOpponent({
            id: gameData.player_one_id,
            progress: gameData.player_one_progress,
          });
    }
  }, [gameData]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <View>
        <Text>
          {user?.id} v.s {opponent?.id}
        </Text>
      </View>
      <View
        style={{
          width: '95%',
          height: 1,
          backgroundColor: 'grey',
          opacity: 0.3,
        }}
      />
      {/* <FlatList data={playerProgress} renderItem={renderList} /> */}
    </SafeAreaView>
  );
};

export default GameScreen;

const styles = StyleSheet.create({});
