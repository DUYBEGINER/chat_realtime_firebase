import { initializeApp } from "firebase/app";
import { getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
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


// Dùng emulator khi dev (nếu bạn test local)
// if (import.meta.env.DEV || window.location.hostname === "localhost") {
//   connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
//   connectFirestoreEmulator(db, "127.0.0.1", 8080);
// }
export { db, auth };

