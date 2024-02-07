import { configureStore } from '@reduxjs/toolkit'
import taskReducer from './Slices/taskSlice'
import themeReducer from './Slices/themeSlice'

// ...

const store = configureStore({
  reducer: {
    tasks: taskReducer,
    theme: themeReducer
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store