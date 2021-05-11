import React, { useState, KeyboardEvent } from 'react';
import { preProcessFile } from 'typescript';
import { v1 } from 'uuid';
import { FilterValueType } from './App';
import { AddItemForm } from './Components/AddItemForm/AddItemForm';
import c from './Todolist.module.css';
import {EditableSpan} from './Components/EditableSpan/EditableSpan';
import { IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

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
  changeTitle: (taskId: string, newTitle: string, todoListId: string) => void;
  changeTodoListTitle: (newTitle: string, todoListId: string) => void;
  removeTodoList: (id: string) => void;
  // onChangeTitle: (newValue: string) => void;
};

export function Todolist(props: PropsTypeTodolist) {

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

  const changeTodoListTileHandler = (newValue: string) => {
    props.changeTodoListTitle(props.id, newValue)
  }

  
  //const onChangeHandler = () => {props.changeStatus()};

  return (
    <div className={c.todolistContainer}>
      <button onClick={removeTodoList} className={c.ListDeleteButton}>X</button>
      <div className={c.titleDiv}>
        <EditableSpan title={props.title} onChangeTitle={changeTodoListTileHandler}/>
        {/* <h3 className={c.title}>{props.title}</h3> */}
      </div>
      

      <AddItemForm addItem={props.addTask} todoListId={props.id}/>
    
      <ul>
        {props.tasks.map( (t) => {
          
          const onChangeTaskTitleHandler = (newValue: string) => {
              props.changeTitle(t.id, newValue, props.id)
          }
          return <li key={t.id} className={t.isDone ? "isDone" : ""}>
            <div className={c.taskLine}>
              <div>
                <input onChange={ () => {props.changeStatus(t.id, !t.isDone, props.id)}} type="checkbox" checked={t.isDone} />
                {/* <span>{t.title}</span> */}
                <EditableSpan title={t.title} onChangeTitle={onChangeTaskTitleHandler}/>
              </div>
              <div className={c.buttonRemoveTask}>
                {/* <button
                  onClick={() => {
                    props.removeTask(t.id, props.id);
                  }}
                >
                  X
                </button> */}
                <IconButton onClick={() => {
                    props.removeTask(t.id, props.id);
                  }}>
                  <Delete/>
                </IconButton>
              </div>
            </div>
          </li>
          })}
      </ul>

      <div>
        <button className={props.filter === "all" ? "activeFilter" : ""} onClick={showAll}>All</button>
        <button className={props.filter === "active" ? "activeFilter" : ""} onClick={showActive}>Active</button>
        <button className={props.filter === "completed" ? "activeFilter" : ""} onClick={showCompleted}>Completed</button>
      </div>
    </div>
  );
}


