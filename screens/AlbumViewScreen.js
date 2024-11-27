// AlbumViewScreen.js

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
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const AlbumViewScreen = () => {
  const navigation = useNavigation();

  const albumData = {
    cover:
      "https://s.yimg.com/ny/api/res/1.2/FyXeLDYArJFx_jRfVZIKNw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD05MDA-/https://media.zenfs.com/en/insider_articles_922/3cfb307db10dee35818faf40ebd4c8c6",
    title: "1 (Remastered)",
    artist: "The Beatles",
    year: "Album • 2000",
  };

  const tracks = [
    { id: "1", name: "Love Me Do - Mono / Remastered", artist: "The Beatles" },
    {
      id: "2",
      name: "From Me to You - Mono / Remastered",
      artist: "The Beatles",
    },
    {
      id: "3",
      name: "She Loves You - Mono / Remastered",
      artist: "The Beatles",
    },
    {
      id: "4",
      name: "I Want To Hold Your Hand - Remastered 2015",
      artist: "The Beatles",
    },
  ];

  const [playingTrack, setPlayingTrack] = useState(tracks[0]);

  const renderTrack = ({ item }) => (
    <TouchableOpacity
      onPress={() => setPlayingTrack(item)}
      style={styles.trackItem}
    >
      <View style={styles.trackInfo}>
        <Text
          style={[
            styles.trackName,
            playingTrack?.id === item.id && styles.playingTrack,
          ]}
        >
          {item.name}
        </Text>
        <View style={styles.artistRow}>
          <Text style={styles.trackArtist}>{item.artist}</Text>
          <TouchableOpacity style={styles.downloadIcon}>
            <Ionicons name="download-outline" size={18} color="#1DB954" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.menuIconContainer}
        onPress={() => navigation.navigate("AlbumControl", { track: item })}
      >
        <Ionicons name="ellipsis-horizontal" size={20} color="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <View style={styles.albumInfoContainer}>
              <Image
                source={{ uri: albumData.cover }}
                style={styles.albumCover}
              />
              <Text style={styles.albumTitle}>{albumData.title}</Text>
              <View style={styles.artistRow}>
                <Image
                  source={{
                    uri: "https://upload.wikimedia.org/wikipedia/en/0/05/The_Beatles_-_Sgt._Pepper%27s_Lonely_Hearts_Club_Band.jpg",
                  }}
                  style={styles.artistImage}
                />
                <Text style={styles.artistName}>{albumData.artist}</Text>
              </View>
              <Text style={styles.albumYear}>{albumData.year}</Text>
            </View>

            <View style={styles.controls}>
              <View style={styles.iconGroup}>
                <TouchableOpacity>
                  <Ionicons name="heart-outline" size={22} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons name="download-outline" size={22} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons name="ellipsis-horizontal" size={22} color="#fff" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.playButton}>
                <Ionicons name="pause-circle" size={56} color="#1DB954" />
              </TouchableOpacity>
            </View>
          </>
        }
        data={tracks}
        keyExtractor={(item) => item.id}
        renderItem={renderTrack}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Thanh đang phát */}
      {playingTrack && (
        <TouchableOpacity
          style={styles.nowPlayingBar}
          onPress={() =>
            navigation.navigate("TrackView", { track: playingTrack })
          }
        >
          <Image
            source={{ uri: albumData.cover }}
            style={styles.nowPlayingImage}
          />
          <View style={styles.nowPlayingInfo}>
            <Text style={styles.nowPlayingTrack}>{playingTrack.name}</Text>
            <Text style={styles.nowPlayingArtist}>{playingTrack.artist}</Text>
          </View>
          <Ionicons
            name="bluetooth-outline"
            size={20}
            color="#1DB954"
            style={styles.bluetoothIcon}
          />
          <TouchableOpacity>
            <Ionicons name="pause-circle" size={24} color="#fff" />
          </TouchableOpacity>
        </TouchableOpacity>
      )}

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerIconContainer}
          onPress={() => navigation.navigate("Main", { screen: "Home" })}
        >
          <Ionicons name="home-outline" size={24} color="#fff" />
          <Text style={styles.footerText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerIconContainer}
          onPress={() => navigation.navigate("Main", { screen: "Search" })}
        >
          <Ionicons name="search-outline" size={24} color="#fff" />
          <Text style={styles.footerText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerIconContainer}
          onPress={() => navigation.navigate("Main", { screen: "Library" })}
        >
          <Ionicons name="library-outline" size={24} color="#fff" />
          <Text style={styles.footerText}>Your Library</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Các styles không thay đổi
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  albumInfoContainer: {
    alignItems: "center",
    padding: 20,
  },
  albumCover: {
    width: 200,
    height: 200,
    marginBottom: 15,
  },
  albumTitle: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  artistRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  artistImage: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 8,
  },
  artistName: {
    fontSize: 16,
    color: "#B0B0B0",
  },
  albumYear: {
    fontSize: 14,
    color: "#B0B0B0",
    marginTop: 5,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    marginVertical: 10,
  },
  iconGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  playButton: {
    marginRight: 10,
  },
  trackItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#282828",
  },
  trackInfo: {
    flex: 1,
  },
  trackName: {
    fontSize: 16,
    color: "#fff",
  },
  trackArtist: {
    fontSize: 14,
    color: "#B0B0B0",
    marginRight: 10,
  },
  downloadIcon: {
    marginLeft: 5,
  },
  playingTrack: {
    color: "#1DB954",
  },
  menuIconContainer: {
    paddingLeft: 10,
  },
  nowPlayingBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#282828",
    paddingVertical: 12,
    paddingHorizontal: 15,
    position: "absolute",
    borderRadius: 10,
    bottom: 55,
    left: 0,
    right: 0,
  },
  nowPlayingImage: {
    width: 40,
    height: 40,
    borderRadius: 5,
    marginRight: 10,
  },
  nowPlayingInfo: {
    flex: 1,
  },
  nowPlayingTrack: {
    fontSize: 12,
    color: "#fff",
  },
  nowPlayingArtist: {
    fontSize: 12,
    color: "#B0B0B0",
  },
  bluetoothIcon: {
    marginRight: 15,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#121212",
    borderTopWidth: 1,
    borderTopColor: "#282828",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerIconContainer: {
    alignItems: "center",
  },
  footerText: {
    color: "#fff",
    fontSize: 12,
    marginTop: 4,
  },
});

export default AlbumViewScreen;
