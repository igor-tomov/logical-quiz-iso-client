import React, {Component, PropTypes} from 'react-native';
import {bindActionCreators} from 'redux';
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

QuizSceneContainer.propTypes = {
  actions: PropTypes.object.isRequired,
};



export default connect(
  state => ({ quiz: state.quiz }),
  dispatch => ({ actions: bindActionCreators( quizActions, dispatch ) })
)( QuizSceneContainer );
