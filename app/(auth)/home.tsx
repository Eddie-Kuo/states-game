import { useGameList } from '@/api/games';
import GameCard from '@/components/GameCard';
import { useAuth } from '@/context/AuthProvider';
import { Game } from '@/types';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const Home = () => {
  const [games, setGames] = useState<any[] | undefined>();
  const { user } = useAuth();
  const router = useRouter();

  const { data: gameList } = useGameList(user!.id);

  useEffect(() => {
    if (gameList) {
      setGames(gameList);
    }
  }, [gameList]);

  const renderGames: ListRenderItem<Game> = ({ item }) => {
    // const { data: opposingUser } = useUserInfo(item.id);
    // console.log(opposingUser);
    // each Item is a game
    // within each game we have player one and player two id and progress
    // 1. we need to know which player the current player is
    // const opposingPlayer = item.player_one_id === user.id ? item.player_two_id
    // 2. then we need to fetch the user info based on the opposing player id
    // 3. display the opposing player data in the return jsx

    return <GameCard item={item} />;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => router.push('/ProfileEditModal')}
        style={{
          position: 'absolute',
          top: 5,
          right: 5,
          paddingVertical: 8,
          paddingHorizontal: 12,
          borderWidth: 0.5,
          margin: 4,
          borderRadius: 25,
        }}>
        <Text>Edit Profile</Text>
      </TouchableOpacity>
      <View
        style={{ marginTop: 50, width: '100%', alignItems: 'center', gap: 5 }}>
        <Text style={{ fontSize: 25, fontWeight: '600' }}>Your Games</Text>
        <View
          style={{
            width: '95%',
            height: 1,
            backgroundColor: 'grey',
            opacity: 0.3,
          }}
        />
        <FlatList
          style={{ margin: 10, height: '100%' }}
          renderItem={renderGames}
          data={games}
          keyExtractor={(game) => game.id}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
