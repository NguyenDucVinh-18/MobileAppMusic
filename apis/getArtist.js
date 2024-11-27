import axios from "axios";
import { zingmp3Api } from "./constants";

export async function getArtist(name) {
    const res = await axios.get(zingmp3Api.getArtist(name));
    return res.data;
}
