import { FilterValueType } from './../App';
import React from 'react';
import { v1 } from 'uuid';
import { TodoListType } from '../App';

type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST",
    id: string
}
export type AddTodolistActionType = {
    type: "ADD-TODOLIST",
    title: string
}
type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE",
    id: string
    title: string
}
type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER",
    id: string
    filter: FilterValueType
}
type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType



export const todolistsReducer = (state: Array<TodoListType>, action: ActionsType):Array<TodoListType> => {

    switch(action.type){

        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id != action.id)
        }

        case 'ADD-TODOLIST': {
            return [...state, {
                id: v1(),
                title: action.title,
                filter: 'all'
            }]
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
            throw new Error("I don't understand action type")

    }
    
}

// Action Creators

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: "REMOVE-TODOLIST", id: todolistId}
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {type: "ADD-TODOLIST", title: title}
}
export const changeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", id: todolistId, title: title}
}
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValueType): ChangeTodolistFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", id: todolistId, filter: filter}
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
