import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { useAuth } from "../context/auth-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../components/firebase";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
export default function ChangePassword() {
  const { userInfo, setUserInfo } = useAuth();
  const [togglePassword, setTogglePassword] = React.useState(false);
  const [toggleNewPassword, setToggleNewPassword] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [errorPassword, setErrorPassword] = React.useState("");
  const [errorNewPassword, setErrorNewPassword] = React.useState("");
  const handleChangePassword = async () => {
    if (password !== userInfo.password) {
      setErrorPassword("Password is incorrect");
      setErrorNewPassword("");
      return;
    } else {
      if (newPassword === "") {
        setErrorNewPassword("New password cannot be empty");
        setErrorPassword("");
        return;
      } else if (newPassword === password) {
        setErrorNewPassword(
          "New password cannot be the same as the current password"
        );
        setErrorPassword("");
        return;
      } else if (
        newPassword.match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        ) === null
      ) {
        setErrorNewPassword(
          "New password must be at least 8 characters, including uppercase letters, lowercase letters, numbers, and special characters"
        );
        setErrorPassword("");
        return;
      } else {
        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(user?.email, password);
        await reauthenticateWithCredential(auth.currentUser, credential);
        await updatePassword(auth.currentUser, newPassword);
        await setDoc(
          doc(db, "users", auth.currentUser.uid),
          {
            password: newPassword,
          },
          { merge: true }
        );
        // Update password in userInfo
        setUserInfo({
          ...userInfo,
          password: newPassword,
        });
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Text style={{ color: "white", fontSize: 40, fontWeight: 700 }}>
          Change your password
        </Text>
      </View>
      <View style={{ gap: 10, marginBottom: 10 }}>
        <Text style={{ color: "white", fontSize: 18, fontWeight: 700 }}>
          Email address
        </Text>
        <TextInput
          style={{
            width: "100%",
            padding: 10,
            backgroundColor: "#333333",
            fontSize: 20,
            fontWeight: 500,
            color: "white",
            border: "none",
            outline: "none",
          }}
          value={userInfo.email}
        ></TextInput>
      </View>
      <View style={{ gap: 10, marginBottom: 10 }}>
        <Text style={{ color: "white", fontSize: 18, fontWeight: 700 }}>
          Current password
        </Text>
        <TextInput
          placeholder="Nhập mật khẩu hiện tại"
          style={{
            width: "100%",
            padding: 10,
            backgroundColor: "#333333",
            fontSize: 20,
            fontWeight: 500,
            color: "white",
            border: "none",
            outline: "none",
          }}
          secureTextEntry={!togglePassword ? true : false}
          onChangeText={(text) => setPassword(text)}
        ></TextInput>
        {togglePassword ? (
          <Ionicons
            name="eye"
            size={24}
            color="white"
            onPress={() => {
              setTogglePassword(false);
            }}
          ></Ionicons>
        ) : (
          <Ionicons
            name="eye-off"
            size={24}
            color="white"
            onPress={() => {
              setTogglePassword(true);
            }}
          ></Ionicons>
        )}
      </View>
      {errorPassword && (
        <Text style={styles.errorMessage}>{errorPassword}</Text>
      )}
      <View style={{ gap: 10, marginBottom: 10 }}>
        <Text style={{ color: "white", fontSize: 18, fontWeight: 700 }}>
          New password
        </Text>
        <TextInput
          placeholder="Enter new password"
          style={{
            width: "100%",
            padding: 10,
            backgroundColor: "#333333",
            fontSize: 20,
            fontWeight: 500,
            color: "white",
            border: "none",
            outline: "none",
          }}
          secureTextEntry={!toggleNewPassword ? true : false}
          onChangeText={(text) => setNewPassword(text)}
        ></TextInput>
        {toggleNewPassword ? (
          <Ionicons
            name="eye"
            size={24}
            color="white"
            onPress={() => {
              setToggleNewPassword(false);
            }}
          ></Ionicons>
        ) : (
          <Ionicons
            name="eye-off"
            size={24}
            color="white"
            style={styles.icon}
            onPress={() => {
              setToggleNewPassword(true);
            }}
          ></Ionicons>
        )}
      </View>
      {errorNewPassword && (
        <Text style={styles.errorMessage}>{errorNewPassword}</Text>
      )}
      <Pressable
        onPress={handleChangePassword}
        style={{
          width: "100%",
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F62682",
          borderRadius: 9999,
        }}
      >
        <Text style={{ color: "white", fontSize: 20, fontWeight: 700 }}>
          Save
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    gap: 20,
    padding: 20,
  },
  icon: {
    width: "20px",
    height: "20px",
    color: "white",
    position: "absolute",
    top: "62%",
    right: "15px",
  },
  errorMessage: {
    color: "red",
    fontSize: "14px",
    fontWeight: "bold",
    marginTop: 5,
  },
});
