import React, {useCallback, ChangeEvent} from 'react'
import { useDispatch } from 'react-redux';
import { changeTaskStatusAC, changeTaskTitleAC, deleteTaskThunkCreator, removeTaskAC, updateTaskStatusThunkCreator } from '../../Store/tasks-reducer';
import { TaskType } from '../../Todolist';
import { EditableSpan } from '../EditableSpan/EditableSpan';
import { Delete } from '@material-ui/icons';
import { Button, Checkbox, IconButton } from '@material-ui/core';
import style from './Task.module.css';
import { TaskStatuses } from '../../api/todolist-api';

type TaskPropsType = {
    todolistId: string,
    task: TaskType
  
  } 
  
export const Task = React.memo((props: TaskPropsType) => {

      
      const dispatch = useDispatch();  
  
      const onChangeTaskTitleHandler = useCallback((newValue: string) => {
          dispatch(changeTaskTitleAC(props.task.id, newValue, props.todolistId))
      }, [])

      const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        //props.changeTaskStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
        dispatch(updateTaskStatusThunkCreator(props.todolistId, props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New))

    }, [props.task.id, props.todolistId]);

  
  return <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? "isDone" : ""}>
    <div className={style.taskLine}>
      <div>
  
        <Checkbox 
            color={'primary'}
            checked={props.task.status === TaskStatuses.Completed} 
            // onChange={ () => {props.changeStatus(t.id, !t.isDone, props.id)}}
            onChange={onChangeHandler}
            />
        {/* <input onChange={ () => {props.changeStatus(t.id, !t.isDone, props.id)}} type="checkbox" checked={t.isDone} /> */}
        
        {/* <span>{t.title}</span> */}
        <EditableSpan title={props.task.title} onChangeTitle={onChangeTaskTitleHandler}/>
      
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
            //dispatch(removeTaskAC(props.task.id, props.todolistId))
            dispatch(deleteTaskThunkCreator(props.todolistId, props.task.id))

          }}>
          <Delete/>
        </IconButton>
      </div>
    </div>
  </div>
  })