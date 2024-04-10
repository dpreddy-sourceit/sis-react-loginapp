import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  user: {},
  userProfile: {},
  metaData: {}
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoggedInUser: (state, action) => {
      state.user = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    setMetadata: (state, action)=>{
      state.metaData = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDashBoardData.pending, () => {
        console.log("Loading Media Cards Data ....");
      })
      .addCase(getDashBoardData.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export const getDashBoardData = createAsyncThunk(
  "app/getDashBoardData",
  async () => {
    return [];
  }
);

export const { setLoggedInUser, setUserProfile, setMetadata } = appSlice.actions;

export const appReducer = appSlice.reducer;
