import { useGameData } from '@/api/games';
import StateCard from '@/components/StateCard';
import { useAuth } from '@/context/AuthProvider';
import { Game, Player } from '@/types';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  ListRenderItem,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const GameScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [gameContent, setGameContent] = useState<Game | null>();
  const [currentPlayer, setCurrentPlayer] = useState<Player>();
  const [states, setStates] = useState();

  const { user } = useAuth();

  const { data: gameData } = useGameData(id);
  // const { data: playerProgress } = usePlayerProgress({
  //   playerId: currentPlayer?.id,
  //   userId: currentPlayer?.user_id,
  // });

  //* Note: Fixed the database schema for better data flow but facing a new problem with fetching the current user's progress as the timing of the fetch calls are clashing.
  //! Fetch functions are a bit messy but that comes with how my current database is set up.

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

  // useEffect(() => {
  //   if (playerProgress) {
  //     setStates(playerProgress.progress);
  //   }
  // }, [gameContent, currentPlayer]);

  const renderList: ListRenderItem<string> = ({ item }) => {
    return <StateCard item={item} currentPlayer={currentPlayer!} gameId={id} />;
  };

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
      <View
        style={{
          width: '100%',
          justifyContent: 'flex-start',
          padding: 10,
        }}>
        <FlatList data={states} renderItem={renderList} />
      </View>
    </SafeAreaView>
  );
};

export default GameScreen;

const styles = StyleSheet.create({});
