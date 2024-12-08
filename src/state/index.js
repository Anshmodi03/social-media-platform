import { createSlice } from "@reduxjs/toolkit";

const initialState = { mode: "light", user: null, token: null, posts: [] };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
    },
    setLogout: (state) => {
      state.user = state.token = null;
    },
    setFriends: (state, { payload }) => {
      state.user
        ? (state.user.friends = payload.friends)
        : console.error("user friends non-existent :(");
    },
    setPosts: (state, { payload }) => {
      state.posts = payload.posts;
    },
    setPost: (state, { payload }) => {
      state.posts = state.posts.map((post) =>
        post._id === payload.post._id ? payload.post : post
      );
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;
export default authSlice.reducer;
