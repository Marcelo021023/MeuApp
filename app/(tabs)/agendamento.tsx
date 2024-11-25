import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  TextInput,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Calendar, DateData } from 'react-native-calendars';

interface Profissional {
  id: string;
  nome: string;
  especialidade: string;
}

interface Consulta {
  id: string;
  medico: string;
  especialidade: string;
  horario: string;
}

type TipoProfissional = 'psicologo' | 'nutricionista';
type Profissionais = Record<TipoProfissional, Profissional[]>;

const disabledDays = {
  [new Date().toISOString().split('T')[0]]: { disabled: true }
};

export default function AgendamentoTab() {
  const [selectedDate, setSelectedDate] = useState('');
  const [filtroAtivo, setFiltroAtivo] = useState('Todos');
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const consultas: Consulta[] = [
    {
      id: '1',
      medico: 'Marcos da Silva',
      especialidade: 'Nutricionista',
      horario: '08:00',
    },
    {
      id: '2',
      medico: 'Ana Paula',
      especialidade: 'Psiquiatra',
      horario: '14:00',
    },
  ];

  const availableTimes = [
    '08:00', '09:00', '10:00', '11:00',
    '14:00', '15:00', '16:00', '17:00'
  ];

  const handleDayPress = (day: DateData) => {
    const date = new Date(day.dateString);
    const dayOfWeek = date.getDay();
    
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return;
    }
    
    setSelectedDate(day.dateString);
    setShowTimeModal(true);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Consultas</Text>
        <TouchableOpacity>
          <Ionicons name="person-circle-outline" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <Calendar
        style={styles.calendar}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#666',
          selectedDayBackgroundColor: '#00B4D8',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00B4D8',
          dayTextColor: '#333',
          textDisabledColor: '#d9e1e8',
          dotColor: '#00B4D8',
          monthTextColor: '#333',
          textDayFontSize: 14,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 14
        }}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: '#00B4D8' }
        }}
        onDayPress={handleDayPress}
        minDate={new Date().toISOString().split('T')[0]}
        disableAllTouchEventsForDisabledDays={true}
        hideExtraDays={true}
        disableSpecificDays={[0, 6]}
      />

      <Modal
        visible={showTimeModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Horários Disponíveis</Text>
            
            <View style={styles.timeGrid}>
              {availableTimes.map((time) => (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.timeButton,
                    selectedTime === time && styles.timeButtonSelected
                  ]}
                  onPress={() => setSelectedTime(time)}
                >
                  <Text style={[
                    styles.timeText,
                    selectedTime === time && styles.timeTextSelected
                  ]}>
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => {
                  setShowTimeModal(false);
                  setSelectedTime(null);
                }}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[
                  styles.confirmButton,
                  !selectedTime && styles.confirmButtonDisabled
                ]}
                disabled={!selectedTime}
                onPress={() => {
                  console.log(`Agendamento confirmado para ${selectedDate} às ${selectedTime}`);
                  setShowTimeModal(false);
                  setSelectedTime(null);
                }}
              >
                <Text style={styles.confirmButtonText}>Agendar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.searchContainer}>
        <Text style={styles.searchLabel}>Pesquisar médico</Text>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Digite o nome do médico"
            placeholderTextColor="#999"
          />
        </View>
      </View>

      <View style={styles.filtrosContainer}>
        <Text style={styles.filtrosLabel}>Consultas agendadas</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtrosScroll}>
          {['Todos', 'Nutricionista', 'Psiquiatra'].map((filtro) => (
            <TouchableOpacity
              key={filtro}
              style={[
                styles.filtroButton,
                filtroAtivo === filtro && styles.filtroButtonAtivo
              ]}
              onPress={() => setFiltroAtivo(filtro)}
            >
              <Text style={[
                styles.filtroText,
                filtroAtivo === filtro && styles.filtroTextAtivo
              ]}>{filtro}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.consultasList}>
        {consultas.map((consulta) => (
          <TouchableOpacity key={consulta.id} style={styles.consultaCard}>
            <View style={styles.consultaIconContainer}>
              <Ionicons name="person-circle" size={40} color="#00B4D8" />
            </View>
            <View style={styles.consultaInfo}>
              <Text style={styles.consultaHorario}>{consulta.horario} - {consulta.especialidade}</Text>
              <Text style={styles.consultaMedico}>{consulta.medico}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#999" />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  tipoContainer: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  tipoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#007AFF',
    width: '45%',
    justifyContent: 'center',
  },
  tipoButtonAtivo: {
    backgroundColor: '#007AFF',
  },
  tipoText: {
    marginLeft: 8,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  tipoTextAtivo: {
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profissionalCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profissionalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profissionalTexto: {
    marginLeft: 10,
    flex: 1,
  },
  profissionalNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  profissionalEspecialidade: {
    color: '#666',
    marginTop: 2,
  },
  verHorariosButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  verHorariosText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  proximasConsultas: {
    marginTop: 20,
  },
  consultaCard: {
    backgroundColor: '#fff',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  consultaInfo: {
    flex: 1,
  },
  consultaNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  consultaData: {
    color: '#666',
    marginTop: 2,
  },
  cancelarButton: {
    backgroundColor: '#ff3b30',
    padding: 8,
    borderRadius: 15,
  },
  cancelarText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: '50%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
  },
  continuarButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center',
  },
  continuarButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  horariosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  horarioButton: {
    width: '48%',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#007AFF',
    marginBottom: 10,
    alignItems: 'center',
  },
  horarioSelecionado: {
    backgroundColor: '#007AFF',
  },
  horarioText: {
    color: '#007AFF',
    fontSize: 16,
  },
  horarioTextoSelecionado: {
    color: '#fff',
  },
  confirmarButton: {
    backgroundColor: '#34C759',
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center',
  },
  confirmarButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  calendar: {
    marginBottom: 10,
    backgroundColor: '#ffffff',
  },
  searchContainer: {
    padding: 15,
    backgroundColor: '#fff',
  },
  searchLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  filtrosContainer: {
    padding: 15,
    backgroundColor: '#fff',
  },
  filtrosLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  filtrosScroll: {
    marginTop: 8,
  },
  filtroButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#f5f5f5',
  },
  filtroButtonAtivo: {
    backgroundColor: '#00B4D8',
  },
  filtroText: {
    color: '#666',
  },
  filtroTextAtivo: {
    color: '#fff',
  },
  consultasList: {
    padding: 15,
    backgroundColor: '#fff',
  },
  consultaIconContainer: {
    marginRight: 10,
  },
  consultaHorario: {
    fontSize: 14,
    color: '#666',
  },
  consultaMedico: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 20,
  },
  timeButton: {
    width: '23%',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  timeButtonSelected: {
    backgroundColor: '#00B7D5',
  },
  timeText: {
    color: '#333',
  },
  timeTextSelected: {
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  cancelButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  confirmButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#00B7D5',
    alignItems: 'center',
  },
  confirmButtonDisabled: {
    backgroundColor: '#ccc',
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: 'bold',
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
}); 