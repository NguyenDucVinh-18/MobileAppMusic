import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View, // Correctly importing View from react-native
} from "react-native";
import React from "react";
import { zingmp3Api } from "../apis/constants";
import Header from "../modules/Search/Header";
import { useDispatch } from "react-redux";
import { setCurrentProgress, setIsPlaying } from "../store/playerSlice";
import { TouchableOpacity } from "react-native";
import IonIcons from "@expo/vector-icons/Ionicons";
import GenreCard from "../modules/Search/GenreCard";

const data = [
  {
    id: 1,
    title: "New Releases",
    color: "#9854b2",
    api: zingmp3Api.getNewSong(),
  },
  {
    id: 2,
    title: "Radio",
    color: "#678026",
    api: zingmp3Api.getRadioPage(),
  },
  {
    id: 3,
    title: "V-Pop",
    color: "#3371e4",
    api: zingmp3Api.getHubDetail("IWZ9Z087"),
  },
  {
    id: 4,
    title: "Dance/Electronic",
    color: "#cf4321",
    api: zingmp3Api.getHubDetail("IWZ9Z08B"),
  },
  {
    id: 5,
    title: "K-Pop",
    color: "#abbb6d",
    api: zingmp3Api.getHubDetail("IWZ9Z08U"),
  },
  {
    id: 6,
    title: "US-UK",
    color: "#8768a7",
    api: zingmp3Api.getHubDetail("IWZ9Z086"),
  },
  {
    id: 7,
    title: "C-Pop",
    color: "#F037A5",
    api: zingmp3Api.getHubDetail("IWZ9Z08Z"),
  },
  {
    id: 8,
    title: "Bolero",
    color: "#223160",
    api: zingmp3Api.getHubDetail("IWZ9Z09U"),
  },
  {
    id: 9,
    title: "Children's",
    color: "brown",
    api: zingmp3Api.getHubDetail("IWZ9Z090"),
  },
  {
    id: 10,
    title: "Jazz",
    color: "#148A08",
    api: zingmp3Api.getHubDetail("IWZ9Z0AB"),
  },
  {
    id: 11,
    title: "Latin",
    color: "#F037A5",
    api: zingmp3Api.getHubDetail("IWZ9Z08F"),
  },
  {
    id: 12,
    title: "Classical",
    color: "#FDBB2C",
    api: zingmp3Api.getHubDetail("IWZ9Z0C9"),
  },
  {
    id: 13,
    title: "Hip Hop",
    color: "#1DB954",
    api: zingmp3Api.getHubDetail("IWZ9Z08C"),
  },
  {
    id: 14,
    title: "Remix",
    color: "#1DB954",
    api: zingmp3Api.getHubDetail("IWZ9Z0BO"),
  },
];

const genres = [
  {
    id: "1",
    name: "#V-pop",
    video:
      "https://video-previews.elements.envatousercontent.com/f205a671-b632-4717-a7c5-2ccbae5b7e71/watermarked_preview/watermarked_preview.mp4",
    poster:
      "https://photo-resize-zmp3.zmdcdn.me/w600_r300x169_jpeg/thumb_video/8/0/1/c/801c0a9f296fd140a40f94ba3eae5e35.jpg",
  },
  {
    id: "2",
    name: "#Love Song",
    video:
      "https://video-previews.elements.envatousercontent.com/fb699b79-8287-4a99-9b78-ee74dd1a4699/watermarked_preview/watermarked_preview.mp4",

    poster:
      "https://photo-resize-zmp3.zmdcdn.me/w600_r300x169_jpeg/thumb_video/8/0/1/c/801c0a9f296fd140a40f94ba3eae5e35.jpg",
  },
  {
    id: "3",
    name: "#Hip-Hop",
    video:
      "https://video-previews.elements.envatousercontent.com/h264-video-previews/f09f4f6e-f443-41a0-baf9-925dbe75813c/21965034.mp4",
    poster:
      "https://photo-resize-zmp3.zmdcdn.me/w600_r300x169_jpeg/thumb_video/8/0/1/c/801c0a9f296fd140a40f94ba3eae5e35.jpg",
  },
];

export default function SearchScreen({ navigation }) {
  const dispatch = useDispatch();
  return (
    <FlatList
      style={styles.container}
      data={data}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      ListHeaderComponent={
        <>
          <View style={styles.stickyContainer}>
            <Header title={"Search"} navigation={navigation} />
            <TouchableOpacity
              onPress={() => navigation.navigate("SearchView")}
              style={styles.searchInput}
            >
              <IonIcons name="search" size={20} color="#ccc" />
              <Text style={styles.searchText}>
                What do you want to listen to?
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.browseText}>Explore your genres</Text>
          <View
            style={{
              flexDirection: "row",
              height: 200,
              gap: 10,
              marginBottom: 15,
            }}
          >
            <GenreCard genre={genres[0]} />
            <GenreCard genre={genres[1]} />
            <GenreCard genre={genres[2]} />
          </View>
          <Text style={styles.browseText}>Browse All</Text>
        </>
      }
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            dispatch(setIsPlaying(false));
            dispatch(setCurrentProgress(0));
            navigation.navigate("CategoryDetail", { item });
          }}
          style={[styles.item, { backgroundColor: item.color }]}
        >
          <Text ellipsizeMode="tail" numberOfLines={1} style={styles.itemText}>
            {item.title}
          </Text>
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.contentContainer}
      ListFooterComponent={<View style={{ height: 100 }}></View>}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
    paddingTop: 40,
    paddingLeft: 16,
    paddingRight: 16,
  },
  stickyContainer: {
    position: "sticky", // Positioning to make it stick to top
    top: 0, // Keep it at the top of the screen
    zIndex: 1, // Ensure it stays above other content
    backgroundColor: "#000", // Background color matching the screen
    paddingBottom: 10,
  },
  searchInput: {
    width: "100%",
    height: 44,
    backgroundColor: "white",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 16,
    gap: 8,
    marginBottom: 20,
  },
  searchText: {
    fontSize: 16,
    fontWeight: "400",
    color: "black",
  },
  browseText: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 35,
    color: "white",
  },
  contentContainer: {
    marginBottom: 80,
  },
  columnWrapper: {
    marginRight: 16,
    marginLeft: 8,
  },
  item: {
    width: 164,
    height: 92,
    borderRadius: 8,
    marginBottom: 16,
    paddingLeft: 16,
    marginRight: 16,
  },
  itemText: {
    marginTop: 15,
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "700",
    color: "white",
  },
});
