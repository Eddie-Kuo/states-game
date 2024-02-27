import { useAuth } from '@/context/AuthProvider';
import { supabase } from '@/lib/initSupabase';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface Profile {
  id: string;
  email: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
}

const Users = () => {
  const [users, setUsers] = useState<Profile[] | null>();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const fetchUsers = async () => {
      const { data } = await supabase
        .from('profiles')
        .select()
        .neq('id', user.id);

      setUsers(data);
    };

    fetchUsers();
  }, []);

  const renderUsers: ListRenderItem<Profile> = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',

          alignItems: 'center',
          marginVertical: 3,
          paddingHorizontal: 12,
          paddingVertical: 12,
          justifyContent: 'space-between',
          backgroundColor: 'lightslategrey',
          borderRadius: 25,
          width: '100%',
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          {item.avatar_url ? (
            <Image
              source={{ uri: item.avatar_url }}
              style={{
                width: 35,
                height: 35,
                alignSelf: 'center',
                borderRadius: 50,
              }}
            />
          ) : (
            <Image
              source={require('@/assets/images/placeholder.jpg')}
              style={{
                width: 35,
                height: 35,
                alignSelf: 'center',
                borderRadius: 50,
              }}
            />
          )}
          <Text>{item.email}</Text>
        </View>
        <Text>Select</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text>Select a player to start a game with</Text>
      <FlatList
        renderItem={renderUsers}
        data={users}
        keyExtractor={(user) => user.id}
      />
    </View>
  );
};

export default Users;

const styles = StyleSheet.create({});
