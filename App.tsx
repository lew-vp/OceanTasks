// REACT NATIVE
import { StyleSheet, Text, View, Dimensions } from 'react-native';

// REDUX
import store from './Redux/store'
import { Provider, useDispatch } from 'react-redux';

// EXTERNAL LIBRARIES
import { StatusBar } from 'expo-status-bar';

// COMPONENTS
import Tasks from './Pages/Tasks';
import { useEffect } from 'react';
import { ITask, setTasks } from './Redux/Slices/taskSlice';


// EXTERNAL COMPONENTS
import { v4 as uuidV4 } from 'uuid'
import dayjs from 'dayjs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAsyncTasks } from './util/storageFunctions';


//Notifee Stuff Here


export default function App() {

	/* const dispatch = useDispatch() */

	/* useEffect(() => {
		console.log('trying to get stored tasks')
		getAsyncTasks().then((storedTasks: ITask[]) => {
			if (storedTasks && storedTasks.length) {
				console.log('got stored tasks')
				console.log(storedTasks)
				dispatch(setTasks(storedTasks))
			}
		})
	}, []) */

	return (
		<Provider store={store}>
			<View style={styles.container}>
				<Tasks/>
			</View>
		</Provider>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
})
