import React from 'react';
import { AddItemForm } from './AddItemForm';
import {action} from '@storybook/addon-actions';

export default {
    title: 'AddItemForm Component',
    component: AddItemForm
} 


const callBack = action('Button "add" has been pressed inside thhe form')

export const AddItemFormBaseExample = (props: any) => {
  
  return <AddItemForm addItem={callBack} disable={false}/>
}