import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const GameLayout = () => {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name='[id]'
        options={{
          headerTitle: '',
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={{ color: 'black', fontWeight: '300', fontSize: 18 }}>
                {`<- Back`}
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

export default GameLayout;

const styles = StyleSheet.create({});
