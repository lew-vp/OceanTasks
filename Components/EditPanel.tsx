// REACT NATIVE
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Pressable, Dimensions, Keyboard } from 'react-native'
import React, { useContext, useEffect, useMemo, useState } from 'react'

//REDUX
import { useDispatch, useSelector } from 'react-redux';
import { ITask, editTask, selectTaskByID } from '../Redux/Slices/taskSlice'
import { RootState } from '../Redux/store';
import { setSelectedTask } from '../Redux/Slices/selectedTaskSlice';
import { current } from '@reduxjs/toolkit';


// EXTERNAL LIBRARIES
import { X } from 'react-native-feather'
import Checkbox from 'expo-checkbox';
import { UtilContext } from '../contexts/UtilContext';
import dayjs from 'dayjs';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import useCategories from '../hooks/useCategories';
import Modal from "react-native-modal";
import { isSharedValue } from 'react-native-reanimated';

const EditPanel = () => {

    const dispatch = useDispatch()
    const theme = useSelector((state: any) => state.theme)
    const tasks = useSelector((state: RootState) => state.tasks)
    const selectedTask = useSelector((state: RootState) => state.selectedTask.value)

    const [taskModifications, setTaskModifications] = useState<Partial<ITask>>({})
    const [selectCategoryOpen, setSelectCategoryOpen] = useState<any>(false)
    const utilFunctions = useContext(UtilContext)
    const [datePickerOpen, setDatePickerOpen] = useState<any>(false)

    const { getCategoryNames, getCategoryIcon } = useCategories()

    const taskDetails: ITask | null = useMemo(() => {
        // hydrate the modifications with the task details
        let locatedTask = tasks.find((task: ITask) => task.id === selectedTask) || null
        if (locatedTask) setTaskModifications(locatedTask)
        return locatedTask
    }, [tasks, selectedTask])

    const updateTaskValue = (key: string, value: string | number | boolean) => {
        console.log(value)
        if (key && (value || value === '')) {
            console.log('setting mod')
            console.log(key)
            console.log(value)
            console.log('----------------')
            setTaskModifications({...taskModifications, [key]: value})
        }
    }

    useEffect(() => {
        console.log('new task mods')
        console.log(taskModifications)
    }, [taskModifications])

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

    const saveChanges = () => {
        if (taskModifications && taskDetails) {
            dispatch(editTask({
                id: taskDetails.id, 
                updates: {
                    ...taskModifications, 
                    name: taskModifications.name || 'New Task'
                }
            }))
        }
        closeEditor()
    }

    const closeEditor = () => {
        dispatch(setSelectedTask(null))
        setSelectCategoryOpen(false)
    }

    return (

        <Modal
            style={{ flex: 1, margin: 0 }}
            isVisible={selectedTask !== null}
            avoidKeyboard={true}
            animationOut={'slideOutDown'}
            coverScreen={true}
            onSwipeComplete={closeEditor}
            swipeDirection={'down'}
            useNativeDriverForBackdrop={true}
        >

                <View style={styles.editPanel}>
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={closeEditor}
                    />
                    <View 
                        style={styles.interfaceWindow}
                    >
                        <View style={styles.boxHeader}>
                            <Text style={styles.title}>{taskDetails && taskDetails.name}</Text>

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
                                    value={taskModifications.name}
                                    onChangeText={(value) => {
                                        updateTaskValue('name', value)}
                                    }
                                />
                        </View>

                        <View style={{...styles.optionRow, paddingRight: 9}}>
                            <Text>Reminder Time</Text>
                            <Pressable onPress={() => {Keyboard.dismiss(); setDatePickerOpen(true) }}>
                                <Text>{taskModifications.reminderTime ? dayjs.unix(taskModifications.reminderTime).format('DD/MM/YYYY hh:mm') : '- Select -'}</Text>
                            </Pressable>
                            <DateTimePickerModal
                                isVisible={datePickerOpen}
                                mode="datetime"
                                onConfirm={(newTime) => {
                                    updateTaskValue('reminderTime', dayjs(newTime).unix())
                                    setDatePickerOpen(false)
                                }}
                                onCancel={() => setDatePickerOpen(false)}
                                minimumDate={dayjs().toDate()}
                            />
                        </View>
                        

                        <View style={{...styles.optionRow, paddingRight: 0}}>
                            <Text>Category</Text>
                           
                            <DropDownPicker
                                containerStyle={{width: 150, backgroundColor: 'transparent'}}
                                listItemContainerStyle={{backgroundColor: '#e9e9e9'}}
                                dropDownContainerStyle={{borderWidth: 1.5, borderTopRightRadius: 3, borderTopLeftRadius: 3, borderColor: 'rgba(120, 120, 120, 0.5)'}}
                                style={{backgroundColor: 'transparent', borderWidth: 0}}
                                open={selectCategoryOpen}
                                value={taskModifications.category}
                                items={getCategoryNames().map((categoryName) => {
                                    return {
                                        label: categoryName,
                                        value: categoryName,
                                        icon: () => getCategoryIcon(categoryName, theme.primaryColor)
                                      }
                                })}
                                setOpen={setSelectCategoryOpen}
                                onSelectItem={(val) => val.value && updateTaskValue('category', val.value)}
                                setValue={() => {}}
                                setItems={() => {}}
                            />
                        </View>

                        <View style={{flex: 1}}/>

                        <TouchableOpacity
                            onPress={saveChanges}
                            style={{
                                ...styles.fullWidthButton, backgroundColor: theme.primaryColor}}
                        >
                            <Text style={{color: 'white'}}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
        height: 380, 
        padding: 20,
        paddingBottom: 30,

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