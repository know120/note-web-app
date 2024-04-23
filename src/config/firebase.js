import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

 
const firebaseConfig = {
    apiKey: "AIzaSyByz2AJDdUTSI5Fi314JRzlYx2OtoKezxo",
    authDomain: "take-note-web.firebaseapp.com",
    projectId: "take-note-web",
    storageBucket: "take-note-web.appspot.com",
    messagingSenderId: "347258390500",
    appId: "1:347258390500:web:a29007ee0f1c8f81f969f1"
  };
 
  // commented for to test if firebase working or not 
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
 
export default db;