import {combineReducers} from 'redux';
import quiz from './quiz';
import navigation from './navigation';


export default combineReducers({
  navigation,
  quiz,
});
