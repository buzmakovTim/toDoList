import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';

export type FilterValueType = 'all' | 'completed' | 'active';

function App() {
  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: 'CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'React', isDone: false },
    { id: v1(), title: 'HTML', isDone: false },
  ]);


  function changeStatus(taskId: string, isDone: boolean) {
    let task = tasks.find( t => t.id === taskId)
    if(task) {
      task.isDone = !task.isDone;
    }
    
    setTasks([... tasks]);
  }

  let [filter, setFilter] = useState<FilterValueType>('all');

  function changeFilter(value: FilterValueType) {
    setFilter(value);
  }

  let tasksForTodoList = tasks;
  if (filter === 'completed') {
    tasksForTodoList = tasks.filter((t) => t.isDone === true);
  }
  if (filter === 'active') {
    tasksForTodoList = tasks.filter((t) => t.isDone === false);
  }

  function removeTask(id: string) {
    // alert(id)
    let filteredTasks = tasks.filter((t) => t.id !== id);
    setTasks(filteredTasks);
  }

  function addTask(title: string) {
    const newTask: TaskType = {
      id: v1(),
      title: title,
      isDone: false,
    };
    setTasks([newTask, ...tasks]);
  }

  return (
    <div className="App">
      <Todolist
        filter={filter}
        title="Tasks to do!"
        tasks={tasksForTodoList}
        removeTask={removeTask}
        addTask={addTask}
        changeFilter={changeFilter}
        changeStatus={changeStatus}
      />
    </div>
  );
}

export default App;
