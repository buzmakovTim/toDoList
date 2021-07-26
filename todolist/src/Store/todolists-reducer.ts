import { FilterValueType } from '../App';
import React from 'react';
import { v1 } from 'uuid';
import  { Dispatch } from 'redux'
import { AppRootState } from './store';
import { todolistAPI, TodoListType } from '../api/todolist-api';
import { act } from 'react-dom/test-utils';
import { AccessTimeOutlined } from '@material-ui/icons';
import { RequestStatusType, setAppErrorAC, setAppStatusAC } from './app-reducer';
import { AxiosError } from 'axios';
import { handleServerAppError, handleServerNetworkError } from '../utils/error-utils';

// Old way for types

// export type RemoveTodolistActionType = {
//     type: "REMOVE-TODOLIST"
//     id: string
// }
// export type AddTodolistActionType = {
//     type: "ADD-TODOLIST"
//     title: string
//     todolistId: string
// }
// type ChangeTodolistTitleActionType = {
//     type: "CHANGE-TODOLIST-TITLE"
//     id: string
//     title: string
// }
// type ChangeTodolistFilterActionType = {
//     type: "CHANGE-TODOLIST-FILTER",
//     id: string
//     filter: FilterValueType
// }

// Types for export
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type SetTodoListActionType = ReturnType<typeof setTodoListsAC>

// Action type
type ActionsType =  |
                    RemoveTodolistActionType | 
                    AddTodolistActionType | 
                    ReturnType<typeof changeTodolistTitleAC> | 
                    ReturnType<typeof changeTodolistFilterAC> |
                    SetTodoListActionType |
                    ReturnType<typeof cnangeTodoListEntityStatus>


export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodoListType & {
    filter: FilterValuesType;
    entityStatus: RequestStatusType;
}
// Initial state empty array
const initialState: Array<TodolistDomainType> = []


export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType):Array<TodolistDomainType> => {

    switch(action.type){

        case 'SET-TODOLISTS': {
            
            return action.todolists.map( (tl) => {
                return {...tl, filter: 'all', entityStatus: 'idle'}
            }) 
        }

        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id != action.id)
        }

        case 'ADD-TODOLIST': {

            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        }

        case 'CHANGE-TODOLIST-TITLE': {
            
            const todolistToUpdate = state.find( tl => tl.id === action.id);
            if(todolistToUpdate){ 
                todolistToUpdate.title = action.title;
            }
            return [...state]
        }

        case 'CHANGE-TODOLIST-FILTER': {
            
            const todolistToUpdate = state.find( tl => tl.id === action.id);
            if(todolistToUpdate){ 
                todolistToUpdate.filter = action.filter;
            }
            return [...state]
        }

        case 'CHANGE-ENTITY-STATUS': {
            return state.map( tl => tl.id === action.todolistId ? {...tl, filter: 'all', entityStatus: action.entityStatus} : tl)
                //return {...tl, filter: 'all', entityStatus: tl.id === action.todolistId ? action.entityStatus : 'idle'}})
        }
            
        default: 
            return state;

    }
    
}


// Action Creators

export const removeTodolistAC = (todolistId: string) => {
    return {type: "REMOVE-TODOLIST", id: todolistId} as const
}
export const addTodolistAC = (todolist: TodoListType) => {
    return {type: "ADD-TODOLIST", todolist} as const
}
export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {type: "CHANGE-TODOLIST-TITLE", id: todolistId, title: title} as const
}
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValueType) => {
    return {type: "CHANGE-TODOLIST-FILTER", id: todolistId, filter: filter} as const
}
export const setTodoListsAC = (todolists: Array<TodoListType>) => {
    return {type: "SET-TODOLISTS", todolists} as const
}
export const cnangeTodoListEntityStatus = (todolistId: string, entityStatus: RequestStatusType) => {
    return {type: "CHANGE-ENTITY-STATUS" , todolistId, entityStatus} as const
}


// Response code from Server 
export enum ResponseStatuses {
    success = 0,
    error = 1,
    captcha = 10
}

//
//thunk creators
//
export const fetchTodolistsThunkCreator = () => (dispatch: Dispatch, getState: () => AppRootState) => {
    
    console.log('Fetching todos')
    
    // 1 server requests
    dispatch(setAppStatusAC('loading')) // Preloader ON
    todolistAPI.getTodos()
      .then( (res) => {
        
        // 2 dispatch actions
        dispatch(setTodoListsAC(res.data))
        dispatch(setAppStatusAC('succeeded')) // Preloader OFF 
        
      })
      .catch( (err: AxiosError) => {
            
        handleServerNetworkError(dispatch, err.message) // Func from error-utils.ts
    })
}

export const createTodolistThunkCreator = (title: string) => (dispatch: Dispatch) => {

    dispatch(setAppStatusAC('loading')) // Preloader ON
    todolistAPI.createTodo(title)
        .then( (res) => {
            if (res.data.resultCode === ResponseStatuses.success){
                
                const todo = res.data.data.item
                dispatch(addTodolistAC(todo))
                dispatch(setAppStatusAC('succeeded')) // Preloader OFF 

            } else {
                handleServerAppError(dispatch, res.data) // Func from error-utils.ts
            }
        })
        .catch( (err: AxiosError) => {
            
            handleServerNetworkError(dispatch, err.message) // Func from error-utils.ts
        })
}

export const deleteTodolistThunkCreator = (todoId: string) => (dispatch: Dispatch) => {

    dispatch(setAppStatusAC('loading')) // Preloader ON

    dispatch(cnangeTodoListEntityStatus(todoId, 'loading')) // To disable the button after Delete has pressed
    todolistAPI.deleteTodo(todoId)
        .then( (res) => {
            if (res.data.resultCode === ResponseStatuses.success){
                
                dispatch(removeTodolistAC(todoId))
                dispatch(setAppStatusAC('succeeded')) // Preloader OFF  
            
            } else {
                
                handleServerAppError(dispatch, res.data) // Func from error-utils.ts
            }
        })
        .catch( (err: AxiosError) => {
            
            handleServerNetworkError(dispatch, err.message) // Func from error-utils.ts
        })
}

export const updateTodoTitleThunkCreator = (todoId: string, title: string) => (dispatch: Dispatch) => {

    dispatch(setAppStatusAC('loading')) // Preloader ON

    todolistAPI.updateTodoTitle(todoId, title)
        .then( (res) => {
            
            if (res.data.resultCode === ResponseStatuses.success){
                
                dispatch(changeTodolistTitleAC(todoId, title))
                dispatch(setAppStatusAC('succeeded')) // Preloader OFF

            } else {
                
                handleServerAppError(dispatch, res.data) // Func from error-utils.ts
            }
        })
        .catch( (err: AxiosError) => {
            
            handleServerNetworkError(dispatch, err.message) // Func from error-utils.ts
        })
}

