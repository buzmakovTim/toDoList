import { TodoListType } from './../AppWithRedux';
import { v1 } from 'uuid'
import {addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer} from './todolists-reducer'


test('correct toDoList should be removed', () => {

    let todolistId1 = v1()
    let todolistId2 = v1()
    
    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);

});

test('correct toDoList should be added', () => {

    let todolistId1 = v1()
    let todolistId2 = v1()
    
    let newTodoListTitle = 'New Todolist';


    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todolistsReducer(startState, addTodolistAC(newTodoListTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodoListTitle);
    expect(endState[0].filter).toBe("all");

});

test('correct toDoList should change its name', () => {

    let todolistId1 = v1()
    let todolistId2 = v1()
    
    let newTodoListTitle = 'New Todolist';


    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, newTodoListTitle))

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodoListTitle);

})

test('correct toDoList filter should be changed', () => {

    let todolistId1 = v1()
    let todolistId2 = v1()
    
    let newFilter = 'completed' as const;


    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, newFilter))

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);

})




// test('user reducer should increment only age', () => {

//     const startState = {age: 10, childrenCount: 2, name: 'Tim'};
//     const endState = userReducer(startState, {type: 'INCREMENT-AGE'})

//     expect(endState.age).toBe(11);
//     expect(endState.childrenCount).toBe(2)

// });

// test('user reducer should increment only childrenCount', () => {

//     const startState = {age: 10, childrenCount: 2, name: 'Tim'};
//     const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'})
    
//     expect(endState.age).toBe(10);
//     expect(endState.childrenCount).toBe(3)

// });

// test('user reducer should change the name', () => {

//     const startState = {age: 10, childrenCount: 2, name: 'Tim'};
//     const newName = "Timofey"
//     const endState = userReducer(startState, {type: 'CHANGE-NAME', newName: newName})
    
//     expect(endState.age).toBe(10);
//     expect(endState.childrenCount).toBe(2)
//     expect(endState.name).toBe(newName)

// })