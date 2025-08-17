import { db } from "../firebase/config"; // 🔹 Import db từ file config
import {
  collection,
  where,
  getDocs,
  query,
} from "firebase/firestore";

const account = collection(db, "accounts");

// 🔹 Lấy account
export const checkAccountExisted = async (email) => {
  const q = query(account, where("email", "==", email));
  const snap = await getDocs(q);
  return !snap.empty;
};



