import React, { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";

import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, startLoading } from "../Redux/features/userSlice";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  // const [user, setUser] = useState(null);
  // const [loading, setLoading] = useState(true);

  const { user, isLoading } = useSelector(state => state.userR)
  const dispatch=useDispatch()

  // create user with email and password
  const createUser = (email, password) => {
    dispatch(startLoading())
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // login with email and password
  const signIn = (email, password) => {
    dispatch(startLoading());
    return signInWithEmailAndPassword(auth, email, password);
  };
  const updateUserProfile = (profile) => {
    dispatch(startLoading());
    return updateProfile(auth.currentUser, profile);
  };
  // reset password
  const resetPassword = (email) => {
    dispatch(startLoading());
    return sendPasswordResetEmail(auth, email);
  };
  // login with google
  const googleProvider = new GoogleAuthProvider();
  const googleProviderLogin = () => {
    dispatch(startLoading());
    return signInWithPopup(auth, googleProvider);
  };
  // logout
  const logOut = () => {
    return signOut(auth);
  };

  // observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (presentUser) => {
      dispatch(currentUser(presentUser))
      dispatch(startLoading());
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,

    createUser,
    signIn,
    updateUserProfile,
    logOut,
    googleProviderLogin,
    resetPassword,
  };
  return (
    <div>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
