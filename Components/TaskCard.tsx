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


const TaskCard = ({taskDetails, onDelete}: ITaskCard) => {

	const dispatch = useDispatch()

	const selectedTask = useSelector((state: RootState) => state.selectedTask.value)
	const theme = useSelector((state: RootState) => state.theme)

	const toggleTaskCompletion = () => {
        if (selectedTask !== null && taskDetails) {
            dispatch(editTask({id: taskDetails.id, updates: {isCompleted: !taskDetails.isCompleted}}))
        }
    }

	return (
		<TouchableOpacity 
			style={{ 
				...styles.taskCard, 
				backgroundColor: selectedTask === taskDetails.id ?  theme.primarySelected : theme.primaryColor,
			}}
			onPress={() => dispatch(setSelectedTask(taskDetails.id))}
		>
			<View style={styles.grouper}>
				<Checkbox 
					value={taskDetails.isCompleted} 
					onValueChange={() => {}}
					color={taskDetails.isCompleted ? theme.primaryColor : '#b3b3b3'}
				/>
				<Text style={styles.text}>{taskDetails.name}</Text>
			</View>
			
			<X onPress={() => onDelete}  fontSize='5' color={'#dedede'}/>
		</TouchableOpacity>
	)
}



const styles = StyleSheet.create({
	taskCard: {
		padding: 7,

		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',

		borderRadius: 10,
		borderWidth: 1,
		borderColor: 'rgba(129, 129, 129, 0.25)',

		shadowOpacity: 0.15,
		shadowOffset: {width: 0.5, height: 0.5},
		shadowColor: '#424242',
		elevation: 5


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