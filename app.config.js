export default {
  expo: {
    scheme: 'meuapp',
    extra: {
      apiUrl: process.env.EXPO_PUBLIC_API_URL || 'http://192.168.0.105:3000',
    },
  },
}; 