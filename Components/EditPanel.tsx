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
import DropDownPicker from 'react-native-dropdown-picker';

const EditPanel = () => {

    const dispatch = useDispatch()
    const theme = useSelector((state: any) => state.theme)
    const tasks = useSelector((state: RootState) => state.tasks)
    const selectedTask = useSelector((state: RootState) => state.selectedTask.value)

    const [taskModifications, setTaskModifications] = useState<Partial<ITask>>({})
    const [selectCategoryOpen, setSelectCategoryOpen] = useState<any>(false)
    const utilFunctions = useContext(UtilContext)

    const taskDetails: ITask | null = useMemo(() => {
        // hydrate the modifications with the task details
        let locatedTask = tasks.find((task: ITask) => task.id === selectedTask) || null
        if (locatedTask) setTaskModifications(locatedTask)
        return locatedTask
    }, [tasks, selectedTask])

    const updateTaskValue = (key: string, value: string | number | boolean) => {
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
                            <Text style={styles.title}>{taskModifications.name}</Text>

                            <TouchableOpacity style={styles.closeBox} onPress={() => dispatch(setSelectedTask(null))}>
                                <X 
                                    fontSize={20}
                                    color={'gray'}
                                    
                                />
                            </TouchableOpacity>
                            
                        </View>

                        <View style={{...styles.optionRow}}>
                            <Text>Task Name</Text>
                            <TextInput
                                    value={taskDetails.name}
                                    onChangeText={(value) => {
                                        if (value === '') {
                                            updateTaskValue('name', 'No Title')
                                        } else {
                                            updateTaskValue('name', value)}
                                        }
                                    }
                                />
                        </View>

                        <View style={{...styles.optionRow, paddingRight: 9}}>
                            <Text>Reminder Time</Text>
                            <DateTimePicker

                                style={{backgroundColor: 'transparent'}}
                                testID="dateTimePicker"
                                value={taskDetails.reminderTime ? new Date(taskDetails.reminderTime) : new Date()}
                                onChange={(val) => updateTaskValue('reminderTime', val.nativeEvent.timestamp / 1000)}
                                mode={'datetime'}
                            />
                        </View>
                        

                        <View style={{...styles.optionRow, paddingRight: 0}}>
                            <Text>Category</Text>
                           
                            <DropDownPicker
                                containerStyle={{width: 200, backgroundColor: 'transparent'}}
                                style={{backgroundColor: 'transparent', borderWidth: 0}}
                                open={selectCategoryOpen}
                                value={taskDetails.category}
                                items={Object.entries(categoryMap).map(([key, value]) => {
                                    return {
                                        label: key,
                                        value: key,
                                        icon: () => <CategoryIcon category={key} />
                                      }
                                })}
                                setOpen={setSelectCategoryOpen}
                                onSelectItem={(val) => val.value && console.log(val.value)}
                                setValue={() => {}}
                                setItems={() => {}}
                            />
                        
                        </View>

                

                        <View style={styles.growContainer}>
                            <TouchableOpacity
                                onPress={closeEditor}
                                
                                style={{...styles.fullWidthButton, backgroundColor: theme.primaryColor}}
                            >
                                <Text style={{color: 'white'}}>Save</Text>
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

        gap: 10,


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
        alignItems: 'center',
        marginBottom: 15
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
        height: 50,
        paddingLeft: 13,
        paddingRight: 13,
        borderWidth: 0,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#e9e9e9',
        borderRadius: 8
    }
    
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  });

export default EditPanel