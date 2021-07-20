import { FilterValueType, TasksStateType } from '../AppWithRedux';
import React from 'react';
import { v1 } from 'uuid';
import  { Dispatch } from 'redux'
import { TodoListType } from '../AppWithRedux';
import { AccessTimeOutlined } from '@material-ui/icons';
import { AddTodolistActionType, RemoveTodolistActionType, SetTodoListActionType, } from './todolists-reducer';
import { todolistAPI } from '../api/todolist-api';
import { TaskType } from '../Todolist';


//Action type
type ActionsType = |
                    ReturnType<typeof removeTaskAC> | 
                    ReturnType<typeof addTaskAC> | 
                    ReturnType<typeof  changeTaskStatusAC> | 
                    ReturnType<typeof changeTaskTitleAC> | 
                    AddTodolistActionType | 
                    RemoveTodolistActionType | 
                    SetTodoListActionType |
                    ReturnType<typeof fetchTasksAC>


// Initial state
const initialState: TasksStateType = {
    // [todoListId_1] : [{ id: v1(), title: 'CSS', isDone: true },
    //   { id: v1(), title: 'JS', isDone: true },
    //   { id: v1(), title: 'React', isDone: false },
    //   { id: v1(), title: 'HTML', isDone: false },],
    // [todoListId_2] : [{ id: v1(), title: 'CSS', isDone: true },
    //   { id: v1(), title: 'Book', isDone: true },
    //   { id: v1(), title: 'Beer', isDone: false },
    //   { id: v1(), title: 'Milk', isDone: false },],
  }                

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {

    switch(action.type){

        
        case 'SET-TODOLISTS':{
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            }) 
            
            return stateCopy;
        }
        
        case 'SET-TUSKS': {
            const stateCopy = {...state}
            stateCopy[action.todoId] = action.tasks
            return stateCopy
        }

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

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: "REMOVE-TASK", todolistId, taskId} as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {type: "ADD-TASK", title, todolistId} as const
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {type: "CHANGE-TASK-STATUS", taskId, isDone, todolistId} as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: "CHANGE-TASK-TITLE", taskId, title, todolistId} as const
}

export const fetchTasksAC = (todoId: string, tasks: Array<TaskType>) => {
    return {type: 'SET-TUSKS', todoId, tasks} as const
}

//
//Thunk creator
//
export const fetchTasksThunkCreator = (todoId: string) => {

    return (dispatch: Dispatch) => {

        todolistAPI.getTasks(todoId)
            .then((res)=> {
                dispatch(fetchTasksAC(todoId, res.data.items))
            }) 
    }
}

export const deleteTaskThunkCreator = (todoId: string, taskId: string) => {
    return (dispatch: Dispatch) => {

        todolistAPI.deleteTask(todoId, taskId)
            .then( (res) => {
                
                if (res.data.resultCode === 0){
                    dispatch(removeTaskAC(taskId, todoId))
                }
            })
    }
}

export const createTaskThunkCreator = (todoId: string, title: string) => {
    return (dispatch: Dispatch) => {

        todolistAPI.createTask(todoId, title)
            .then( (res) => {
                
                if (res.data.resultCode === 0){
                    dispatch(addTaskAC(title, todoId))
                }
            })
    }
}