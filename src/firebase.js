// Replace the below config with your Firebase project's web config
// Create a project at https://console.firebase.google.com and add a Web app
// Then paste the config here or use environment variables.
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyA7lRIpjcPeNzmTF7BNaKmtJI48OKSuIAo",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "webapp-42908.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "webapp-42908",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "webapp-42908.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "902799165860",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:902799165860:web:3c831708124cd7bf805931"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();


