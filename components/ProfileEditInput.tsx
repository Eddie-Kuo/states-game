import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

type ProfileEditInputProps = {
  children: React.ReactNode;
};

const ProfileEditInput = ({ children }: ProfileEditInputProps) => {
  return (
    <View style={{ gap: 5, width: '90%' }}>
      <Text>{children}</Text>
      <TextInput
        placeholder={`${children}`}
        style={{
          borderWidth: 0.3,
          padding: 10,
          borderRadius: 10,
        }}
      />
    </View>
  );
};

export default ProfileEditInput;

const styles = StyleSheet.create({});
