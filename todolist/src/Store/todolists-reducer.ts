import { FilterValueType } from './../AppWithRedux';
import React from 'react';
import { v1 } from 'uuid';
import  { Dispatch } from 'redux'
import { TodoListType } from '../AppWithRedux';
import { AppRootState } from './store';
import { todolistAPI } from '../api/todolist-api';

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
                    SetTodoListActionType


export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodoListType & {
    filter: FilterValuesType;
}
// Initial state empty array
const initialState: Array<TodoListType> = []


export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType):Array<TodolistDomainType> => {

    switch(action.type){

        case 'SET-TODOLISTS': {
            
            return action.todolists.map( (tl) => {
                return {...tl, filter: 'all'}
            }) 
            
        }

        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id != action.id)
        }

        case 'ADD-TODOLIST': {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all'
            }, ...state]
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
            
        default: 
            return state;

    }
    
}


// Action Creators

export const removeTodolistAC = (todolistId: string) => {
    return {type: "REMOVE-TODOLIST", id: todolistId} as const
}
export const addTodolistAC = (title: string) => {
    return {type: "ADD-TODOLIST", title: title, todolistId: v1()} as const
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

//
//thunk creators
//
export const fetchTodolistsThunkCreator = () => (dispatch: Dispatch, getState: () => AppRootState) => {

    // 1 server requests
    todolistAPI.getTodos()
      .then( (res) => {
         
        // 2 dispatch actions
        dispatch(setTodoListsAC(res.data))
      } ) 
}


