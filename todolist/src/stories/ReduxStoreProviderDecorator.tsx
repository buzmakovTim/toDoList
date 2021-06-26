import React from 'react';
import { Provider } from "react-redux";
import { store } from '../Store/store';


export const ReduxStoreProviderDecorator = (story: any) => {

    return <Provider store={store} > {story()} </Provider>
}