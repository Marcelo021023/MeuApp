import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

export default function TabOneScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Olá, bem-vindo!</Text>
        <Text style={styles.subText}>Como podemos ajudar você hoje?</Text>
      </View>

      <View style={styles.menuGrid}>
        <Link href="./../(tabs)/agendamento" asChild>
          <TouchableOpacity style={styles.menuItem}>
            <View style={[styles.iconContainer, { backgroundColor: '#E8F5E9' }]}>
              <Ionicons name="calendar" size={32} color="#4CAF50" />
            </View>
            <Text style={styles.menuText}>Agendar Consulta</Text>
          </TouchableOpacity>
        </Link>

        <Link href="./../(tabs)/forum" asChild>
          <TouchableOpacity style={styles.menuItem}>
            <View style={[styles.iconContainer, { backgroundColor: '#E3F2FD' }]}>
              <Ionicons name="chatbubbles" size={32} color="#2196F3" />
            </View>
            <Text style={styles.menuText}>Fórum</Text>
          </TouchableOpacity>
        </Link>

        <TouchableOpacity style={styles.menuItem}>
          <View style={[styles.iconContainer, { backgroundColor: '#FFF3E0' }]}>
            <Ionicons name="notifications" size={32} color="#FF9800" />
          </View>
          <Text style={styles.menuText}>Notificações</Text>
        </TouchableOpacity>

        <Link href="./../(tabs)/perfil" asChild>
          <TouchableOpacity style={styles.menuItem}>
            <View style={[styles.iconContainer, { backgroundColor: '#F3E5F5' }]}>
              <Ionicons name="person" size={32} color="#9C27B0" />
            </View>
            <Text style={styles.menuText}>Meu Perfil</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Próximas Consultas</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>Ver todas</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.appointmentCard}>
          <View style={styles.appointmentIcon}>
            <Ionicons name="medical" size={24} color="#007AFF" />
          </View>
          <View style={styles.appointmentInfo}>
            <Text style={styles.appointmentTitle}>Consulta com Dr. João</Text>
            <Text style={styles.appointmentType}>Psicólogo</Text>
            <Text style={styles.appointmentDate}>Hoje, 15:00</Text>
          </View>
        </View>
      </View>
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
    padding: 20,
    paddingTop: 30,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subText: {
    fontSize: 16,
    color: '#666',
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
    justifyContent: 'space-between',
  },
  menuItem: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  menuText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  section: {
    padding: 20,
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    color: '#007AFF',
    fontSize: 14,
  },
  appointmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 12,
  },
  appointmentIcon: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  appointmentInfo: {
    flex: 1,
  },
  appointmentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  appointmentType: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  appointmentDate: {
    fontSize: 14,
    color: '#007AFF',
    marginTop: 4,
  },
});
