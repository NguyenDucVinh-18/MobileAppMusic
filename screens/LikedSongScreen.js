import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import IonIcons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import {
  setIsPlaying,
  setCurrentProgress,
  setCurrentSongIndex,
  setPlayerData,
  setAudioUrl,
  setRadioUrl,
  setShowPlayer,
} from "../store/playerSlice"; // Adjust path as needed
import { useAuth } from "../context/auth-context";
import axios from "axios";
import AudioService from "../services/AudioService";
import removeSongFromUserLibrary from "../utils/removeSongfromUserLibrary";

export default function LikedSongScreen({ navigation }) {
  const [likedSongs, setLikedSongs] = useState([]);
  const dispatch = useDispatch();
  const { userInfo, setUserInfo } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const isPlaying = useSelector((state) => state.player.isPlaying);

  useEffect(() => {
    const fetchLikedSongs = async () => {
      setIsLoading(true);
      if (userInfo?.Songs) {
        const promises = userInfo?.Songs?.map((item) =>
          axios.get(
            `https://zing-mp3-api.vercel.app/api/song/info/${item.songId}`
          )
        );
        const res = await Promise.all(promises);
        const songData = res?.map((r) => r.data.data);
        setLikedSongs(songData);
      }
      setIsLoading(false);
    };
    fetchLikedSongs();
  }, [userInfo?.Songs]);

  console.log("LikedSongScreen ~ likedSongs:", likedSongs);

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <LinearGradient
        colors={["#5038a0", "#121212"]}
        style={styles.gradientBackground}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <IonIcons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Liked Songs</Text>
        <Text style={styles.songCount}>{likedSongs.length} songs</Text>

        {/* Add Play Button */}
        <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
          <IonIcons
            name={isPlaying ? "pause-circle" : "play-circle"}
            size={60}
            color="#1DB954"
          />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );

  const handleRemoveSong = (songId) => {
    removeSongFromUserLibrary(songId, userInfo, setUserInfo);
  };

  const handlePlayPause = async () => {
    if (isPlaying) {
      await AudioService.pause();
      dispatch(setIsPlaying(false));
    } else {
      await AudioService.play();
      dispatch(setIsPlaying(true));
    }
  };

  const renderSongItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => {
        dispatch(setIsPlaying(false));
        dispatch(setCurrentProgress(0));
        dispatch(setCurrentSongIndex(index));
        dispatch(setPlayerData(item));
        dispatch(setAudioUrl(""));
        dispatch(setRadioUrl(""));
        dispatch(setShowPlayer(true));
        dispatch(setIsPlaying(true));
      }}
      key={index}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        padding: 10,
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
      <TouchableOpacity onPress={() => handleRemoveSong(item?.encodeId)}>
        <IonIcons name="remove-circle" color="white" size={18} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      ) : (
        <FlatList
          data={likedSongs}
          renderItem={renderSongItem}
          keyExtractor={(item) => item.encodeId}
          ListHeaderComponent={renderHeader}
          stickyHeaderIndices={[0]}
          ListFooterComponent={<View style={{ height: 100 }}></View>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  headerContainer: {
    height: 200,
    width: "100%",
  },
  gradientBackground: {
    flex: 1,
    padding: 16,
    justifyContent: "flex-end",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 10,
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  songCount: {
    fontSize: 14,
    color: "#b3b3b3",
    marginBottom: 16,
  },
  songItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "#333",
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 4,
  },
  artistName: {
    fontSize: 14,
    color: "#b3b3b3",
  },
  moreButton: {
    padding: 8,
  },
  playButton: {
    position: "absolute",
    bottom: -25, // Adjust this value to position the button at the edge
    right: 10,
    alignSelf: "center",
    zIndex: 1,
  },
});
