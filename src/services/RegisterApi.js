import { db } from "../firebase/config"; // 🔹 Import db từ file config
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  where,
  getDocs,
  query,
  orderBy,
  serverTimestamp
} from "firebase/firestore";

const account = collection(db, "accounts");

// 🔹 Lấy account
export const checkAccountExisted = async (email) => {
  const q = query(account, where("email", "==", email));
  const snap = await getDocs(q);
  return !snap.empty;
};



