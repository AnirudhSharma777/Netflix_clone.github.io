import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = new useState();

  function signUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password);
    setDoc(doc(db, "user", email), {
      saveShows: [],
    });
  }

  function logOut() {
    return signOut(auth);
  }

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (curUser) => {
      setUser(curUser);
    });

    return () => {
      unsubscribe();
    };
  });

  const value = {
    signUp,
    logIn,
    logOut,
    user,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function UserAuth() {
  return useContext(AuthContext);
}
