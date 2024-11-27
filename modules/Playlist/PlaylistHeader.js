import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";
import React from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setIsLove, setIsPlaying } from "../../store/playerSlice";
import { useEffect } from "react";
import addPlaylistIntoUserLibrary from "../../utils/addPlaylistIntoUserLibrary";
import { useAuth } from "../../context/auth-context";
import removePlaylistFromUserLibrary from "../../utils/removePlaylistfromUserLibrary";
import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/core";

export default function PlaylistHeader({ data, type, myPlaylist, isLiked }) {
  if ((!data || Object.keys(data).length === 0) && !myPlaylist && !isLiked) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 22 }}>
          Loading...{" "}
        </Text>
      </View>
    );
  }
  const { userInfo, setUserInfo } = useAuth();
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const playlist = useSelector((state) => state.player.playlist);

  const isLove = useSelector((state) => state.player.isLove);
  const playlistId = useSelector((state) => state.player.playlistId);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    if (userInfo?.Playlist?.some((pl) => pl.playlistId === playlistId)) {
      dispatch(setIsLove(true));
    } else {
      dispatch(setIsLove(false));
    }
  }, [playlistId, userInfo]);

  const handleAddPlaylist = () => {
    dispatch(setIsLove(true));
    addPlaylistIntoUserLibrary(
      playlistId,
      data?.title,
      data?.thumbnailM,
      userInfo,
      setUserInfo
    );
  };

  const handleRemove = () => {
    dispatch(setIsLove(false));
    removePlaylistFromUserLibrary(playlistId, userInfo, setUserInfo);
  };
  return (
    <>
      <LinearGradient
        colors={["#1DB954", "#121212"]}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
          height: 300,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ position: "absolute", top: 10, left: 10, zIndex: 1 }}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        {!myPlaylist && type === "newrelease" && (
          <Image
            source={{ uri: data?.items?.[0].thumbnailM }}
            style={{
              top: 10,
              left: "50%",
              width: 200,
              height: 200,
              resizeMode: "cover",
              borderRadius: 9999,
              transform: [{ translateX: -100 }], // Half of the image width
            }}
          ></Image>
        )}
        {!myPlaylist && type === "radio" && (
          <Image
            source={{
              uri: data?.items?.[0]?.items?.[0]?.thumbnailM,
            }}
            style={{
              top: 10,
              left: "50%",
              width: 200,
              height: 200,
              resizeMode: "cover",
              borderRadius: 9999,
              transform: [{ translateX: -100 }], // Half of the image width
            }}
          ></Image>
        )}
        {!myPlaylist && type === "hub" && (
          <Image
            source={{ uri: data?.thumbnailHasText }}
            style={{
              top: 10,
              left: "50%",
              width: 200,
              height: 200,
              resizeMode: "cover",
              borderRadius: 9999,
              transform: [{ translateX: -100 }], // Half of the image width
            }}
          ></Image>
        )}
        {!myPlaylist && type === "playlist" && (
          <Image
            source={{ uri: data?.thumbnailM }}
            style={{
              top: 10,
              left: "50%",
              width: 200,
              height: 200,
              resizeMode: "cover",
              transform: [{ translateX: -100 }], // Half of the image width
            }}
          ></Image>
        )}
        {myPlaylist && data?.song && (
          <Image
            source={{ uri: data.song.thumbnailM }}
            style={{
              top: 10,
              left: "50%",
              width: 200,
              height: 200,
              resizeMode: "cover",
              borderRadius: 9999,
              transform: [{ translateX: -100 }], // Half of the image width
            }}
          ></Image>
        )}
        {myPlaylist && !data?.song && (
          <Image
            source={{ uri: myPlaylist.thumbnail }}
            style={{
              top: 10,
              left: "50%",
              width: 200,
              height: 200,
              resizeMode: "cover",
              borderRadius: 9999,
              transform: [{ translateX: -100 }], // Half of the image width
            }}
          ></Image>
        )}
        {!myPlaylist && type === "playlist" && isLiked && (
          <Image
            source={require("../../assets/like_song_thumb.png")}
            style={{
              top: 10,
              left: "50%",
              width: 200,
              height: 200,
              resizeMode: "cover",
              borderRadius: 9999,
              transform: [{ translateX: -100 }], // Half of the image width
            }}
          ></Image>
        )}
      </LinearGradient>
      <Text
        style={{
          color: "white",
          fontSize: 25,
          fontWeight: "bold",
          marginTop: 200,
        }}
      >
        {!myPlaylist && type === "radio" ? "Radio Now" : data?.title}
        {myPlaylist && myPlaylist?.name}
      </Text>
      <View
        style={{
          marginTop: 10,
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            flex: 2,
            alignItems: "center",
            flexDirection: "row",
            gap: 25,
          }}
        >
          <Pressable onPress={handleAddPlaylist}>
            {myPlaylist && <Ionicons name="download" color="white" size={24} />}
            {!myPlaylist && (
              <Ionicons
                name="heart"
                color={isLove ? "green" : "white"}
                size={24}
              />
            )}
          </Pressable>
          <TouchableOpacity onPress={handleRemove}>
            <Ionicons name="share" color="white" size={24} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Entypo name="dots-three-vertical" color="white" size={24} />
          </TouchableOpacity>
        </View>
        <Pressable
          onPress={() => {
            dispatch(setIsPlaying(!isPlaying));
          }}
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#1ED760",
            borderRadius: 9999,
            width: 56,
            height: 56,
          }}
        >
          {!isPlaying ? (
            <Ionicons name="play" size={24} color="white" />
          ) : (
            <Ionicons name="pause" size={24} color="white" />
          )}
        </Pressable>
      </View>
    </>
  );
}
