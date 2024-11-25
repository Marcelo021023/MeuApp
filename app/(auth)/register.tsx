import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  Text, 
  Alert, 
  StyleSheet,
  ActivityIndicator 
} from 'react-native';
import { useRouter } from 'expo-router';
import { API_URL } from '../config/api';
import axios from 'axios';

export default function RegisterScreen() {
const [name, setName] = useState('');  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    try {
      setLoading(true);
      
      const dados = {
        name,
        email,
        password
      };
      
      console.log('Enviando dados:', dados);
      
      const response = await axios.post(`${API_URL}/api/register`, dados, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Resposta:', response.data);
      
      if (response.status === 201) {
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
        router.back();
      }

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Erro da API:', error.response?.data);
        Alert.alert(
          'Erro',
          error.response?.data?.message || 'Erro ao realizar cadastro'
        );
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SERENITÀ</Text>
      
      <View style={styles.form}>
        <Text style={styles.label}>Nome completo</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome completo"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          editable={!loading}
        />
        
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!loading}
        />
        
        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!loading}
        />

        <Text style={styles.label}>Confirmar Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirme sua senha"
          placeholderTextColor="#999"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          editable={!loading}
        />

        <TouchableOpacity 
          style={styles.button}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Cadastrar</Text>
          )}
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Já possui uma conta? </Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.signupLink}>Fazer login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00B4D8',
    textAlign: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  form: {
    gap: 16,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#00B4D8',
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  signupText: {
    color: '#666',
  },
  signupLink: {
    color: '#00B4D8',
  },
});