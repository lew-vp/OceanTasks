// REACT NATIVE
import React from 'react'

// REDUX
import store from './Redux/store'
import { Provider } from 'react-redux';

// EXTERNAL LIBRARIES
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

// COMPONENTS
import Layout from './Layout';

export default function App() {

	return (
		<GestureHandlerRootView style={{flex: 1}}>
			<StatusBar style="dark" />
			<Provider store={store}>
				<Layout />
			</Provider>
		</GestureHandlerRootView>
	)
}

