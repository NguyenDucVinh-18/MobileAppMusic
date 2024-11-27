import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import PlaylistHeader from "./PlaylistHeader";
import ListMusics from "./ListMusics";
import axios from "axios";
import { zingmp3Api } from "../../apis/constants";
import { useDispatch } from "react-redux";
import { setPlaylist } from "../../store/playerSlice";
import IonIcons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/core";

export default function Artist({ route }) {
  const navigation = useNavigation();
  const { id } = route.params;
  const [data, setData] = React.useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchPlayListData() {
      const res = await axios.get(zingmp3Api.getAlbumPage(id));
      const data = res.data;
      setData(data.data);
      dispatch(setPlaylist(data?.data?.song.items));
    }
    fetchPlayListData();
  }, []);
  return (
    <ScrollView style={styles.container}>
      <PlaylistHeader data={data} type="playlist" />
      <ListMusics data={data?.song} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    overflow: "scroll",
  },
});
