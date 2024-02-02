import { useAuth } from '@/context/AuthProvider';
import { supabase } from '@/lib/initSupabase';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const Home = () => {
  const { user } = useAuth();

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <View style={styles.container}>
      <Text>Hello!! You are in the home screen</Text>
      <Button title='Logout' onPress={signOut} />
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
