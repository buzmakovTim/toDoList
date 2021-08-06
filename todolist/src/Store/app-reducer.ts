import { authAPI } from './../api/todolist-api';
import { AccessTimeOutlined } from '@material-ui/icons';
import React from 'react';
import  { Dispatch } from 'redux'
import { setIsLoggedInAC } from './auth-reducer';
import { ResponseStatuses } from './todolists-reducer';
import { handleServerAppError, handleServerNetworkError } from '../utils/error-utils';
import { AxiosError } from 'axios';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed' ;


const initialState = { 

   status: 'idle' as RequestStatusType,
   error: null as string | null,
   isInitialized: false 
} 

type InitialStateType = typeof initialState 

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => { 

   switch (action.type) { 

       case 'APP/SET-STATUS': 

           return {...state, status: action.status} 

        case 'APP/ERROR-RESET': {
            return {...state, error: action.error}
        }

        case 'APP/IS-INITIALIZED': {
            return {...state, isInitialized: action.isInitialized}
        }

       default: 

           return state 

   } 

} 

// Action creator
export const setAppStatusAC = (status: RequestStatusType) => {
    return {
        type: 'APP/SET-STATUS',
        status
    } as const 
}

export const setAppErrorAC = (error: string | null) => {
    return {
        type: 'APP/ERROR-RESET',
        error
    } as const
}
export const setIsInitialized = (isInitialized: boolean) => {
    return {
        type: 'APP/IS-INITIALIZED',
        isInitialized
    } as const
}

//Thunk
export const initializeAppTC = () => (dispatch: Dispatch) => {

    console.log('App initializing!')
    dispatch(setAppStatusAC('loading')) // Preloader ON
    authAPI.me()
        .then((res) => {
            
            if (res.data.resultCode === ResponseStatuses.success){
                
                dispatch(setIsLoggedInAC(true))
                dispatch(setIsInitialized(true))
                dispatch(setAppStatusAC('succeeded')) // Preloader OFF
                
            } else {
                
                dispatch(setAppStatusAC('failed')) // Preloader OFF
                //handleServerAppError(dispatch, res.data) // Func from error-utils.ts
            }
        })
        .catch( (err: AxiosError) => {
            
            handleServerNetworkError(dispatch, err.message) // Func from error-utils.ts
        })
        .finally(()=>{
            dispatch(setIsInitialized(true))
        })
}


type ActionsType = | 
                    ReturnType<typeof setAppStatusAC> |
                    ReturnType<typeof setAppErrorAC> |
                    ReturnType<typeof setIsInitialized>