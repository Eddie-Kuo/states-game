import { useGameData } from '@/api/games';
import StateCard from '@/components/StateCard';
import { useAuth } from '@/context/AuthProvider';
import { Game, Player, StateEntry } from '@/types';
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
  const [opponent, setOpponent] = useState<Player>();
  const [currentPlayer, setCurrentPlayer] = useState<Player>();

  const { user } = useAuth();

  const { data: gameData } = useGameData(id);
  useEffect(() => {
    if (gameData) {
      setGameContent(gameData);

      if (user?.id === gameData.player_one_id) {
        setOpponent({
          id: gameData.player_two_id,
          playerProgress: gameData.player_two_progress,
        });
        setCurrentPlayer({
          id: gameData.player_one_id,
          playerProgress: gameData.player_one_progress,
        });
      } else {
        setOpponent({
          id: gameData.player_one_id,
          playerProgress: gameData.player_one_progress,
        });
        setCurrentPlayer({
          id: gameData.player_two_id,
          playerProgress: gameData.player_two_progress,
        });
      }
    }
  }, [gameData]);

  const renderList: ListRenderItem<StateEntry> = ({ item }) => {
    return <StateCard state={item} />;
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
      <View
        style={{
          width: '100%',
          justifyContent: 'flex-start',
          padding: 10,
        }}>
        <FlatList
          data={currentPlayer?.playerProgress.progress}
          renderItem={renderList}
        />
      </View>
    </SafeAreaView>
  );
};

export default GameScreen;

const styles = StyleSheet.create({});
