import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export interface ITask {
    id: string,
    name: string,
    deadline: number,
    isCompleted: boolean
}

interface ITaskUpdates {
    id: string,
    updates: Partial<ITask>
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
            console.log('passedTaskID: ' + taskID.payload)
            console.log(state)
            console.log('-----------------')
            //broken atm
            return state.filter((task: ITask) => task.id !== taskID.payload)
        }
    },

    editTask: (state, taskUpdates: PayloadAction<ITaskUpdates>) => {
        if (taskUpdates.payload.id && taskUpdates.payload.updates) {

            let retrievedTaskIndex = state.findIndex((task: ITask) => {
                task.id === taskUpdates.payload.id
            })

            if (retrievedTaskIndex) {
                state[retrievedTaskIndex] = {...state[retrievedTaskIndex], ...taskUpdates.payload.updates}
            }
        }
    }
  },
})

export const { addTask, removeTask } = taskSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectTasks = (state: RootState) => state

export default taskSlice.reducer