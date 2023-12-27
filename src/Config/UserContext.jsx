// UserContext.js
import React, { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [profile, setProfile] = useState({});
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
        setProfile(user.providerData[0]);
      } else {
        setIsAuth(false);
        setProfile({});
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ isAuth, profile, setIsAuth, setProfile }}>
      {children}
    </UserContext.Provider>
  );
};
