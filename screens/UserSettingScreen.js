import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Toggle from "../components/Toggle";
import { useAuth } from "../context/auth-context";
import { auth } from "../components/firebase";
import { TouchableOpacity } from "react-native";

export default function UserSettingScreen({ navigation }) {
  const { userInfo, setUserInfo } = useAuth();
  console.log("UserSettingScreen ~ userInfo:", userInfo);
  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUserInfo(null);
      navigation.navigate("Start");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
        }}
      >
        <Text style={{ color: "white", fontSize: 24, fontWeight: 700 }}>
          Free Account
        </Text>
        <Pressable
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 250,
            height: 60,
            backgroundColor: "white",
            borderRadius: 9999,
          }}
        >
          <Text
            style={{
              color: "black",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            Subscribe to Premium
          </Text>
        </Pressable>
      </View>
      <View style={{ marginTop: 40, gap: 10 }}>
        <Text style={{ color: "white", fontSize: 20, fontWeight: 700 }}>
          Account
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("ChangeDisplayName")}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: 500,
            }}
          >
            Account Name
          </Text>
          <Text
            style={{
              color: "#ccc",
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            {userInfo?.userName || "undefined"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ChangePassword")}>
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: 500,
            }}
          >
            Email
          </Text>
          <Text
            style={{
              color: "#ccc",
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            {userInfo?.email || "undefined"}
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: 700,
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          Data Saver Mode
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 30,
          }}
        >
          <View style={{ flex: 3 }}>
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: 500,
              }}
            >
              Save Data
            </Text>
            <Text
              style={{
                color: "#ccc",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              Set audio quality to low, hide Canvas, and disable audio and video
              previews on the homepage
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Toggle></Toggle>
          </View>
        </View>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: 700,
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          Video Podcasts
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 30,
          }}
        >
          <View style={{ flex: 3 }}>
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: 500,
              }}
            >
              Audio-Only Downloads
            </Text>
            <Text
              style={{
                color: "#ccc",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              Save video podcasts as audio only
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Toggle></Toggle>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 30,
          }}
        >
          <View style={{ flex: 3 }}>
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: 500,
              }}
            >
              Audio-Only Streaming
            </Text>
            <Text
              style={{
                color: "#ccc",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              Stream video podcasts as audio when not on Wi-Fi
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Toggle></Toggle>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 30,
          }}
        >
          <View style={{ flex: 3 }}>
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: 500,
              }}
            >
              Content Preferences
            </Text>
            <Text
              style={{
                color: "#ccc",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              Enable to play sensitive content. Pornographic content will be
              marked
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 5,
                  backgroundColor: "gray",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "black" }}>E</Text>
              </View>
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Toggle></Toggle>
          </View>
        </View>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: 700,
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          Playback
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 30,
          }}
        >
          <View style={{ flex: 3 }}>
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: 500,
              }}
            >
              Skip Songs
            </Text>
            <Text
              style={{
                color: "#ccc",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              Allows you to skip between songs
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Toggle></Toggle>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 30,
          }}
        >
          <View style={{ flex: 3 }}>
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: 500,
              }}
            >
              Continuous Playback
            </Text>
            <Text
              style={{
                color: "#ccc",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              Enable continuous playback
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Toggle></Toggle>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 30,
          }}
        >
          <View style={{ flex: 3 }}>
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: 500,
              }}
            >
              Auto-Mix
            </Text>
            <Text
              style={{
                color: "#ccc",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              Allows smooth transition between songs in curated playlists
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Toggle></Toggle>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 30,
          }}
        >
          <View style={{ flex: 3 }}>
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: 500,
              }}
            >
              Show Unplayable Songs
            </Text>
            <Text
              style={{
                color: "#ccc",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              Display songs that cannot be played
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Toggle></Toggle>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Pressable onPress={handleLogout}>
            <Text style={{ color: "white", fontSize: 22, fontWeight: 500 }}>
              Log out
            </Text>
          </Pressable>
        </View>
        <Pressable
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 100,
            height: 20,
            backgroundColor: "white",
            borderRadius: 9999,
          }}
        ></Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
});
