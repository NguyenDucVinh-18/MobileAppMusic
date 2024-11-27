import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import PlaylistHeader from "./PlaylistHeader";
import ListMusics from "./ListMusics";
import { useDispatch } from "react-redux";
import { setPlaylist } from "../../store/playerSlice";

export default function NewRelease({ data }) {
  const dispatch = useDispatch();
  if (!data) return null;
  dispatch(setPlaylist(data?.items));
  return (
    <ScrollView style={styles.container}>
      <PlaylistHeader data={data} type="newrelease" />
      <ListMusics data={data} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
    paddingTop: 40,
    paddingLeft: 16,
    paddingRight: 16,
    overflow: "scroll",
    width: "100vw",
  },
});
