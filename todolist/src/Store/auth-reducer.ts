import { authAPI } from './../api/todolist-api';
import React from 'react' 
import { Dispatch } from 'redux'  
import { LoginType, todolistAPI } from '../api/todolist-api'
import { setAppErrorAC, setAppStatusAC } from './app-reducer'
import { handleServerAppError, handleServerNetworkError } from '../utils/error-utils';
import { AxiosError } from 'axios';
import { ResponseStatuses } from './todolists-reducer';

 

const initialState = { 
   isLoggedIn: false 
} 

type InitialStateType = typeof initialState 

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => { 

   switch (action.type) { 

       case 'login/SET-IS-LOGGED-IN': 
            
           return {...state, isLoggedIn: action.value} 

       default: 
           return state 
   } 

} 

// actions 
export const setIsLoggedInAC = (value: boolean) => 

   ({type: 'login/SET-IS-LOGGED-IN', value} as const) 

// thunks 

export const loginTC = (data: LoginType) => (dispatch: Dispatch<ActionsType>) => { 

    dispatch(setAppStatusAC('loading')) // Preloader ON
    authAPI.login(data)
        .then( (res) => {
            if (res.data.resultCode === ResponseStatuses.success){
                
                
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded')) // Preloader OFF 

            } else {
                handleServerAppError(dispatch, res.data) // Func from error-utils.ts
            }
        })
        .catch( (err: AxiosError) => {
            handleServerNetworkError(dispatch, err.message) // Func from error-utils.ts
        })
    }

export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => { 

    dispatch(setAppStatusAC('loading')) // Preloader ON
    authAPI.logout()
        .then( (res) => {
            if (res.data.resultCode === ResponseStatuses.success){
                
                
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded')) // Preloader OFF 

            } else {
                handleServerAppError(dispatch, res.data) // Func from error-utils.ts
            }
        })
        .catch( (err: AxiosError) => {
            handleServerNetworkError(dispatch, err.message) // Func from error-utils.ts
        })

    }
// types 
type ActionsType = ReturnType<typeof setIsLoggedInAC> | 
                   ReturnType<typeof setAppStatusAC>  |
                   ReturnType<typeof setAppErrorAC>