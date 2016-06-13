import React from 'react';
import { AppRegistry } from 'react-native';
import App from './components/App.ios';
import createConfiguredStore from './store/configureStore';



const store = createConfiguredStore();
const AppWithStore = () => <App store={store} />;



AppRegistry.registerComponent('LogicalQuizISOApp', () => AppWithStore );
