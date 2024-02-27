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
      <TouchableOpacity style={styles.listItemContainer}>
        <View style={styles.listItemDetailsContainer}>
          {item.avatar_url ? (
            <Image
              source={{ uri: item.avatar_url }}
              style={styles.listItemImage}
            />
          ) : (
            <Image
              source={require('@/assets/images/placeholder.jpg')}
              style={styles.listItemImage}
            />
          )}
          <Text style={styles.listItemText}>{item.email}</Text>
        </View>
        <Text>Select</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Select Your Opponent</Text>
      <View style={styles.separator} />
      <FlatList
        style={{ marginTop: 10 }}
        renderItem={renderUsers}
        data={users}
        keyExtractor={(user) => user.id}
      />
    </View>
  );
};

export default Users;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
    gap: 5,
  },
  headerText: { fontSize: 20, fontWeight: '700' },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: 'grey',
    opacity: 0.2,
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
    paddingHorizontal: 12,
    paddingVertical: 12,
    justifyContent: 'space-between',
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    width: '100%',
  },
  listItemDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  listItemImage: {
    width: 35,
    height: 35,
    alignSelf: 'center',
    borderRadius: 50,
  },
  listItemText: { fontWeight: '500' },
});
