import { AccessTimeOutlined } from '@material-ui/icons';
import React from 'react';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed' ;


const initialState = { 

   status: 'idle' as RequestStatusType,
   error: null as string | null 
} 

type InitialStateType = typeof initialState 

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => { 

   switch (action.type) { 

       case 'APP/SET-STATUS': 

           return {...state, status: action.status} 

        case 'APP/ERROR-RESET': {
            return {...state, error: action.error}
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

type ActionsType = | 
                    ReturnType<typeof setAppStatusAC> |
                    ReturnType<typeof setAppErrorAC>