import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const AlbumRadioScreen = () => {
  const navigation = useNavigation();

  const initialNowPlaying = {
    cover:
      "https://s.yimg.com/ny/api/res/1.2/FyXeLDYArJFx_jRfVZIKNw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD05MDA-/https://media.zenfs.com/en/insider_articles_922/3cfb307db10dee35818faf40ebd4c8c6",
    title: "From Me to You - Mono / Remastered",
    artist: "Washed Out",
  };

  const [nowPlaying, setNowPlaying] = useState(initialNowPlaying);

  const nextTracks = [
    { id: "1", title: "Troubled Paradise", artist: "Slayyyter" },
    {
      id: "2",
      title: "Walk Like a Man",
      artist: "Frankie Valli & The Four Seasons",
    },
    {
      id: "3",
      title: "Don't Let Me Down - Remastered 2009",
      artist: "The Beatles",
    },
    { id: "4", title: "Elenore", artist: "The Turtles" },
    { id: "5", title: "Hey Moon", artist: "John Maus" },
    { id: "6", title: "home with you", artist: "FKA twigs" },
    { id: "7", title: "Mercurial World", artist: "Magdalena Bay" },
    { id: "8", title: "Hound Dog", artist: "Elvis Presley" },
  ];

  const renderTrackItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => setNowPlaying(item)}
      style={styles.trackItem}
    >
      <Ionicons name="radio-button-off-outline" size={20} color="#B0B0B0" />
      <View style={styles.trackInfo}>
        <Text style={styles.trackTitle}>{item.title}</Text>
        <Text style={styles.trackArtist}>{item.artist}</Text>
      </View>
      <MaterialCommunityIcons name="menu" size={20} color="#fff" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerIconLeft}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="close-outline" size={24} color="#fff" />
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>
            Album radio based on {nowPlaying.title}
          </Text>
        </View>

        <View style={styles.headerIconRight} />
      </View>

      {/* Now Playing Section */}
      <View style={styles.nowPlayingContainer}>
        <Text style={styles.sectionTitle}>Now Playing</Text>
        <View style={styles.nowPlayingInfo}>
          <Image
            source={{ uri: nowPlaying.cover }}
            style={styles.nowPlayingCover}
          />
          <View style={styles.nowPlayingTextContainer}>
            <Text style={styles.nowPlayingTitle}>{nowPlaying.title}</Text>
            <Text style={styles.nowPlayingArtist}>{nowPlaying.artist}</Text>
          </View>
        </View>
      </View>

      {/* Next Tracks Section */}
      <Text style={styles.sectionTitle}>Next From: {nowPlaying.title}</Text>
      <FlatList
        data={nextTracks}
        renderItem={renderTrackItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.trackList}
      />

      {/* Playback Controls */}
      <View style={styles.playbackControls}>
        <TouchableOpacity>
          <MaterialCommunityIcons name="shuffle" size={24} color="#1DB954" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="play-skip-back-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.playButton}>
          <Ionicons name="play-circle-outline" size={56} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="play-skip-forward-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons name="repeat" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    paddingHorizontal: 20,
    paddingVertical: 15,
    position: "relative",
  },
  headerIconLeft: {
    position: "absolute",
    left: 20,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  headerIconRight: {
    position: "absolute",
    right: 20,
  },
  nowPlayingContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 10,
  },
  nowPlayingInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  nowPlayingCover: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  nowPlayingTextContainer: {
    flex: 1,
  },
  nowPlayingTitle: {
    color: "#1DB954",
    fontSize: 12,
    fontWeight: "bold",
  },
  nowPlayingArtist: {
    color: "#B0B0B0",
    fontSize: 12,
  },
  trackList: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  trackItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#282828",
  },
  trackInfo: {
    flex: 1,
    marginLeft: 10,
  },
  trackTitle: {
    color: "#fff",
    fontSize: 13,
  },
  trackArtist: {
    color: "#B0B0B0",
    fontSize: 12,
  },
  playbackControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 20,
    paddingHorizontal: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#121212",
  },
  playButton: {
    alignItems: "center",
  },
});

export default AlbumRadioScreen;
