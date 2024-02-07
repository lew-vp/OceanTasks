import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { ITask, editTask } from '../Redux/Slices/taskSlice'
import { X } from 'react-native-feather'
import Checkbox from 'expo-checkbox';
import { useDispatch, useSelector } from 'react-redux';

interface ITaskCard {
	taskDetails: ITask,
	onDelete: (taskID: string) => void;
}


const TaskCard = ({taskDetails, onDelete}: ITaskCard) => {

	const dispatch = useDispatch()
	
	const theme = useSelector((state: any) => state.theme)

	return (
		<View style={{...styles.taskCard, backgroundColor: theme.primaryColor}}>
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
		</View>
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