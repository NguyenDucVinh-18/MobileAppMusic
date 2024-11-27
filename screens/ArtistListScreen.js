import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import axios from "axios";
import { zingmp3Api } from "../apis/constants";
import { useAuth } from "../context/auth-context";
import addArtistIntoUserLibrary from "../utils/addArtistIntoUserLibrary";
import { Ionicons } from "@expo/vector-icons";

const ArtistListScreen = ({ route, navigation }) => {
  const { userInfo, setUserInfo } = useAuth();
  const [artistData, setArtistData] = useState(null);
  const [selectedArtists, setSelectedArtists] = useState(
    route.params.selectedArtists ? route.params.selectedArtists : []
  );
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const artistResponse = await axios.get(
          zingmp3Api.getArtist(searchText)
        );
        setArtistData(artistResponse.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [searchText]);

  const toggleSelection = (artist) => {
    setSelectedArtists((prevSelectedArtists) => {
      const existingArtistIndex = prevSelectedArtists.findIndex(
        (a) => a.id === artist.id
      );

      // If the artist is already selected, remove it
      if (existingArtistIndex !== -1) {
        const newSelectedArtists = [...prevSelectedArtists];
        newSelectedArtists.splice(existingArtistIndex, 1);
        return newSelectedArtists;
      } else {
        // Add the artist to the selection
        return [...prevSelectedArtists, artist];
      }
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => toggleSelection(item)}
    >
      <View style={styles.artistContainer}>
        <Image source={{ uri: item.thumbnail }} style={styles.artistImage} />
        {selectedArtists?.some((artist) => artist.id === item.id) && (
          <View style={styles.selectionTick}>
            <Text style={styles.selectionTickText}>✓</Text>
          </View>
        )}
        <Text style={styles.artistName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleDone = () => {
    console.log("Selected Artists:", selectedArtists);
    if (selectedArtists.length === 0) {
      navigation.goBack();
      return;
    } else {
      selectedArtists?.forEach((artist) => {
        const artistId = artist.id;
        const playlistId = artist.playlistId;
        const name = artist.name;
        const thumbnail = artist.thumbnailM;
        addArtistIntoUserLibrary(
          artistId,
          playlistId,
          name,
          thumbnail,
          userInfo,
          setUserInfo
        );
      });
      navigation.navigate("LibraryHome", { selectedArtists });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Choose more artists you like.</Text>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="black"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
        />
      </View>

      <FlatList
        data={artistData ? artistData.items : []}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        numColumns={3}
      />

      <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 25,
  },
  headerText: {
    color: "white",
    fontSize: 28,
    marginBottom: 8,
    fontWeight: "bold",
  },
  searchInput: {
    minHeight: 40,
    backgroundColor: "white",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    fontSize: 16,
  },
  listContainer: {
    marginTop: 16,
  },
  itemContainer: {
    marginBottom: 16,
    flex: 1 / 3,
  },
  artistContainer: {
    alignItems: "center",
  },
  artistImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  artistName: {
    color: "#fff",
    fontSize: 14,
  },
  selectionTick: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "white",
    borderRadius: 25,
    padding: 5,
  },
  selectionTickText: {
    color: "black",
    fontSize: 12,
  },
  doneButton: {
    backgroundColor: "white",
    padding: 10,
    alignItems: "center",
    borderRadius: 8,
    marginTop: 16,
    width: "50%", // Adjusted width
    alignSelf: "center", // Centered the button
    marginBottom: 40,
    borderRadius: 20,
  },
  doneButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 18,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    minHeight: 40,
    fontSize: 16,
  },
});

export default ArtistListScreen;
