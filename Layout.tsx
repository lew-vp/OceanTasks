
// REACT NATIVE
import { View, Text, StyleSheet, ImageBackground, Alert, AppState } from 'react-native'
import React, { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react'

//REDUX
import { getAsyncTasks, setAsyncTasks } from './util/storageFunctions'
import { ITask, editTask, setTasks } from './Redux/Slices/taskSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './Redux/store'

// COMPONENTS
import Tasks from './Pages/Tasks'

// EXTERNAL LIBRARIES
import * as SplashScreen from 'expo-splash-screen';
import notifee, { RepeatFrequency, TimestampTrigger, TriggerType } from '@notifee/react-native'

SplashScreen.preventAutoHideAsync();

const Layout = () => {

	const image = require('./assets/oceanBackground.png')
	const dispatch = useDispatch()
	const tasks: ITask[] = useSelector((state: RootState) => state.tasks)

	const [appIsReady, setAppIsReady] = useState<boolean>(false)

	async function createNotification(taskID: string, title: string, body: string, timestamp: number) {
		try {
			const channelID = await notifee.createChannel({
				id: 'default',
				name: 'Default Channel'
			})

			const trigger: TimestampTrigger = {
				type: TriggerType.TIMESTAMP,
				timestamp: timestamp,
				repeatFrequency: RepeatFrequency.NONE,
			}

			await notifee.createTriggerNotification(
				{
					id: taskID,
					title: title,
					body: body,
					android: {
						channelId: channelID
					}
				},
				trigger
			)
		} catch (ex) {
			console.log('Failed to setup trigger notification: ' + ex)
		}
	}

	useEffect(() => {

		if (appIsReady) {
			setAsyncTasks(tasks)
		}

		let taskIDArray = tasks && tasks.map((task: ITask) => task.id)

		notifee.getTriggerNotificationIds().then((notificationIDs: string[]) => {
			if (notificationIDs && notificationIDs.length) {
				for (let notificationID of notificationIDs) {

					// If the task no longer exists, cancel the notification
					if (taskIDArray.includes(notificationID) === false) {
						//console.log('cancelling: ' + notificationID)
						notifee.cancelNotification(notificationID)
					}
				}
			}

			if (tasks && tasks.length) {
				for (let task of tasks) {

					// If no notifications are set up already
					if (notificationIDs.includes(task.id) === false) {

						// If task has a reminder time and the notification has not already triggered
						if (task.reminderTime && task.isCompleted === false) {
							//console.log('starting: ' + task.id + ' at: ' + task.reminderTime * 1000 )
							createNotification(task.id, 'Task Reminder', task.name, task.reminderTime * 1000)
						}
					}

					// If the task has already been completed, cancel it's notification
					if (notificationIDs.includes(task.id) && task.isCompleted) {
						//console.log('completed so cancelling: ' + task.id)
						notifee.cancelNotification(task.id)
					}
				}
			}
		})
	}, [tasks])

	useEffect(() => {
		// On Application Load

		// Retrieve saved tasks & populate store
		getAsyncTasks().then((storedTasks: ITask[]) => {
			if (storedTasks && storedTasks.length) {
				dispatch(setTasks(storedTasks))
			}
			setAppIsReady(true)
		})
	}, [])

	const onLayoutRootView = useCallback(async () => {
		await notifee.requestPermission()
		if (appIsReady) {
		  await SplashScreen.hideAsync();
		}
	  }, [appIsReady]);

	return (
		<ImageBackground style={styles.container} source={image} blurRadius={50} onLayout={onLayoutRootView}>
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