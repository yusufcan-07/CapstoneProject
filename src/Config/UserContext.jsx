// UserContext.js
import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [profile, setProfile] = useState({});
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth State Changed: ", user); // Log the user object
      if (user) {
        setIsAuth(true);
        setProfile(user.providerData[0]);
        console.log(
          "User is authenticated, profile set: ",
          user.providerData[0]
        ); // Log the profile set
      } else {
        setIsAuth(false);
        setProfile({});
        console.log("User is not authenticated, profile cleared."); // Log when the user is not authenticated
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
