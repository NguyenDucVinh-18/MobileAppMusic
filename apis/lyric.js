import axios from "axios";
import { REACT_APP_API_BASE_URL } from "../utils/constant";

export async function getLyric(songId) {
  try {
    const res = await axios.get(`${REACT_APP_API_BASE_URL}/lyric`, {
      params: { id: songId },
    });
    return res.data.data;
  } catch (error) {
    console.error("Error fetching lyric:", error);
  }
}
