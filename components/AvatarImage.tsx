import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
// @ts-ignore
import placeholder from '@/assets/images/placeholder.jpg';
import { useAuth } from '@/context/AuthProvider';
import { getUserInfo } from '@/lib/actions/getUserInfo';
const avatar_placeholder = Image.resolveAssetSource(placeholder).uri;

type AvatarImageProps = {
  styleProps?: {};
  avatarUrl?: string;
  children?: React.ReactNode;
};

const AvatarImage = ({ styleProps, children }: AvatarImageProps) => {
  const { user } = useAuth();
  const [avatarURL, setAvatarURL] = useState<string>(avatar_placeholder);

  useEffect(() => {
    const fetchUserAvatarURL = async () => {
      if (!user) return;
      const data = await getUserInfo(user.id);
      setAvatarURL(data!.avatar_url);
    };
    fetchUserAvatarURL();
  });

  return (
    <View
      style={{
        ...styleProps,
      }}>
      <Image
        source={{ uri: avatarURL }}
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

const styles = StyleSheet.create({});
