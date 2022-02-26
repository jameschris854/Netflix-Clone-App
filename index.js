/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'mobx-react';
import rootStore from './src/store/rootStore.js';
import React from 'react'

AppRegistry.registerComponent(appName, () => {
    return (
        index
        )
});

const index = () => {
    return (
    <Provider commonStore={rootStore.commonStore} authStore={rootStore.authStore}>
        <App />
    </Provider>

    )
}
