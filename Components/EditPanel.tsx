// REACT NATIVE
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'

//REDUX
import { useDispatch, useSelector } from 'react-redux';
import { ITask, editTask, selectTaskByID } from '../Redux/Slices/taskSlice'

// EXTERNAL LIBRARIES
import { X } from 'react-native-feather'
import Checkbox from 'expo-checkbox';
import { RootState } from '../Redux/store';
import { setSelectedTask } from '../Redux/Slices/selectedTaskSlice';

const EditPanel = () => {

    const dispatch = useDispatch()
    const theme = useSelector((state: any) => state.theme)
    const tasks = useSelector((state: RootState) => state.tasks)
    const selectedTask = useSelector((state: RootState) => state.selectedTask.value)
    


    return (

        <Modal
            style={{ flex: 1, marginTop: 22 }}
            animationType='slide'
            visible={selectedTask !== null}
            transparent={true}
            onRequestClose={() => console.log('close me')}
        >
            {tasks && selectedTask !== null &&
                <View style={styles.editPanel}>
                    <TouchableOpacity
                        style={{ flex: 1, borderWidth: 0 }}
                        onPress={() => dispatch(setSelectedTask(null))}
                    />
                    <View style={styles.interfaceWindow}>
                        <TextInput
                            style={styles.title}
                            value={tasks[selectedTask].name}
                            
                        />
                    </View>
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
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: '#eeeeee'
    },
    title: {
        fontSize: 20
    }
    
})

export default EditPanel