import {
  arrayRemove,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../components/firebase";
import { ToastAndroid } from "react-native";

export default async function removePlaylistFromUserLibrary(
  playlistId,
  userInfo,
  setUserInfo
) {
  try {
    // Get a reference to the user's document in the 'users' collection
    const userId = auth.currentUser.uid;
    const userRef = doc(collection(db, "users"), userId);

    // Get the current state of the user's document
    const userDoc = await getDoc(userRef);

    // Check if the Playlist array contains the playlist
    const playlist = userDoc
      .data()
      .Playlist.find((pl) => pl.playlistId === playlistId);
    if (!userDoc.exists() || !playlist) {
      ToastAndroid.show(
        "Playlist does not exist in your library",
        ToastAndroid.SHORT
      );
      return;
    }

    // Update the user's document by removing the playlist from the Playlist array
    await updateDoc(userRef, {
      Playlist: arrayRemove(playlist),
    });

    // Update userInfo
    const newPlaylist = userInfo.Playlist.filter(
      (pl) => pl.playlistId !== playlistId
    );
    setUserInfo({
      ...userInfo,
      Playlist: newPlaylist,
    });

    ToastAndroid.show(
      "Playlist removed from your library successfully",
      ToastAndroid.SHORT
    );
  } catch (error) {
    console.log("error:", error);
    ToastAndroid.show(
      "Failed to remove playlist from your library",
      ToastAndroid.SHORT
    );
  }
}
