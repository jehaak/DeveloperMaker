import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { albumList, albumCreate } from "../common/album";

// 앨범 정보를 받아오는 경우
export const readAlbum = createAsyncThunk(
  "album/read",
  async (temp, { rejectWithValue }) => {
    try {
      const response = await albumList();
      console.log(response.data.data)
      return response.data.data
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const putAlbumList = createAsyncThunk(
  "album/put",
  async (albumId, { rejectWithValue }) => {
    try {
      const { response } = await albumCreate(albumId);
      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const Album = createSlice({
  name: "Album",
  // 앨범 리스트를 받을 시작 리스트
  initialState: {albumList: []},
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(readAlbum.fulfilled, (state, action) => {
        state.albumList = action.payload;
      })
      // // 거절됨
      // .addCase(readAlbum.rejected, (state, action) => {
      //   state.isLoading = false;
      // })
      // // 로딩중
      // .addCase(readAlbum.pending, (state, action) => {
      //   state.isLoading = true;
      //   console.log("Now Loading");
      // })
  },
});

export default Album;
