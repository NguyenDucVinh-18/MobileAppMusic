import {
  collection,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { auth, db } from "../components/firebase";
import { ToastAndroid } from "react-native";
export default async function addSongIntoUserLibrary(
  songId,
  name,
  thumbnail,
  artistsNames,
  userInfo,
  setUserInfo
) {
  try {
    // Get a reference to the user's document in the 'users' collection
    const userId = auth.currentUser.uid;
    const userRef = doc(collection(db, "users"), userId);

    // Get the current state of the user's document
    const userDoc = await getDoc(userRef);

    // Create a song object
    const song = { songId, name, thumbnail, artistsNames };

    // Check if the Songs array contains the song
    if (
      userDoc.exists() &&
      userDoc.data().Songs?.some((s) => s.songId === songId)
    ) {
      ToastAndroid.show("Song already in library", ToastAndroid.SHORT);
      return;
    }

    // Update the user's document by adding the song to the Songs array
    await updateDoc(userRef, {
      Songs: arrayUnion(song),
    });

    // Update userInfo
    setUserInfo({
      ...userInfo,
      Songs: [...(userInfo.Songs || []), song],
    });
    ToastAndroid.show("Add song to library success", ToastAndroid.SHORT);
    console.log("Song added to library");
  } catch (error) {
    console.log("error:", error);
    ToastAndroid.show("Add song to library failed", ToastAndroid.SHORT);
  }
}
