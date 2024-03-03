import { Game } from '@/types';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type GameCardProps = {
  item: Game;
};

const GameCard = ({ item }: GameCardProps) => {
  return (
    <TouchableOpacity>
      <Text>{item.id}</Text>
    </TouchableOpacity>
  );
};

export default GameCard;

const styles = StyleSheet.create({});
