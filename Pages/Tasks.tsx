// REACT NATIVE
import { View, Text, Button, FlatList, ScrollView, SafeAreaView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

// REDUX
import { useDispatch, useSelector } from 'react-redux'
import { ITask, addBlankTask, removeTask, setTasks } from '../Redux/Slices/taskSlice'

// COMPONENTS
import TaskCard from '../Components/TaskCard'

// EXTERNAL LIBRARIES
import 'react-native-get-random-values';
import { v4 as uuidV4 } from 'uuid'
import dayjs from 'dayjs'
import TaskGroup from '../Components/TaskGroup'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Plus } from 'react-native-feather'
import EditPanel from '../Components/EditPanel'
import { RootState } from '../Redux/store'

const Tasks = (props: any) => {

	const tasks = useSelector((state: RootState) => state.tasks)
	const theme = useSelector((state: RootState) => state.theme)
	const selectedTask = useSelector((state: RootState) => state.selectedTask.value)

	const dispatch = useDispatch()

	const completedTasks = tasks.filter((task: ITask) => task.isCompleted)
	const incompleteTasks = tasks.filter((task: ITask) => !task.isCompleted)

	return (
		<SafeAreaView style={styles.layout}>
			<ScrollView 
				contentContainerStyle={{ alignSelf: 'stretch', gap: 20}}
			>
				{[...tasks].some((task: ITask) => task.isCompleted) && 
					<TaskGroup 
						title='Completed' 
						tasks={completedTasks}
					/>
				}

				{[...tasks].some((task: ITask) => !task.isCompleted) && 
					<TaskGroup 
						title='To Do' 
						tasks={incompleteTasks} 
					/>
				}

			</ScrollView>
			
			<TouchableOpacity 
				style={{...styles.addPrompt, borderColor: theme.primaryColor}}
				onPress={() => dispatch(addBlankTask())}
			>
				<Plus color={theme.primaryColor}/>
			</TouchableOpacity>

			<EditPanel/>

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