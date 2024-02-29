import { useGameList } from '@/api/games';
import { useAuth } from '@/context/AuthProvider';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Game = {
  id: string;
  player_one_id: string;
  player_two_id: string;
  player_one_progress: JSON;
  player_two_progress: JSON;
};

const Home = () => {
  const [games, setGames] = useState<any[] | undefined>();
  const { user } = useAuth();
  const router = useRouter();

  const { data: gameList } = useGameList(user!.id);
  console.log('GAMES FROM HOME SCREEN', games);

  useEffect(() => {
    if (gameList) {
      setGames(gameList);
    }
  }, [gameList]);

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
      <Text>Hello!! You are in the home screen</Text>
      <Text>Email: {user?.email}</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
