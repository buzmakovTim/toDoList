import React, { useState, KeyboardEvent } from 'react';
import { preProcessFile } from 'typescript';
import { v1 } from 'uuid';
import { FilterValueType,  TasksStateType} from './AppWithRedux';
import { AddItemForm } from './Components/AddItemForm/AddItemForm';
import c from './Todolist.module.css';
import {EditableSpan} from './Components/EditableSpan/EditableSpan';
import { Button, Checkbox, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootState } from './Store/store';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './Store/tasks-reducer';
import { changeTodolistFilterAC, changeTodolistTitleAC } from './Store/todolists-reducer';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsTypeTodolist = {
  todolistId: string; 
  title: string;
  filter: FilterValueType;
  //tasks: TasksStateType;
  //addTask: (title: string, id: string) => void;
  //addToDoList: (title: string, id?: string) => void;
  //removeTask: (id: string, todoListId: string) => void;
  //changeFilter: (todoListId: string, filter: FilterValueType) => void;
  //changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void;
  //changeTitle: (taskId: string, newTitle: string, todoListId: string) => void;
  changeTodoListTitle: (newTitle: string, todoListId: string) => void;
  removeTodoList: (id: string) => void;
  // onChangeTitle: (newValue: string) => void;
};

export function Todolist(props: PropsTypeTodolist) {

  const tasks = useSelector<AppRootState, Array<TaskType>>( state => state.tasks[props.todolistId])
  const dispatch = useDispatch();

  // Filter functions
  const showAll = () => {
    //props.changeFilter(props.id, 'all');
    dispatch(changeTodolistFilterAC(props.todolistId, 'all'))
  };
  const showActive = () => {
    //props.changeFilter(props.id, 'active');
    dispatch(changeTodolistFilterAC(props.todolistId, 'active'))
  };
  const showCompleted = () => {
    //props.changeFilter(props.id, 'completed');
    dispatch(changeTodolistFilterAC(props.todolistId, 'completed'))
  };

  const removeTodoList = () => {
    props.removeTodoList(props.todolistId);
  }

  const changeTodoListTileHandler = (newValue: string) => {
    //props.changeTodoListTitle(props.id, newValue)
    dispatch(changeTodolistTitleAC(props.todolistId, newValue))
  }

  


    // We gonna show task only depends what filter selected
    let tasksForTodoList = tasks;
    if (props.filter === 'completed') {
      tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === true);
    }
    if (props.filter === 'active') {
      tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === false);
    }


  return (
    //<div className={c.todolistContainerw}>
      <div>
      {/* Remove todoList start*/}
      {/* <button onClick={removeTodoList} className={c.ListDeleteButton}>X</button> */}
      
      
      {/* Remove todoList end*/}

      <div className={c.titleDiv}>
        <EditableSpan title={props.title} onChangeTitle={changeTodoListTileHandler}/>
        <IconButton onClick={removeTodoList}>
                  <Delete/>
      </IconButton>
        {/* <h3 className={c.title}>{props.title}</h3> */}
      </div>
      

      <AddItemForm addItem={ (title) => {dispatch(addTaskAC(title, props.todolistId))}}/> 
      {/* addItem={props.addTask} todoListId={props.id}/> */}

      <ul>
        {tasksForTodoList.map( (t) => {
          
          const onChangeTaskTitleHandler = (newValue: string) => {
              dispatch(changeTaskTitleAC(t.id, newValue, props.todolistId))
          }
          return <li key={t.id} className={t.isDone ? "isDone" : ""}>
            <div className={c.taskLine}>
              <div>

                <Checkbox 
                    color={'primary'}
                    checked={t.isDone} 
                    // onChange={ () => {props.changeStatus(t.id, !t.isDone, props.id)}}
                    onChange={ () => {dispatch(changeTaskStatusAC(t.id, !t.isDone, props.todolistId))}}
                    />
                {/* <input onChange={ () => {props.changeStatus(t.id, !t.isDone, props.id)}} type="checkbox" checked={t.isDone} /> */}
                
                {/* <span>{t.title}</span> */}
                <EditableSpan title={t.title} onChangeTitle={onChangeTaskTitleHandler}/>
              
              {/* Remove task Button */}

              </div>
              {/* <div className={c.buttonRemoveTask}> */}
              <div>
                {/* <button
                  onClick={() => {
                    props.removeTask(t.id, props.id);
                  }}
                >
                  X
                </button> */}
                <IconButton onClick={() => {
                    // props.removeTask(t.id, props.id);
                    dispatch(removeTaskAC(t.id, props.todolistId))
                  }}>
                  <Delete/>
                </IconButton>
              </div>
            </div>
          </li>
          })}
      </ul>

      <div>
        {/* Without material-ui using CSS only */}
        {/* <button className={props.filter === "all" ? "activeFilter" : ""} onClick={showAll}>All</button>
        <button className={props.filter === "active" ? "activeFilter" : ""} onClick={showActive}>Active</button>
        <button className={props.filter === "completed" ? "activeFilter" : ""} onClick={showCompleted}>Completed</button> */}

        {/* Using material-ui */}
        <Button 
            size={'small'}
            style={{margin: '5px'}}
            variant={props.filter === "all" ? "contained" : 'outlined'}
            color={'primary'}
            //className={props.filter === "all" ? "activeFilter" : ""} 
            onClick={showAll}>All</Button>
        <Button 
            size={'small'}
            style={{margin: '5px'}}
            color={'primary'}
            variant={props.filter === "active" ? "contained" : 'outlined'}
            //className={props.filter === "active" ? "activeFilter" : ""} 
            onClick={showActive}>Active</Button>
        <Button 
            size={'small'}
            style={{margin: '5px', width: '100px'}}
            color={'primary'}
            variant={props.filter === "completed" ? "contained" : 'outlined'}
            //className={props.filter === "completed" ? "activeFilter" : ""} 
            onClick={showCompleted}>Completed</Button>
      </div>
    </div>
  );
}


