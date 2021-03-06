import { TasksStateType } from '../App';
import { TodoListType } from '../App';
import { v1 } from 'uuid'
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer'
import { addTodolistAC, todolistsReducer } from './todolists-reducer';


test('ids should be equals', () => {

    const startTasksState: TasksStateType = {};
    const startTodolistState: Array<TodoListType> = [];

    const action = addTodolistAC('n/a')
    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistState = todolistsReducer(startTodolistState, action)

    
    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistState[0].id


    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodolists).toBe(action.todolistId);
});