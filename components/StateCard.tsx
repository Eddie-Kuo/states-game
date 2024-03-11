import { useSeenState } from '@/api/games';
import { Player } from '@/types';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

type StateCardProps = {
  item: string;
  currentPlayer: Player;
  gameId: string;
};

const StateCard = ({ item, currentPlayer, gameId }: StateCardProps) => {
  const [checkboxState, setCheckboxState] = useState(
    currentPlayer?.playerProgress[item]
  );
  const { mutate: updateSeenState } = useSeenState();

  const handleSeenState = () => {
    const targetState = item;
    setCheckboxState(!checkboxState);
    currentPlayer!.playerProgress[targetState] = true;
    console.log(currentPlayer?.playerProgress);
    try {
      updateSeenState({ currentPlayer, gameId });
    } catch (error) {
      console.log('🚀 ~ handleUpdateUserInfo ~ error:', error);
    }
  };
  return (
    <View
      style={{
        backgroundColor: 'lightgrey',
        padding: 15,
        borderRadius: 15,
        width: '100%',
        alignItems: 'center',
        marginVertical: 2,
        flexDirection: 'row',
      }}>
      <BouncyCheckbox
        onPress={handleSeenState}
        isChecked={checkboxState}
        size={25}
        fillColor='pink'
        unfillColor='#FFFFFF'
        text={`${item}`}
        textStyle={{ color: 'black' }}
        innerIconStyle={{ borderWidth: 2 }}
        bounceEffectIn={0.9}
        bounceEffectOut={1}
      />
    </View>
  );
};

export default StateCard;

const styles = StyleSheet.create({});
