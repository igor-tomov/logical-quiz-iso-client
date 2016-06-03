import React, {Component, PropTypes, StyleSheet, PixelRatio, View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {COMMON_BACKGROUND_COLOR} from 'config/colors';
import LoadableContent from 'shared/LoadableContent.ios';
import QuizScene from './QuizScene';
import * as quizActions from '../../actions/quiz';



class QuizSceneContainer extends Component {

  static propTypes = {
    actions:  PropTypes.objectOf( PropTypes.func ).isRequired,
    quiz:     PropTypes.object.isRequired,
  };



  constructor ( props ) {
    super( props );

    props.actions.fetchQuizQuestions( '5728926cc4b03ef75a29397d' ); // todo: hardcoded, must be improved
  }



  render(){
    const {quiz, actions} = this.props;

    if ( quiz.get( 'questionIndex' ) === -1 ) { //bootstrap state
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
