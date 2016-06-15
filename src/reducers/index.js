import {combineReducers} from 'redux';
import navigation from './navigation';
import subjects from './subjects';
import quiz from './quiz';


export default combineReducers({
  navigation,
  subjects,
  quiz,
});
