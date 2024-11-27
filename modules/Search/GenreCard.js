import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Video } from "expo-av";

const GenreCard = ({ genre }) => (
  <View style={styles.card}>
    <Video
      source={{ uri: genre.video }}
      style={{
        width: "100%",
        height: "100%", // Chiều cao chiếm toàn bộ màn hình
      }}
      resizeMode="cover" // Để video lấp đầy màn hình
      shouldPlay={true}
      volume={0}
      isLooping={true}
      positionMillis={60000}
      posterSource={{ uri: genre.poster }}
    />
    <Text style={styles.hashtag}>{genre.name}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    height: 200, // Đảm bảo chiều cao đủ lớn cho video
    width: "30 %", // Sử dụng toàn bộ chiều rộng của màn hình
    overflow: "hidden",
    borderRadius: 8,
  },
  video: {
    resizeMode: "stretch", // Sử dụng 'stretch' để video kéo dài
    borderRadius: 8,
    height: "100%", // Sử dụng toàn bộ chiều cao của thẻ
    width: "100%", // Sử dụng toàn bộ chiều rộng của thẻ
  },
  hashtag: {
    position: "absolute",
    bottom: 10,
    left: 10,
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    paddingHorizontal: 5,
    borderRadius: 5,
  },
});

export default GenreCard;
