// REDUX
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

const oceanTheme: ITheme = require('../../themes/ocean.json')

export interface ITheme {
    primaryColor: string,
    primarySelected: string,
    primaryBorder: string,
    primarySelectedBorder: string,
    opaquePrimaryBorder: string,
    deleteRed: string,
    confirmGreen: string
}


// Define the initial state using that type
const initialState: ITheme = {...oceanTheme}

export const themeSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
  },
})

export const { } = themeSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectTheme = (state: RootState) => state

export default themeSlice.reducer