import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: {}
}

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state,action) => {
      state.value = action.payload
    }
  }
})


export const { setAlert } = alertSlice.actions

export default alertSlice.reducer