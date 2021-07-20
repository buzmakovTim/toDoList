import axios from 'axios'
import React, {useEffect, useState} from 'react' 
import { todolistAPI } from '../api/todolist-api'


export default { 

   title: 'API' 

}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'cb837fe2-1523-4fe4-be8e-89a2fb123dce'
    }
}


// Get TodoList start
export const GetTodolists = () => { 

   const [state, setState] = useState<any>(null) 

   useEffect(() => { 

    todolistAPI.getTodos()
            .then( (res) => {
                setState(res.data)
            })
   }, []) 

   return <div> {JSON.stringify(state)}</div>  
}
// Get TodoList end


// Create TodoList start
export const CreateTodolist = () => { 

   const [state, setState] = useState<any>(null) 

   useEffect(() => { 

    let title = 'Testing Title'

    todolistAPI.createTodo(title)
            .then( (res) => {
                
                setState(res.data)
            })
   }, []) 

   return <div> {JSON.stringify(state)}</div> 
} 
// Create TodoList end


export const DeleteTodolist = () => { 

   const [state, setState] = useState<any>(null) 

   useEffect(() => { 

        const todoId = "057fb129-6e44-44da-810d-25d2e9092229"

        todolistAPI.deleteTodo(todoId)
            .then((res)=>{
                setState(res.data.data)
            }) 

   }, []) 

 

   return <div> {JSON.stringify(state)}</div> 

} 

export const UpdateTodolistTitle = () => { 

   const [state, setState] = useState<any>(null) 

   useEffect(() => { 

        const todoId = "057fb129-6e44-44da-810d-25d2e9092229"
        const title = 'React NEW!'

        todolistAPI.updateTodoTitle(todoId, title)
        .then((res)=>{
            setState(res.data.data)
        }) 

   }, []) 

 

   return <div> {JSON.stringify(state)}</div> 

} 