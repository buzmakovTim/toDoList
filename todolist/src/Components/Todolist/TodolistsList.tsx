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
  //const status = useSelector<AppRootState, RequestStatusType>( state => state.app.status)
  const isLoggedIn = useSelector<AppRootState, boolean>(state => state.auth.isLoggedIn)
  const isInitialized = useSelector<AppRootState, boolean>(state => state.app.isInitialized)

  // UseEffect Side effect
  useEffect(() => {
  
    dispatch(initializeAppTC());
    // debugger
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

  

  // Preloader showing before initialized 
  if(!isInitialized){
    return <div style={{'position': 'fixed', 'top': '49%', 'left': '49%'}}>
      <CircularProgress />
    </div>
  }

  // const todoListsComponents = todoLists.map( (td) => {

  //   return (
          
  //         <Grid item key={td.id}>
  //             <Paper elevation={5} style={{padding: '20px'}}>
  //               <Todolist
  //                   todolistId={td.id}
  //                   title={td.title}
  //                   filter={td.filter}            
  //                   removeTodoList={removeTodoList}
  //                   changeTodoListTitle={changeTodoListTitle}
  //                   entityStatus={td.entityStatus}
  //               />
  //         </Paper>
  //         </Grid>
  //   )
  // })

  // const todoToShow = () => {
  //   return (
  //     <div>
  //          <Grid container spacing={3} style={{padding: '20px'}}>

           
  //         <Grid container style={{padding: '20px'}}>  
  //             <AddItemForm addItem={addToDolist} disable={false}/>
  //         </Grid>
                  
  //         {!isLoggedIn ? <Redirect to={'/login'}/> : todoListsComponents}
          
  //         </Grid>
  //     </div>
  //   )
  // }

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

       {/* <AppBar position={'static'}>
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
       {/* {status === 'loading' && <LinearProgress />}
       {/* Preloader */}
       {/* </AppBar>  */} 

              {/* {todoListsComponents}
              <Switch>
                <Route path={'/login'} render={ () => <Login/> }/>
                <Route exact path={'/'} render={ () => todoToShow() }/>
                <Route path={'/404'} render={ () => <h1 style={{'textAlign': 'center', 'fontSize': '40px'}}> 404 page not found</h1> }/>
              
                <Redirect from={'*'} to={'/404'} />
              </Switch> */}
          
 
        {/* Erorr Snackbar */}
        <ErrorSnackbar />
        {/* Erorr Snackbar */}
        
  </>    
}

export default TodolistsList;