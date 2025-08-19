import React, { useState } from "react";
import { db } from "../firebase/config";
import {
  collection,
  onSnapshot,
  where,
  query,
  orderBy,
} from "firebase/firestore";

const useFirestore = (collectionName, condition) => {
  const [documents, setDocuments] = React.useState([]);
  
  React.useEffect(() => {
    let coollectionRef = collection(db, collectionName);
    let q = query(coollectionRef, orderBy("createdAt", "desc"));
    
    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        console.log("No compareValue provided, returning empty array");
        setDocuments([]);
        return;
      }
        q = query(
        coollectionRef,
        where(condition.fieldName, condition.operator, condition.compareValue),
        orderBy("createdAt", "desc")
      );
    }

    return onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDocuments(data);
      // console.log("Data from Firestore:", data);
    });
  }, [collectionName, condition]);

  return documents;
};

export default useFirestore;
