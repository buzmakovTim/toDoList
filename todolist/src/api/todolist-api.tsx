import axios from 'axios'
import React, {useCallback} from 'react'
import { DeleteTodolist } from '../Store/todolists-api.stories'

const instance = axios.create({
   baseURL: 'https://social-network.samuraijs.com/api/1.1/',
   withCredentials: true,
    headers: {
        'API-KEY': 'cb837fe2-1523-4fe4-be8e-89a2fb123dce'
    } 
})


export type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

//type
// type TodoType = {
//     id: string
//     title: string
//     addedDate: string
//     order: number
// }

// export const todolistAPI = {

//     getTodos() {
//         return instance.get<TodoType[]>('todo-lists')
//     },

//     createTodo(title: string) {
//         return instance.post<CommonResponseType<{item: TodoType}>>('todo-lists', {title})
//     },

//     deleteTodo(todoId: string) {
//         return instance.delete<CommonResponseType>(`todo-lists/${todoId}`)
//     },

//     updateTodoTitle(todoId: string, title: string){
//         return instance.put<CommonResponseType>(`todo-lists/${todoId}`, {title})
//     }
// }

// Without types

export const todolistAPI = {

    getTodos() {
        //return instance.get('todo-lists')
        const promise = instance.get<TodoListType[]>('todo-lists');
        return promise;
    },

    createTodo(title: string) {
        //return instance.post('todo-lists', {title})
        const promise = instance.post<ResponseType<{ item: TodoListType }>>('todo-lists', {title: title});
        return promise;
    },

    deleteTodo(todoId: string) {
        //return instance.delete(`todo-lists/${todoId}`)
        const promise = instance.delete<ResponseType>(`todo-lists/${todoId}`);
        return promise;
    },

    updateTodoTitle(todoId: string, title: string){
        //return instance.put(`todo-lists/${todoId}`, {title})
        const promise = instance.put<ResponseType>(`todo-lists/${todoId}`, {title: title});
        return promise;
    },

    getTasks(todolistId: string){
        //return instance.get(`todo-lists/${todoId}/tasks`)
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
    },

    deleteTask(todolistId: string, taskId: string){
        //return instance.delete(`todo-lists/${todoId}/tasks/${taskId}`)
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
    },

    createTask(todolistId: string, title: string) {
        //return instance.post(`todo-lists/${todoId}/tasks`, {title})
        return instance.post<ResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title});
    },

    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        //return instance.post(`todo-lists/${todolistId}/tasks/${taskId}`, model)
        return instance.put<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    }
}

export type LoginType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

export const authAPI = {

    login(data: LoginType) {
        const promise = instance.post<ResponseType<{userId: number}>>('auth/login', data);
        return promise;
    },
    me() {
        const promise = instance.get<ResponseType<{id: number, email: string, login: string}>>('auth/me');
        return promise;
    },
    logout(){
        const promise = instance.delete<ResponseType>('auth/login');
        return promise;
    }
    
}

