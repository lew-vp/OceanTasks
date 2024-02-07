import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Tasks from './Pages/Tasks';
import { Provider } from 'react-redux';

import store from './Redux/store'

export default function App() {
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
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
})
