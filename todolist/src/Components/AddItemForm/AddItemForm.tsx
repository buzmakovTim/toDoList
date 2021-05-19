import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
import { Button, IconButton, TextField } from '@material-ui/core';
import c from '../../Todolist.module.css';
import { AddBox } from '@material-ui/icons';

type AddItemPropsType = {
    addItem: (title: string, id: string) => void;
    todoListId?: string
}

export function AddItemForm(props: AddItemPropsType) {

    let [title, setTitle] = useState<string>('');
    let [error, setError] = useState<boolean>(false);

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const addTaskOnClick = () => {

        if(title.trim() !== "" ) {
          props.addItem(title.trim(), props.todoListId ? props.todoListId : '');
          setTitle('');
        } else {
          setError(true);
        }
        
      };
    
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(false);
    if (e.key === 'Enter') addTaskOnClick();
    };

    return(
        <div>
            {/* <input
            className={`${c.taskInput} ${error ? c.error: ""}`}
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
            onKeyPress={onKeyPressAddTask}
            /> */}
          <TextField
            size={'small'}
            variant={'outlined'}
            error={error}
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
            onKeyPress={onKeyPressAddTask}
            label={"Title"}
            helperText={error && 'Title is required!'}
          />
        {/* <button className={c.addTaskButton} onClick={addTaskOnClick}>
          +
        </button> */}
        <IconButton onClick={addTaskOnClick} style={{width: '5px'}} color={'primary'}>
          <AddBox 
            style={{marginLeft: '25px'}}
          />
        </IconButton>

            {/* {error && <div className={c.errorMessage}>Title is required!</div>} */}
      </div>
    )
}