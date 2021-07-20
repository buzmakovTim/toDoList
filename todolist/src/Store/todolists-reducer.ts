import { FilterValueType } from './../AppWithRedux';
import React from 'react';
import { v1 } from 'uuid';
import { TodoListType } from '../AppWithRedux';

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

// Action type
type ActionsType =  |
                    RemoveTodolistActionType | 
                    AddTodolistActionType | 
                    ReturnType<typeof changeTodolistTitleAC> | 
                    ReturnType<typeof changeTodolistFilterAC>



// Initial state empty array
const initialState: Array<TodoListType> = []


export const todolistsReducer = (state: Array<TodoListType> = initialState, action: ActionsType):Array<TodoListType> => {

    switch(action.type){

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



// For Practice
//
//
// type StateType = {
//     age: number
//     childrenCount: number
//     name: string
// }
// type ActionType = {
//     type: string
//     [key: string]: any
// }

// export const userReducer = (state: StateType, action: ActionType): StateType => {

//     switch(action.type) {

//         case "INCREMENT-AGE":
//             let newState = {...state}
//             newState.age = state.age + 1;
//             return newState

//         case "INCREMENT-CHILDREN-COUNT":
            
//         // another way to copy and return state
//             return {
//                 ...state,
//                 childrenCount: state.childrenCount + 1
//             }

//         case "CHANGE-NAME":
//             return {
//                 ...state,
//                 name: action.newName 
//             }
            
//         default:
//             throw new Error("I don't know what to do")
//     }

// }
