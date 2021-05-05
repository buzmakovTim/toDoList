import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
import c from '../../Todolist.module.css';

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
    )
}