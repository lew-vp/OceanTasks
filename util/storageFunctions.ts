import AsyncStorage from "@react-native-async-storage/async-storage";
import { ITask } from "../Redux/Slices/taskSlice";

export const areArraysEqual = (arr1: ITask[], arr2: ITask[]) => {
    return Array.isArray(arr1) &&
        Array.isArray(arr2) &&
        arr1.length === arr2.length &&
        arr1.every((val, index) => val === arr2[index]);
}

export const getAsyncTasks = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('tasks');
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
        console.log('failed to get async tasks: ' + e)
        return null
    }
}

export const setAsyncTasks = async (tasks: ITask[]) => {
    try {
        let newTasksJSON = tasks && tasks.length ? JSON.stringify(tasks) : JSON.stringify([])
        await AsyncStorage.setItem('tasks', newTasksJSON);
    } catch (e) {
        // error reading value
        console.log('failed to set async tasks: ' + e)
        return null
    }
}