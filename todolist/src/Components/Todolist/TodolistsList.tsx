import React, {useCallback, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TaskType } from '../../api/todolist-api';
import { initializeAppTC, RequestStatusType } from '../../Store/app-reducer';
import { logoutTC } from '../../Store/auth-reducer';
import { AppRootState } from '../../Store/store';
import { changeTodolistTitleAC, createTodolistThunkCreator, deleteTodolistThunkCreator, fetchTodolistsThunkCreator, TodolistDomainType } from '../../Store/todolists-reducer';
import { CircularProgress } from '@material-ui/core';
import { AppBar, Button, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import { AddItemForm } from '../AddItemForm/AddItemForm';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Menu } from '@material-ui/icons';
import { Login } from '../Login/Login';
import LinearProgress from '@material-ui/core/LinearProgress';
import { ErrorSnackbar } from '../ErrorSnackbar/errorSnackbar';
import { Todolist } from './Todolist';


export type FilterValueType = 'all' | 'completed' | 'active';

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function TodolistsList() {
  // console.log('App Called');
  

  const dispatch = useDispatch();
  const todoLists = useSelector<AppRootState, Array<TodolistDomainType>>( state => state.todolist)
  const isLoggedIn = useSelector<AppRootState, boolean>(state => state.auth.isLoggedIn)
  

  // UseEffect Side effect
  useEffect(() => {
  
    dispatch(initializeAppTC());
    if(!isLoggedIn){ 
        return;
    }
    
    dispatch(fetchTodolistsThunkCreator());
  }, [])

  


  // Comment
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

  
  if(!isLoggedIn){ 
    return <Redirect to={'/login'}/>
  }
  

   return <> 
   
          <Grid container style={{padding: '20px'}}>  
              <AddItemForm addItem={addToDolist} disable={false}/>
          </Grid>
                  
          {/* {!isLoggedIn ? <Redirect to={'/login'}/> : todoListsComponents} */}
          <Grid container spacing={3} style={{padding: '20px'}}>

           {
              todoLists.map( (td) => {

              return <Grid item key={td.id}>
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
            
              })
            }
          </Grid>

 
        {/* Erorr Snackbar */}
        <ErrorSnackbar />
        {/* Erorr Snackbar */}
        
  </>    
}

export default TodolistsList;