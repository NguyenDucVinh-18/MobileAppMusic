import axios from "axios";
import { REACT_APP_API_BASE_URL } from "../utils/constant";

const getSong = async (id) => {
  try {
    const data = await axios.get(`${REACT_APP_API_BASE_URL}/song`, {
      params: {
        id: id,
      },
    });
    return data.data;
  } catch (err) {
    console.log(err);
  }
};

const getInfoSong = async (id) => {
  try {
    const data = await axios.get(`${REACT_APP_API_BASE_URL}/infosong`, {
      params: {
        id: id,
      },
    });
    return data.data;
  } catch (err) {
    console.log(err);
  }
};

export { getSong, getInfoSong };
