import { useSeenState } from '@/api/games';
import { useAuth } from '@/context/AuthProvider';
import { Player } from '@/types';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

type StateCardProps = {
  stateName: string;
  seen: boolean;
  currentPlayer?: Player | undefined;
  gameId: string;
  playerProgress?: any;
};

const StateCard = ({
  stateName,
  seen,
  gameId,
  playerProgress,
}: StateCardProps) => {
  const [checkboxState, setCheckboxState] = useState<boolean>(seen);
  const { user } = useAuth();

  const { mutate: updateSeenState } = useSeenState();

  const handleSeenState = () => {
    const userId = user?.id;
    const targetState = stateName;

    setCheckboxState(!checkboxState);
    playerProgress.progress[targetState] = !checkboxState;
    try {
      updateSeenState({ playerProgress, gameId, userId });
    } catch (error) {
      console.log('🚀 ~ handleUpdateUserInfo ~ error:', error);
    }
  };
  return (
    <View style={styles.container}>
      <BouncyCheckbox
        onPress={handleSeenState}
        isChecked={checkboxState}
        size={25}
        fillColor='pink'
        unfillColor='#FFFFFF'
        text={`${stateName}`}
        textStyle={{ color: 'black' }}
        innerIconStyle={{ borderWidth: 2 }}
        bounceEffectIn={0.9}
        bounceEffectOut={1}
      />
    </View>
  );
};

export default StateCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightgrey',
    padding: 15,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
    marginVertical: 2,
    flexDirection: 'row',
  },
});
