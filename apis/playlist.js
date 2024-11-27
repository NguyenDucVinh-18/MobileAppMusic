import axios from "axios";
import { REACT_APP_API_BASE_URL } from "../utils/constant";

export async function getDetailPlaylist(id) {
  try {
    const res = await axios.get(`${REACT_APP_API_BASE_URL}/detailplaylist`, {
      params: {
        id: id,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
}
