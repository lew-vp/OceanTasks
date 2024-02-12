//REACT 
import React from 'react'

// EXTERNAL LIBRARIES
import { Clock, DollarSign, Minus, ShoppingBag } from 'react-native-feather'

interface categoryMap {
    [key: string]: any
}

// A Custom hook that allows for retrieval of task category icon component
const useCategories = () => {

    const getIcons: (color?: string) => categoryMap = (color?: string) => {
        return {
            Routine: <Clock color={color}/>,
            Shopping: <ShoppingBag color={color}/>,
            Finance: <DollarSign color={color} />,
            None: <Minus color={'transparent'}/>
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