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
    setRequests: (state, action) => {
      state.value = {...state.value,requests:action.payload}
    },
    deleteAccount: (state, action) => {
      state.value = null
    }
  },
})


export const { setUser, deleteAccount, setRequests } = userSlice.actions

export default userSlice.reducer