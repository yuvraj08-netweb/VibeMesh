/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_API_KEY,
//   authDomain: import.meta.env.VITE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_APP_ID,
//   measurementId: import.meta.env.VITE_MEASUREMENT_ID,
// };


const firebaseConfig = {
  apiKey: "AIzaSyAYZmktUy8bHyvmQLsUjsnM-z6puzSPjqE",
  authDomain: "vibemesh08.firebaseapp.com",
  projectId: "vibemesh08",
  storageBucket: "vibemesh08.appspot.com",
  messagingSenderId: "227472705507",
  appId: "1:227472705507:web:912c7468983e1af3f742d6",
  measurementId: "G-F1LDCFJWZS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
