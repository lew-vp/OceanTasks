// REACT NATIVE
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation } from 'react-native'
import React, { PropsWithChildren, ReactComponentElement, useState } from 'react'
import { Dimensions } from 'react-native'

// REDUX 
import { ITask } from '../Redux/Slices/taskSlice'

// EXTERNAL LIBRARIES
import { Box, ChevronDown, ChevronRight, Clock, Edit, ShoppingBag, Square, X } from 'react-native-feather'
import TaskCard from './TaskCard'
import { current } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { RootState } from '../Redux/store'


interface ICategoryIcon {
    category: string
}

interface categoryMap {
    [key: string]: any
}


export const categoryMap: categoryMap = {
    Routine: <Clock color={'grey'}/>,
    Shopping: <ShoppingBag color={'grey'}/>,
    Default: <Square color={'grey'}/>
}

const CategoryIcon = ({category}: ICategoryIcon) => {

    const theme = useSelector((state: RootState) => state.theme)

    console.log(category)

    if (category && categoryMap[category]) {
        return categoryMap[category]
    } else {
        return categoryMap['default']
    }
}


export default CategoryIcon