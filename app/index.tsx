import { Redirect } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

const index = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Redirect href={'/(public)/login'} />
    </View>
  );
};

export default index;
