import { View, Text, Button } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ITask, addTask, removeTask } from '../Redux/Slices/taskSlice'

const Tasks = () => {

	const tasks = useSelector((state: any) => state.tasks)
	const dispatch = useDispatch()

	const dummyTask: ITask = {
		id: '1235',
		name: 'dummy task'
	}

	return (
		<View>
			<Text>Tasks</Text>
			{tasks.map((task: ITask) => <Text>{task.name}</Text>)}
			<Button title='Add' onPress={() => dispatch(addTask(dummyTask))}/>
			<Button title='Delete' onPress={() => dispatch(removeTask('1235'))}></Button>
		</View>
	)
}

export default Tasks