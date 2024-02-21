import placeholder from '@/assets/images/placeholder.jpg';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
const avatar_placeholder = Image.resolveAssetSource(placeholder).uri;

type AvatarImageProps = {
  styleProps?: {};
  avatarUrl?: string;
  children?: React.ReactNode;
};

const AvatarImage = ({ styleProps, avatarUrl, children }: AvatarImageProps) => {
  return (
    <View
      style={{
        ...styleProps,
      }}>
      <Image
        source={avatarUrl ? { uri: avatarUrl } : { uri: avatar_placeholder }}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 50,
        }}
      />
      {children}
    </View>
  );
};

export default AvatarImage;

const styles = StyleSheet.create({ container: {} });
