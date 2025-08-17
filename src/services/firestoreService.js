import { getFirestore, collection, doc, setDoc, updateDoc, serverTimestamp, } from "firebase/firestore";
import {db} from '../firebase/config'; // 🔹 Import db from config

export const addDocument = (collectionName, data) => {
    console.log("Adding document to collection:", collectionName, data);
    const query = collection(db, collectionName);

   setDoc(doc(query), {
       ...data,
       createdAt: serverTimestamp(),
   });
   
}