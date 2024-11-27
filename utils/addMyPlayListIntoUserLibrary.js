import {
  collection,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { auth, db } from "../components/firebase";

export async function addMyPlayListIntoUserLibrary(
  playlistId,
  name,
  thumbnail,
  userInfo,
  setUserInfo
) {
  try {
    const userId = auth.currentUser.uid;
    const userRef = doc(collection(db, "users"), userId);

    const userDoc = await getDoc(userRef);

    const playlist = { playlistId, name, thumbnail };

    if (
      userDoc.exists() &&
      userDoc.data().Playlist?.some((pl) => pl.playlistId === playlistId)
    ) {
      console.log("playlistId", playlistId);
      return;
    }

    await updateDoc(userRef, {
      MyPlaylist: arrayUnion(playlist),
    });

    setUserInfo({
      ...userInfo,
      MyPlaylist: [...(userInfo.MyPlaylist || []), playlist],
    });

    console.log("Thêm playlist vào thư viện thành công");
  } catch (error) {
    console.log("error:", error);
  }
}
