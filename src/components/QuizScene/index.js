import React, {Component} from 'react-native';
import {connect} from 'react-redux';

import QuizScene from './QuizScene';
import * as quizActions from '../../actions/quiz';



class QuizSceneContainer extends Component {
  render(){
    return (
      <QuizScene />
    );
  }
}



export default connect( state => ({ quiz: state.quiz }), quizActions )( QuizSceneContainer );
