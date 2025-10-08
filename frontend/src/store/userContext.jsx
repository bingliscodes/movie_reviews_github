import { createContext, useState, useEffect } from "react";

import { fetchUserData } from "../utils/js/apiCalls";
import { verifyJWT } from "../utils/js/authentication";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function fetchUserDataAsync() {
      try {
        const currentUser = await verifyJWT();
        if (currentUser.status !== "success") {
          setUserData({});
          setIsLoggedIn(false);
          return;
        }

        const userDataRes = await fetchUserData();
        setUserData(userDataRes);
        setIsLoggedIn(true);
      } catch (err) {
        console.error(err);
      }
    }
    fetchUserDataAsync();
  }, []);

  // Will likely remove this, but reminder of all variables I have access to

  return (
    <UserContext value={{ userData, setUserData, isLoggedIn, setIsLoggedIn }}>
      {children}
    </UserContext>
  );
};
