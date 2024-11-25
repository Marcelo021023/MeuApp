import { Platform } from "react-native";

const SERVER_IP = '10.0.0.114';
const SERVER_PORT = '3000';

const API_URL = `http://${SERVER_IP}:${SERVER_PORT}`;

// Log para debug
console.log('Plataforma:', Platform.OS);
console.log('API_URL configurada:', API_URL);

export { API_URL };