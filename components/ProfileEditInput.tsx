import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

type ProfileEditInputProps = {
  children: React.ReactNode;
  label: string;
};

const ProfileEditInput = ({ children, label }: ProfileEditInputProps) => {
  return (
    <View style={styles.inputContainer}>
      <Text>{label}</Text>
      <TextInput placeholder={`${children}`} style={styles.input} />
    </View>
  );
};

export default ProfileEditInput;

const styles = StyleSheet.create({
  inputContainer: { gap: 5, width: '90%' },
  input: {
    borderWidth: 0.3,
    padding: 10,
    borderRadius: 10,
  },
});
