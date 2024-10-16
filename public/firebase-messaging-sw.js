// Use ES modules syntax
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getMessaging, onBackgroundMessage } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-messaging-sw.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYZmktUy8bHyvmQLsUjsnM-z6puzSPjqE",
  authDomain: "vibemesh08.firebaseapp.com",
  projectId: "vibemesh08",
  storageBucket: "vibemesh08.appspot.com",
  messagingSenderId: "227472705507",
  appId: "1:227472705507:web:912c7468983e1af3f742d6",
  measurementId: "G-F1LDCFJWZS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Handle background notifications
onBackgroundMessage(messaging, (payload) => {
  console.log("[firebase-messaging-sw.js] Received background message:", payload);

  const { title, body } = payload.notification;
  const notificationOptions = {
    body
  };

  self.registration.showNotification(title, notificationOptions);
});
