import React, { useState, KeyboardEvent } from 'react';
import { FilterValueType } from './App';
import c from './Todolist.module.css';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsTypeTodolist = {
  title: string;
  filter: FilterValueType;
  tasks: Array<TaskType>;
  addTask: (title: string) => void;
  removeTask: (id: string) => void;
  changeFilter: (value: FilterValueType) => void;
  changeStatus: (taskId: string, isDone: boolean) => void;
};

export function Todolist(props: PropsTypeTodolist) {
  
  let [title, setTitle] = useState<string>('');
  let [error, setError] = useState<string | null>(null);

  const addTaskOnClick = () => {

    if(title.trim() !== "" ) {
      props.addTask(title.trim());
      setTitle('');
    } else {
      setError("Title is required!");
    }
    
  };

  // KeyboardEvent we neet to import
  const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === 'Enter') addTaskOnClick();
  };

  // Filter functions
  const showAll = () => {
    props.changeFilter('all');
  };
  const showActive = () => {
    props.changeFilter('active');
  };
  const showCompleted = () => {
    props.changeFilter('completed');
  };

  //const onChangeHandler = () => {props.changeStatus()};

  return (
    <div>
      <h3>{props.title}</h3>

      <div>
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
      </div>
      <ul>
        {props.tasks.map((t) => (
          <li className={t.isDone ? "isDone" : ""}>
            <div className={c.taskLine}>
              <div>
                <input onChange={ () => {props.changeStatus(t.id, !t.isDone)}} type="checkbox" checked={t.isDone} />
                <span>{t.title}</span>
              </div>
              <div className={c.buttonRemoveTask}>
                <button
                  onClick={() => {
                    props.removeTask(t.id);
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
