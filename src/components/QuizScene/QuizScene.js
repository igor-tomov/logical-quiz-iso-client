import React, {PropTypes, StyleSheet, PixelRatio, View, Text} from 'react-native';
import {COMMON_BACKGROUND_COLOR} from 'config/colors';
import PureComponent from 'shared/PureComponent';
import i18n from 'i18n';
import QuizQuestion from './QuizQuestion';



export default class QuizScene extends PureComponent {

  static propTypes = {
    actions:  PropTypes.objectOf( PropTypes.func ).isRequired,
    quiz:     PropTypes.object.isRequired,
  };



  _renderLoadingFailureMessage () {
    return (
      <View style={styles.loadingFailed}>
        <Text style={styles.loadingFailedMessage}>{i18n.t( 'quiz.question-loading-failed' )}</Text>
      </View>
    );
  }



  render () {
    const { quiz, actions } = this.props;

    if ( quiz.get( 'isFetchingFailed' ) ) {
      return this._renderLoadingFailureMessage();
    }

    const [ questions, questionIndex ] = [ quiz.get( 'questions' ), quiz.get( 'questionIndex' ) ];

    if ( questionIndex >= questions.size ) {
      //todo: trigger the game over action
      return null;
    }

    const options = questions.get( questionIndex ).get( 'options' );

    return (
      <QuizQuestion
          onOptionSelect={actions.selectQuestionOption}
          options={options}
      />
    );
  }
}



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
