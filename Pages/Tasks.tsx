// REACT NATIVE
import { View, Text, Button, FlatList, ScrollView, SafeAreaView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'

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
import { ArrowLeft, ArrowRight, Plus, PlusSquare } from 'react-native-feather'
import EditPanel from '../Components/EditPanel'
import { RootState } from '../Redux/store'
import { UtilContext } from '../contexts/UtilContext'

const Tasks = (props: any) => {

	const tasks = useSelector((state: RootState) => state.tasks)
	const theme = useSelector((state: RootState) => state.theme)
	const selectedTask = useSelector((state: RootState) => state.selectedTask.value)

	const dispatch = useDispatch()
	

	const completedTasks = tasks.filter((task: ITask) => task.isCompleted)
	const incompleteTasks = tasks.filter((task: ITask) => !task.isCompleted)

	return (
		<SafeAreaView style={styles.layout}>
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

						{/* <View style={{width: '100%', alignItems: 'center'}}>
							<View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
								<Text>Swipe </Text>
								<ArrowLeft color={theme.deleteRed}/>
								<Text> to <Text style={{color: theme.deleteRed}}>delete</Text> a task</Text>
							</View>
							<View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
								<Text>Swipe </Text>
								<ArrowRight color={theme.confirmGreen}/>
								<Text> to <Text style={{color: theme.confirmGreen}}>complete</Text> a task</Text>
							</View>
						</View> */}
						
				
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