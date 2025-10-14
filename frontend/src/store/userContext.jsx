import { createContext, useState, useEffect, useCallback } from "react";

import { fetchUserData } from "../utils/js/apiCalls";
import { verifyJWT } from "../utils/js/authentication";

export const UserContext = createContext();

// TODO: Create function load/refresh user list to only refresh the user list

export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({}); // Should have (id, name, email, etc.)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loadUserData = useCallback(async () => {
    try {
      const currentUser = await verifyJWT();
      if (currentUser.status !== "success") {
        setUserData({});
        setIsLoggedIn(false);
        return;
      }

      const userDataRes = await fetchUserData();
      const { id, email, firstName, lastName } = userDataRes;

      setUserData({ id, email, firstName, lastName });
      setIsLoggedIn(true);
    } catch (err) {
      console.error(err);
      setUserData({});
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        isLoggedIn,
        setIsLoggedIn,
        refreshUserData: loadUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
