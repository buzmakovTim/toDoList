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

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'cb837fe2-1523-4fe4-be8e-89a2fb123dce'
    }
}


type CommonResponseType<T = {}> = {
    resultCode: number
    fieldsErrors: string[]
    messages: string
    data: T
}


type TodoType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export const todolistApi = {

    getTodos() {
        return instance.get<TodoType[]>('todo-lists')
    },

    createTodo(title: string) {
        return instance.post<CommonResponseType<{item: TodoType}>>('todo-lists', {title})
    },

    deleteTodo(todoId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todoId}`)
    },

    updateTodoTitle(todoId: string, title: string){
        return instance.put<CommonResponseType>(`todo-lists/${todoId}`, {title})
    }


}

