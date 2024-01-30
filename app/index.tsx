import SignInWithApple from '@/components/SignInWithApple';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Page = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Hello World!!</Text>
      <SignInWithApple />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
