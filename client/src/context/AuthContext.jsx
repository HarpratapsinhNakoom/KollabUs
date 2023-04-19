import React, { useContext, useState, useEffect } from "react";
import { auth, firebase_db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useLocalContext } from "./context";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setSelectedSpace, setCurrentRootFolder, setWorkSpaceCount } =
    useLocalContext();

  async function signup(email, password, name) {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await updateProfile(user, { displayName: name });
    return res;
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    signOut(auth).then(() => {
      setCurrentUser(null);
      setCurrentRootFolder("");
      setSelectedSpace({});
      setWorkSpaceCount(0);
    });
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }
  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }
  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        const userRef = doc(firebase_db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        user.name = userSnap.data().name;
        user.id = user.uid;
        user.avatar = `https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`;
      } catch (error) {
        console.log(error);
      }
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
