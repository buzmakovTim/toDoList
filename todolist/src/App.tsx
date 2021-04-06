import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {TaskType, Todolist} from './Todolist';

export type FilterValueType = "all" | "completed" | "active";

function App() {


  let [tasks, setTasks] = useState<Array<TaskType>>([
    {id: 1, title: "CSS", isDone: true},
    {id: 2, title: "JS", isDone: true},
    {id: 3, title: "React", isDone: false},
    {id: 4, title: "HTML", isDone: false},
  ]);

  let [filter, setFilter] = useState<FilterValueType>("all") 
  
  function changeFilter(value: FilterValueType) {
      setFilter(value);
  }
  
  let tasksForTodoList = tasks;
  if(filter === "completed") {
    tasksForTodoList = tasks.filter( t => t.isDone === true);
  }
  if(filter === "active") {
    tasksForTodoList = tasks.filter( t => t.isDone === false); 
  }

  function removeTask (id: number) {
    // alert(id)
    let filteredTasks = tasks.filter( t => t.id !== id);
    setTasks(filteredTasks);
  }


  return (
    <div className="App">

      <Todolist title="What to learn" 
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                />

      
    </div>
  );
}




export default App;
