import { router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import Constants from 'expo-constants';

type RootStackParamList = {
  Perfil: undefined;
  EditarPerfil: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const API_URL = 'http://192.168.0.105:3000';

export default function EditarPerfil() {
  const [loading, setLoading] = useState(false);
  const [usuario, setUsuario] = useState({
    nome: '',
    email: '',
    telefone: '',
    foto: 'https://randomuser.me/api/portraits/women/1.jpg',
  });

  useEffect(() => {
    carregarDadosUsuario();
  }, []);

  const carregarDadosUsuario = async () => {
    try {
      const userData = await AsyncStorage.getItem('user_data');
      if (userData) {
        setUsuario(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  const salvarAlteracoes = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('auth_token');
      
      console.log('Enviando dados:', usuario);

      const response = await axios.put(
        `${API_URL}/api/users/profile`,
        usuario,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );

      console.log('Resposta:', response.data);

      await AsyncStorage.setItem('user_data', JSON.stringify(response.data.user));
      
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
      router.back();
    } catch (error: any) {
      console.error('Erro completo:', error);
      const mensagem = error.response?.data?.message || 'Erro ao atualizar perfil';
      Alert.alert('Erro', mensagem);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.form, styles.formCentralizado]}>
        <View style={styles.fotoContainer}>
          <Image source={{ uri: usuario.foto }} style={styles.fotoPerfil} />
          <TouchableOpacity style={styles.editarFotoButton}>
            <Ionicons name="camera" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          value={usuario.nome}
          onChangeText={(text) => setUsuario({ ...usuario, nome: text })}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={usuario.email}
          onChangeText={(text) => setUsuario({ ...usuario, email: text })}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Telefone</Text>
        <TextInput
          style={styles.input}
          value={usuario.telefone}
          onChangeText={(text) => setUsuario({ ...usuario, telefone: text })}
          keyboardType="phone-pad"
        />

        <TouchableOpacity 
          style={[styles.botaoSalvar, loading && styles.botaoDesabilitado]} 
          onPress={salvarAlteracoes}
          disabled={loading}
        >
          <Text style={styles.botaoSalvarTexto}>Salvar Alterações</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  fotoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  fotoPerfil: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editarFotoButton: {
    position: 'absolute',
    right: '30%',
    bottom: 0,
    backgroundColor: '#007AFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  form: {
    flex: 1,
  },
  formCentralizado: {
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  botaoSalvar: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoSalvarTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botaoDesabilitado: {
    backgroundColor: '#ccc',
  },
}); 