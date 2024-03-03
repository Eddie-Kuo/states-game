import { useAuth } from '@/context/AuthProvider';
import { supabase } from '@/lib/initSupabase';
import { Game, UserInfo } from '@/types';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import OpponentAvatar from './OpponentAvatar';

type GameCardProps = {
  item: Game;
};

const GameCard = ({ item }: GameCardProps) => {
  const [opponent, setOpponent] = useState<UserInfo | null>();
  const { user } = useAuth();

  const opposingPlayerId =
    item.player_one_id === user!.id ? item.player_two_id : item.player_one_id;

  useEffect(() => {
    if (opposingPlayerId) {
      const fetchOpposingPlayer = async () => {
        const { data, error } = await supabase
          .from('profiles')
          .select()
          .eq('id', opposingPlayerId)
          .single();
        setOpponent(data);

        if (error) {
          throw new Error(error.message);
        }
      };
      fetchOpposingPlayer();
    }
  }, []);

  return (
    <TouchableOpacity
      style={{
        backgroundColor: 'lightgrey',
        padding: 15,
        borderRadius: 15,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 2,
        flexDirection: 'row',
      }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <OpponentAvatar avatarUrl={opponent?.avatar_url} />
        <Text>{opponent?.email}</Text>
      </View>
      <Text style={{ fontWeight: '500' }}>50/50 - 50/50</Text>
    </TouchableOpacity>
  );
};

export default GameCard;

const styles = StyleSheet.create({});
