// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-0Kwy2v7GLDoc1HT2aK7ukVBWMSfAM6c",
  authDomain: "anshida.firebaseapp.com",
  projectId: "anshida",
  storageBucket: "anshida.firebasestorage.app",
  messagingSenderId: "776505030573",
  appId: "1:776505030573:web:21acdbc10811ae2d27d324"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { app, auth, storage, db };