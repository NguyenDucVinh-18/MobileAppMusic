import { StyleSheet, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LibraryScreen from "../screens/LibraryScreen";
import CreatePlaylistScreen from "../screens/CreatePlaylistScreen";
import AddSongToPlaylistScreen from "../screens/AddSongToPlaylistScreen";
import LikedSongScreen from "../screens/LikedSongScreen";
import Artist from "../modules/Playlist/Artist";
import ArtistListScreen from "../screens/ArtistListScreen";
import PlayList from "../modules/Playlist/Playlist";
const Stack = createNativeStackNavigator();
export default function LibraryStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LibraryHome"
        component={LibraryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ArtistListScreen"
        component={ArtistListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ArtistPage"
        component={Artist}
        options={{
          headerShown: false,
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
        name="LikedSongScreen"
        component={LikedSongScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreatePlaylistScreen"
        component={CreatePlaylistScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddSongToPlaylistScreen"
        component={AddSongToPlaylistScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
