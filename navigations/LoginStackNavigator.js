import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StartScreen from "../screens/StartScreen";
import SignUpScreen1 from "../screens/SignUpScreen1";
import SignUpScreen2 from "../screens/SignUpScreen2";
import ChooseArtistScreen from "../screens/ChooseArtistScreen";
import LogInScreen from "../screens/LogInScreen";
import LogInNotPassScreen from "../screens/LogInNotPassScreen";
import TabNavigator from "./TabNavigator";
import UserSettingScreen from "../screens/UserSettingScreen";

const Stack = createStackNavigator();

const setting = {
  headerTitle: "Create account",
  headerTitleAlign: "center",
  headerStyle: {
    backgroundColor: "#121212", // Set header background color
  },
  headerTintColor: "#fff", // Set header text color
  headerTitleStyle: {
    fontWeight: "bold", // Customize title text style
  },
};

const LoginStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Start"
          component={StartScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUpScreen1"
          component={SignUpScreen1}
          options={setting}
        />
        <Stack.Screen
          name="SignUpScreen2"
          component={SignUpScreen2}
          options={setting}
        />
        <Stack.Screen
          name="ChooseArtistScreen"
          component={ChooseArtistScreen}
          options={{
            ...setting,
            headerTitle: "Choose 3 or more artists you like.",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 18,
            },
          }}
        />
        <Stack.Screen
          name="LogInScreen"
          component={LogInScreen}
          options={{ ...setting, headerTitle: "Log in" }}
        />
        <Stack.Screen
          name="LogInNotPassScreen"
          component={LogInNotPassScreen}
          options={{ ...setting, headerTitle: "Log in without password" }}
        />
        <Stack.Screen
          name="MainFlow"
          component={TabNavigator} // Use TabNavigator here
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="UserSettings"
          component={UserSettingScreen}
          options={{
            headerTitle: "Settings",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#121212",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default LoginStackNavigator;
