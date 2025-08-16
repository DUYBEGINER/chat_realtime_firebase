import { initializeApp } from "firebase/app";
import { getAuth,
  connectAuthEmulator,
  signInWithEmailAndPassword,
} from "firebase/auth";


import { getFirestore, doc, setDoc, updateDoc } from "firebase/firestore";
import { data } from "react-router";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "test-d0eec.firebaseapp.com",
  projectId: "test-d0eec",
  storageBucket: "test-d0eec.firebasestorage.app",
  messagingSenderId: "547603164430",
  appId: "1:547603164430:web:dff055a756cbff323f3b5f",
  measurementId: "G-GW17L8QCGC"
};


// Initialize Firebase App
const app = initializeApp(firebaseConfig);


// Initialize Firestore
const db = getFirestore(app);

// Initialize Auth
const auth = getAuth(app);


// // Firebase Auth Emulator
// connectAuthEmulator(auth, "http://localhost:9099");

export async function loginEmailPassword(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  
  //Chỉ lấy những dữ liệu cần thiết
  const data = {
    email: cred.user.email,
    uid: cred.user.uid,
    displayName: cred.user.displayName || "Anonymous",
  };
  return data; // <- trả về user để UI dùng
}


export { db, auth };

