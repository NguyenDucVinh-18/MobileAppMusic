import React, { useEffect } from "react";
import axios from "axios";
import NewRelease from "../Playlist/NewRelease";
import Hub from "../Playlist/Hub";

export default function CategoryDetail({ route, navigation }) {
  const { item } = route.params;
  const [data, setData] = React.useState({});
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(item.api);
      const data = res.data;
      setData(data.data);
    }
    fetchData();
  }, []);
  if (!data || !item) return null;
  return (
    <>
      {item.id === 1 ? <NewRelease data={data} /> : null}
      {item.id > 2 ? <Hub data={data} navigation={navigation} /> : null}
    </>
  );
}
