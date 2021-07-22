import React from 'react'
import { setAppErrorAC, setAppStatusAC } from '../Store/app-reducer'
import { Dispatch } from 'redux'
import {ResponseType} from './../api/todolist-api'

export const handleServerNetworkError = (dispatch: Dispatch<ErrorActionsType>, message: string) => {
    
    dispatch(setAppErrorAC(message)) // Error Message to show 
    dispatch(setAppStatusAC('failed')) // Preloader OFF

}

export const handleServerAppError = <T>(dispatch: Dispatch<ErrorActionsType>, data: ResponseType<T>) => {

    if(data.messages.length){
        
        const errorMessage = data.messages[0] 
        dispatch(setAppErrorAC(errorMessage)) // Error Message to show    
    
    } else {
        dispatch(setAppErrorAC('Some error occurred')) // Error Message to show    
    }
    dispatch(setAppStatusAC('failed')) // Preloader OFF

}                             

// DIspatch Type
export type ErrorActionsType =  ReturnType<typeof setAppStatusAC> |
                                ReturnType<typeof setAppErrorAC>
