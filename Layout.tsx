import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import React, { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Tasks from './Pages/Tasks'
import { getAsyncTasks, setAsyncTasks } from './util/storageFunctions'
import { ITask, editTask, setTasks } from './Redux/Slices/taskSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './Redux/store'
import notifee from '@notifee/react-native'
import dayjs from 'dayjs'
import { UtilContext } from './contexts/UtilContext'

// EXTERNAL LIBRARIES
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const Layout = () => {

	const image = require('./assets/oceanBackground.png')
	const dispatch = useDispatch()
	const tasks: ITask[] = useSelector((state: RootState) => state.tasks)

	const [appIsReady, setAppIsReady] = useState<boolean>(false)

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

			console.log(tasks.length)

			for (let task of tasks) {
				if (
					task.reminderTime !== 0 &&
					task.reminderTime !== null &&
					task.reminderTime < currentTimestamp &&
					task.isCompleted === false &&
					task.reminded === false
				) {
					console.log(task.name)
					console.log(task.reminderTime)
					displayNotification(task)
					dispatch(editTask({
						id: task.id, 
						updates: {
							reminded: true,
							reminderTime: 0
						}
					}))
					// set reminded
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
			setAppIsReady(true)
		})
	}, [])

	const onLayoutRootView = useCallback(async () => {
		if (appIsReady) {
			console.log('ready to go')
		  await SplashScreen.hideAsync();
		}
	  }, [appIsReady]);

	const taskReferences: any = useRef({})

	const setTaskReference = (id: string, ref: any) => {
		taskReferences.current = {...taskReferences.current, [id]: ref}
	}

	const getTaskReference = (id: string) => {
		if (taskReferences.current && taskReferences.current[id]) {
			return taskReferences.current[id]
		} else {
			return null
		}
		
	}


	return (
		<UtilContext.Provider value={{setTaskReference, getTaskReference}}>
			<ImageBackground style={styles.container} source={image} blurRadius={50} onLayout={onLayoutRootView}>
				<Tasks />
			</ImageBackground>
		</UtilContext.Provider>
		
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