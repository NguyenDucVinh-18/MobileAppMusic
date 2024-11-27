import axios from "axios";
import { REACT_APP_API_BASE_URL } from "../utils/constant";

export async function getHomePage() {
  const res = await axios.get(`${REACT_APP_API_BASE_URL}/home`);
  return res.data;
}
