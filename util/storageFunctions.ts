import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAsyncTasks = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('tasks');
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
        return null
    }
}