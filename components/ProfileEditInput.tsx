import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

/**
 * Responsible for rendering an input field with its respective label for profile edits
 */

type ProfileEditInputProps = {
  label: string;
  value: string | undefined;
  onChangeText: (value: string) => void;
  placeholder: string | undefined;
};

const ProfileEditInput = ({
  label,
  value,
  onChangeText,
  placeholder,
}: ProfileEditInputProps) => {
  return (
    <View style={styles.inputContainer}>
      <Text>{label}</Text>
      <TextInput
        placeholder={placeholder === undefined ? label : placeholder}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
      />
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
