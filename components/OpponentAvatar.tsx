import React from 'react';
import { Image, View } from 'react-native';
// @ts-ignore
import placeholder from '@/assets/images/placeholder.jpg';
const avatar_placeholder = Image.resolveAssetSource(placeholder).uri;

type OpponentAvatarProps = {
  avatarUrl?: string;
};

const OpponentAvatar = ({ avatarUrl }: OpponentAvatarProps) => {
  return (
    <View
      style={{
        width: 50,
        height: 50,
        borderRadius: 50,
      }}>
      <Image
        source={avatarUrl ? { uri: avatarUrl } : { uri: avatar_placeholder }}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 50,
        }}
      />
    </View>
  );
};

export default OpponentAvatar;
