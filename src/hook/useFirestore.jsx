import React, { useState } from "react";
import { db } from "../firebase/config";
import {
  collection,
  onSnapshot,
  where,
  orderBy,
} from "firebase/firestore";

const useFirestore = (collectionName, condition) => {
  const [documents, setDocuments] = React.useState([]);

  React.useEffect(() => {
    let coollectionRef = collection(db, collectionName);
    const query = query(coollectionRef, orderBy("createdAt", "desc"));
    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        return;
      }
      coollectionRef = query(
        coollectionRef,
        where(condition.fieldName, condition.operator, condition.compareValue)
      );
    }

    return onSnapshot(query, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDocuments(data);
      console.log("Data from Firestore:", data);
    });
  }, [collectionName, condition]);

  return documents;
};

export default useFirestore;
