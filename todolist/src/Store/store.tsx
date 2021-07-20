import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { tasksReducer } from "./tasks-reducer";
import { todolistsReducer } from "./todolists-reducer";

const rootReducer = combineReducers({
    todolist: todolistsReducer,
    tasks: tasksReducer
});

// type AppRootState = {
//     todolist: Array<TodoListType>
//     tasks: TasksStateType
// }

// Same as what above, but more practical
export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk));

// @ts-ignore
window.store = store;

