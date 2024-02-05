import { supabase } from '@/lib/initSupabase';
import { User } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Users = () => {
  const [users, setUsers] = useState<User[] | null>();

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await supabase.from('profiles').select();

      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <View>
      <Text>Users</Text>
    </View>
  );
};

export default Users;

const styles = StyleSheet.create({});
