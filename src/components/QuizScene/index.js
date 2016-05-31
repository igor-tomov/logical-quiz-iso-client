import React, {Component, PropTypes} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import QuizScene from './QuizScene';
import * as quizActions from '../../actions/quiz';



class QuizSceneContainer extends Component {

  constructor ( props ) {
    super( props );

    props.actions.fetchQuiz( '5728926cc4b03ef75a29397d' ); // todo: hardcoded, must be improved
  }

  

  render(){
    const props = this.props;

    return (
      <QuizScene quiz={props.quiz} />
    );
  }
}


QuizSceneContainer.propTypes = {
  actions:  PropTypes.objectOf( PropTypes.func ).isRequired,
  quiz:     PropTypes.object.isRequired,
};



export default connect(
  state => ({ quiz: state.quiz }),
  dispatch => ({ actions: bindActionCreators( quizActions, dispatch ) })
)( QuizSceneContainer );
