
// REDUX
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// EXTERNAL LIBRARIES
import 'react-native-get-random-values';

// TOOLS
import { makeBlankTask } from '../../util/taskFunctions';
import { setAsyncTasks } from '../../util/storageFunctions';

export interface ITask {
    id: string,
    name: string,
    reminderTime: number | null,
    isCompleted: boolean,
    description: string,
    category: any
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

    setTasks: (state, tasks: PayloadAction<ITask[]>) => {
        return tasks.payload
    },

    // Take an ITask and add it to State
    addBlankTask: (state) => {
        state.push(makeBlankTask())
    },

    removeTask: (state, taskID: PayloadAction<string>) => {
        if (taskID.payload) {
            let deleteIndex = state.findIndex((task: ITask) => task.id === taskID.payload)
            state = state.splice(deleteIndex, 1)
        }
    },

    // Searches for and modifies the provided task
    editTask: (state, taskUpdates: PayloadAction<ITaskUpdates>) => {
        if (taskUpdates.payload.id && taskUpdates.payload.updates) {
            let foundTask = state.findIndex((task: ITask) => task.id === taskUpdates.payload.id)
            if (foundTask !== null) {
                state[foundTask] = {...state[foundTask], ...taskUpdates.payload.updates}
            }
        }
    }
  },
})

export const { setTasks, removeTask, editTask, addBlankTask } = taskSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectTasks = (state: RootState) => state
export const selectTaskByID = (state: RootState, id: string) => state.tasks.find((task: ITask) => task.id === id)

export default taskSlice.reducer