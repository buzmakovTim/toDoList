import React, { useState, KeyboardEvent } from 'react';
import { v1 } from 'uuid';
import { FilterValueType } from './App';
import { AddItemForm } from './Components/AddItemForm/AddItemForm';
import c from './Todolist.module.css';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsTypeTodolist = {
  id: string; 
  title: string;
  filter: FilterValueType;
  tasks: Array<TaskType>;
  addTask: (title: string, id: string) => void;
  //addToDoList: (title: string, id?: string) => void;
  removeTask: (id: string, todoListId: string) => void;
  changeFilter: (value: FilterValueType, todoListId: string) => void;
  changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void;
  removeTodoList: (id: string) => void;
};

export function Todolist(props: PropsTypeTodolist) {
  
  //let [title, setTitle] = useState<string>(''); // dont need 
  //let [error, setError] = useState<string | null>(null); // dont need

  // const addTaskOnClick = () => {

  //   if(title.trim() !== "" ) {
  //     props.addTask(title.trim(), props.id);
  //     setTitle('');
  //   } else {
  //     setError("Title is required!");
  //   }
    
  // };

  // KeyboardEvent we neet to import // dont need
  // const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
  //   setError(null);
  //   if (e.key === 'Enter') addTaskOnClick();
  // };

  // Filter functions
  const showAll = () => {
    props.changeFilter('all', props.id);
  };
  const showActive = () => {
    props.changeFilter('active', props.id);
  };
  const showCompleted = () => {
    props.changeFilter('completed', props.id);
  };

  const removeTodoList = () => {
    props.removeTodoList(props.id);
  }
  //const onChangeHandler = () => {props.changeStatus()};

  return (
    <div className={c.todolistContainer}>
      <button onClick={removeTodoList} className={c.ListDeleteButton}>X</button>
      <div className={c.titleDiv}>
        <h3 className={c.title}>{props.title}</h3>
      </div>
      

      <AddItemForm addItem={props.addTask} todoListId={props.id}/>
      {/* <div>
        <input
          className={`${c.taskInput} ${error ? c.error: ""}`}
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          onKeyPress={onKeyPressAddTask}
        />
        <button className={c.addTaskButton} onClick={addTaskOnClick}>
          +
        </button>
        {error && <div className={c.errorMessage}>Title is required!</div>}
      </div> */}
      <ul>
        {props.tasks.map((t) => (
          <li className={t.isDone ? "isDone" : ""}>
            <div className={c.taskLine}>
              <div>
                <input onChange={ () => {props.changeStatus(t.id, !t.isDone, props.id)}} type="checkbox" checked={t.isDone} />
                <span>{t.title}</span>
              </div>
              <div className={c.buttonRemoveTask}>
                <button
                  onClick={() => {
                    props.removeTask(t.id, props.id);
                  }}
                >
                  X
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div>
        <button className={props.filter === "all" ? "activeFilter" : ""} onClick={showAll}>All</button>
        <button className={props.filter === "active" ? "activeFilter" : ""} onClick={showActive}>Active</button>
        <button className={props.filter === "completed" ? "activeFilter" : ""} onClick={showCompleted}>Completed</button>
      </div>
    </div>
  );
}
