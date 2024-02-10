import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native'
import React, { Ref, useEffect, useRef, useImperativeHandle, useContext, useState } from 'react'
import { ITask, editTask, removeTask } from '../Redux/Slices/taskSlice'
import { Check, Trash, X } from 'react-native-feather'
import Checkbox from 'expo-checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import { setSelectedTask } from '../Redux/Slices/selectedTaskSlice';
import { Swipeable } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { UtilContext } from '../contexts/UtilContext';
import useCategories from '../hooks/useCategories';

interface ITaskCard {
	taskDetails: ITask,
	index: number,
	onDelete: (taskID: string) => void,
}


const TaskCard = ({taskDetails, onDelete}: ITaskCard) => {

	const dispatch = useDispatch()
	const utilFunctions = useContext(UtilContext)

	const selectedTask = useSelector((state: RootState) => state.selectedTask.value)
	const theme = useSelector((state: RootState) => state.theme)

	const {getCategoryIcon} = useCategories()

	const [isSwiping, setIsSwiping] = useState<string | null>(null)

	const cardRef: any = useRef()

	const swipeToComplete = () => {
			cardRef.current.openLeft()
			setIsSwiping('left')
			setTimeout(() => {
				toggleTaskCompletion()
			}, 300)
	}

	const toggleTaskCompletion = () => {
        if (taskDetails) {
            dispatch(editTask({id: taskDetails.id, updates: {isCompleted: !taskDetails.isCompleted}}))
        }
    }

	const renderRight = () => (
		<View style={{ width: '100%', paddingLeft: 10, paddingRight: 10, flexDirection: 'row-reverse', alignItems: 'center' }}>
			<Animated.View style={{ flexDirection: 'row-reverse', backgroundColor: '#AE0000', transform: [{ translateX: 0 }] }}/>
		</View>
	)

	const renderLeft = () => (
		<View style={{ width: '100%', paddingLeft: 10, paddingRight: 10, flexDirection: 'row-reverse', alignItems: 'center' }}>
			<Animated.View style={{ flexDirection: 'row-reverse', backgroundColor: '#AE0000', transform: [{ translateX: 0 }] }}/>
		</View>
	)

	const getCardBackgroundColor = () => {
		let backgroundColor = theme.primaryColor

		if (selectedTask === taskDetails.id) {
			backgroundColor = theme.primarySelected
		}
		
		if (isSwiping) {
			if (isSwiping === 'right') {
				backgroundColor = 'rgba(176, 25, 25, 0.85)'	
			} else if (!taskDetails.isCompleted) {
				backgroundColor = 'rgba(37, 156, 35, 0.85)'
			}
		}
		return backgroundColor
	}

	const getCardContent = () => {
		if (isSwiping === 'right') {
			return (
				<View
					style={{
						...styles.taskCard,
						justifyContent: 'center',
						backgroundColor: getCardBackgroundColor(),
					}}
				>
					<Trash color={'white'}/>
				</View>
			)
		} else if (isSwiping === 'left' && !taskDetails.isCompleted) {
			return (
				<View
					style={{
						...styles.taskCard,
						justifyContent: 'center',
						backgroundColor: getCardBackgroundColor(),
					}}
				>
					<Check color={'white'}/>
				</View>
			)
		} else {
			return (
				<View
					style={{
						...styles.taskCard,
						backgroundColor: getCardBackgroundColor(),
					}}
				>
					<Pressable 
						style={styles.checkBox}
						onPress={swipeToComplete}
					>
						<Checkbox
							style={{height: 23, width: 23}}
							value={taskDetails.isCompleted}
							onValueChange={swipeToComplete}
							
							color={taskDetails.isCompleted ? theme.primaryColor : '#b3b3b3'}
						/>
					</Pressable>
					<Pressable 
						style={styles.grouper}
						onPress={() => {
							dispatch(setSelectedTask(taskDetails.id))}
						}
					>
						<Text style={styles.text}>{taskDetails.name}</Text>
						{getCategoryIcon(taskDetails.category, '#eeeeee')}
					</Pressable>
				</View>
			)
		}
	}

	return (
		<Swipeable
			ref={cardRef}
			key={taskDetails.id}
			renderRightActions={renderRight}
			renderLeftActions={!taskDetails.isCompleted ? renderLeft : undefined}
			onSwipeableOpenStartDrag={(swipe) => {
				setIsSwiping(swipe)
			}}
			onSwipeableOpen={swipe => {
				
				if (swipe === 'right') {
					dispatch(removeTask(taskDetails.id))
				} else {
					toggleTaskCompletion()
				}
				console.log('swipeee')
			}}
			onSwipeableClose={() => setIsSwiping(null)}
			overshootRight={true}
		>
			{getCardContent()}
		</Swipeable>
		
	)
}



const styles = StyleSheet.create({
	taskCard: {
		padding: 0,
		height: 45,

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
	checkBox: {
		width: 40,
		height: 45,
		paddingLeft: 9,
		justifyContent: 'center',
		alignItems: 'flex-start',
		borderWidth: 0,
		borderColor: 'red'
	},
	grouper: {
		flex: 1,
		padding: 9,
		justifyContent: 'space-between',
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