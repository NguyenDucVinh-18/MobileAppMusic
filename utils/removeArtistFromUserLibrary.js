import {
  arrayRemove,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../components/firebase";
import Toast from "react-native-toast-message";
import { ToastAndroid } from "react-native";

export default async function removeArtistFromUserLibrary(
  artistId,
  userInfo,
  setUserInfo
) {
  try {
    // Get a reference to the user's document in the 'users' collection
    const userId = auth.currentUser.uid;
    const userRef = doc(collection(db, "users"), userId);

    // Get the current state of the user's document
    const userDoc = await getDoc(userRef);

    // Check if the Artist array contains the artist
    const artist = userDoc
      .data()
      .Artist?.find((pl) => pl.artistId === artistId);
    if (!userDoc.exists() || !artist) {
      ToastAndroid.show(
        "Nghệ sĩ không tồn tại trong thư viện",
        ToastAndroid.SHORT
      );
      return;
    }

    // Update the user's document by removing the Artist from the Playlist array
    await updateDoc(userRef, {
      Artist: arrayRemove(artist),
    });

    // Update userInfo
    const newArtist = userInfo.Artist.filter((pl) => pl.artistId !== artistId);
    setUserInfo({
      ...userInfo,
      Artist: newArtist,
    });

    ToastAndroid.show(
      "Xóa nghệ sĩ khỏi thư viện thành công",
      ToastAndroid.SHORT
    );
  } catch (error) {
    console.log("error:", error);
    ToastAndroid.show("Xóa nghệ sĩ khỏi thư viện thất bại", ToastAndroid.SHORT);
  }
}
