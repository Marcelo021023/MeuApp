import { Stack } from 'expo-router';
import { AuthProvider } from '../app/contexts/AuthContext';
import { Redirect } from 'expo-router';

export default function RootLayout() {
  // verificação de autenticação e redirecionamento
  // const authenticated = true;
  // if (!authenticated) {
  //   return <Redirect href="/home" />;
  // }

  return (
    <AuthProvider>
      <Stack 
        screenOptions={{ 
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: { backgroundColor: '#fff' },
        }}
      >
        <Stack.Screen 
          name="(tabs)"
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen 
          name="Editar Perfil" 
          options={{ headerShown: true }} 
        />
      </Stack>
    </AuthProvider>
  );
}