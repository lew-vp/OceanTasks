import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { ITask, editTask } from '../Redux/Slices/taskSlice'
import { X } from 'react-native-feather'
import Checkbox from 'expo-checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import { setSelectedTask } from '../Redux/Slices/selectedTaskSlice';

interface ITaskCard {
	taskDetails: ITask,
	index: number,
	onDelete: (taskID: string) => void;
}


const TaskCard = ({taskDetails, onDelete, index}: ITaskCard) => {

	const dispatch = useDispatch()

	const selectedTask = useSelector((state: RootState) => state.selectedTask.value)
	const theme = useSelector((state: RootState) => state.theme)

	return (
		<TouchableOpacity 
			style={{ ...styles.taskCard, backgroundColor: selectedTask === index ?  'grey' : theme.primaryColor }}
			onPress={() => dispatch(setSelectedTask(index))}
		>
			<View style={styles.grouper}>
				<Checkbox 
					value={taskDetails.isCompleted} 
					onValueChange={(val: boolean) => {
						dispatch(editTask({id: taskDetails.id, updates: {isCompleted: true}}))
					}}
				/>
				<Text style={styles.text}>{taskDetails.name}</Text>
			</View>
			
			<X onPress={() => onDelete} color={'grey'}/>
		</TouchableOpacity>
	)
}



const styles = StyleSheet.create({
	taskCard: {
		padding: 7,

		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',

		borderRadius: 10
	},
	grouper: {
		flexDirection: 'row',
		gap: 10,
		alignItems: 'center'
	},
	text: {
		color: 'white',
		fontSize: 17
	}
})

export default TaskCard