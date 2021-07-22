import React, {useCallback, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './Components/AddItemForm/AddItemForm';
import { EditableSpan } from './Components/EditableSpan/EditableSpan';
import { AppBar, Button, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { changeTodolistTitleAC, cnangeTodoListEntityStatus, createTodolistThunkCreator, deleteTodolistThunkCreator, fetchTodolistsThunkCreator, removeTodolistAC, setTodoListsAC, TodolistDomainType, todolistsReducer } from './Store/todolists-reducer';
// import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './Store/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootState } from './Store/store';
import { TaskType, todolistAPI } from './api/todolist-api';
import LinearProgress from '@material-ui/core/LinearProgress';
import { RequestStatusType } from './Store/app-reducer';
import { ErrorSnackbar } from './Components/ErrorSnackbar/errorSnackbar';

export type FilterValueType = 'all' | 'completed' | 'active';

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function AppWithRedux() {
  console.log('App Called');
  

  const dispatch = useDispatch();
  const todoLists = useSelector<AppRootState, Array<TodolistDomainType>>( state => state.todolist)
  const status = useSelector<AppRootState, RequestStatusType>( state => state.app.status)
  

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
                    entityStatus={td.entityStatus}
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
       
       {/* Preloader */}
       {status === 'loading' && <LinearProgress />}
       {/* Preloader */}
       </AppBar> 
  
       


           <Grid container style={{padding: '20px'}}>
              
              <AddItemForm addItem={addToDolist} disable={false}/>
           </Grid>
           <Grid container spacing={3} style={{padding: '20px'}}>
              {todoListsComponents}
           </Grid>

           
        {/* Erorr Snackbar */}
        <ErrorSnackbar />
        {/* Erorr Snackbar */}
        
  </ div> )
           
}
export default AppWithRedux;
