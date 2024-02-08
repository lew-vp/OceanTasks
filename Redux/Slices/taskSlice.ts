
// REDUX
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// EXTERNAL LIBRARIES
import 'react-native-get-random-values';
import { v4 as uuidV4 } from 'uuid'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { makeBlankTask } from '../../util/taskFunctions';

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



const setAsyncTasks = async (tasks: ITask[]) => {
    try {
        if (tasks) {
            console.log('setting async tasks')
            console.log(tasks)
            console.log('-------------')
            await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
        } else {
            console.log('no tasks')
        }
    } catch (e) {
      // saving error
    }
  };

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {

    setTasks: (state, tasks: PayloadAction<ITask[]>) => {
        if (tasks){
            // setAsyncTasks([...tasks.payload])
            return [...tasks.payload]
        } 
    },

    // Take an ITask and add it to State
    addBlankTask: (state) => {
        state.push(makeBlankTask())
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

            let tmpState = [...state]

            console.log(tmpState)
            console.log(taskUpdates.payload.id)
            console.log(typeof taskUpdates.payload.id)

            let retrievedTaskIndex = tmpState.findIndex((task: ITask) => {
                task.id == taskUpdates.payload.id
            })

            console.log(retrievedTaskIndex)

            if (retrievedTaskIndex) {
                tmpState[retrievedTaskIndex] = {...tmpState[retrievedTaskIndex], ...taskUpdates.payload.updates}
            }

            return tmpState
        }
    }
  },
})

export const { setTasks, removeTask, editTask, addBlankTask } = taskSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectTasks = (state: RootState) => state
export const selectTaskByID = (state: RootState, id: string) => state.tasks.find((task: ITask) => task.id === id)

export default taskSlice.reducer