import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Post {
  id: string;
  usuario: string;
  texto: string;
  likes: number;
  comentarios: number;
  tempo: string;
  fotoPerfil: string;
}

export default function ForumTab() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      usuario: 'Maria Silva',
      texto: 'Hoje tive uma ótima consulta! Recomendo muito!',
      likes: 12,
      comentarios: 3,
      tempo: '2h atrás',
      fotoPerfil: 'https://randomuser.me/api/portraits/women/1.jpg'
    },
    {
      id: '2',
      usuario: 'João Santos',
      texto: 'Alguém pode me indicar um bom nutricionista?',
      likes: 8,
      comentarios: 5,
      tempo: '4h atrás',
      fotoPerfil: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
  ]);

  const [novoPost, setNovoPost] = useState('');

  const adicionarPost = () => {
    if (novoPost.trim()) {
      const novoItem = {
        id: String(posts.length + 1),
        usuario: 'Você',
        texto: novoPost,
        likes: 0,
        comentarios: 0,
        tempo: 'Agora',
        fotoPerfil: 'https://randomuser.me/api/portraits/lego/1.jpg'
      };
      setPosts([novoItem, ...posts]);
      setNovoPost('');
    }
  };

  const renderPost = ({ item }: { item: Post }) => (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Image 
          source={{ uri: item.fotoPerfil }} 
          style={styles.profilePic}
        />
        <View style={styles.postHeaderText}>
          <Text style={styles.userName}>{item.usuario}</Text>
          <Text style={styles.postTime}>{item.tempo}</Text>
        </View>
      </View>

      <Text style={styles.postText}>{item.texto}</Text>

      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="heart-outline" size={24} color="#000000" />
          <Text style={styles.actionText}>{item.likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={24} color="#000000" />
          <Text style={styles.actionText}>{item.comentarios}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-social-outline" size={24} color="#000000" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="O que você está pensando?"
          value={novoPost}
          onChangeText={setNovoPost}
          multiline
        />
        <TouchableOpacity 
          style={styles.postButton}
          onPress={adicionarPost}
        >
          <Text style={styles.postButtonText}>Publicar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        style={styles.postsList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  input: {
    backgroundColor: '#F8F8F8',
    borderRadius: 20,
    padding: 12,
    minHeight: 40,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  postButton: {
    backgroundColor: '#00B4D8',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
  },
  postButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  postsList: {
    flex: 1,
  },
  postContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  postHeaderText: {
    flex: 1,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000000',
  },
  postTime: {
    color: '#757575',
    fontSize: 12,
  },
  postText: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 15,
    lineHeight: 22,
  },
  postActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  actionText: {
    marginLeft: 5,
    color: '#000000',
  },
}); 