import { getFirestore, collection, doc, setDoc, updateDoc, FieldValue } from "firebase/firestore";
import {db} from '../firebase/config'; // 🔹 Import db from config

export const addDocument = (collection, data) => {
    const query = collection(db, collection);

   setDoc(doc(query), {
       ...data,
       createdAt: FieldValue.serverTimestamp(),
   });
   
}