import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyC5w5rpSj0nqWMK1aSUi3fuT37OihLHJRc",
    authDomain: "notificacionespwa-62d48.firebaseapp.com",
    projectId: "notificacionespwa-62d48",
    storageBucket: "notificacionespwa-62d48.firebasestorage.app",
    messagingSenderId: "864789544315",
    appId: "1:864789544315:web:26fa4f8e88ef306ebc11de"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Obtener el token del dispositivo
export const requestPermissionAndGetToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "BPBm5bdMrHHYA17j5zkZt19TQkE0_yLA_fKILPmrhq2YjuFSVdFg_8BNQCfSOhYNtlXF1o49_41m_kfsEbl95dU" // se obtiene en la consola de Firebase
      });
      console.log("Token FCM:", token);
      return token;
    } else {
      console.warn("Permiso de notificación denegado");
    }
  } catch (error) {
    console.error("Error al obtener token FCM:", error);
  }
};

// Escuchar mensajes cuando la app está abierta
onMessage(messaging, (payload) => {
  console.log("Mensaje recibido:", payload);
  // Aquí puedes mostrar una notificación con Vuetify o una alerta
});