import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: JSON.parse(sessionStorage.getItem("userInfo"))
}

export const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUser: (state,action) => {
      state.value = {...action.payload}
    },
    setUsername: (state,action) => {
      state.value.username = action.payload
    },
    setUserRole: (state, action) => {
      state.value.role = action.payload
    },
  },
})


export const { setUser, setUsername, setUserRole } = userSlice.actions

export default userSlice.reducer