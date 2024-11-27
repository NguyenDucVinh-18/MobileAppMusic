import React from "react";
import { Text, View, ActivityIndicator, SafeAreaView } from "react-native";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import store from "./store/configureStore";
import { AuthProvider } from "./context/auth-context";
import { NavigationContainer } from "@react-navigation/native";
import StartScreen from "./screens/StartScreen";
import SignUpScreen1 from "./screens/SignUpScreen1";
import SignUpScreen2 from "./screens/SignUpScreen2";
import ChooseArtistScreen from "./screens/ChooseArtistScreen";
import LogInNotPassScreen from "./screens/LogInNotPassScreen";
import LogInScreen from "./screens/LogInScreen";
import UserSettingScreen from "./screens/UserSettingScreen";
import ChangeDisplayName from "./screens/ChangeDisplayName";
import ChangePassword from "./screens/ChangePassword";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./navigations/TabNavigator";

const Stack = createNativeStackNavigator();

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

export default function App() {
  // Load the font
  const [fontsLoaded] = useFonts({
    MyFont: require("./assets/fonts/MyFont.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <ActivityIndicator
        size="large"
        color="#0000ff"
        style={{ flex: 1, alignSelf: "center" }}
      />
    );
  }

  return (
    <>
      <Provider store={store}>
        <AuthProvider>
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
                component={TabNavigator}
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

              <Stack.Screen
                name="ChangeDisplayName"
                component={ChangeDisplayName}
                options={{
                  headerTintColor: "white",
                  headerBackground: () => {
                    return (
                      <View
                        style={{
                          backgroundColor: "#000",
                          flex: 1,
                        }}
                      ></View>
                    );
                  },
                  headerSearchBarOptions: {
                    backgroundColor: "#000",
                  },
                  headerTitle: "Change display name",
                }}
              />
              <Stack.Screen
                name="ChangePassword"
                component={ChangePassword}
                options={{
                  headerTintColor: "white",
                  headerBackground: () => {
                    return (
                      <View
                        style={{
                          backgroundColor: "#000",
                          flex: 1,
                        }}
                      ></View>
                    );
                  },
                  headerSearchBarOptions: {
                    backgroundColor: "#000",
                  },
                  headerTitle: "Change your password",
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </AuthProvider>
      </Provider>
    </>
  );
}
