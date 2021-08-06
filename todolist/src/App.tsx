import React, {useCallback, useEffect} from 'react';
// import logo from './logo.svg';
import './App.css';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootState } from './Store/store';
import { TaskType } from './api/todolist-api';
import LinearProgress from '@material-ui/core/LinearProgress';
import { initializeAppTC, RequestStatusType } from './Store/app-reducer';
import { ErrorSnackbar } from './Components/ErrorSnackbar/errorSnackbar';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Login } from './Components/Login/Login';
import { logoutTC } from './Store/auth-reducer';
import TodolistsList from './Components/Todolist/TodolistsList';
import { CircularProgress } from '@material-ui/core';

export type FilterValueType = 'all' | 'completed' | 'active';

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function App() {
  // console.log('App Called');
  
  const dispatch = useDispatch();
  const status = useSelector<AppRootState, RequestStatusType>( state => state.app.status)
  const isLoggedIn = useSelector<AppRootState, boolean>(state => state.auth.isLoggedIn)
  const isInitialized = useSelector<AppRootState, boolean>(state => state.app.isInitialized)

    // Logout
  const logoutHadler = useCallback( () => {
    dispatch(logoutTC())
  }, [dispatch])  


  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

  // reloader showing before initialized 
  if(!isInitialized){
    return <div style={{'position': 'fixed', 'top': '49%', 'left': '49%'}}>
      <CircularProgress />
    </div>
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
                <Route exact path={'/'} render={ () => <TodolistsList/> }/>
                <Route path={'/login'} render={ () => <Login/> }/>
                <Route path={'/404'} render={ () => <h1 style={{'textAlign': 'center', 'fontSize': '40px'}}> 404 page not found</h1> }/>
              
                <Redirect from={'*'} to={'/404'} />
              </Switch>
          
 
        {/* Erorr Snackbar */}
        <ErrorSnackbar />
        {/* Erorr Snackbar */}
        
  </ div> )
           
}
export default App;
