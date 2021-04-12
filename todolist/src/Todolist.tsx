import React, { useState, KeyboardEvent } from 'react';
import { FilterValueType } from './App';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsTypeTodolist = {
    title: string,
    tasks: Array<TaskType>
    addTask: (title: string) => void
    removeTask: (id: string) => void
    changeFilter: (value: FilterValueType) => void 
}

export function Todolist(props: PropsTypeTodolist) {
    
  const [title, setTitle] = useState<string>("")
  
  const addTaskOnClick = () => {
    props.addTask(title)
    setTitle("")
  }

  // KeyboardEvent we neet to import 
  const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Enter")
      addTaskOnClick()
  }
  
  return (
       
       <div>
         <h3>{props.title}</h3>
         
         <div>
           <input
                value={title}
                onChange={( e => setTitle(e.currentTarget.value))}
                onKeyPress={onKeyPressAddTask}
           />
           <button onClick = {addTaskOnClick}>+</button>
         </div>
         <ul>

          {
            props.tasks.map( t => <li><input type="checkbox" checked={t.isDone}/><span>{t.title}</span>
            
            <button onClick = { () => {props.removeTask(t.id)}}>X</button>
            </li>
            ) 
          }
           </ul>
           
         <div>
           <button onClick = { () => {props.changeFilter("all")}}>All</button>
           <button onClick = { () => {props.changeFilter("active")}}>Active</button>
           <button onClick = { () => {props.changeFilter("completed")}}>Completed</button>
         </div>
       </div>
 
    )
 }

 