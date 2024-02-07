import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { ITask } from '../Redux/Slices/taskSlice'
import { X } from 'react-native-feather'

interface ITaskCard {
	taskDetails: ITask,
	onDelete: (taskID: string) => void;
}


const TaskCard = ({taskDetails, onDelete}: ITaskCard) => {
	return (
		<View style={styles.taskCard}>
			<Text>{taskDetails.name}</Text>
			<X onPress={() => onDelete}/>
		</View>
	)
}

const styles = StyleSheet.create({
	taskCard: {
		height: 100,
		width: 300,
		padding: 3,
	},
})

export default TaskCard