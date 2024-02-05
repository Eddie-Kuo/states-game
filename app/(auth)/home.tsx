import { useAuth } from '@/context/AuthProvider';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Home = () => {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
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
