import { useAuth } from '@/context/AuthProvider';
import { supabase } from '@/lib/initSupabase';
import { Game } from '@/types';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const GameScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [gameContents, setGameContents] = useState<Game | null>();
  const { user } = useAuth();

  // set the opposing players id and progress
  useEffect(() => {
    if (id) {
      const fetchGameDetails = async () => {
        const { data, error } = await supabase
          .from('games')
          .select()
          .eq('id', id)
          .single();

        if (error) {
          return new Error(error.message);
        }
        setGameContents(data);
        return data;
      };
      fetchGameDetails();
    }
  }, []);

  const opposingPlayerId =
    gameContents?.player_one_id === user!.id
      ? gameContents.player_two_id
      : gameContents?.player_one_id;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Game ID: {id}</Text>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({});
