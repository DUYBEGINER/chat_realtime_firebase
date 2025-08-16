import {auth, db} from "../firebase/config";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    FacebookAuthProvider,
    sendEmailVerification,
    updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDocs, serverTimestamp,  collection, query, where } from "firebase/firestore";


// Login function
export async function loginEmailPassword(email, password) {
  try{
        //Login by Firebase Authentication
        const cred = await signInWithEmailAndPassword(auth, email, password);

        // Get user profile from Firestore
        const accountsRef = collection(db, "accounts"); // ❗️phải là collection
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
              username: userData.username || "Anonymous",
            };
        }else{
          return null;
        }
      } catch(error) {
          console.error("Error logging in:", error);
          throw error;
      }
}

export async function loginWithFacebook() {
  try {
    const provider = new FacebookAuthProvider();
    await signInWithPopup(auth, provider);
    // const user = result.user;

    // // Save user to Firestore
    // await setDoc(doc(db, "accounts", user.uid), {
    //   uid: user.uid,
    //   email: user.email,
    //   username: user.displayName || "Anonymous",
    //   provider: "facebook",
    //   createdAt: serverTimestamp(),
    // });

    // return user;
  } catch (error) {
    console.error("Error logging in with Facebook:", error);
    throw error;
  }
}

export async function signUpWithEmailPassword({
  email,
  password,
  username,      // tuỳ chọn: display name
}) {
  try{
    // 1) Create account
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const user = cred.user;
    console.log("Account created:", user);
      //   if (username) {
    //     await updateProfile(user, { displayName: username });
    //   }

    // 3) (optional) Save profile in Firestore by uid
    await setDoc(doc(db, "accounts", user.uid), {
      uid: user.uid,
      email: user.email,
      username: username ?? null,
      provider: "password",
      createdAt: serverTimestamp(),
    });
    console.log("reach!")
    // 4) (tuỳ chọn) Gửi email xác minh
     //   await sendEmailVerification(user);

    // Trả về user cho UI
    return user;
  }catch(e){
    console.error("Error signing up:", e);
    throw e;
  }
}