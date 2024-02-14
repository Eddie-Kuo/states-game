import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

type ProfileEditInputProps = {
  children: React.ReactNode;
};

const ProfileEditInput = ({ children }: ProfileEditInputProps) => {
  return (
    <View style={{ marginHorizontal: 20, gap: 5 }}>
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
