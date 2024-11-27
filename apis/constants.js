const zingmp3Endpoint = "https://api-zingmp3.vercel.app/api";

export const zingmp3Api = {
  getHomePage: () => `${zingmp3Endpoint}/home`,

  // get Zing Chart :
  getTopChart: () => `${zingmp3Endpoint}/homechart`,

  // get RadioPage :
  getRadioPage: () => `${zingmp3Endpoint}/radio`,

  // get New Feed :
  getNewFeed: (id, page) => `${zingmp3Endpoint}/newfeeds?id=${id}&page=${page}`,

  // get Mới Phát Hành :
  getNewSong: () => `${zingmp3Endpoint}/newreleasechart`,

  // get Thể Loại :
  getHubHome: () => `${zingmp3Endpoint}/hubhome`,
  // get Hub Detail:
  getHubDetail: (id) => `${zingmp3Endpoint}/hubdetails/${id}`,

  // get Top100Page :
  getTop100Page: () => `${zingmp3Endpoint}/top100`,

  // get List Mv :
  getListMv: (id, page) =>
    `${zingmp3Endpoint}/listmv?id=${id}&page=${page}&count=19`,

  // get Category Mv :
  getCategoryMv: (id) => `${zingmp3Endpoint}/categorymv/${id}`,

  // get Mv:
  getVideoMv: (id) => `${zingmp3Endpoint}/mv/${id}`,

  // get getArtistPage:
  getArtistPage: (id) => `${zingmp3Endpoint}/artist/${id}`,

  // get getAlbumPage :
  getAlbumPage: (id) => `${zingmp3Endpoint}/playlist/${id}`,

  getSuggestedAlbum: (id) => `${zingmp3Endpoint}/suggestedplaylists/${id}`,

  //  get từ khóa hot  :
  getHotKeyApi: () => `${zingmp3Endpoint}/recommendkeyword`,

  // lấy key gợi ý :
  getHotSuggestionApi: (keyword) =>
    `${zingmp3Endpoint}/suggestionkeyword?keyword=${keyword}`,

  getSearchByType: (keyword, type) =>
    `${zingmp3Endpoint}/searchtype?keyword=${keyword}&type=${type}`,

  //  bắt đầu search :
  getSearchAllKeyApi: (keyword) =>
    `${zingmp3Endpoint}/searchall?keyword=${keyword}`,

  // Lyrics :
  getLyrics: (id) => `${zingmp3Endpoint}/songlyrics/${id}`,

  // search tên nghệ sĩ
  getArtist: (name) =>
    `${zingmp3Endpoint}/searchtype?keyword=${name}&type=artist`,

  // search tên bài hất
  getSongs: (name) => `${zingmp3Endpoint}/searchtype?keyword=${name}&type=song`,

  // get song:
  getSong: (encodeId) =>
    `https://zing-mp3-api.vercel.app/api/song/info/${encodeId}`,
};
