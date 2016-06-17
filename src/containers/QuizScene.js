import React, {Component, PropTypes} from 'react';
import {StyleSheet, PixelRatio, View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {COMMON_BACKGROUND_COLOR} from 'config/colors';
import LoadableContent from 'shared/LoadableContent.ios';
import QuizScene from '../components/QuizScene';
import * as quizActions from '../actions/quiz';



class QuizSceneContainer extends Component {

  static propTypes = {
    actions:            PropTypes.objectOf( PropTypes.func ).isRequired,
    navigatePop:        PropTypes.func.isRequired,
    navigatePush:       PropTypes.func.isRequired,
    navigationPayload:  PropTypes.object.isRequired,
    quiz:               PropTypes.object.isRequired,
  };



  componentWillMount () {
    const {navigationPayload, actions} = this.props;

    actions.fetchQuizQuestions( navigationPayload.id, navigationPayload );
  }



  render(){
    const {quiz, actions} = this.props;

    if ( quiz.get( 'isIdle' ) ) { //bootstrap state
      return null;
    }

    return (
      <View style={styles.container}>
        <LoadableContent
            indicatorSize="large"
            indicatorStyle={styles.loadingIndicator}
            loaded={! quiz.get('isFetching')}
        >
          <QuizScene
              actions={actions}
              quiz={quiz}
          />
        </LoadableContent>
      </View>
    );

  }
}



export default connect(
  state => ({ quiz: state.quiz }),
  dispatch => ({ actions: bindActionCreators( quizActions, dispatch ) })
)( QuizSceneContainer );



const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COMMON_BACKGROUND_COLOR,
  },

  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
  },

  loadingFailed: {
    flex: 1,
    paddingTop: PixelRatio.getPixelSizeForLayoutSize( 15 ),
  },

  loadingFailedMessage: {
    fontSize: PixelRatio.getPixelSizeForLayoutSize( 8 ),
    textAlign: 'center',
  },
});
