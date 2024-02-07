import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export interface ITask {
    id: string,
    name: string,
}

// Define the initial state using that type
const initialState: ITask[] = []

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // Take an ITask and add it to State
    addTask: (state, task: PayloadAction<ITask>) => {
        if (task) {
            state.push(task.payload)
        }
    },
    removeTask: (state, taskID: PayloadAction<string>) => {
        if (taskID.payload) {
            //broken atm
            state = state.filter((task: ITask) => task.id !== taskID.payload)
        }
    }
  },
})

export const { addTask, removeTask } = taskSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectTasks = (state: RootState) => state

export default taskSlice.reducer