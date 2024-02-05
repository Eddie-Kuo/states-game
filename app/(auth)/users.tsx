import { supabase } from '@/lib/initSupabase';
import { User } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';
import { FlatList, ListRenderItem, StyleSheet, Text, View } from 'react-native';

const Users = () => {
  const [users, setUsers] = useState<User[] | null>();

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await supabase.from('profiles').select();

      setUsers(data);
    };

    fetchUsers();
  }, []);

  const renderUsers: ListRenderItem<User> = ({ item }) => {
    return <Text>{item.email}</Text>;
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
