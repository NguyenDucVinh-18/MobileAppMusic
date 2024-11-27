import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
  name: "player",
  initialState: {
    showPlayer: false,
    data: {},
    optionData: {},
    isPlaying: false,
    audioUrl: "",
    radioUrl: "",
    currentProgress: 0,
    duration: 0, // Thêm duration để lưu trữ tổng thời lượng bài hát
    showSubPlayer: false,
    isRandom: false,
    isRepeat: false,
    currentSongIndex: 0,
    playlist: [],
    playlistId: "",
    isLove: false,
    isLoading: false,
  },
  reducers: {
    setShowPlayer: (state, action) => {
      state.showPlayer = action.payload;
    },
    setPlayerData: (state, action) => {
      state.data = action.payload;
    },
    setOptionData: (state, action) => {
      state.optionData = action.payload;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setAudioUrl: (state, action) => {
      state.audioUrl = action.payload;
    },
    setRadioUrl: (state, action) => {
      state.radioUrl = action.payload;
    },
    setCurrentProgress: (state, action) => {
      state.currentProgress = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    setShowSubPlayer: (state, action) => {
      state.showSubPlayer = action.payload;
    },
    setIsRandom: (state, action) => {
      state.isRandom = action.payload;
    },
    setIsRepeat: (state, action) => {
      state.isRepeat = action.payload;
    },
    setCurrentSongIndex: (state, action) => {
      state.currentSongIndex = action.payload;
    },
    setPlaylist: (state, action) => {
      state.playlist = action.payload;
    },
    setPlaylistId: (state, action) => {
      state.playlistId = action.payload;
    },
    setIsLove: (state, action) => {
      state.isLove = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    // Action để cập nhật trạng thái audio từ AudioService
    setAudioState: (state, action) => {
      state.isPlaying = action.payload.isPlaying;
      state.currentProgress = action.payload.currentProgress;
      state.duration = action.payload.duration;
    },
  },
});

export const {
  setShowPlayer,
  setPlayerData,
  setOptionData,
  setIsPlaying,
  setAudioUrl,
  setRadioUrl,
  setCurrentProgress,
  setDuration,
  setShowSubPlayer,
  setIsRandom,
  setIsRepeat,
  setCurrentSongIndex,
  setPlaylist,
  setPlaylistId,
  setIsLove,
  setIsLoading,
  setAudioState, // Export action mới này
} = playerSlice.actions;
export default playerSlice.reducer;
