import { useAuth } from '@/context/AuthProvider';
import { supabase } from '@/lib/initSupabase';
import { Game, UserInfo } from '@/types';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

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
      };
      fetchOpposingPlayer();
    }
  }, []);

  return (
    <TouchableOpacity>
      <Text>{opponent?.email}</Text>
    </TouchableOpacity>
  );
};

export default GameCard;

const styles = StyleSheet.create({});
