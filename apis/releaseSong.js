import axios from "axios";
import { zingmp3Api } from "./constants";

export async function getHomePage() {
    const res = await axios.get(zingmp3Api.getNewSong());
    return res.data;
}
