import { db } from "../firebaseConfig"; // 🔹 Import db từ file config
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp
} from "firebase/firestore";


export const login = async (email, password) => {
    const accountsRef = collection(db, "accounts"); // ❗️phải là collection
    const q = query(
        accountsRef,
        where("email", "==", email),
        where("password", "==", password),
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        console.log(querySnapshot.docs[0].data());
        return true;
  } else {
        console.log("Không tìm thấy user!");
        return false;
  }
}
// const querySnapshot = await getDocs(collection(db, "users"));
// querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} => ${doc.data()}`);
// });



// const account = collection(db, "account");

// // 🔹 Lấy account
// export const listenAccounts = (callback) => {
//   const q = query(account, orderBy("createdAt", "desc"));
//   return onSnapshot(q, (snapshot) => {
//     const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     callback(data);
//   });
// };

// export const addNewAccount = async (accountData) => {
//      await addDoc(account, {
//       ...accountData,
//       createdAt: serverTimestamp()
//     });
// }

