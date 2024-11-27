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

export default async function removeMyPlaylistSongFromUserLibrary(
  playlistId,
  songId,
  userInfo,
  setUserInfo,
  isDeleteAll
) {
  try {
    // Get a reference to the user's document in the 'users' collection
    const userId = auth.currentUser.uid;
    const userRef = doc(collection(db, "users"), userId);

    // Get the current state of the user's document
    const userDoc = await getDoc(userRef);

    // Check if the Songs array contains the song
    const song = userDoc
      .data()
      .MyPlaylistSongs.filter((s) => s.playlistId === playlistId)
      .find((s) => s.song.encodeId === songId);
    if (!userDoc.exists() || !song) {
      ToastAndroid.show(
        "Song does not exist in your playlist",
        ToastAndroid.SHORT
      );
      return;
    }

    // Update the user's document by removing the song from the Songs array
    await updateDoc(userRef, {
      MyPlaylistSongs: arrayRemove(song),
    });

    // Update userInfo

    const newSongs = userInfo.MyPlaylistSongs.filter(
      (s) => s.song.encodeId !== songId && s.playlistId !== playlistId
    );
    if (isDeleteAll == true) {
      var newMyPlaylist = userInfo.MyPlaylist.filter(
        (playlist) => playlist.playlistId !== playlistId
      );

      setUserInfo({
        ...userInfo,
        MyPlaylist: newMyPlaylist,
        MyPlaylistSongs: newSongs,
      });
    } else {
      setUserInfo({
        ...userInfo,
        MyPlaylistSongs: newSongs,
      });
    }

    ToastAndroid.show(
      "Song removed from your playlist successfully",
      ToastAndroid.SHORT
    );
  } catch (error) {
    console.log("error:", error);
    ToastAndroid.show(
      "Failed to remove song from your playlist",
      ToastAndroid.SHORT
    );
  }
}
