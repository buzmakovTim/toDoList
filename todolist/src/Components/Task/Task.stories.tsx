import React from 'react';
import {action} from '@storybook/addon-actions';
import { Task } from './Task';
import { Provider } from 'react-redux';
import { ReduxStoreProviderDecorator } from '../../stories/ReduxStoreProviderDecorator';

export default {
    title: 'Task Component',
    component: Task,
    decorators: [ReduxStoreProviderDecorator]
} 


const callBack = action('Button "add" has been pressed inside thhe form')

export const TaskBaseExample = (props: any) => {
  

  return <> 
    {/* <Task todolistId ={'1'} task={{id: '1', title: 'React', isDone: false}}/> */}

    {/* <Task todolistId ={'2'} task={{id: '2', title: 'JS', isDone: true}}/> */}

    </>
}