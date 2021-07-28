import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
import { IconButton, TextField } from '@material-ui/core';
// import c from '../../Todolist.module.css';
import { AddBox } from '@material-ui/icons';
// import { useDispatch } from 'react-redux';
// import { addTaskAC } from '../../Store/tasks-reducer';
// import { v1 } from 'uuid';
import style from './AddItemForm.module.css'

type AddItemPropsType = {
    addItem: (title: string) => void;
    disable: boolean
}

export const AddItemForm = React.memo((props: AddItemPropsType) => {

    console.log('AddItemForm has called')
    let [title, setTitle] = useState<string>('');
    let [error, setError] = useState<boolean>(false);

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)  
    }

    const addTaskOnClick = () => {

        if(title.trim() !== "" ) {
          props.addItem(title.trim());
          setTitle('');
        } else {
          setError(true);
        }
        
      };
    
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
    if(error !== false){
        setError(false);
    }
    if (e.key === 'Enter') addTaskOnClick();
    };

    return(
        <div className={style.itemForm}>
            {/* <input
            className={`${c.taskInput} ${error ? c.error: ""}`}
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
            onKeyPress={onKeyPressAddTask}
            /> */}
          <TextField
            disabled={props.disable}
            size={'small'}
            variant={'outlined'}
            error={error}
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
            onKeyPress={onKeyPressAddTask}
            label={"Title"}
            helperText={error && 'Title is required!'}
            onBlur={ () => setError(false)}
          />
        {/* <button className={c.addTaskButton} onClick={addTaskOnClick}>
          +
        </button> */}
        <IconButton disabled={props.disable} 
                    onClick={addTaskOnClick} 
                    style={{width: '5px'}} color={'primary'}>
          <AddBox 
            style={{marginLeft: '25px'}}
          />
        </IconButton>

            {/* {error && <div className={c.errorMessage}>Title is required!</div>} */}
      </div>
    )
})