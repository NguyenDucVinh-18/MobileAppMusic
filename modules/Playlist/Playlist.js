import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import PlaylistHeader from "./PlaylistHeader";
import ListMusics from "./ListMusics";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  setCurrentProgress,
  setCurrentSongIndex,
  setPlaylist,
  setPlaylistId,
} from "../../store/playerSlice";
import { useAuth } from "../../context/auth-context";
import { useFocusEffect } from "@react-navigation/core";
import { getDetailPlaylist } from "../../apis/playlist";
import { getSong } from "../../apis/song";

export default function PlayList({ navigation, route }) {
  const { id, MyPlaylistId, type } = route?.params;
  const [data, setData] = React.useState({});
  const [myPlaylistData, setMyPlaylistData] = useState([]);
  const [songData, setSongData] = useState([]);
  console.log("PlayList ~ songData:", songData);
  const dispatch = useDispatch();
  const { userInfo, setUserInfo } = useAuth();
  const [myPlayListSongs, setMyPlayListSongs] = useState(null);

  const handleAddMusicToMyPlayList = () => {
    navigation.navigate("AddSongToPlaylistScreen", { id: MyPlaylistId });
  };

  useEffect(() => {
    async function fetchSongData() {
      if (userInfo?.Songs) {
        const promises = userInfo?.Songs?.map((item) =>
          axios.get(
            `https://zing-mp3-api.vercel.app/api/song/info/${item.songId}`
          )
        );
        const res = await Promise.all(promises);
        const songData = res?.map((r) => r.data.data);
        setSongData({ items: songData });
      }
    }
    fetchSongData();
  }, [userInfo?.Songs]);

  useFocusEffect(
    useCallback(() => {
      async function fetchPlayListData() {
        if (!MyPlaylistId) {
          // If MyPlaylistId is not present, fetch data from the API
          const res = await getDetailPlaylist(id);
          const data = res.data;

          setData(data.data);
          dispatch(setPlaylist(data?.data?.song.items));
          dispatch(setPlaylistId(id));
          dispatch(setCurrentProgress(0));
        } else if (type !== "liked") {
          const myPlaylistData = userInfo?.MyPlaylistSongs.filter(
            (item) => item.playlistId === MyPlaylistId
          );

          setMyPlaylistData(myPlaylistData);
          const songDetailsPromises = myPlaylistData.map(async (item) => {
            const songRes = getSong(item.song.encodeId);
            console.log("PlayList ~ songRes", songRes);

            return songRes.data.data;
          });
          // Wait for all requests to finish
          const songDetails = await Promise.all(songDetailsPromises);
          dispatch(setPlaylist(songDetails));
          dispatch(setCurrentSongIndex(0));
          dispatch(setCurrentProgress(0));
          setMyPlayListSongs({ items: songDetails });
        }
      }
      fetchPlayListData();
    }, [MyPlaylistId, id, userInfo])
  );
  return (
    <ScrollView style={styles.container}>
      {type === "liked" && (
        <PlaylistHeader data={userInfo?.Songs} type="playlist" isLiked={true} />
      )}

      {type !== "liked" && (
        <PlaylistHeader
          data={MyPlaylistId ? myPlaylistData[0] : data}
          myPlaylist={userInfo?.MyPlaylist?.find(
            (MyPlaylist) => MyPlaylist.playlistId == MyPlaylistId
          )}
          type="playlist"
        />
      )}

      {!MyPlaylistId && type !== "liked" && (
        <>
          <ListMusics data={data?.song} />
        </>
      )}
      {!MyPlaylistId && type === "liked" && (
        <>
          <ListMusics data={songData} type="liked" />
        </>
      )}
      {MyPlaylistId && (
        <>
          <ListMusics
            data={myPlayListSongs}
            type="myPlaylist"
            onAddMusic={handleAddMusicToMyPlayList}
          />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    flex: 1,
    paddingTop: 40,
    paddingLeft: 16,
    paddingRight: 16,
    overflow: "scroll",
  },
});
