import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/auth-context";
import { useDispatch } from "react-redux";
import Header from "../modules/Search/Header";
import {
  setCurrentProgress,
  setIsPlaying,
  setShowSubPlayer,
} from "../store/playerSlice";
import removeArtistFromUserLibrary from "../utils/removeArtistFromUserLibrary";
import removeMyPlayListFromUserLibrary from "../utils/removeMyPlayListFromUserLibrary";
import removeMyPlaylistSongFromUserLibrary from "../utils/removeMyPlaylistSongFromUserLibrary";
import removePlaylistFromUserLibrary from "../utils/removePlaylistfromUserLibrary";

const LibraryScreen = ({ route, navigation }) => {
  const { userInfo, setUserInfo } = useAuth();
  const [selectedArtists, setSelectedArtists] = useState(
    userInfo?.Artist || []
  );

  const [playlist, setPlaylist] = useState(userInfo?.Playlist || []);
  const [myPlaylist, setMyPlaylist] = useState(userInfo?.MyPlaylist);
  const dispatch = useDispatch();
  console.log("userInfo", userInfo);
  const [filterType, setFilterType] = useState("All");
  const sections = [
    {
      id: "1",
      title: "Liked Songs",
      type: "Playlist",
      icon: "heart",
      color: "#1DB954",
    },
  ];

  useEffect(() => {
    setSelectedArtists(userInfo?.Artist || []);
  }, [userInfo]);

  const renderLibraryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.libraryItem}
      onPress={() => handleLibraryItemPress(item)} // Navigate to ProfileScreen with item data
    >
      <View style={styles.iconContainer}>
        {item.icon ? (
          <Ionicons name={item.icon} size={24} color={item.color} />
        ) : (
          <Image source={{ uri: item.image }} style={styles.libraryImage} />
        )}
      </View>
      <View style={styles.libraryTextContainer}>
        <Text style={styles.libraryTitle}>{item.title}</Text>
        <Text style={styles.librarySubtitle}>
          {item.type} {item.songs ? `- ${item.songs}` : ""}
          {item.updated ? ` - ${item.updated}` : ""}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const addMusic = () => {
    navigation.navigate("ArtistListScreen", {
      selectedArtists: selectedArtists,
    });
  };

  const handleLibraryItemPress = (item) => {
    if (item.type === "Artist") {
      navigation.navigate("ArtistPage", { item });
    } else if (item.title === "Liked Songs") {
      dispatch(setIsPlaying(false));
      dispatch(setCurrentProgress(0));
      navigation.navigate("LikedSongScreen", {
        type: "liked",
      });
    }
  };

  const navigateToArtistPage = (artist) => {
    console.log(artist);
    navigation.navigate("ArtistPage", { id: artist.playlistId });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Header title="Your Library" navigation={navigation} />
        {/* <Text style={styles.headerTitle}>Your Library</Text> */}
        <TouchableOpacity
          onPress={() => navigation.navigate("CreatePlaylistScreen")}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filterType === "All" && styles.activeFilterButton, // Highlight if active
          ]}
          onPress={() => setFilterType("All")}
        >
          <Text
            style={[
              styles.filterText,
              filterType === "All" && styles.activeFilterText, // Highlight text if active
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filterType === "Playlist" && styles.activeFilterButton, // Highlight if active
          ]}
          onPress={() => setFilterType("Playlist")}
        >
          <Text
            style={[
              styles.filterText,
              filterType === "Playlist" && styles.activeFilterText, // Highlight text if active
            ]}
          >
            Playlists
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filterType === "Artist" && styles.activeFilterButton, // Highlight if active
          ]}
          onPress={() => setFilterType("Artist")}
        >
          <Text
            style={[
              styles.filterText,
              filterType === "Artist" && styles.activeFilterText, // Highlight text if active
            ]}
          >
            Artists
          </Text>
        </TouchableOpacity>
      </View>
      {/* Combined Scrollable List */}
      <ScrollView contentContainerStyle={styles.libraryList}>
        {filterType === "All" && (
          <>
            <FlatList
              data={sections}
              renderItem={renderLibraryItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
            <FlatList
              data={myPlaylist}
              ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
              renderItem={({ item }) => {
                const playlistSong = userInfo?.MyPlaylistSongs?.find(
                  (playlist) => playlist.playlistId === item.playlistId
                );
                const uri = playlistSong
                  ? playlistSong.song.thumbnailM
                  : item.thumbnail;
                return (
                  <TouchableOpacity
                    style={styles.libraryItem}
                    onPress={() => {
                      dispatch(setIsPlaying(false));
                      dispatch(setCurrentProgress(0));
                      navigation.navigate("PlayList", {
                        MyPlaylistId: item.playlistId,
                      });
                    }}
                  >
                    <Image
                      source={{ uri: uri }}
                      style={styles.playlistItemImage}
                    />
                    <View style={styles.itemTextContainer}>
                      <Text
                        style={styles.libraryTitle}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {item.name}
                      </Text>
                      <Text style={styles.librarySubtitle}>Playlist</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        var songs = userInfo.MyPlaylistSongs.filter(
                          (songPlaylist) =>
                            item.playlistId === songPlaylist.playlistId
                        );

                        removeMyPlayListFromUserLibrary(
                          item.playlistId,
                          userInfo,
                          setUserInfo
                        );
                        songs.forEach((song) => {
                          removeMyPlaylistSongFromUserLibrary(
                            item.playlistId,
                            song.song.encodeId,
                            userInfo,
                            setUserInfo,
                            true
                          );
                        });

                        var newMyPlaylist = myPlaylist.filter(
                          (playlist) => playlist.playlistId !== item.playlistId
                        );

                        setMyPlaylist(newMyPlaylist);
                      }}
                    >
                      <Ionicons
                        name="remove-circle-outline"
                        size={24}
                        color="#fff"
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item) => item.playlistId}
              scrollEnabled={false}
            />

            <FlatList
              data={playlist}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.libraryItem}
                  onPress={() =>
                    navigation.navigate("PlayList", {
                      id: item.playlistId,
                    })
                  }
                >
                  <Image
                    source={{ uri: item?.thumbnail }}
                    style={styles.playlistItemImage}
                  />
                  <View style={styles.itemTextContainer}>
                    <Text style={styles.libraryTitle}>{item?.name}</Text>
                    <Text style={styles.librarySubtitle}>Playlist</Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => {
                      const newPlaylist = playlist.filter((currentPlaylist) => {
                        return currentPlaylist.playlistId !== item.playlistId;
                      });
                      setPlaylist(newPlaylist);
                      removePlaylistFromUserLibrary(
                        item.playlistId,
                        userInfo,
                        setUserInfo
                      );
                    }}
                  >
                    <Ionicons
                      name="remove-circle-outline"
                      size={24}
                      color="#fff"
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item?.playlistId}
              ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
              scrollEnabled={false}
            />
            <FlatList
              data={selectedArtists}
              ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.libraryItem}
                  onPress={() => navigateToArtistPage(item)}
                >
                  <Image
                    source={{ uri: item.thumbnail }}
                    style={styles.musicItemImage}
                  />
                  <View style={styles.itemTextContainer}>
                    <Text style={styles.libraryTitle}>{item.name}</Text>
                    <Text style={styles.librarySubtitle}>Artist</Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => {
                      const newSelectedArtists = selectedArtists.filter(
                        (artist) => {
                          return artist.artistId !== item.artistId;
                        }
                      );
                      setSelectedArtists(newSelectedArtists);
                      removeArtistFromUserLibrary(
                        item.artistId,
                        userInfo,
                        setUserInfo
                      );
                    }}
                  >
                    <Ionicons
                      name="remove-circle-outline"
                      size={24}
                      color="#fff"
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </>
        )}

        {filterType === "Playlist" && (
          <>
            <FlatList
              data={sections}
              renderItem={renderLibraryItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
            <FlatList
              data={myPlaylist}
              ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
              renderItem={({ item }) => {
                const playlistSong = userInfo?.MyPlaylistSongs?.find(
                  (playlist) => playlist.playlistId === item.playlistId
                );
                const uri = playlistSong
                  ? playlistSong.song.thumbnailM
                  : item.thumbnail;
                return (
                  <TouchableOpacity
                    style={styles.libraryItem}
                    onPress={() => {
                      dispatch(setIsPlaying(false));
                      dispatch(setCurrentProgress(0));
                      navigation.navigate("PlayList", {
                        MyPlaylistId: item.playlistId,
                      });
                    }}
                  >
                    <Image
                      source={{ uri: uri }}
                      style={styles.playlistItemImage}
                    />
                    <View style={styles.itemTextContainer}>
                      <Text
                        style={styles.libraryTitle}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {item.name}
                      </Text>
                      <Text style={styles.librarySubtitle}>Playlist</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        var songs = userInfo.MyPlaylistSongs.filter(
                          (songPlaylist) =>
                            item.playlistId === songPlaylist.playlistId
                        );

                        removeMyPlayListFromUserLibrary(
                          item.playlistId,
                          userInfo,
                          setUserInfo
                        );
                        songs.forEach((song) => {
                          removeMyPlaylistSongFromUserLibrary(
                            item.playlistId,
                            song.song.encodeId,
                            userInfo,
                            setUserInfo,
                            true
                          );
                        });

                        var newMyPlaylist = myPlaylist.filter(
                          (playlist) => playlist.playlistId !== item.playlistId
                        );

                        setMyPlaylist(newMyPlaylist);
                      }}
                    >
                      <Ionicons
                        name="remove-circle-outline"
                        size={24}
                        color="#fff"
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item) => item.playlistId}
              scrollEnabled={false}
            />
            <FlatList
              data={playlist}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.libraryItem}
                  onPress={() =>
                    navigation.navigate("PlayList", {
                      id: item.playlistId,
                    })
                  }
                >
                  <Image
                    source={{ uri: item?.thumbnail }}
                    style={styles.playlistItemImage}
                  />
                  <View style={styles.itemTextContainer}>
                    <Text style={styles.libraryTitle}>{item?.name}</Text>
                    <Text style={styles.librarySubtitle}>Playlist</Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => {
                      const newPlaylist = playlist.filter((currentPlaylist) => {
                        return currentPlaylist.playlistId !== item.playlistId;
                      });
                      setPlaylist(newPlaylist);
                      removePlaylistFromUserLibrary(
                        item.playlistId,
                        userInfo,
                        setUserInfo
                      );
                    }}
                  >
                    <Ionicons
                      name="remove-circle-outline"
                      size={24}
                      color="#fff"
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item?.playlistId}
              ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
              scrollEnabled={false}
            />
          </>
        )}

        {filterType === "Artist" && (
          <>
            <FlatList
              data={selectedArtists}
              ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.libraryItem}
                  onPress={() => navigateToArtistPage(item)}
                >
                  <Image
                    source={{ uri: item.thumbnail }}
                    style={styles.musicItemImage}
                  />
                  <View style={styles.itemTextContainer}>
                    <Text style={styles.libraryTitle}>{item.name}</Text>
                    <Text style={styles.librarySubtitle}>Artist</Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => {
                      const newSelectedArtists = selectedArtists.filter(
                        (artist) => {
                          return artist.artistId !== item.artistId;
                        }
                      );
                      setSelectedArtists(newSelectedArtists);
                      removeArtistFromUserLibrary(
                        item.artistId,
                        userInfo,
                        setUserInfo
                      );
                    }}
                  >
                    <Ionicons
                      name="remove-circle-outline"
                      size={24}
                      color="#fff"
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </>
        )}
      </ScrollView>

      <View style={{ height: 50 }} />

      <View style={styles.buttonsContainer}>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.addButton} onPress={addMusic}>
            <View style={styles.musicButtonCircle}>
              <Text style={{ fontSize: 36, color: "#fff" }}>+</Text>
            </View>
            <Text style={styles.addButtonLabel}>Add Artist</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 33,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#282828",
  },
  filterButton: {
    backgroundColor: "#333",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    margin: 5,
  },
  filterText: {
    color: "#fff",
    fontSize: 15,
  },
  libraryList: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  libraryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#282828",
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  libraryImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  libraryTextContainer: {
    flex: 1,
  },
  libraryTitle: {
    flexWrap: "wrap",
    width: 200,
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  librarySubtitle: {
    color: "#B0B0B0",
    fontSize: 14,
  },
  buttonsContainer: {
    position: "absolute",
    bottom: 50,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "column",
    height: 100,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  musicButtonCircle: {
    width: 50,
    height: 50,
    borderRadius: 33,
    backgroundColor: "#302C2C",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  addButtonLabel: {
    color: "#fff",
    fontSize: 14,
    marginLeft: 10,
    fontWeight: "bold",
  },
  musicItemImage: {
    width: 50,
    height: 50,
    borderRadius: 33,
  },
  itemTextContainer: {
    marginLeft: 8,
    minWidth: 280,
  },
  playlistItemImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  itemTextContainer: {
    marginLeft: 8,
    minWidth: 280,
  },
  itemTitle: {
    color: "#fff",
    fontSize: 18,
    marginTop: 8,
    textAlign: "left",
  },
  activeFilterButton: {
    backgroundColor: "#1fdf64", // Example highlight color
  },
  activeFilterText: {
    color: "black", // Example text color when active
  },
});

export default LibraryScreen;
