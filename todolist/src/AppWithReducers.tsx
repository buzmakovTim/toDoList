import React, { useState, useReducer } from 'react';
import logo from './logo.svg';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './Components/AddItemForm/AddItemForm';
import { EditableSpan } from './Components/EditableSpan/EditableSpan';
import { AppBar, Button, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer } from './Store/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './Store/tasks-reducer';

export type FilterValueType = 'all' | 'completed' | 'active';

export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValueType;
}
export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function AppWithReducers() {
  


  let todoListId_1 = v1();
  let todoListId_2 = v1();

  let [todoLists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
    {id: todoListId_1, title: "What to learn", filter: 'all'},
    {id: todoListId_2, title: "What to buy", filter: 'all'},
  ]);

  let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer,{
    [todoListId_1] : [{ id: v1(), title: 'CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'React', isDone: false },
      { id: v1(), title: 'HTML', isDone: false },],
    [todoListId_2] : [{ id: v1(), title: 'CSS', isDone: true },
      { id: v1(), title: 'Book', isDone: true },
      { id: v1(), title: 'Beer', isDone: false },
      { id: v1(), title: 'Milk', isDone: false },],
  
  })

  function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
    
    const action = changeTaskStatusAC(taskId, isDone, todoListId)
    dispatchToTasksReducer(action)
  }

  function changeTitle(taskId: string, newTitle: string, todoListId: string) {
    //const action = changeTaskTitleAC(taskId, newTitle, todoListId)
    dispatchToTasksReducer(changeTaskTitleAC(taskId, newTitle, todoListId))
  }

  function changeTodoListTitle(todoListId: string, newTitle: string) {
    dispatchToTodolistsReducer(changeTodolistTitleAC(todoListId, newTitle))
  }

  function changeFilter(todoListId: string, filter: FilterValueType) {
    dispatchToTodolistsReducer(changeTodolistFilterAC(todoListId, filter))
  }

  function removeTask(id: string, todoListId: string) {
    
    const action = removeTaskAC(id, todoListId)
    dispatchToTasksReducer(action)
  }

  let removeTodoList = (todoListId: string) => {
    
    const action = removeTodolistAC(todoListId)

    // We have to pass action to both dispatches as we need to remove tasks as well as todolist
    dispatchToTasksReducer(action)
    dispatchToTodolistsReducer(action)
  }

  function addTask(title: string, todolistId: string) {
    
    const action = addTaskAC(title, todolistId)
    dispatchToTasksReducer(action)
  }

  function addToDoList(title: string) {

      const action = addTodolistAC(title)
      dispatchToTasksReducer(action)
      dispatchToTodolistsReducer(action)
      
  }


  const todoListsComponents = todoLists.map( (td) => {

    let tasksForTodoList = tasksObj[td.id];
    if (td.filter === 'completed') {
      tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === true);
    }
    if (td.filter === 'active') {
      tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === false);
    }
    return (
          <Grid item key={td.id}>
              <Paper elevation={5} style={{padding: '20px'}}>
                <Todolist
                  
                  id={td.id}
                  title={td.title}
                  filter={td.filter}            
                  tasks={tasksForTodoList}
                  removeTask={removeTask}
                  addTask={addTask}
                  changeFilter={changeFilter}
                  changeStatus={changeStatus}
                  removeTodoList={removeTodoList}
                  changeTitle={changeTitle}
                  changeTodoListTitle={changeTodoListTitle}
                />
          </Paper>
          </Grid>
    )
  })

   return ( 
   <div className="App">
     
       <AppBar position={'static'}>
               <Toolbar style={{justifyContent: 'space-between'}}>
                   <IconButton color={'inherit'}>
                       <Menu />
                   </IconButton>
                   <Typography variant={'h6'}>
                     TodoLists
                   </Typography> 
                   <Button variant={'outlined'} 
                             color={'inherit'}>
                     Login
                   </Button> 
               </Toolbar>
       </AppBar> 

       {/* <div className="Title"> */}
         {/* <h3>Add NEW ToDoList</h3> */}

         {/* <EditableSpan title={"Add NEW ToDoList"}/>  */}

           <Grid container style={{padding: '20px'}}>
              <AddItemForm addItem={addToDoList}/>
           </Grid>
           <Grid container spacing={3} style={{padding: '20px'}}>
              {todoListsComponents}
           </Grid>

           
       {/* </div> */}
       {/* <div className="ToDoLists"> */}
  </ div> )
           {/* {todoLists.map( (td) => {

//             let tasksForTodoList = tasksObj[td.id];
//             if (td.filter === 'completed') {
//               tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === true);
//             }
//             if (td.filter === 'active') {
//               tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === false);
//             } */}
          
//                   return ( <div> 
                     
//                   <Grid container>
//                     <Todolist
//                         key={td.id}
//                         id={td.id}
//                         title={td.title}
//                         filter={td.filter}            
//                         tasks={tasksForTodoList}
//                         removeTask={removeTask}
//                         addTask={addTask}
//                         changeFilter={changeFilter}
//                         changeStatus={changeStatus}
//                         removeTodoList={removeTodoList}
//                         changeTitle={changeTitle}
//                         changeTodoListTitle={changeTodoListTitle}
//                       />    
//                   </Grid>    
//                 </div>)
//             } ) 
//           }
//       </div>


//     </div>
//   )
}
export default AppWithReducers;
