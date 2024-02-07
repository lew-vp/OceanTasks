// REACT NATIVE
import { View, Text, Button, FlatList, ScrollView, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'

// REDUX
import { useDispatch, useSelector } from 'react-redux'
import { ITask, addTask, removeTask } from '../Redux/Slices/taskSlice'

// COMPONENTS
import TaskCard from '../Components/TaskCard'

// EXTERNAL LIBRARIES
import 'react-native-get-random-values';
import { v4 as uuidV4 } from 'uuid'
import dayjs from 'dayjs'
import TaskGroup from '../Components/TaskGroup'

const Tasks = () => {

	const tasks = useSelector((state: any) => state.tasks)
	const dispatch = useDispatch()

	const [showCompleted, setShowCompleted] = useState<boolean>(true)
	const [showIncomplete, setShowIncomplete] = useState<boolean>(true)

	useEffect(() => {
		dispatch(addTask(incompleteDummy))
		dispatch(addTask(completeDummy))
	}, [])

	const completeDummy: ITask = {
		id: uuidV4(),
		name: 'Completed Task',
		deadline: dayjs().add(1, 'week').unix(),
		isCompleted: true
	}

	const incompleteDummy: ITask = {
		id: uuidV4(),
		name: 'Incomplete Task',
		deadline: dayjs().add(1, 'week').unix(),
		isCompleted: false
	}


	const renderTask = ({item: Task}: {item: ITask}) => {
		return (
			<TaskCard 
				taskDetails={Task}
				onDelete={() => dispatch(removeTask(Task.id))}
			/>
		)
	}

	return (
		<SafeAreaView>
			<ScrollView 
				contentContainerStyle={{ alignSelf: 'stretch', gap: 10}}
			>
				<TaskGroup 
					title='Completed' 
					tasks={[...tasks].filter((task: ITask) => task.isCompleted)} /
				>
				<TaskGroup 
					title='Incomplete' 
					tasks={[...tasks].filter((task: ITask) => !task.isCompleted)} 
				/>
			</ScrollView>
			
		
			<Button title='Add' onPress={() => dispatch(addTask(incompleteDummy))}/>
			<Button title='Delete' onPress={() => dispatch(removeTask('1235'))}></Button>
		</SafeAreaView>
	)
}

export default Tasks