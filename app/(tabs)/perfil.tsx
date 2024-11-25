import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';

export default function PerfilTab() {
  const navigation = useNavigation<any>();
  const [notificacoes, setNotificacoes] = useState(true);
  const [lembretes, setLembretes] = useState(true);
  const [usuario, setUsuario] = useState({
    nome: '',
    email: '',
    foto: 'https://randomuser.me/api/portraits/lego/0.jpg', 
    telefone: '',
  });

  useEffect(() => {
    carregarDadosUsuario();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      carregarDadosUsuario();
    }, [])
  );

  const carregarDadosUsuario = async () => {
    try {
      const userData = await AsyncStorage.getItem('user_data');
      if (userData) {
        setUsuario(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('auth_token');
      await AsyncStorage.removeItem('user_data');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const renderOpcao = (
    icone: keyof typeof Ionicons.glyphMap,
    titulo: string, 
    valor: string | boolean, 
    acao: () => void
  ) => (
    <TouchableOpacity style={styles.opcaoContainer} onPress={acao}>
      <View style={styles.opcaoIconeTitulo}>
        <Ionicons name={icone} size={24} color="#00B4D8" />
        <Text style={styles.opcaoTitulo}>{titulo}</Text>
      </View>
      {typeof valor === 'boolean' ? (
        <Switch
          value={valor}
          onValueChange={acao}
          trackColor={{ false: "#767577", true: "#00B4D8" }}
          thumbColor={valor ? "#fff" : "#f4f3f4"}
        />
      ) : (
        <View style={styles.opcaoValor}>
          <Text style={styles.opcaoTexto}>{valor}</Text>
          <Ionicons name="chevron-forward" size={20} color="#00B4D8" />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.fotoContainer}>
          <Image source={{ uri: usuario.foto }} style={styles.fotoPerfil} />
          <TouchableOpacity style={styles.editarFotoButton}>
            <Ionicons name="camera" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.nomeUsuario}>{usuario.nome}</Text>
        <Text style={styles.emailUsuario}>{usuario.email}</Text>
      </View>

      <View style={styles.secao}>
        <Text style={styles.secaoTitulo}>Informações Pessoais</Text>
        {renderOpcao('person-outline', 'Editar Perfil', '', () => router.push('/editarPerfil'))}
        {renderOpcao('call-outline', 'Telefone', usuario.telefone, () => {})}
        {renderOpcao('lock-closed-outline', 'Alterar Senha', '', () => {})}
      </View>

      <View style={styles.secao}>
        <Text style={styles.secaoTitulo}>Notificações</Text>
        {renderOpcao('notifications-outline', 'Notificações Push', notificacoes, () => setNotificacoes(!notificacoes))}
        {renderOpcao('alarm-outline', 'Lembretes de Consulta', lembretes, () => setLembretes(!lembretes))}
      </View>

      <View style={styles.secao}>
        <Text style={styles.secaoTitulo}>Consultas</Text>
        {renderOpcao('calendar-outline', 'Histórico de Consultas', '', () => {})}
        {renderOpcao('document-text-outline', 'Prontuários', '', () => {})}
      </View>

      <View style={styles.secao}>
        <Text style={styles.secaoTitulo}>Configurações</Text>
        {renderOpcao('help-circle-outline', 'Ajuda', '', () => {})}
        {renderOpcao('information-circle-outline', 'Sobre', '', () => {})}
      </View>

      <TouchableOpacity style={styles.botaoSair} onPress={handleLogout}>
        <Text style={styles.botaoSairTexto}>Sair</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  fotoContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  fotoPerfil: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editarFotoButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#007AFF',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  nomeUsuario: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  emailUsuario: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  secao: {
    backgroundColor: '#fff',
    marginTop: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  secaoTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 15,
    marginBottom: 10,
    marginTop: 5,
  },
  opcaoContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  opcaoIconeTitulo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  opcaoTitulo: {
    fontSize: 16,
    marginLeft: 15,
    color: '#333',
  },
  opcaoValor: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  opcaoTexto: {
    color: '#666',
  },
  botaoSair: {
    margin: 20,
    backgroundColor: '#00B4D8',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoSairTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});