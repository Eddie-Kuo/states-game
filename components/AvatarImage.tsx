import { useUserInfo } from '@/api/user-customization';
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
    const fetchUserAvatarURL = async () => {
      if (!user) return;
      setAvatarURL(userInfo.avatar_url);
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
