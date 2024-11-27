import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Checkbox from "expo-checkbox"; // Importing Expo's Checkbox component
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { auth, db } from "../components/firebase";
import { setDoc, doc } from "firebase/firestore";

const SignUpScreen2 = ({ route, navigation }) => {
  const { email, password } = route.params;
  const [userName, setUserName] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [isCheckedNews, setIsCheckedNews] = useState(false);
  const [isCheckedMarketing, setIsCheckedMarketing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async () => {
    try {
      // Check if the email is already registered
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);

      if (signInMethods.length > 0) {
        setErrorMessage("This email is already registered.");
        return false;
      } else setErrorMessage("You'll need to confirm this email later.");

      // else Create a new user
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          userName: userName,
          gender: selectedGender,
          avatar: "https://cdn-icons-png.flaticon.com/512/6997/6997494.png",
        });
      }
      console.log("User: ", user);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const handleClickCreateAccount = async () => {
    if (handleRegister()) navigation.navigate("ChooseArtistScreen");
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, backgroundColor: "#121212", padding: 20 }}>
        {/* Email field */}
        <Text style={styles.PrimaryLabel}>What's your name?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputPass}
            value={userName}
            onChangeText={setUserName}
          />
          <Text style={styles.label}>{errorMessage}</Text>
        </View>

        <Text style={styles.PrimaryLabel}>What's your gender?</Text>
        <View style={styles.inputContainer}>
          <Picker
            selectedValue={selectedGender}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedGender(itemValue)
            }
          >
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Other" value="other" />
          </Picker>
        </View>
        {/* Divider */}
        <View style={styles.divider} />

        <View style={styles.containerTerm}>
          {/* Terms of Use Text */}
          <Text style={styles.termsText}>
            By tapping on "Create account", you agree to the spotify Terms of
            Use.
          </Text>

          <TouchableOpacity>
            <Text style={styles.linkText}>Terms of Use</Text>
          </TouchableOpacity>

          <Text style={styles.privacyText}>
            To learn more about how Spotify collects, uses, shares and protects
            your personal data, Please see the Spotify Privacy Policy.
          </Text>

          <TouchableOpacity>
            <Text style={styles.linkText}>Privacy Policy</Text>
          </TouchableOpacity>

          <View style={styles.checkboxContainer}>
            <Text style={styles.checkboxLabel}>
              Please send me news and offers from Spotify.
            </Text>
            <Checkbox
              value={isCheckedNews}
              onValueChange={setIsCheckedNews}
              color={isCheckedNews ? "#1DB954" : undefined} // Custom color when checked
            />
          </View>

          <View style={styles.checkboxContainer}>
            <Text style={styles.checkboxLabel}>
              Share my registration data with Spotify's content.
            </Text>
            <Checkbox
              value={isCheckedMarketing}
              onValueChange={setIsCheckedMarketing}
              color={isCheckedMarketing ? "#1DB954" : undefined} // Custom color when checked
            />
          </View>
        </View>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }}
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
            onPress={handleClickCreateAccount}
          >
            <Text style={[styles.PrimaryLabel, { color: "#000" }]}>
              Create an account
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
    justifyContent: "center",
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
    fontSize: 11,
    marginBottom: 5,
    color: "#fff",
  },
  picker: {
    height: 50,
    width: "100%",
    color: "#fff",
  },
  termsText: {
    color: "#fff",
    marginBottom: 10,
    fontSize: 11,
    textAlign: "justify",
    fontWeight: "bold",
  },
  privacyText: {
    color: "#fff",
    marginBottom: 10,
    fontSize: 11,
    textAlign: "justify",
    fontWeight: "bold",
  },
  linkText: {
    color: "#1DB954",
    marginBottom: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  checkboxLabel: {
    color: "#fff",
    fontSize: 12,
    marginLeft: 10,
    textAlign: "left",
    fontWeight: "bold",
  },
  containerTerm: {
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: "#7777",
    marginVertical: 20,
  },
});

export default SignUpScreen2;
