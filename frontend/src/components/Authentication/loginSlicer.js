import { createSlice } from "@reduxjs/toolkit"

const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLogin: false,
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.isLogin = true
      state.user = action.payload
    },
    logout: (state) => {
      state.isLogin = false
      state.user = null
    },
  },
})

export const { login, logout } = loginSlice.actions

export default loginSlice.reducer

