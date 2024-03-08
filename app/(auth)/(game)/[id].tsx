import { useGameData, useSeenState } from '@/api/games';
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

  const { user } = useAuth();

  const { data: gameData } = useGameData(id);
  const { mutate: updateSeenState } = useSeenState();
  useEffect(() => {
    if (gameData) {
      setGameContent(gameData);

      if (user?.id === gameData.player_one_id) {
        setCurrentPlayer({
          title: 'player_one',
          id: gameData.player_one_id,
          playerProgress: gameData.player_one_progress,
          playerStates: Object.keys(gameData.player_one_progress),
        });
      } else {
        setCurrentPlayer({
          title: 'player_two',
          id: gameData.player_two_id,
          playerProgress: gameData.player_two_progress,
          playerStates: Object.keys(gameData.player_two_progress),
        });
      }
    }
  }, [gameData]);

  const renderList: ListRenderItem<string> = ({ item }) => {
    // const handleSeenState = () => {
    //   const targetState = item;
    //   currentPlayer!.playerProgress[targetState] = true;
    //   console.log(currentPlayer?.playerProgress);
    //   try {
    //     updateSeenState({ currentPlayer, id });
    //   } catch (error) {
    //     console.log('🚀 ~ handleUpdateUserInfo ~ error:', error);
    //   }
    // };

    return <StateCard item={item} currentPlayer={currentPlayer!} gameId={id} />;
    //   <View
    //     style={{
    //       backgroundColor: 'lightgrey',
    //       padding: 15,
    //       borderRadius: 15,
    //       width: '100%',
    //       alignItems: 'center',
    //       marginVertical: 2,
    //       flexDirection: 'row',
    //     }}>
    //     <BouncyCheckbox
    //       onPress={handleSeenState}
    //       size={25}
    //       fillColor='pink'
    //       unfillColor='#FFFFFF'
    //       text={`${item}`}
    //       textStyle={{ color: 'black' }}
    //       innerIconStyle={{ borderWidth: 2 }}
    //       bounceEffectIn={0.9}
    //       bounceEffectOut={1}
    //     />
    //   </View>
    // );
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
          {user?.id} v.s{' '}
          {currentPlayer?.title === 'player_one'
            ? gameContent?.player_two_id
            : gameContent?.player_one_id}
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
        <FlatList data={currentPlayer?.playerStates} renderItem={renderList} />
      </View>
    </SafeAreaView>
  );
};

export default GameScreen;

const styles = StyleSheet.create({});
