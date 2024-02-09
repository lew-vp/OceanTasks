import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import Tasks from './Pages/Tasks'
import { getAsyncTasks, setAsyncTasks } from './util/storageFunctions'
import { ITask, setTasks } from './Redux/Slices/taskSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './Redux/store'
import notifee from '@notifee/react-native'
import dayjs from 'dayjs'

const Layout = () => {

	const image = require('./assets/oceanBackground.png')
	const dispatch = useDispatch()
	const tasks: ITask[] = useSelector((state: RootState) => state.tasks)

	const displayNotification = async (task: ITask) => {
		await notifee.requestPermission() // need to do this earlier

		const channelID = await notifee.createChannel({
			id: 'default',
			name: 'Default Channel'
		})

		await notifee.displayNotification({
			title: task.name,
			body: 'You missed your deadline',
			android: {
				channelId: channelID,
				pressAction: {
					id: 'default'
				}
			}
		})
	}

	useEffect(() => {
		// Push task changes to store
		setAsyncTasks(tasks)

		// you may have to destroy and reinitialise this timer on tasks change

		// Setup reminder clock
		console.log('initialising timer...')
		const reminderClock = setInterval(() => {
			let currentTimestamp = dayjs().unix()

			let dummyTask: ITask = {
				id: 'd9879486-ec57-4857-8963-ffd0643dfa31',
				name: 'MyTask',
				isCompleted: false,
				reminderTime: 1707477897,
				description: 'This is a brief description',
				reminded: false
			}

			// displayNotification(dummyTask)

			for (let task of tasks) {
				if (
					task.reminderTime !== null &&
					task.reminderTime < currentTimestamp &&
					task.isCompleted === false &&
					task.reminded === false
				) {
					//displayNotification(task)
				}
			}
		}, 10000)

		return () => clearInterval(reminderClock)
	}, [tasks])

	useEffect(() => {
		// Retrieve saved tasks & populate store
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