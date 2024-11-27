import { TextInput, View } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchValue } from "../../store/searchSlice";
import { TouchableOpacity } from "react-native";
import IonIcons from "@expo/vector-icons/Ionicons";

export default function HeaderSearch() {
  const value = useSelector((state) => state.search.value);
  const dispatch = useDispatch();
  const handleChangeText = (text) => {
    setShow(true);
    dispatch(setSearchValue(text));
  };
  const [show, setShow] = React.useState(false);
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <TextInput
        onChangeText={(text) => handleChangeText(text)}
        value={value}
        placeholder="What do you want to listen to?"
        placeholderTextColor="#fff"
        autoFocus={true} // Ensure this is set to true
        style={{
          width: 400,
          height: 40,
          paddingRight: 20,
          color: "#ccc",
          borderWidth: 0,
          outlineStyle: "none",
        }}
      />
      {show && (
        <TouchableOpacity
          onPress={() => {
            setShow(false);
            dispatch(setSearchValue(""));
          }}
          style={{
            width: 20,
            height: 20,
            color: "#fff",
            marginLeft: 100,
          }}
        >
          <IonIcons name="close" size={20} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
}
