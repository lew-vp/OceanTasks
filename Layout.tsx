import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import React, { useEffect } from 'react'
import Tasks from './Pages/Tasks'
import { getAsyncTasks, setAsyncTasks } from './util/storageFunctions'
import { ITask, setTasks } from './Redux/Slices/taskSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './Redux/store'

const Layout = () => {
	// the core nav goes here

	const image = require('./resources/oceanBackground.png')

	const dispatch = useDispatch()
	const tasks: ITask[] = useSelector((state: RootState) => state.tasks)

	useEffect(() => {
		setAsyncTasks(tasks)
	}, [tasks])

	useEffect(() => {
		getAsyncTasks().then((storedTasks: ITask[]) => {
			if (storedTasks && storedTasks.length) {
				console.log('got stored tasks')
				console.log(storedTasks)
				dispatch(setTasks(storedTasks))
			} else {
				console.log('no async tasks')
			}
		})
	}, [])


	return (
		<ImageBackground style={styles.container} source={image} blurRadius={50}>
			<Tasks />
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 15,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		resizeMode: 'cover',
	},
})


export default Layout