import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const AuthenticatedLayout = () => {
  const router = useRouter();
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='(drawer)' />
      <Stack.Screen name='(game)' />
      <Stack.Screen
        name='(modal)/modal'
        options={{
          presentation: 'modal',
          headerShown: true,
          headerTitle: 'Edit Profile',
          headerStyle: {
            backgroundColor: 'slategrey',
          },
          headerTitleStyle: {
            color: '#fff',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={{ color: '#fff', fontWeight: '300', fontSize: 18 }}>
                Cancel
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

export default AuthenticatedLayout;

const styles = StyleSheet.create({});
