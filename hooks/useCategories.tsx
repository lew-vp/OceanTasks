// REACT NATIVE
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation } from 'react-native'
import React, { PropsWithChildren, ReactComponentElement, useState } from 'react'
import { Dimensions } from 'react-native'

// REDUX 
import { ITask } from '../Redux/Slices/taskSlice'

// EXTERNAL LIBRARIES
import { Box, ChevronDown, ChevronRight, Clock, Edit, ShoppingBag, Square, X } from 'react-native-feather'
import { current } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { RootState } from '../Redux/store'


interface IUseCategories {
    category: string,
    color: string
}

interface categoryMap {
    [key: string]: any
}

const useCategories = () => {

    const getIcons: (color?: string) => categoryMap = (color?: string) => {
        return {
            Routine: <Clock color={color}/>,
            Shopping: <ShoppingBag color={color}/>,
            Default: <Square color={color}/>
        }
    }

    const getCategoryNames = () => Object.keys(getIcons())

    const getCategoryIcon = (categoryName: string, color: string) => {
        let categoryIcons = getIcons(color)
        if (categoryName && categoryIcons[categoryName]) {
            return categoryIcons[categoryName]
        } else {
            return categoryIcons['Default']
        }
    }


    return { getCategoryNames, getCategoryIcon}
}


export default useCategories