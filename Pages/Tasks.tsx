// REACT NATIVE
import { View, Text, Button, FlatList, ScrollView, SafeAreaView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

// REDUX
import { useDispatch, useSelector } from 'react-redux'
import { ITask, addBlankTask, addTask, removeTask, setTasks } from '../Redux/Slices/taskSlice'

// COMPONENTS
import TaskCard from '../Components/TaskCard'

// EXTERNAL LIBRARIES
import 'react-native-get-random-values';
import { v4 as uuidV4 } from 'uuid'
import dayjs from 'dayjs'
import TaskGroup from '../Components/TaskGroup'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Plus } from 'react-native-feather'

const Tasks = (props: any) => {

	const tasks = useSelector((state: any) => state.tasks)
	const theme = useSelector((state: any) => state.theme)
	const dispatch = useDispatch()

	const getAsyncTasks = async () => {
		try {
		  const jsonValue = await AsyncStorage.getItem('tasks');
		  return jsonValue != null ? JSON.parse(jsonValue) : null;
		} catch (e) {
		  // error reading value
		  return null
		}
	  };


	useEffect(() => {
		getAsyncTasks().then((asyncTasks: ITask[]) => {
			if (asyncTasks) dispatch(setTasks(asyncTasks))
		})
	}, [])

	const [showCompleted, setShowCompleted] = useState<boolean>(true)
	const [showIncomplete, setShowIncomplete] = useState<boolean>(true)

	return (
		<SafeAreaView style={styles.layout}>
			<ScrollView 
				contentContainerStyle={{ alignSelf: 'stretch', gap: 20}}
			>
				{[...tasks].some((task: ITask) => task.isCompleted) && 
					<TaskGroup 
						title='Completed' 
						tasks={[...tasks].filter((task: ITask) => task.isCompleted)}
					/>
				}

				{[...tasks].some((task: ITask) => !task.isCompleted) && 
					<TaskGroup 
						title='Incomplete' 
						tasks={[...tasks].filter((task: ITask) => !task.isCompleted)} 
					/>
				}

			</ScrollView>
			
			<TouchableOpacity 
				style={{...styles.addPrompt, borderColor: theme.primaryColor}}
				onPress={() => dispatch(addBlankTask())}
			>
				<Plus/>
			</TouchableOpacity>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({

    layout: {
		height: 700,
		width: '100%',
		gap: 10
	},

	addPrompt: {
		alignItems: 'center',
		gap: 10,
		borderWidth: 2,
		borderRadius: 10
	}
})

export default Tasks