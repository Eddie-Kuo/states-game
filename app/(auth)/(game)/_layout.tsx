import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const GameLayout = () => {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
      }}>
      <Stack.Screen
        name='[id]'
        options={{
          headerTitle: '',
          headerStyle: {
            backgroundColor: '#fff',
          },

          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}>
              <Ionicons
                name='arrow-back-circle-sharp'
                size={24}
                color='black'
              />
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

export default GameLayout;

const styles = StyleSheet.create({
  backButton: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  backButtonText: { color: 'black', fontWeight: '300', fontSize: 18 },
});
