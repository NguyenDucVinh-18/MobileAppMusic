import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAudioUrl,
  setCurrentProgress,
  setCurrentSongIndex,
  setDuration,
  setIsPlaying,
  setOptionData,
  setPlayerData,
  setRadioUrl,
  setShowPlayer,
  setShowSubPlayer,
} from "../../store/playerSlice";
import { TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import TrackOptionBottomSheet from "../../screens/TrackOptionsBottomSheet";

export default function ListMusics({ data, type, onAddMusic }) {
  const dispatch = useDispatch();
  const songData = useSelector((state) => state.player.data);
  const optionData = useSelector((state) => state.player.optionData);
  const trackData = {
    cover: optionData.thumbnail,
    title: optionData.title,
    artist: optionData.artistsNames,
  };
  const refRBSheet = useRef();
  const handleAddMusicToMyPlayList = () => {
    onAddMusic();
  };

  const isLoading =
    type !== "myPlaylist" &&
    type !== "liked" &&
    (!data || Object.keys(data).length === 0);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  const handleShowTrackOption = (item) => {
    dispatch(setOptionData(item));
    refRBSheet.current.open();
  };

  return (
    <View style={{ marginBottom: 120 }}>
      {type === "myPlaylist" && (
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginTop: 10,
          }}
          onPress={() => handleAddMusicToMyPlayList()}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <View style={{ backgroundColor: "#333", padding: 10 }}>
              <Image
                source={require("../../assets/images/plus.png")}
                style={{ width: 30, height: 30 }}
              />
            </View>
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Add to this playlist
            </Text>
          </View>
        </TouchableOpacity>
      )}

      {data?.items?.map((item, index) => {
        return (
          <TouchableOpacity
            onPress={() => {
              if (item?.streamingStatus !== 1) {
                ToastAndroid.showWithGravityAndOffset(
                  "🎵 This song is only for VIP users 🎶",
                  ToastAndroid.LONG,
                  ToastAndroid.BOTTOM,
                  0, // xOffset
                  100 // yOffset
                );
              } else {
                if (item.encodeId === songData.encodeId) {
                  dispatch(setShowPlayer(true));
                } else {
                  dispatch(setIsPlaying(false));
                  dispatch(setCurrentProgress(0));
                  dispatch(setCurrentSongIndex(index));
                  dispatch(setPlayerData(item));
                  dispatch(setAudioUrl(""));
                  dispatch(setRadioUrl(""));
                  dispatch(setShowPlayer(true));
                  dispatch(setShowSubPlayer(false));
                  dispatch(setDuration(item.duration));
                }
              }
            }}
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              marginTop: 10,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              {index + 1}
            </Text>
            <Image
              source={{ uri: item?.thumbnailM }}
              style={{
                width: 50,
                height: 50,
                resizeMode: "cover",
              }}
            ></Image>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                {item?.title}
              </Text>
              <Text
                style={{
                  color: "#ccc",
                  fontSize: 14,
                  fontWeight: "400",
                }}
              >
                {item?.artistsNames}
              </Text>
            </View>
            <Text style={{ color: "green", fontWeight: "600" }}>
              {item?.streamingStatus === 1 ? "" : "VIP"}
            </Text>
            <TouchableOpacity onPress={() => handleShowTrackOption(item)}>
              <Entypo name="dots-three-vertical" color="white" size={14} />
            </TouchableOpacity>
          </TouchableOpacity>
        );
      })}
      <TrackOptionBottomSheet ref={refRBSheet} trackData={trackData} />
    </View>
  );
}

const styles = StyleSheet.create({});
