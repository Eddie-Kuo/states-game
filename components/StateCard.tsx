import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type StateCardProps = {
  state: {
    state: string;
    seen: string;
  };
};

const StateCard = ({ state }: StateCardProps) => {
  return (
    <TouchableOpacity>
      <Text>{state.state}</Text>
    </TouchableOpacity>
  );
};

export default StateCard;

const styles = StyleSheet.create({});
