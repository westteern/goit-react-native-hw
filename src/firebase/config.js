import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-G9R5lUkzmge7rDZHXSLAkDuGxdreuGk",
  authDomain: "react-native-hw-social.firebaseapp.com",
  projectId: "react-native-hw-social",
  storageBucket: "react-native-hw-social.appspot.com",
  messagingSenderId: "695809080164",
  appId: "1:695809080164:web:070f3c8a45653722cd1871",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
