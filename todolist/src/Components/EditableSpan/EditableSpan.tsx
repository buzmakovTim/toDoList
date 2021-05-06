import React, { ChangeEvent, useState } from 'react';



type EditableSpanPropsType = {
    title: string
    onChangeTitle: (newValue: string) => void;
  }
  
export function EditableSpan(props: EditableSpanPropsType) {
  
    let [editMode, setEditMode] = useState(false)
    let [title, setTile] = useState('')

    let activateEditMode = () => {
        setTile(props.title)
        setEditMode(true)
    }

    let deactivateEditMode = () => {
    
        setEditMode(false)
        props.onChangeTitle(title)
    }
    const onChangeTitleHandler = (e : ChangeEvent<HTMLInputElement>) => setTile(e.currentTarget.value);

      return (    
        editMode ?
        <input value={title} onChange={onChangeTitleHandler} onBlur={deactivateEditMode} autoFocus></input> :
        <span onDoubleClick={activateEditMode}>{props.title}</span>
      )
  }