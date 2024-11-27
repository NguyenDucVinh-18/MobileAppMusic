import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from "../screens/SearchScreen";
import CategoryDetail from "../modules/Search/CategoryDetail";
import { View } from "react-native";
import SearchView from "../modules/Search/SearchView";
import HeaderSearch from "../modules/Search/HeaderSearch";
import PlayList from "../modules/Playlist/Playlist";
import Artist from "../modules/Playlist/Artist";

const Stack = createNativeStackNavigator();
export default function SearchStack() {
  return (
    <Stack.Navigator initialRouteName="Search">
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CategoryDetail"
        component={CategoryDetail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SearchView"
        component={SearchView}
        options={{
          headerTintColor: "white",
          headerBackground: () => {
            return (
              <View
                style={{
                  backgroundColor: "#121212",
                  opacity: 0.8,
                  flex: 1,
                }}
              ></View>
            );
          },
          headerSearchBarOptions: {
            backgroundColor: "#121212",
          },
          headerTitle: () => <HeaderSearch></HeaderSearch>,
        }}
      />
      <Stack.Screen
        name="PlayList"
        component={PlayList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Artist"
        component={Artist}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
