import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';
import { Alert } from 'react-native';
import Constants from 'expo-constants';
import { useFonts } from 'expo-font';
import { Link } from 'expo-router';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const API_URL = Constants.expoConfig?.extra?.apiUrl || 'http://192.168.0.105:3000';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, isAuthenticated } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fontsLoaded] = useFonts({
    'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(tabs)/home');
    }
  }, [isAuthenticated]);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao fazer login');
      }

      await signIn(data.token, data.user);
    } catch (error) {
      console.error('Erro:', error);
      Alert.alert('Erro', error instanceof Error ? error.message : 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SERENITÀ</Text>
      
      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#999" style={styles.inputIcon} />
          <TextInput 
            style={styles.input}
            placeholder="Digite seu email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <Text style={styles.label}>Senha</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#999" style={styles.inputIcon} />
          <TextInput 
            style={styles.input}
            placeholder="Digite sua senha"
            secureTextEntry
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Esqueci a minha senha</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogin} disabled={loading}>
          <LinearGradient
            colors={['#06D1ED', '#0097B1']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Ainda não possui uma conta? </Text>
          <Link href="/register" style={styles.signupLink}>Cadastre-se</Link>
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  forgotPassword: {
    color: '#00B4D8',
    textAlign: 'right',
    fontSize: 14,
  },
  button: {
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