// REACT NATIVE
import { View, Text, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'

// REDUX
import { useDispatch, useSelector } from 'react-redux'
import { ITask, addBlankTask } from '../Redux/Slices/taskSlice'
import { RootState } from '../Redux/store'

// COMPONENTS
import TaskGroup from '../Components/TaskGroup'
import EditPanel from '../Components/EditPanel'

// EXTERNAL LIBRARIES
import 'react-native-get-random-values';
import { Plus, PlusSquare } from 'react-native-feather'


const Tasks = () => {

	const tasks = useSelector((state: RootState) => state.tasks)
	const theme = useSelector((state: RootState) => state.theme)

	const logo = require('../assets/oceanEdited.png')

	const dispatch = useDispatch()

	const completedTasks = tasks.filter((task: ITask) => task.isCompleted)
	const incompleteTasks = tasks.filter((task: ITask) => !task.isCompleted)

	return (
		<SafeAreaView style={styles.layout}>
			<View style={{width: '100%', alignItems: 'center'}}>
				<Image source={logo} style={{height: 40, width: 40}}/>
			</View>
			{tasks && tasks.length
				?	<ScrollView 
						contentContainerStyle={{ alignSelf: 'stretch', gap: 20, paddingTop: 10}}
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
				:	<View style={{flex: 1, borderWidth: 1.5, borderRadius: 10, borderColor: theme.opaquePrimaryBorder, justifyContent: 'center', alignItems :'center', gap: 20}}>
						<View style={{width: '100%', justifyContent: 'center', flexDirection: 'row', alignItems: 'center', gap: 5}}>
							<Text style={{fontSize: 17}}>Press </Text>
							<PlusSquare color={theme.primaryColor}/>
							<Text style={{fontSize: 17}}> to <Text style={{color: theme.primaryColor}}>add</Text> a task</Text>
						</View>
					</View>
			}
			
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
		height: '100%',
		width: '100%',
		gap: 10,
		borderWidth: 0
	},

	addPrompt: {
		padding: 5,
		alignItems: 'center',
		gap: 10,
		borderWidth: 2,
		borderRadius: 10
	}
})

export default Tasks