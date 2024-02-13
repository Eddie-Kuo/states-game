import { useAuth } from '@/context/AuthProvider';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Home = () => {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => router.push('/ProfileEditModal')}
        style={{
          position: 'absolute',
          top: 5,
          right: 5,
          paddingVertical: 8,
          paddingHorizontal: 12,
          borderWidth: 0.5,
          margin: 4,
          borderRadius: 25,
        }}>
        <Text>Edit Profile</Text>
      </TouchableOpacity>
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
