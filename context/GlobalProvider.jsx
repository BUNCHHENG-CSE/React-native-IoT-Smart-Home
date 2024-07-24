import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("token")
      .then((value) => {
        if (value !== null) {
          setIsLogged(true);
        } else {
          setIsLogged(false);
        }
      })
      .catch((error) => {
        console.error("Error retrieving data: ", error);
      })
      .finally(() => {
        setLoading(false);
      });

  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalProvider;
