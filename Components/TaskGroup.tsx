// REACT NATIVE
import { View, Text, StyleSheet } from 'react-native'
import React, { PropsWithChildren } from 'react'
import { Dimensions } from 'react-native'

// REDUX 
import { ITask } from '../Redux/Slices/taskSlice'

// EXTERNAL LIBRARIES
import { X } from 'react-native-feather'
import TaskCard from './TaskCard'


interface ITaskGroup {
    title: string,
    tasks: ITask[]
}


const TaskGroup = ({title, tasks}: ITaskGroup) => {
    return (
        <View style={styles.groupWrapper}>
            <Text>{title}</Text>
            <View style={styles.list}>
                {tasks.map((task: ITask) => (
                    <TaskCard
                        taskDetails={task}
                        onDelete={() => { }}
                    />
                ))}
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    groupWrapper: {
        alignSelf: 'stretch',
        borderRadius: 10,
        backgroundColor: 'grey'
    },
    list: {

    }
})

export default TaskGroup