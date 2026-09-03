import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxsA3Wz7giLBqvAtb1ZOCeYHs6Lytxi5I",
  authDomain: "nursingstudyvault-app.firebaseapp.com",
  projectId: "nursingstudyvault-app",
  storageBucket: "nursingstudyvault-app.firebasestorage.app",
  messagingSenderId: "1015107587208",
  appId: "1:1015107587208:web:87b35fc9e7fed3949ee33d",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
