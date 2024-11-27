import { useEffect, useState } from "react";
import { getLyric } from "../apis/lyric";

const useLyric = (songId) => {
  const [lyr, setLyr] = useState([]);

  useEffect(() => {
    if (!songId) return [];
    const fetchLyric = async () => {
      if (songId !== null && songId !== "") {
        try {
          const dataLyric = await getLyric(songId);
          let customLyr = [];

          if (dataLyric.sentences) {
            dataLyric.sentences.forEach((e, i) => {
              let lineLyric = "";
              let sTime = 0;
              let eTime = 0;

              e.words.forEach((element, index) => {
                if (index === 0) {
                  sTime = element.startTime;
                }
                if (index === e.words.length - 1) {
                  eTime = element.endTime;
                }
                lineLyric = lineLyric + element.data + " ";
              });
              customLyr.push({
                startTime: sTime,
                endTime: eTime,
                data: lineLyric,
              });
            });
          }

          setLyr(customLyr);
        } catch (error) {
          console.error("Error fetching lyrics:", error);
        }
      }
    };

    fetchLyric();
  }, [songId]);

  return lyr;
};

export default useLyric;
