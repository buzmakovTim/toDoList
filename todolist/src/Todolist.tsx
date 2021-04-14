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
  tasks: Array<TaskType>;
  addTask: (title: string) => void;
  removeTask: (id: string) => void;
  changeFilter: (value: FilterValueType) => void;
};

export function Todolist(props: PropsTypeTodolist) {
  const [title, setTitle] = useState<string>('');

  const addTaskOnClick = () => {
    props.addTask(title);
    setTitle('');
  };

  // KeyboardEvent we neet to import
  const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
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

  return (
    <div>
      <h3>{props.title}</h3>

      <div>
        <input
          className={c.taskInput}
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          onKeyPress={onKeyPressAddTask}
        />
        <button className={c.addTaskButton} onClick={addTaskOnClick}>
          +
        </button>
      </div>
      <ul>
        {props.tasks.map((t) => (
          <li>
            <div className={c.taskLine}>
              <div>
                <input type="checkbox" checked={t.isDone} />
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
        <button onClick={showAll}>All</button>
        <button onClick={showActive}>Active</button>
        <button onClick={showCompleted}>Completed</button>
      </div>
    </div>
  );
}
