/* eslint-disable no-undef */
// Use importScripts to load Firebase libraries inside the service worker.
console.log('Loading Firebase scripts...');
importScripts('https://www.gstatic.com/firebasejs/10.1.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.1.0/firebase-messaging-compat.js')
console.log('Firebase messaging script loaded successfully.');


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
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Handle background notifications
messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message:", payload);

  const { title, body } = payload.notification;
  self.registration.showNotification(title, body);
});
