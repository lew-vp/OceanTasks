import AsyncStorage from "@react-native-async-storage/async-storage";
import { ITask } from "../Redux/Slices/taskSlice";

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
        let jsonTasks = tasks && tasks.length ? JSON.stringify(tasks) : JSON.stringify([])
        await AsyncStorage.setItem('tasks', jsonTasks);
    } catch (e) {
        // error reading value
        console.log('failed to set async tasks: ' + e)
        return null
    }
}