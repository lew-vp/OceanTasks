// REACT NATIVE
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import React, { useContext, useMemo, useState } from 'react'

//REDUX
import { useDispatch, useSelector } from 'react-redux';
import { ITask, editTask, selectTaskByID } from '../Redux/Slices/taskSlice'
import { RootState } from '../Redux/store';
import { setSelectedTask } from '../Redux/Slices/selectedTaskSlice';
import { current } from '@reduxjs/toolkit';

// COMPONENTS
import CategoryIcon, { categoryMap } from './CategoryIcon';

// EXTERNAL LIBRARIES
import { X } from 'react-native-feather'
import Checkbox from 'expo-checkbox';
import { UtilContext } from '../contexts/UtilContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';

const EditPanel = () => {

    const dispatch = useDispatch()
    const theme = useSelector((state: any) => state.theme)
    const tasks = useSelector((state: RootState) => state.tasks)
    const selectedTask = useSelector((state: RootState) => state.selectedTask.value)

    const [taskModifications, setTaskModifications] = useState<Partial<ITask>>({})
    const utilFunctions = useContext(UtilContext)

    const taskDetails: ITask | null = useMemo(() => {
        // hydrate the modifications with the task details
        let locatedTask = tasks.find((task: ITask) => task.id === selectedTask) || null
        if (locatedTask) setTaskModifications(locatedTask)
        return locatedTask
    }, [tasks, selectedTask])

    const updateTaskValue = (key: string, value: string) => {
        if (key && value) {
            setTaskModifications({...taskModifications, [key]: value})
        }
    }

    const toggleTaskCompletion = () => {
        if (taskDetails) {

            let taskReference = utilFunctions.getTaskReference(taskDetails.id)
            if (taskReference) {
                dispatch(setSelectedTask(null))
                taskReference.openRight()
                setTimeout(() => {
                    dispatch(editTask({id: taskDetails.id, updates: {isCompleted: !taskDetails.isCompleted}}))
                }, 350)
            } else {
                dispatch(editTask({id: taskDetails.id, updates: {isCompleted: !taskDetails.isCompleted}}))
                    dispatch(setSelectedTask(null))
            }
        }
    }

    const closeEditor = () => {
        if (taskModifications && taskDetails) {
            // update the store with any modifications
            dispatch(editTask({id: taskDetails.id, updates: taskModifications}))
        }
        dispatch(setSelectedTask(null))
    }

    return (

        <Modal
            style={{ flex: 1, marginTop: 22 }}
            animationType='slide'
            visible={selectedTask !== null}
            transparent={true}
            onRequestClose={closeEditor}
        >
            {taskDetails &&
                <View style={styles.editPanel}>
                    <TouchableOpacity
                        style={{ flex: 1, borderWidth: 0 }}
                        onPress={closeEditor}
                    />
                    <KeyboardAvoidingView 
                        style={styles.interfaceWindow}
                        behavior='padding'
                    >
                        <View style={styles.boxHeader}>
                            <TextInput
                                style={styles.title}
                                value={taskModifications.name}
                                onChangeText={(value) => {
                                    if (value === '') {
                                        updateTaskValue('name', 'No Title')
                                    } else {
                                        updateTaskValue('name', value)}
                                    }
                                }
                                
                            />
                            <TouchableOpacity style={styles.closeBox} onPress={() => dispatch(setSelectedTask(null))}>
                                <X 
                                    fontSize={20}
                                    color={'gray'}
                                    
                                />
                            </TouchableOpacity>
                            
                        </View>
                        
                        <TextInput
                            style={{...styles.description, opacity: taskDetails.description ? 1 : 0.5}}
                            value={taskDetails.description === '' ? undefined : taskDetails.description} 
                            onChangeText={(value) => updateTaskValue('description', value)}
                            defaultValue='Describe your task'
                        />

                        <DateTimePicker
                            testID="dateTimePicker"
                            value={new Date(1598051730000)}
                            mode={'datetime'}
                        />

                        <View style={styles.optionRow}>
                            <Text>Category</Text>
                        </View>

                

                        <View style={styles.growContainer}>
                            <TouchableOpacity
                                onPress={() => toggleTaskCompletion()}
                                
                                style={{...styles.fullWidthButton, backgroundColor: theme.primaryColor}}
                            >
                                {taskDetails.isCompleted
                                    ? <Text style={{color: 'white'}}>Mark As Incomplete</Text>
                                    : <Text style={{color: 'white'}}>Mark As Complete</Text>
                                }
                                
                            </TouchableOpacity>
                        </View>
                        


                    </KeyboardAvoidingView>
                </View>
            }

        </Modal>

    )
}



const styles = StyleSheet.create({
    editPanel: {
        flex: 1,
        borderWidth: 0,
        borderColor: 'red',
        
    },
    interfaceWindow: {
        height: 400, 
        padding: 20,

        gap: 20,


        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderWidth: 1,
        borderColor: '#dcdcdc',
        backgroundColor: '#e3e3e3',

        shadowOffset: {width: 1, height: 1},
        shadowColor: '#424242',
        shadowOpacity: 0.15,


        zIndex: 100
    },
    boxHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    closeBox: {
        borderWidth: 2,
        borderColor: 'transparent'
    },
    title: {
        fontSize: 20
    },
    description: {
        fontSize: 15
    },
    fullWidthButton: {
        alignItems: 'center',
        borderRadius: 10,
        padding: 10,
    },
    growContainer: {
        flex: 1,
        flexDirection: 'column-reverse',
        paddingBottom: 40
    },
    optionRow: {
        height: 40,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
    
})

export default EditPanel