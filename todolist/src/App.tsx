import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';

export type FilterValueType = 'all' | 'completed' | 'active';

type TodoListType = {
  id: string;
  title: string;
  filter: FilterValueType;
}

function App() {
  


  let todoListId_1 = v1();
  let todoListId_2 = v1();

  let [todoLists, setTodoLists] = useState<Array<TodoListType>> ([
    {id: todoListId_1, title: "What to learn", filter: 'active'},
    {id: todoListId_2, title: "What to buy", filter: 'completed'},
  ]);

  let [tasksObj, setTasks] = useState({
    [todoListId_1] : [{ id: v1(), title: 'CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'React', isDone: false },
      { id: v1(), title: 'HTML', isDone: false },],
    [todoListId_2] : [{ id: v1(), title: 'CSS', isDone: true },
      { id: v1(), title: 'Book', isDone: true },
      { id: v1(), title: 'Beer', isDone: false },
      { id: v1(), title: 'Milk', isDone: false },],
  
  })

  function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
    let tasks = tasksObj[todoListId];
    let task = tasks.find(t => t.id === taskId);
    if(task) {
      task.isDone = isDone;
      
      setTasks({...tasksObj});
    }
  }

  //let [filter, setFilter] = useState<FilterValueType>('all');

  function changeFilter(value: FilterValueType, todoListId: string) {
    let todoList = todoLists.find(tl => tl.id === todoListId);
    if(todoList) {
      todoList.filter = value;
      setTodoLists([...todoLists]);
    }
    //setFilter(value);
  }

  // let tasksForTodoList = tasks;
  // if (filter === 'completed') {
  //   tasksForTodoList = tasks.filter((t) => t.isDone === true);
  // }
  // if (filter === 'active') {
  //   tasksForTodoList = tasks.filter((t) => t.isDone === false);
  // }

  function removeTask(id: string, todoListId: string) {
    // alert(id)
    let tasks = tasksObj[todoListId]
    let filteredTasks = tasks.filter((t) => t.id != id);
    tasksObj[todoListId] = filteredTasks;

    setTasks({...tasksObj});
  }

  let removeTodoList = (todoListId: string) => {
    let filteredTodolist = todoLists.filter(tl => tl.id !== todoListId)
    setTodoLists(filteredTodolist);
    delete tasksObj[todoListId];
    setTasks({...tasksObj});
  }

  function addTask(title: string, todoListId: string) {
    
    let task = {id: v1(), title: title, isDone: false};
    let tasks = tasksObj[todoListId];
    
    let newTasks = [task, ...tasks];
    tasksObj[todoListId] = newTasks
    setTasks({...tasksObj});
  }

  return (
    <div className="App">
      
      {
       todoLists.map( (td) => {

        let tasksForTodoList = tasksObj[td.id];
        if (td.filter === 'completed') {
          tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === true);
        }
        if (td.filter === 'active') {
          tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === false);
        }
      



              return  <Todolist
                  key={td.id}
                  id={td.id}
                  title={td.title}
                  filter={td.filter}            
                  tasks={tasksForTodoList}
                  removeTask={removeTask}
                  addTask={addTask}
                  changeFilter={changeFilter}
                  changeStatus={changeStatus}
                  removeTodoList={removeTodoList}
                />

         } ) 
      }

    </div>
  );
}

export default App;
