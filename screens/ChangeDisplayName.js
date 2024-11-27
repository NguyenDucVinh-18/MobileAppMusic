import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import { useAuth } from "../context/auth-context";
import { auth } from "../components/firebase";
import { updateProfile } from "firebase/auth";

export default function ChangeDisplayName() {
  const { userInfo, setUserInfo } = useAuth();
  console.log("ChangeDisplayName ~ userInfo:", userInfo);
  const [displayName, setDisplayName] = React.useState("");
  const handleChangeDisplayName = async () => {
    if (displayName.length === 0) {
      Alert.alert("Error", "Display name cannot be empty");
      return;
    } else {
      await updateProfile(auth.currentUser, {
        userName: displayName,
      });
      setUserInfo((prevState) => ({
        ...prevState,
        userName: displayName,
      }));
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change your display name</Text>
      <TextInput
        style={styles.input}
        defaultValue={userInfo.displayName}
        onChangeText={setDisplayName}
        placeholder="Display name"
      ></TextInput>
      <Pressable
        onPress={() => handleChangeDisplayName()}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Complete</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#191414", // Spotify's dark background color
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 20,
  },
  title: {
    color: "#1DB954", // Spotify's green color
    fontSize: 30,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    borderColor: "#FFFFFF",
    borderWidth: 1,
    fontSize: 20,
    fontWeight: "500",
  },
  button: {
    width: 100,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#1DB954", // Spotify's green color
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "500",
  },
});
