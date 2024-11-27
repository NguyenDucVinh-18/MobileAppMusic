import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import Swiper from "react-native-swiper/src";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentProgress,
  setCurrentSongIndex,
  setIsPlaying,
  setPlaylist,
} from "../../store/playerSlice";
import PlaylistHeader from "./PlaylistHeader";
import ListMusics from "./ListMusics";

export default function Hub({ data, navigation }) {
  const itemData = data?.sections?.slice(0, 2);
  if (!itemData) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }
  const dispatch = useDispatch();
  if (itemData[1]?.items) {
    dispatch(setPlaylist(itemData[1]?.items));
    dispatch(setCurrentProgress(0));
    dispatch(setCurrentSongIndex(0));
  }

  return (
    <ScrollView style={styles.container}>
      <PlaylistHeader data={data} type="hub" />
      <View style={{ marginBottom: 10 }}>
        <View>
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: 700,
              marginTop: 20,
              textTransform: "capitalize",
            }}
          >
            Trending
          </Text>
          <Swiper
            style={{ height: 200, marginTop: 10 }}
            showsPagination={false}
          >
            {itemData[0]?.items.map((item, index) => {
              return (
                <Pressable
                  onPress={() => {
                    dispatch(setIsPlaying(false));
                    dispatch(setCurrentProgress(0));
                    dispatch(setCurrentSongIndex(0));
                    navigation.navigate("PlayList", {
                      id: item.encodeId,
                    });
                  }}
                  key={index}
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={{ uri: item.thumbnailM }}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 8,
                      resizeMode: "contain",
                    }}
                  ></Image>
                </Pressable>
              );
            })}
          </Swiper>
        </View>
      </View>
      <View style={{ marginBottom: 80 }}>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: 700,
            marginTop: 20,
            textTransform: "capitalize",
          }}
        >
          {itemData[1]?.title}
        </Text>
        <ListMusics data={itemData[1]} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    flex: 1,
    paddingTop: 40,
    paddingLeft: 16,
    paddingRight: 16,
    overflow: "scroll",
  },
});
