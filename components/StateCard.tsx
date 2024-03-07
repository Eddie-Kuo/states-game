import React from 'react';
import { StyleSheet, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

type StateCardProps = {
  state: {
    state: string;
    seen: string;
  };
};

const StateCard = ({ state }: StateCardProps) => {
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
        onPress={(isChecked: boolean) => {}}
        size={25}
        fillColor='pink'
        unfillColor='#FFFFFF'
        text={`${state.state}`}
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
