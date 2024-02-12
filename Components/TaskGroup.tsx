// REACT NATIVE
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation } from 'react-native'
import React, { useState } from 'react'

// REDUX 
import { ITask } from '../Redux/Slices/taskSlice'
import { RootState } from '../Redux/store'
import { useSelector } from 'react-redux'

// EXTERNAL LIBRARIES
import { ChevronDown, ChevronRight, X } from 'react-native-feather'

// COMPONENTS
import TaskCard from './TaskCard'

interface ITaskGroup {
    title: string,
    tasks: ITask[],
}

const TaskGroup = ({title, tasks}: ITaskGroup) => {

    const [trayOpen, setTrayOpen] = useState<Boolean>(true)
    const theme = useSelector((state: RootState) => state.theme)

    const toggleDrawer = () => {
        // Handles the animation for the accordion
        setTrayOpen(current => !current)
        LayoutAnimation.configureNext({...LayoutAnimation.Presets.easeInEaseOut, duration: 200})
    }

    return (
        <View style={styles.groupWrapper}>
            <TouchableOpacity 
                style={styles.groupHeader} 
                onPress={toggleDrawer}
                activeOpacity={0.6}
            >
                <Text style={{...styles.titleText, color: theme.primaryColor}}>{title}</Text>
                {trayOpen ? <ChevronRight color={theme.primaryColor} /> : <ChevronDown color={theme.primaryColor} />}
            </TouchableOpacity>
            
            <View style={{...styles.list}}>
                {trayOpen && tasks.map((task: ITask, index: number) => (
                    <TaskCard
                        key={task.id}
                        index={index}
                        taskDetails={task}
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
        gap: 8,
        overflow: 'hidden'
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
    },
    hidden: {
        height: 0
    }
})

export default TaskGroup