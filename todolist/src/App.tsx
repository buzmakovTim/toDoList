import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './Components/AddItemForm/AddItemForm';
import { EditableSpan } from './Components/EditableSpan/EditableSpan';
import { AppBar, Button, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';

export type FilterValueType = 'all' | 'completed' | 'active';

export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValueType;
}

function App() {
  


  let todoListId_1 = v1();
  let todoListId_2 = v1();

  let [todoLists, setTodoLists] = useState<Array<TodoListType>> ([
    {id: todoListId_1, title: "What to learn", filter: 'all'},
    {id: todoListId_2, title: "What to buy", filter: 'all'},
  ]);

  let [tasksObj, setTasks] = useState({
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
    let tasks = tasksObj[todoListId];
    let task = tasks.find(t => t.id === taskId);
    if(task) {
      task.isDone = isDone;
      
      setTasks({...tasksObj});
    }
  }

  function changeTitle(taskId: string, newValue: string, todoListId: string) {
    let tasks = tasksObj[todoListId];
    let task = tasks.find(t => t.id === taskId);
    if(task) {
      task.title = newValue;
      
      setTasks({...tasksObj});
    }
  }

  function changeTodoListTitle(todoListId: string, newTitle: string) {
    let todolistToUpdate = todoLists.find( tl => tl.id === todoListId);
    if(todolistToUpdate){
      todolistToUpdate.title = newTitle;
      setTodoLists([...todoLists]);
    }

  }

  function changeFilter(value: FilterValueType, todoListId: string) {
    let _todoList = todoLists.find(tl => tl.id === todoListId);
    if(_todoList) {
      _todoList.filter = value;
      setTodoLists([...todoLists]);
    }
    //setFilter(value);
  }

  function removeTask(id: string, todoListId: string) {
    //alert("Task id: "+ id + " --- TodoList id: " + todoListId)
    let tasks = tasksObj[todoListId]
    let filteredTasks = tasks.filter((t) => t.id != id);
    tasksObj[todoListId] = filteredTasks;

    setTasks({...tasksObj});
  }

  let removeTodoList = (todoListId: string) => {
    let filteredTodolist = todoLists.filter(tl => tl.id !== todoListId)
    setTodoLists(filteredTodolist);
    delete tasksObj[todoListId];
    setTasks({...tasksObj});
  }

  function addTask(title: string, id: string) {
    
    let task = {id: v1(), title: title, isDone: false};
    let tasks = tasksObj[id];
    
    let newTasks = [task, ...tasks];
    tasksObj[id] = newTasks
    setTasks({...tasksObj});
  }

  function addToDoList(title: string) {

      const newTodoListId = v1()
      const newTodoList: TodoListType = {id: newTodoListId, title: title, filter: "all"}
      setTodoLists([...todoLists, newTodoList])
      setTasks({...tasksObj, [newTodoListId] : []})
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
export default App;
