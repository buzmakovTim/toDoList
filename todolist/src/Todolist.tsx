import React, { useCallback, useEffect } from 'react';
import { preProcessFile, StringMappingType } from 'typescript';
import { v1 } from 'uuid';
import { FilterValueType,  TasksStateType} from './AppWithRedux';
import { AddItemForm } from './Components/AddItemForm/AddItemForm';
import c from './Todolist.module.css';
import {EditableSpan} from './Components/EditableSpan/EditableSpan';
import { Button, Checkbox, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootState } from './Store/store';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, createTaskThunkCreator, fetchTasksThunkCreator, removeTaskAC } from './Store/tasks-reducer';
import { changeTodolistFilterAC, changeTodolistTitleAC, updateTodoTitleThunkCreator } from './Store/todolists-reducer';
import { Task } from './Components/Task/Task';
import { TaskStatuses, TaskType } from './api/todolist-api';
import { RequestStatusType } from './Store/app-reducer';

// export type TaskType = {
//   todoListId: string;
//   id: string;
//   title: string;
//   status: TaskStatuses;
// };

type PropsTypeTodolist = {
  todolistId: string; 
  title: string;
  filter: FilterValueType;
  changeTodoListTitle: (newTitle: string, todoListId: string) => void;
  removeTodoList: (id: string) => void;
  entityStatus: RequestStatusType;
};

export const Todolist = React.memo((props: PropsTypeTodolist) => {

  console.log('ToDolist Called')
  const tasks = useSelector<AppRootState, Array<TaskType>>( state => state.tasks[props.todolistId])
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchTasksThunkCreator(props.todolistId))
  }, [])


  // Filter functions
  const showAll = useCallback(() => {
    //props.changeFilter(props.id, 'all');
    dispatch(changeTodolistFilterAC(props.todolistId, 'all'))
  }, [changeTodolistFilterAC, props.todolistId]);
  
  const showActive = useCallback(() => {
    //props.changeFilter(props.id, 'active');
    dispatch(changeTodolistFilterAC(props.todolistId, 'active'))
  }, [changeTodolistFilterAC, props.todolistId]);
  
  const showCompleted = useCallback(() => {
    //props.changeFilter(props.id, 'completed');
    dispatch(changeTodolistFilterAC(props.todolistId, 'completed'))
  }, [changeTodolistFilterAC, props.todolistId]);

  const removeTodoList = useCallback(() => {
    props.removeTodoList(props.todolistId);
  },[props.removeTodoList, props.todolistId]);

  const changeTodoListTileHandler = useCallback((newValue: string) => {
    //props.changeTodoListTitle(props.id, newValue)
    //dispatch(changeTodolistTitleAC(props.todolistId, newValue))
    dispatch(updateTodoTitleThunkCreator(props.todolistId, newValue));

  }, [changeTodolistTitleAC, props.todolistId]);

  const addTask = useCallback((title: string) => {
    //dispatch(addTaskAC(title, props.todolistId))
    dispatch(createTaskThunkCreator(props.todolistId, title))
  },[props.todolistId, createTaskThunkCreator])


    // We gonna show task only depends what filter selected
    let tasksForTodoList = tasks;
    if (props.filter === 'completed') {
      tasksForTodoList = tasks.filter((t) => t.status === TaskStatuses.Completed);
    }
    if (props.filter === 'active') {
      tasksForTodoList = tasks.filter((t) => t.status === TaskStatuses.New);
    }


  return (
    
      <div>
      
      <div className={c.titleDiv}>
        <EditableSpan title={props.title} onChangeTitle={changeTodoListTileHandler}/>
        
        {/* Delete Button */}
        <IconButton onClick={removeTodoList} disabled={props.entityStatus === 'loading'}>
                  <Delete/>
        </IconButton>
        
        {/* <h3 className={c.title}>{props.title}</h3> */}
      </div>
      

      <AddItemForm addItem={addTask} disable={props.entityStatus === 'loading'}/> 
      {/* addItem={props.addTask} todoListId={props.id}/> */}

      <div>
        {
            tasksForTodoList.map( t => <Task 
                                          task={t} 
                                          todolistId={props.todolistId} 
                                          key={t.id}
                                        />)
        }
      </div>

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
})


