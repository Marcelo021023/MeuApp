import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function UserListScreen() {
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://192.168.0.105:3000/users');
      if (!response.ok) {
        throw new Error('Erro ao buscar usuários');
      }
      const data = await response.json();
      console.log(data);
   } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Lista de Usuários</Text>
      {/* Renderize a lista de usuários aqui */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});