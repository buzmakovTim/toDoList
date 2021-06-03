import { FilterValueType, TasksStateType } from '../AppWithRedux';
import React from 'react';
import { v1 } from 'uuid';
import { TodoListType } from '../AppWithRedux';
import { AccessTimeOutlined } from '@material-ui/icons';
import { AddTodolistActionType, RemoveTodolistActionType, todoListId_1, todoListId_2 } from './todolists-reducer';

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}
type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    isDone: boolean
    todolistId: string
    taskId: string
} 
type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    title: string
    todolistId: string
    taskId: string
} 

type ActionsType = RemoveTaskActionType | 
                   AddTaskActionType | 
                   ChangeTaskStatusActionType | 
                   ChangeTaskTitleActionType | 
                   AddTodolistActionType | 
                   RemoveTodolistActionType


const initialState: TasksStateType = {
    [todoListId_1] : [{ id: v1(), title: 'CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'React', isDone: false },
      { id: v1(), title: 'HTML', isDone: false },],
    [todoListId_2] : [{ id: v1(), title: 'CSS', isDone: true },
      { id: v1(), title: 'Book', isDone: true },
      { id: v1(), title: 'Beer', isDone: false },
      { id: v1(), title: 'Milk', isDone: false },],
  }                

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {

    switch(action.type){

        case 'REMOVE-TASK' : {
            
            const stateCopy = {...state}
            const tasks = state[action.todolistId];
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = filteredTasks
 
            return stateCopy;
        }
        case 'ADD-TASK' : {

            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];
            const newTask = {id: v1(), title: action.title, isDone: false}
            const newTasks = [newTask, ...tasks];
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS' : {

            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];
            
            stateCopy[action.todolistId] = tasks.map( t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)
            
            return stateCopy;
        }
        case 'CHANGE-TASK-TITLE' : {

            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];

            stateCopy[action.todolistId] = tasks.map( t => t.id === action.taskId ? {...t, title: action.title} : t)
            return stateCopy;
        }
        case 'ADD-TODOLIST' : {
            const stateCopy = {...state}

            stateCopy[action.todolistId] = []

            return stateCopy
        } 
        case "REMOVE-TODOLIST" : {
            const stateCopy = {...state}
            delete stateCopy[action.id]  // delete property
            return stateCopy
        } 
        
        default: 
            return state;

    }
    
}

// Action Creators

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", todolistId, taskId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: "ADD-TASK", title, todolistId}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS", taskId, isDone, todolistId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", taskId, title, todolistId}
}

