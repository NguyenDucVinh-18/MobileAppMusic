import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const LogInNotPassScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, backgroundColor: "#121212", padding: 20 }}>
        {/* Email field */}
        <Text style={styles.PrimaryLabel}>Email or username</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputPass}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <Text style={styles.label}>
          You'll need to confirm this email later.
        </Text>

        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <TouchableOpacity
            // disabled={email.length || password.length < 8 ? true : false}
            style={{
              backgroundColor: "#ccc",
              borderRadius: 30,
              padding: 15,
              width: "100%",
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("SignUpScreen2")}
          >
            <Text style={[styles.PrimaryLabel, { color: "#000" }]}>
              Get link
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    backgroundColor: "#7777",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: "#7777",
  },
  inputPass: {
    flex: 1,
    height: 50,
    color: "#fff",
    fontSize: 22,
  },
  PrimaryLabel: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  label: {
    fontSize: 12,
    marginBottom: 5,
    color: "#fff", // Optional: change color to gray
    // fontWeight: "bold",
  },
});

export default LogInNotPassScreen;
