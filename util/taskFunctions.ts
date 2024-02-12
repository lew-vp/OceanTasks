// EXTERNAL LIBRARIES
import 'react-native-get-random-values';
import { v4 as uuidV4 } from 'uuid'

export const makeBlankTask = () => {
    return ({
        id: uuidV4(),
        name: 'New Task',
        isCompleted: false,
        reminderTime: 0,
        description: '',
        reference: null,
        category: 'None'
    })
}