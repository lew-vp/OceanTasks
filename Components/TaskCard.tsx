import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { ITask } from '../Redux/Slices/taskSlice'
import { X } from 'react-native-feather'
import Checkbox from 'expo-checkbox';

interface ITaskCard {
	taskDetails: ITask,
	onDelete: (taskID: string) => void;
}


const TaskCard = ({taskDetails, onDelete}: ITaskCard) => {
	return (
		<View style={styles.taskCard}>
			<View style={styles.grouper}>
				<Checkbox 
					value={taskDetails.isCompleted} 
				/>
				<Text>{taskDetails.name}</Text>
			</View>
			
			<X onPress={() => onDelete} color={'grey'}/>
		</View>
	)
}

const styles = StyleSheet.create({
	taskCard: {
		width: 300,
		padding: 3,

		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	grouper: {
		flexDirection: 'row',
		gap: 10,
		alignItems: 'center'
	}
})

export default TaskCard