import React from "react";
import { ImageBackground, TouchableOpacity } from "react-native";
import { View, Text, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const StartScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../assets/images/cover.png")}
        style={{
          flex: 1.5,
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
          position: "relative",
        }}
      >
        <View
          style={{ alignItems: "center", position: "absolute", bottom: -100 }}
        >
          <Image
            source={require("../assets/images/logo.png")}
            style={{
              width: 50,
              height: 50,
            }}
          />
          <Text style={styles.title}>Milions of songs.</Text>
          <Text style={styles.title}>Free on Spotify.</Text>
        </View>
      </ImageBackground>
      <View style={{ flex: 0.7, alignItems: "center" }}></View>

      <View style={styles.buttnGroup}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#1ED760" }]}
          onPress={() => navigation.navigate("SignUpScreen1")}
        >
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Sign up free</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: "#000",
            },
          ]}
        >
          <Image
            source={require("../assets/images/logoGg.png")}
            style={{
              width: 20,
              height: 20,
              position: "absolute",
              left: "6%",
            }}
          />
          <Text style={styles.btnText}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: "#000" }]}>
          <Image
            source={require("../assets/images/logoFb.png")}
            style={{
              width: 20,
              height: 20,
              position: "absolute",
              left: "6%",
            }}
          />
          <Text style={styles.btnText}>Continue with Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: "#000" }]}>
          <Image
            source={require("../assets/images/logoApple.png")}
            style={{
              width: 20,
              height: 20,
              position: "absolute",
              left: "6%",
            }}
          />
          <Text style={styles.btnText}>Continue with Apple</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#000", borderWidth: 0 }]}
          onPress={() => navigation.navigate("LogInScreen")}
        >
          <Text style={styles.btnText}>Log in</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
  buttnGroup: { flex: 2, alignItems: "center", margin: "10%" },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 10,
    borderRadius: 30,
    width: "100%",
    borderWidth: 1,
    borderColor: "#fff",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default StartScreen;
