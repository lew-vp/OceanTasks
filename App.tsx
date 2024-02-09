// REACT NATIVE
import { StyleSheet, Text, View, Dimensions, SafeAreaView, ImageBackground } from 'react-native';

// REDUX
import store from './Redux/store'
import { Provider, useDispatch } from 'react-redux';
import { ITask, setTasks } from './Redux/Slices/taskSlice';

// EXTERNAL LIBRARIES
import { StatusBar } from 'expo-status-bar';
import { v4 as uuidV4 } from 'uuid'
import dayjs from 'dayjs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAsyncTasks } from './util/storageFunctions';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


// COMPONENTS
import Tasks from './Pages/Tasks';
import { useEffect } from 'react';
import Layout from './Layout';


export default function App() {

	return (
		<GestureHandlerRootView style={{flex: 1}}>
			<Provider store={store}>
				<Layout />
			</Provider>
		</GestureHandlerRootView>
	)
}

