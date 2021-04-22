import React, { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';




export const FluidContext = createContext()
const STORAGE_KEY = '@save_age'

export const FluidProvider = ({ children }) => {
    const [maxFluids, setMaxFluids] = useState('')
    const [dailyTotal, setDailyTotal] = useState('')

    const readData = async () => {
        try {
            const fluids = await AsyncStorage.getItem(STORAGE_KEY)
            if (fluids !== null) {
                setMaxFluids(fluids)
            }
        } catch (e) {
            alert('Failed to fetch like a ho')
        }
    }
    useEffect(() => {
        readData()
    }, [maxFluids])



    return (
        <FluidContext.Provider
            value={[
                maxFluids,
                setMaxFluids,
                dailyTotal,
                setDailyTotal,


            ]}
        >
            { children}
        </FluidContext.Provider >
    )
}