import { auth, db } from "../firebase/config";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  FacebookAuthProvider,
  getAdditionalUserInfo,
  signOut,
} from "firebase/auth";

import { doc, setDoc, getDocs, serverTimestamp, collection, query, where } from "firebase/firestore";


const provider = new FacebookAuthProvider();
provider.addScope('email');


export async function addNewUserToFirestore(user, providerId) {
  try {
    await setDoc(doc(db, "accounts", user.uid), {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      providerId: providerId,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error adding user to Firestore:", error);
  }
}


// Login by Email and Password)
export async function loginEmailPassword(email, password) {
  try {
    //Login by Firebase Authentication
    const cred = await signInWithEmailAndPassword(auth, email, password);

    // Get user profile from Firestore
    const accountsRef = collection(db, "accounts"); //collection accounts
    const q = query(
      accountsRef,
      where("uid", "==", cred.user.uid)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      // If user exists in Firestore, return user data
      var userData = querySnapshot.docs[0].data();

      console.log(userData);
      // return sanitized user for the UI
      return {
        email: userData.email,
        uid: userData.uid,
        displayName: userData.displayName || "Anonymous",
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

//Login by Facebook
export async function loginWithFacebook() {
  try {
    const result = await signInWithPopup(auth, provider);
    // Get additional user info (isNewUser, profile, etc.)
    const  additionalUserInfo  = getAdditionalUserInfo(result);
    return { user: result.user,  additionalUserInfo };
  } catch (error) {
    console.error("Error logging in with Facebook:", error);
    throw error;
  }
}

// Logout function
export async function Logout() {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
}


// Sign up with Email and Password function
export async function signUpWithEmailPassword({
  email,
  password,
  displayName,      // tuỳ chọn: display name
}) {
  try {
    // Create account
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const user = cred.user;
    console.log("Account created:", user);

    //Save profile in Firestore by uid
    await setDoc(doc(db, "accounts", user.uid), {
      uid: user.uid,
      email: user.email,
      displayName: displayName ?? null,
      providerId: "password",
      createdAt: serverTimestamp(),
    });
    console.log("reach!")
    // 4) (tuỳ chọn) Gửi email xác minh
    //   await sendEmailVerification(user);

    // Trả về user cho UI
    return user;
  } catch (e) {
    console.error("Error signing up:", e);
    throw e;
  }
}