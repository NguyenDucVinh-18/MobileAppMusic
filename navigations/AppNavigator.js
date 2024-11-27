import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import LoginStackNavigator from "./LoginStackNavigator";
import RootNavigator from "./RootNavigator"; // Main app flow
import { auth } from "../components/firebase";
import { onAuthStateChanged } from "firebase/auth";

const AppNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false); // Set loading to false once the auth state is determined
    });

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      {isAuthenticated ? <RootNavigator /> : <LoginStackNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
