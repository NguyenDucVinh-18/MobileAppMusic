import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ToastAndroid,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { getInfoSong, getSong } from "../apis/song";
import useLyric from "../hooks/useLyric";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowSubPlayer,
  setAudioUrl,
  setShowPlayer,
  setCurrentProgress,
  setIsPlaying,
  setCurrentSongIndex,
  setRadioUrl,
  setPlayerData,
  setIsRepeat,
  setIsRandom,
  setIsLove,
} from "../store/playerSlice";
import AudioService from "../services/AudioService"; // Import AudioService
import TrackOptionBottomSheet from "./TrackOptionsBottomSheet";
import { useAuth } from "../context/auth-context";
import addSongIntoUserLibrary from "../utils/addSongIntoUserLibrary";

const TrackViewScreen = () => {
  const dispatch = useDispatch();
  const { userInfo, setUserInfo } = useAuth();
  const singleSong = useSelector((state) => state.player.data);
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const currentProgress = useSelector((state) => state.player.currentProgress);
  const duration = useSelector((state) => state.player.duration);
  const playlist = useSelector((state) => state.player.playlist);
  const currentSongIndex = useSelector(
    (state) => state.player.currentSongIndex
  );
  const isRepeat = useSelector((state) => state.player.isRepeat);
  const isRandom = useSelector((state) => state.player.isRandom);
  const isLove = useSelector((state) => state.player.isLove);
  const lyrics = useLyric(singleSong.encodeId);
  const [album, setAlbum] = useState(null);

  const bottomSheetRef = useRef(null);

  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
  const flatListRef = useRef(null);
  const isDisable = playlist.length === 0 ? true : false;

  const trackData = {
    cover: singleSong.thumbnail,
    title: singleSong.title,
    artist: singleSong.artistsNames,
  };

  useEffect(() => {
    async function fetchAndPlaySong() {
      if (
        singleSong.encodeId &&
        singleSong.duration > 0 &&
        singleSong?.streamingStatus === 1
      ) {
        if (currentProgress === 0) {
          try {
            const songData = await getSong(singleSong.encodeId); // Lấy URL bài hát
            const res = await getInfoSong(singleSong.encodeId);
            setAlbum(res.data);
            dispatch(setAudioUrl(songData.data[128])); // Cập nhật URL vào Redux

            // Tải nhạc và tự động phát khi tải xong
            await AudioService.loadAudio(songData.data[128]);
            await AudioService.play(); // Tự động phát nhạc sau khi tải xong

            // Cập nhật trạng thái isPlaying trong Redux sau khi nhạc bắt đầu phát
            dispatch(setIsPlaying(true));
          } catch (error) {
            console.error("Error fetching song details:", error);
            dispatch(setIsPlaying(false)); // Đặt isPlaying về false nếu có lỗi
          }
        }
        // else {
        //   await AudioService.play(); // Tự động phát nhạc sau khi tải xong
        //   dispatch(setIsPlaying(true));
        // }
      } else {
        ToastAndroid.showWithGravityAndOffset(
          "🎵 This song is only for VIP users 🎶",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          0, // xOffset
          100 // yOffset
        );
        setTimeout(() => {
          handleNext();
        }, 2000);
      }
    }

    fetchAndPlaySong();
  }, [singleSong]);

  useEffect(() => {
    if (AudioService.sound) {
      AudioService.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          const position = status.positionMillis;
          const duration = status.durationMillis;

          dispatch(setCurrentProgress(position / duration));

          // Kiểm tra nếu bài hát kết thúc
          if (status.didJustFinish) {
            if (isRepeat) {
              handleRepeat();
            } else if (isRandom) {
              handleRandomSong();
            } else {
              if (currentSongIndex === playlist.length - 1) {
                dispatch(setCurrentProgress(0));
                dispatch(setCurrentSongIndex(0));
                dispatch(setPlayerData(playlist[0]));
                dispatch(setIsPlaying(false));
              } else {
                handleNext();
              }
            }
          }
        }
      });
    }

    return () => {
      AudioService.setOnPlaybackStatusUpdate(null);
    };
  }, [AudioService.sound, isRepeat, isRandom, currentSongIndex, playlist]);

  useEffect(() => {
    const index = lyrics.findIndex(
      (lyric) =>
        currentProgress * duration >= lyric.startTime &&
        currentProgress * duration < lyric.endTime
    );
    if (index !== -1 && index !== currentLyricIndex) {
      setCurrentLyricIndex(index);
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({ index, animated: true });
      }
    }
  }, [currentProgress, duration]);

  // Hàm xử lý khi kéo thanh tiến trình
  const handleSliderChange = async (value) => {
    if (!AudioService.isLoaded) {
      console.warn("Audio not loaded!");
      return;
    }
    const seekPosition = value * duration; // Calculate the position in milliseconds
    try {
      await AudioService.seek(seekPosition); // Call the seek method
    } catch (error) {
      console.error("Error seeking audio:", error);
    }
  };

  const formatTime = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Thêm hàm xử lý khi nhấn vào lyric
  const handleLyricPress = async (startTime) => {
    try {
      await AudioService.seek(startTime); // Tua đến thời gian startTime của lyric
      dispatch(setIsPlaying(true)); // Bắt đầu phát nhạc
      await AudioService.play(); // Phát nhạc nếu nhạc đang tạm dừng
    } catch (error) {
      console.error("Error seeking audio:", error);
    }
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

  const renderLyricItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => handleLyricPress(item.startTime)}>
      <View
        style={
          index === currentLyricIndex
            ? styles.activeLyricItem
            : styles.lyricItem
        }
      >
        <Text style={styles.lyricText}>{item.data}</Text>
      </View>
    </TouchableOpacity>
  );

  // Section to handle Next and Previous song
  const handleNext = useCallback(() => {
    if (currentSongIndex < playlist.length - 1) {
      dispatch(setCurrentProgress(0));
      dispatch(setCurrentSongIndex(currentSongIndex + 1));
      dispatch(setAudioUrl(""));
      dispatch(setRadioUrl(""));
      dispatch(setPlayerData(playlist[currentSongIndex + 1]));
    }
  }, [currentSongIndex, playlist]);

  const handlePrev = useCallback(() => {
    if (currentSongIndex > 0) {
      dispatch(setCurrentSongIndex(currentSongIndex - 1));
      dispatch(setPlayerData(playlist[currentSongIndex - 1]));
      dispatch(setAudioUrl(""));
      dispatch(setRadioUrl(""));
      dispatch(setCurrentProgress(0));
    }
  }, [currentSongIndex, playlist]);
  const handleRepeat = useCallback(() => {
    AudioService.playFromStart();
    dispatch(setCurrentProgress(0));
  }, []);

  const handleRandomSong = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * playlist.length);
    dispatch(setCurrentSongIndex(randomIndex));
    dispatch(setPlayerData(playlist[randomIndex]));
    dispatch(setAudioUrl(""));
    dispatch(setRadioUrl(""));
    dispatch(setCurrentProgress(0));
    dispatch(setIsPlaying(true));
    AudioService.playFromStart();
  }, [playlist]);

  // Handle add song to liked songs
  const handleAdd = () => {
    dispatch(setIsLove(true));
    addSongIntoUserLibrary(
      singleSong?.encodeId,
      singleSong?.title,
      singleSong?.thumbnailM,
      singleSong?.artistsNames,
      userInfo,
      setUserInfo
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            dispatch(setShowSubPlayer(true));
            dispatch(setShowPlayer(false));
          }}
        >
          <Ionicons name="chevron-down" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.albumTitle}>
          {album?.album?.title || singleSong.title}
        </Text>
        <TouchableOpacity onPress={() => bottomSheetRef.current.open()}>
          <Ionicons name="ellipsis-horizontal" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <Image
        source={{ uri: singleSong.thumbnailM }}
        style={styles.albumCover}
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
      >
        <View style={styles.trackInfo}>
          <Text style={styles.trackTitle}>{singleSong.title}</Text>
          <Text style={styles.trackArtist}>{singleSong.artistsNames}</Text>
        </View>

        <TouchableOpacity onPress={handleAdd}>
          <Ionicons
            name={isLove ? "heart" : "heart-outline"}
            size={24}
            color={isLove ? "#1DB954" : "#fff"}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.progressContainer}>
        <Slider
          style={{ width: "100%", height: 20 }}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#1DB954"
          maximumTrackTintColor="#fff"
          thumbTintColor="#1DB954"
          value={currentProgress}
          onSlidingComplete={handleSliderChange}
        />
        <View style={styles.progressTime}>
          <Text style={styles.timeText}>
            {formatTime(currentProgress * duration)}
          </Text>
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity
          onPress={() => dispatch(setIsRandom(!isRandom))}
          disabled={isDisable || isRepeat}
        >
          {isDisable || isRepeat ? (
            <MaterialCommunityIcons name="shuffle" size={24} color="#282a36" />
          ) : (
            <MaterialCommunityIcons
              name="shuffle"
              size={24}
              color={isRandom === true ? "#1DB954" : "#fff"}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePrev} disabled={isDisable}>
          <Ionicons
            name="play-skip-back-outline"
            size={24}
            color={isDisable ? "#282a36" : "#fff"}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
          <Ionicons
            name={isPlaying ? "pause-circle-outline" : "play-circle-outline"}
            size={64}
            color="#fff"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext} disabled={isDisable}>
          <Ionicons
            name="play-skip-forward-outline"
            size={24}
            color={isDisable ? "#282a36" : "#fff"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => dispatch(setIsRepeat(!isRepeat))}
          disabled={isRandom}
        >
          {isRandom ? (
            <MaterialCommunityIcons name="repeat" size={24} color="#282a36" />
          ) : (
            <MaterialCommunityIcons
              name="repeat"
              size={24}
              color={isRepeat === true ? "#1DB954" : "#fff"}
            />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.lyricsContainer}>
        {lyrics.length !== 0 ? (
          <FlatList
            ref={flatListRef}
            data={lyrics}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderLyricItem}
            extraData={currentLyricIndex}
            showsVerticalScrollIndicator={false}
            getItemLayout={(data, index) => ({
              length: 40,
              offset: 40 * index,
              index,
            })}
            onScrollToIndexFailed={(info) => {
              const wait = new Promise((resolve) => setTimeout(resolve, 500));
              wait.then(() => {
                flatListRef.current?.scrollToIndex({
                  index: info.index,
                  animated: true,
                });
              });
            }}
          />
        ) : (
          <Text style={{ fontSize: 21, fontWeight: 600, color: "#fff" }}>
            No lyrics available for this song.
          </Text>
        )}
      </View>

      <TrackOptionBottomSheet ref={bottomSheetRef} trackData={trackData} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  albumTitle: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    flexWrap: "wrap",
  },
  albumCover: {
    width: "90%",
    height: 300,
    borderRadius: 10,
    alignSelf: "center",
    marginVertical: 20,
    resizeMode: "cover",
  },
  trackInfo: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  trackTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  trackArtist: {
    color: "#B0B0B0",
    fontSize: 16,
    textAlign: "left",
    marginTop: 5,
  },
  progressContainer: {
    paddingHorizontal: 20,
  },
  progressTime: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: -10,
  },
  timeText: {
    color: "#B0B0B0",
    fontSize: 12,
    marginTop: 10,
  },
  controlsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 20,
  },
  playButton: {
    alignItems: "center",
  },
  lyricsContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#282828",
    borderRadius: 10,
    marginHorizontal: 20,
  },
  lyricItem: {
    marginBottom: 10,
  },
  lyricText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  lyricItem: {
    padding: 10,
    opacity: 0.6,
  },
  activeLyricItem: {
    width: "100%",
    padding: 10,
    backgroundColor: "#525356", // Highlight color for active lyric
    opacity: 1,
    borderRadius: 10,
  },
});

export default TrackViewScreen;
