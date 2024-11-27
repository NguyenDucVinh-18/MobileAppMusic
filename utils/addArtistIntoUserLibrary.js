import {
  collection,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { auth, db } from "../components/firebase";
import { ToastAndroid } from "react-native";

export default async function addArtistIntoUserLibrary(
  artistId,
  playlistId,
  name,
  thumbnail,
  userInfo,
  setUserInfo
) {
  try {
    // Get a reference to the user's document in the 'users' collection
    const userId = auth.currentUser.uid;
    const userRef = doc(collection(db, "users"), userId);

    // Get the current state of the user's document
    const userDoc = await getDoc(userRef);

    // Create a playlist object
    const artist = { artistId, playlistId, name, thumbnail };

    // Check if the Artist array contains the playlist
    if (
      userDoc.exists() &&
      userDoc.data().Artist?.some((pl) => pl.playlistId === playlistId)
    ) {
      ToastAndroid.show("Artist already in library", ToastAndroid.SHORT);
      return;
    }

    // Update the user's document by adding the artist to the Artist array
    await updateDoc(userRef, {
      Artist: arrayUnion(artist),
    });
    // Update userInfo
    setUserInfo({
      ...userInfo,
      Artist: [...(userInfo.Artist || []), artist],
    });
    ToastAndroid.show("Add artist to library success", ToastAndroid.SHORT);
  } catch (error) {
    console.log("error:", error);
    ToastAndroid.show("Add artist to library failed", ToastAndroid.SHORT);
  }
}
