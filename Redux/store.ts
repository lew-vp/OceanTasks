import { configureStore } from '@reduxjs/toolkit'
import taskReducer from './Slices/taskSlice'
import themeReducer from './Slices/themeSlice'
import selectedTaskReducer from './Slices/selectedTaskSlice'

const store = configureStore({
  reducer: {
    tasks: taskReducer, 
    theme: themeReducer,
    selectedTask: selectedTaskReducer
  },
})

export type RootState = ReturnType<typeof store.getState>  // Exports the type structure for the store
export type AppDispatch = typeof store.dispatch

export default store