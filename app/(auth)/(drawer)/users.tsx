import { useStartNewGame } from '@/api/games';
import { useUserList } from '@/api/users';
import { useAuth } from '@/context/AuthProvider';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';

import {
  FlatList,
  Image,
  ListRenderItem,
  Modal,
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
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Profile | null>();
  const { user } = useAuth();
  const router = useRouter();

  const { data: userList } = useUserList(user!.id);
  const { mutate: startNewGame } = useStartNewGame();

  useEffect(() => {
    if (userList) {
      setUsers(userList);
    }
  }, [userList]);

  const onConfirmStartGame = () => {
    try {
      startNewGame({ userId: user?.id, opponentId: selectedUser?.id });
      setOpenModal(false);
    } catch (error) {
      console.log('🚀 ~ onConfirmStartGame ~ error:', error);
    } finally {
      router.navigate('/(auth)/home');
    }
  };

  const confirmationModal = (user: Profile) => {
    return (
      <Modal visible={openModal} animationType='slide' transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalTopHalf}>
            {/* <Ionicons style={styles.modalIcon} name='' size={100} /> */}

            <View style={styles.modalTextContainer}>
              <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
                Would you like to start a game with {user?.email} ?
              </Text>
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  onPress={() => setOpenModal(false)}
                  style={{
                    ...styles.modalButton,
                    borderColor: 'red',
                  }}>
                  <Text style={{ color: 'red' }}>Close</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={onConfirmStartGame}
                  style={{
                    ...styles.modalButton,
                    borderColor: 'green',
                  }}>
                  <Text style={{ color: 'green' }}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const openConfirmationModal = (user: Profile) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  // Render items function for Flatlist
  const renderUsers: ListRenderItem<Profile> = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.listItemContainer}
        onPress={() => openConfirmationModal(item)}>
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
      {confirmationModal(selectedUser!)}
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
    backgroundColor: '#AAABAE',
    opacity: 1,
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
    paddingHorizontal: 12,
    paddingVertical: 12,
    justifyContent: 'space-between',
    backgroundColor: '#AAABAE',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  modalTopHalf: {
    backgroundColor: '#975E64',
    width: '90%',
    height: 250,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#AAABAE',
  },
  modalIcon: {
    alignSelf: 'center',
    bottom: -30,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    zIndex: 10,
  },
  modalTextContainer: {
    position: 'absolute',
    backgroundColor: '#E8EAEB',
    height: 150,
    bottom: 0,
    width: '100%',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  modalButton: {
    borderWidth: 1,
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
