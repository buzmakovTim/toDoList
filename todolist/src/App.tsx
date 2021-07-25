import React, {useCallback, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './Components/AddItemForm/AddItemForm';
import { AppBar, Button, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { changeTodolistTitleAC, createTodolistThunkCreator, deleteTodolistThunkCreator, fetchTodolistsThunkCreator, removeTodolistAC, setTodoListsAC, TodolistDomainType, todolistsReducer } from './Store/todolists-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootState } from './Store/store';
import { TaskType, todolistAPI } from './api/todolist-api';
import LinearProgress from '@material-ui/core/LinearProgress';
import { initializeAppTC, RequestStatusType } from './Store/app-reducer';
import { ErrorSnackbar } from './Components/ErrorSnackbar/errorSnackbar';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Login } from './Components/Login/Login';
import { CircularProgress } from '@material-ui/core';
import { logoutTC } from './Store/auth-reducer';

export type FilterValueType = 'all' | 'completed' | 'active';

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function App() {
  console.log('App Called');
  

  const dispatch = useDispatch();
  const todoLists = useSelector<AppRootState, Array<TodolistDomainType>>( state => state.todolist)
  const status = useSelector<AppRootState, RequestStatusType>( state => state.app.status)
  const isLoggedIn = useSelector<AppRootState, boolean>(state => state.auth.isLoggedIn)
  const isInitialized = useSelector<AppRootState, boolean>(state => state.app.isInitialized)

  // UseEffect Side effect
  useEffect(() => {
    
    dispatch(initializeAppTC());
    // if(!isLoggedIn){
    //     return;
    // }
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

  // Logout
  const logoutHadler = useCallback( () => {
      dispatch(logoutTC())
  }, [dispatch])  

  // Preloader showing before initialized 
  if(!isInitialized){
    return <div style={{'position': 'fixed', 'top': '49%', 'left': '49%'}}>
      <CircularProgress />
    </div>
  }

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

  const todoToShow = () => {
    return (
      <div>
           <Grid container spacing={3} style={{padding: '20px'}}>

           
          <Grid container style={{padding: '20px'}}>  
              <AddItemForm addItem={addToDolist} disable={false}/>
          </Grid>
                  
          {!isLoggedIn ? <Redirect to={'/login'}/> : todoListsComponents}
          
          </Grid>
      </div>
    )
  }

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
                   
                   {isLoggedIn &&
                   <Button variant={'outlined'} 
                             color={'inherit'}
                             onClick={logoutHadler}>LOGOUT</Button>}
       
               </Toolbar>
       
       {/* Preloader */}
       {status === 'loading' && <LinearProgress />}
       {/* Preloader */}
       </AppBar> 

              {/* {todoListsComponents} */}
              <Switch>
                <Route path={'/login'} render={ () => <Login/> }/>
                <Route exact path={'/'} render={ () => todoToShow() }/>
                <Route path={'/404'} render={ () => <h1 style={{'textAlign': 'center', 'fontSize': '40px'}}> 404 page not found</h1> }/>
              
                <Redirect from={'*'} to={'/404'} />
              </Switch>
          
 
        {/* Erorr Snackbar */}
        <ErrorSnackbar />
        {/* Erorr Snackbar */}
        
  </ div> )
           
}
export default App;
