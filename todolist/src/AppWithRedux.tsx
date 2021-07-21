import React, {useCallback, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './Components/AddItemForm/AddItemForm';
import { EditableSpan } from './Components/EditableSpan/EditableSpan';
import { AppBar, Button, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, createTodolistThunkCreator, deleteTodolistThunkCreator, fetchTodolistsThunkCreator, removeTodolistAC, setTodoListsAC, TodolistDomainType, todolistsReducer } from './Store/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './Store/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootState } from './Store/store';
import { TaskType, todolistAPI } from './api/todolist-api';

export type FilterValueType = 'all' | 'completed' | 'active';

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function AppWithRedux() {
  console.log('App Called');
  

  const dispatch = useDispatch();
  const todoLists = useSelector<AppRootState, Array<TodolistDomainType>>( state => state.todolist)
  

  // UseEffect Side effect
  useEffect(() => {
    //using thunk
    dispatch(fetchTodolistsThunkCreator());
  }, [])


  // Change title with useCallback
  const changeTodoListTitle = useCallback((todoListId: string, newTitle: string) => {
    dispatch(changeTodolistTitleAC(todoListId, newTitle))
  }, [dispatch])

  //remove todolist with useCallback
  const removeTodoList = useCallback((todoListId: string) => {
    
    //const action = removeTodolistAC(todoListId)
    //dispatch(action)
    dispatch(deleteTodolistThunkCreator(todoListId))

  }, [dispatch])


  // Add to Do list callBack function with useCallback
  const addToDolist = useCallback((title: string) => {
    //dispatch(addTodolistAC(title))
    dispatch(createTodolistThunkCreator(title))
  }, [dispatch]);


  const todoListsComponents = todoLists.map( (td) => {

    return (
          <Grid item key={td.id}>
              <Paper elevation={5} style={{padding: '20px'}}>
                <Todolist
                    todolistId={td.id}
                    title={td.title}
                    filter={td.filter}            
                    removeTodoList={removeTodoList}
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
              
              <AddItemForm addItem={addToDolist} />
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
export default AppWithRedux;
