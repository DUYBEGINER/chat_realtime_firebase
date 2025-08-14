import { db } from "../firebaseConfig"; // 🔹 Import db từ file config
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
export const checkAccountExisted = (email) => {
  const q = query(account, where("email", "==", email));
  return getDocs(q).then((querySnapshot) => {
    if (!querySnapshot.empty) {
      console.log("Tài khoản đã tồn tại!");
      return true;
    } else {
      return false;
    }
  });
};

export const addNewAccount = async (accountData) => {
    const account = collection(db, "accounts");
     await addDoc(account, {
      ...accountData,
      createdAt: serverTimestamp()
    });
}

