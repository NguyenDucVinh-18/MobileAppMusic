import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";
import axios from "axios"; // Make sure to import axios
import { zingmp3Api } from "../apis/constants";
import { addSongsToMyPlaylist } from "../utils/addSongToMyPlaylist";
import IonIcons from "@expo/vector-icons/Ionicons";

export default function AddSongToPlaylistScreen({ route, navigation }) {
  const [songs, setSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const playlistId = route.params.id; // Get the playlistId from the route

  useEffect(() => {
    const fetchData = async () => {
      try {
        const songResponse = await axios.get(zingmp3Api.getSongs(searchText));
        const filteredSongs = songResponse.data.data?.items?.map((song) => ({
          encodeId: song.encodeId,
          artistsNames: song.artistsNames,
          title: song.title,
          thumbnailM: song.thumbnailM,
        }));
        setSongs(filteredSongs);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [searchText]);

  const handleSongPress = async (selectedSong) => {
    try {
      // Update the selectedSongs state
      setSelectedSongs((prevSelectedSongs) => [
        ...prevSelectedSongs,
        selectedSong,
      ]);

      // Call the function to add the selected song to the playlist
      await addSongsToMyPlaylist(playlistId, [selectedSong]);

      // Optionally, you can show a success message or perform other actions here
    } catch (error) {
      // Handle the error, show an error message, etc.
      console.error("Failed to add song to playlist:", error);
    }
  };

  const renderItem = ({ item }) =>
    !selectedSongs.some((selected) => selected.encodeId === item.encodeId) && (
      <TouchableOpacity onPress={() => handleSongPress(item)}>
        <View style={styles.songRow}>
          <Image source={{ uri: item.thumbnailM }} style={styles.songImage} />
          <View style={styles.songDetails}>
            <Text style={styles.songTitle}>{item.title}</Text>
            <Text style={styles.artistNames}>{item.artistsNames}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ alignSelf: "center" }}
        >
          <IonIcons name="arrow-back" color="white" size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>Add Songs to Playlist</Text>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for songs..."
        value={searchText}
        onChangeText={setSearchText}
        placeholderTextColor="#ccc"
      />
      <FlatList
        data={songs}
        renderItem={renderItem}
        keyExtractor={(item) => item.encodeId}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#121212",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  searchInput: {
    backgroundColor: "#303030",
    padding: 10,
    borderRadius: 8,
    color: "#fff",
    marginBottom: 10,
  },
  songRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  songImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: 10,
  },
  songDetails: {
    flex: 1,
  },
  songTitle: {
    color: "#fff",
    fontSize: 16,
  },
  artistNames: {
    color: "#aaa",
    fontSize: 14,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#302C2C",
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonLabel: {
    color: "#fff",
    fontSize: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
});
