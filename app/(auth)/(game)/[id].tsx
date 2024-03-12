import { useGameData } from '@/api/games';
import StatesList from '@/components/StatesList';
import { useAuth } from '@/context/AuthProvider';
import { Game, Player } from '@/types';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

const GameScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [gameContent, setGameContent] = useState<Game | null>();
  const [currentPlayer, setCurrentPlayer] = useState<Player>();

  const { user } = useAuth();

  const { data: gameData } = useGameData(id);
  useEffect(() => {
    if (gameData) {
      setGameContent(gameData);

      if (user?.id === gameContent?.playerOne.user_id) {
        setCurrentPlayer(gameData.playerOne);
      } else {
        setCurrentPlayer(gameData.playerTwo);
      }
    }
  }, [gameData]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <View style={{ padding: 10 }}>
        <Text>
          {gameContent?.playerOne.user_id} v.s {gameContent?.playerTwo.user_id}
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
      <StatesList gameId={id} />
    </SafeAreaView>
  );
};

export default GameScreen;

const styles = StyleSheet.create({});
