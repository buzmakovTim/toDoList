
import { AppRootState } from './store';
// import { TaskType } from './../Todolist';
import { FilterValueType, TasksStateType } from '../App';
import React from 'react';
import { v1 } from 'uuid';
import  { Dispatch } from 'redux'
import { AccessTimeOutlined } from '@material-ui/icons';
import { AddTodolistActionType, RemoveTodolistActionType, SetTodoListActionType, } from './todolists-reducer';
import { TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType } from '../api/todolist-api';
import { setAppErrorAC, setAppStatusAC } from './app-reducer';



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

//export type TaskStatuses = number;

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
            const tasks = stateCopy[action.task.todoListId];
            const newTasks = [action.task, ...tasks];
            stateCopy[action.task.todoListId] = newTasks;
            
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS' : {

            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];
            
            stateCopy[action.todolistId] = tasks.map( t => t.id === action.taskId ? {...t, status: action.status} : t)
            
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

            stateCopy[action.todolist.id] = []

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
export const addTaskAC = (task: TaskType) => {
    return {type: "ADD-TASK", task} as const
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) => {
    return {type: "CHANGE-TASK-STATUS", taskId, status, todolistId} as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: "CHANGE-TASK-TITLE", taskId, title, todolistId} as const
}

export const fetchTasksAC = (todoId: string, tasks: Array<TaskType>) => {
    return {type: 'SET-TUSKS', todoId, tasks} as const
}


// Response code from Server 
enum ResponseStatuses {
    success = 0,
    error = 1,
    captcha = 10
}
//
//Thunk creator
//
export const fetchTasksThunkCreator = (todoId: string) => (dispatch: Dispatch) => {

        dispatch(setAppStatusAC('loading')) // Preloader ON
        
        todolistAPI.getTasks(todoId)
            .then((res)=> {

                dispatch(fetchTasksAC(todoId, res.data.items))
                dispatch(setAppStatusAC('succeeded')) // Preloader OFF 
        }) 
    
}

export const deleteTaskThunkCreator = (todoId: string, taskId: string) => (dispatch: Dispatch) => {

        dispatch(setAppStatusAC('loading')) // Preloader ON
        
        todolistAPI.deleteTask(todoId, taskId)
            .then( (res) => {
                
                if (res.data.resultCode === ResponseStatuses.success){
                    dispatch(removeTaskAC(taskId, todoId))
                    dispatch(setAppStatusAC('succeeded')) // Preloader OFF
                }
            })
}

export const createTaskThunkCreator = (todoId: string, title: string) => (dispatch: Dispatch) => {

        dispatch(setAppStatusAC('loading')) // Preloader ON
        
        todolistAPI.createTask(todoId, title)
            .then( (res) => {
                // debugger
                if (res.data.resultCode === ResponseStatuses.success){
                    const task = res.data.data.item
                    
                    dispatch(addTaskAC(task))
                    dispatch(setAppStatusAC('succeeded')) // Preloader OFF
                } else {
                    // Check if message has any ite,s at all
                    if(res.data.messages.length){
                        dispatch(setAppErrorAC(res.data.messages[0]))    
                    } else {
                        dispatch(setAppErrorAC('Some error occurred'))    
                    }
                    dispatch(setAppStatusAC('failed')) // Preloader OFF
                }
            })
}

export const updateTaskStatusThunkCreator = (todoId: string, taskId: string, status: TaskStatuses) => (dispatch: Dispatch, getState: () => AppRootState ) => {

        dispatch(setAppStatusAC('loading')) // Preloader ON

        const state = getState();
        const allTasks = state.tasks;
        const allTasksForClickedTodo = allTasks[todoId]
        const clickedTask = allTasksForClickedTodo.find( (t) => {
            return t.id === taskId
        }) 

        //const model: any = {...clickedTask, status}
        
        if(clickedTask) {

            const model: UpdateTaskModelType = {
                title: clickedTask.title,
                status: status,
                description: clickedTask.description,
                startDate: clickedTask.startDate,
                priority: clickedTask.priority,
                deadline: clickedTask.deadline
            }

            todolistAPI.updateTask(todoId, taskId, model)
            .then( (res) => {
                dispatch(changeTaskStatusAC(taskId, status, todoId))
                dispatch(setAppStatusAC('failed')) // Preloader OFF
            })
        }
}

export const updateTaskTitleTC = (todoId: string, taskId: string, title: string) => (dispatch: Dispatch, getState: () => AppRootState ) => {

        dispatch(setAppStatusAC('loading')) // Preloader ON

        const state = getState();
        const allTasks = state.tasks;
        const allTasksForClickedTodo = allTasks[todoId]
        const clickedTask = allTasksForClickedTodo.find( (t) => {
            return t.id === taskId
        }) 
        
        if(clickedTask) {

            //@ts-ignore
            const model: UpdateTaskModelType = {
                title: title,
                status: clickedTask.status,
                description: clickedTask.description,
                startDate: clickedTask.startDate,
                priority: clickedTask.priority,
                deadline: clickedTask.deadline
            }

            todolistAPI.updateTask(todoId, taskId, model)
            .then( (res) => {
                dispatch(changeTaskTitleAC(taskId, title, todoId))
                dispatch(setAppStatusAC('succeeded')) // Preloader OFF
            })
        }
}