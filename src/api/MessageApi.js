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
const makeParticipantsKey = (a, b) => [a, b].sort().join("__");
const account = collection(db, "accounts");
const messagesCollection = collection(db, "messages");

// Lấy danh sách user khác mình – cách A: dùng '!=' + orderBy (cần index)
export const getListUsers = async (email) => {
  const q = query(account, where("email", "!=", email), orderBy("email", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};
// export const getListUsers = async (email) => {
//   const snap = await getDocs(account);
//   return snap.docs
//     .map(d => ({ id: d.id, ...d.data() }))
//     .filter(u => u.email !== email);
// };

export const sendMessage = async (messageData) => {
  const { sender, receiver, content } = messageData;
  await addDoc(messagesCollection, {
    content,
    sender,
    receiver,
    participants: [sender, receiver],
    participantsKey: makeParticipantsKey(sender, receiver),
    createdAt: serverTimestamp(),
  });
};

export const listenMessages = (a, b, callback) => {
  if (!a || !b) return () => {console.log("miss a, b")}; // guard
  const key = makeParticipantsKey(a, b);
    console.log("pass")
  const q = query(
    messagesCollection,
    where("participantsKey", "==", key),
    orderBy("createdAt", "asc")
  );

  return onSnapshot(q, (snap) => {
     const messages = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    callback(messages);
  });
};
