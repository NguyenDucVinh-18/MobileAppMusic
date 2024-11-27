import {
  arrayRemove,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../components/firebase";
import { ToastAndroid } from "react-native";

export default async function removeSongFromUserLibrary(
  songId,
  userInfo,
  setUserInfo
) {
  try {
    // Get a reference to the user's document in the 'users' collection
    const userId = auth.currentUser.uid;
    const userRef = doc(collection(db, "users"), userId);

    // Get the current state of the user's document
    const userDoc = await getDoc(userRef);

    // Check if the Songs array contains the song
    const song = userDoc.data().Songs.find((s) => s.songId === songId);
    if (!userDoc.exists() || !song) {
      console.log("Song not found in library");
      ToastAndroid.show("Song not found in library", ToastAndroid.SHORT);
      return;
    }

    // Update the user's document by removing the song from the Songs array
    await updateDoc(userRef, {
      Songs: arrayRemove(song),
    });

    // Update userInfo
    const newSongs = userInfo.Songs.filter((s) => s.songId !== songId);
    setUserInfo({
      ...userInfo,
      Songs: newSongs,
    });
    console.log("Song removed from library");
    ToastAndroid.show("Remove song from library success", ToastAndroid.SHORT);
  } catch (error) {
    console.log("error:", error);
    ToastAndroid.show("Remove song from library failed", ToastAndroid.SHORT);
  }
}
