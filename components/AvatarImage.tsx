import { useUserInfo } from '@/api/users';
import React, { useEffect, useState } from 'react';
import { Image, View } from 'react-native';
// @ts-ignore
import placeholder from '@/assets/images/placeholder.jpg';
import { useAuth } from '@/context/AuthProvider';
const avatar_placeholder = Image.resolveAssetSource(placeholder).uri;

type AvatarImageProps = {
  styleProps?: {};
  avatarUrl?: string;
  children?: React.ReactNode;
};

const AvatarImage = ({ styleProps, children }: AvatarImageProps) => {
  const { user } = useAuth();
  const [avatarURL, setAvatarURL] = useState<string>(avatar_placeholder);
  const { data: userInfo } = useUserInfo(user!.id);

  useEffect(() => {
    if (userInfo) {
      setAvatarURL(userInfo.avatar_url);
    }
  }, [userInfo]);

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
