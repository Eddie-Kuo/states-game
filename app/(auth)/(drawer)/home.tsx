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
    return <GameCard item={item} />;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => router.push('/modal')}
        style={styles.editProfileButton}>
        <Text>Edit Profile</Text>
      </TouchableOpacity>
      <View style={styles.gamesContainer}>
        <Text style={styles.gamesHeader}>Your Games</Text>
        <View style={styles.separator} />
        <FlatList
          style={{ margin: 10, height: '100%' }}
          renderItem={renderGames}
          data={games}
          // keyExtractor value needs to be a string
          keyExtractor={(game) => game.id.toString()}
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
  editProfileButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 0.5,
    margin: 4,
    borderRadius: 25,
  },
  gamesContainer: {
    marginTop: 50,
    width: '100%',
    alignItems: 'center',
    gap: 5,
  },
  gamesHeader: { fontSize: 25, fontWeight: '600' },
  separator: {
    width: '95%',
    height: 1,
    backgroundColor: 'grey',
    opacity: 0.3,
  },
});
