import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { View } from 'react-native';

const TabIcon = ({ 
  focused, 
  name, 
  color, 
  size 
}: { 
  focused: boolean;
  name: keyof typeof Ionicons.glyphMap;
  color: string;
  size: number;
}) => {
  if (focused) {
    return (
      <LinearGradient
        colors={['#06D1ED', '#0097B1']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Ionicons name={name} size={size} color="#fff" />
      </LinearGradient>
    );
  }

  return <Ionicons name={name} size={size} color={color} />;
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerTitle: "SERENITÀ",
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
          color: '#06D1ED',
        },
        tabBarActiveTintColor: '#06D1ED',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          height: 60,
          backgroundColor: '#fff',
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: '',
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon 
              focused={focused}
              name="home"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="forum"
        options={{
          title: '',
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon 
              focused={focused}
              name="chatbubbles"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="agendamento"
        options={{
          title: '',
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon 
              focused={focused}
              name="calendar"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: '',
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon 
              focused={focused}
              name="person"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}