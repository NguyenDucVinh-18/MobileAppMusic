import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; // For tab icons
import { View } from "react-native"; // Using View for SubPlayer container
import { useSelector } from "react-redux";
import SearchStack from "../stacks/SearchStack";
import HomeStack from "../stacks/HomeStack";
import LibraryStack from "../stacks/LibraryStack";
import SubPlayer from "../modules/Player/SubPlayer";
import TrackViewScreen from "../screens/TrackViewScreen";
import { useAuth } from "../context/auth-context";

const Tab = createBottomTabNavigator();

const TabNavigator = ({ navigation }) => {
  const showPlayer = useSelector((state) => state.player.showPlayer);
  const playerData = useSelector((state) => state.player.data);
  const showSubPlayer = useSelector((state) => state.player.showSubPlayer);
  const { userInfo } = useAuth();
  React.useEffect(() => {
    // Chỉ reset nếu chắc chắn user chưa đăng nhập
    if (userInfo === null) {
      navigation.reset({
        index: 0,
        routes: [{ name: "LogInScreen" }],
      });
    }
  }, [userInfo, navigation]);

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Search") {
              iconName = focused ? "search" : "search-outline";
            } else if (route.name === "Library") {
              iconName = focused ? "library" : "library-outline";
            }

            return (
              <Ionicons
                name={iconName}
                size={focused ? size + 5 : size}
                color={focused ? "#fff" : "#888"}
              />
            );
          },
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "#888",
          tabBarStyle: {
            backgroundColor: "#121212",
            borderTopWidth: 0,
            paddingBottom: 5,
            height: 46,
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Search"
          component={SearchStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Library"
          component={LibraryStack}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>

      {/* Display SubPlayer at the bottom when showSubPlayer is true */}
      {showSubPlayer && (
        <View
          style={{
            position: "absolute",
            bottom: 50, // Adjust to stay above the tab bar
            left: 0,
            right: 0,
            backgroundColor: "#121212",
            width: "100%",
            display: showSubPlayer ? "flex" : "none",
          }}
        >
          <SubPlayer data={playerData} />
        </View>
      )}

      {/* Display Player at the bottom when showPlayer is true */}
      {showPlayer && (
        <View
          style={{
            position: "absolute",
            width: "100%",
            backgroundColor: "#121212",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            display: showPlayer ? "flex" : "none",
          }}
        >
          <TrackViewScreen />
        </View>
      )}
    </>
  );
};

export default TabNavigator;
