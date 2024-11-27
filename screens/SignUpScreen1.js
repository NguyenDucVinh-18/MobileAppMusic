import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { db } from "../components/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const SignUpScreen1 = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const checkEmailExistence = async () => {
    try {
      console.log(email);
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setEmailMessage("This email is already registered.");
        return false;
      } else {
        setEmailMessage("You'll need to confirm this email later.");
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNext = async () => {
    const emailExists = await checkEmailExistence();
    const emailAndPasswordValid = checkPassword();
    if (emailExists && emailAndPasswordValid) {
      navigation.navigate("SignUpScreen2", {
        email: email,
        password: password,
      });
    }
  };

  const checkPassword = () => {
    const regexPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (regexPassword.test(password)) {
      setPasswordMessage("Password is valid.");
      return true;
    } else if (!regexPassword.test(password)) {
      setPasswordMessage(
        "Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters."
      );
      return false;
    }
    return true;
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, backgroundColor: "#121212", padding: 20 }}>
        {/* Email field */}
        <Text style={styles.PrimaryLabel}>What's your email?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputPass}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <Text style={styles.label}>{emailMessage}</Text>

        {/* Password field */}
        <Text style={styles.PrimaryLabel}>Create a password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputPass}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Feather
              name={showPassword ? "eye" : "eye-off"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.label}>{passwordMessage}</Text>

        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#ccc",
              borderRadius: 30,
              padding: 15,
              width: "100%",
              alignItems: "center",
            }}
            onPress={() => {
              handleNext(); // Call the validation function
            }}
          >
            <Text style={[styles.PrimaryLabel, { color: "#000" }]}>Next</Text>
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
  },
});

export default SignUpScreen1;
