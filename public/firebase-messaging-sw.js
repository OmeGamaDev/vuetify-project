// firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/9.6.11/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.11/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyC5w5rpSj0nqWMK1aSUi3fuT37OihLHJRc",
  authDomain: "notificacionespwa-62d48.firebaseapp.com",
  projectId: "notificacionespwa-62d48",
  storageBucket: "notificacionespwa-62d48.appspot.com", // ✅ corregido (.app → .appspot.com)
  messagingSenderId: "864789544315",
  appId: "1:864789544315:web:26fa4f8e88ef306ebc11de"
});

// Inicializar el servicio de mensajería
const messaging = firebase.messaging();

// Escuchar notificaciones cuando la app está cerrada o en segundo plano
messaging.onBackgroundMessage(function (payload) {
  console.log("📩 Mensaje recibido en segundo plano:", payload);

  const notificationTitle = payload.notification?.title || "Nueva notificación";
  const notificationOptions = {
    body: payload.notification?.body || "Tienes un nuevo mensaje.",
    icon: "/icon-192x192.png" // 👈 puedes usar cualquier ícono dentro de /public
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});