import React, {PropTypes} from 'react';
import {Provider} from 'react-redux';
// todo: temporary root component
//import Root from './QuizScene';
import Root from './NavigationRoot';



export default function App ({ store }) {
  // todo: should be implement with Navigator iOS
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}

App.propTypes = {
  store: PropTypes.object.isRequired,
};
