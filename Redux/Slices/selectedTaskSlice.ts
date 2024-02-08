
// REDUX
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface selectedTaskState {
    value: number | null
}

// Define the initial state using that type
const initialState: selectedTaskState = {
    value: null
}

const selectedSlice = createSlice({
    name: 'selectedTask',
    initialState,
    reducers: {
        setSelectedTask: (state, taskID: PayloadAction<number | null>) => {
            state.value = taskID.payload
        },
    },
})

export const { setSelectedTask } = selectedSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectSelectedTask = (state: RootState) => state.selectedTask.value

export default selectedSlice.reducer