import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, updateDoc } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAxMl4C2fRU6cXuDueVOCkfabHCnzpYqzs",
  authDomain: "test-d0eec.firebaseapp.com",
  projectId: "test-d0eec",
  storageBucket: "test-d0eec.firebasestorage.app",
  messagingSenderId: "547603164430",
  appId: "1:547603164430:web:dff055a756cbff323f3b5f",
  measurementId: "G-GW17L8QCGC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

