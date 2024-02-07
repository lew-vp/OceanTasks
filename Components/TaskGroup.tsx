// REACT NATIVE
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { PropsWithChildren, useState } from 'react'
import { Dimensions } from 'react-native'

// REDUX 
import { ITask } from '../Redux/Slices/taskSlice'

// EXTERNAL LIBRARIES
import { ChevronDown, ChevronRight, X } from 'react-native-feather'
import TaskCard from './TaskCard'
import { current } from '@reduxjs/toolkit'


interface ITaskGroup {
    title: string,
    tasks: ITask[],
}


const TaskGroup = ({title, tasks}: ITaskGroup) => {

    const [trayOpen, setTrayOpen] = useState<Boolean>(true)

    return (
        <View style={styles.groupWrapper}>
            <TouchableOpacity style={styles.groupHeader} onPress={() => setTrayOpen(!trayOpen)}>
                <Text style={styles.titleText}>{title}</Text>
                {trayOpen ? <ChevronRight /> : <ChevronDown />}
            </TouchableOpacity>
            
            <View style={{...styles.list}}>

                {trayOpen && tasks.map((task: ITask) => (
                    <TaskCard
                        key={task.id}
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
    },
    list: {
        gap: 8
    },
    titleText: {
        fontSize: 18,
        padding: 5,
    },
    groupHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    }
})

export default TaskGroup