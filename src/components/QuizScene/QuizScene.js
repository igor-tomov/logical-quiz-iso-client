import React, {PropTypes} from 'react';
import {StyleSheet, PixelRatio, View, Text} from 'react-native';
import {COMMON_BACKGROUND_COLOR} from 'config/colors';
import PureComponent from 'shared/PureComponent';
import i18n from 'i18n';
import QuizQuestion from './QuizQuestion';
import QuizTimer from './QuizTimer';
import QuizScoreBoard from './QuizScoreBoard';



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



  _renderResultView(){
    const { quiz } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <QuizScoreBoard
            current={quiz.get( 'passedQuestions' ).size}
            total={quiz.get( 'questions' ).size}
        />
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
      actions.finishQuiz();
      return this._renderResultView(); // todo: tmp solution, must be navigated to the next scene
    }

    const question = questions.get( questionIndex );
    const [options, target] = [ question.get( 'options' ), question.get( 'target' ) ];

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.quizHeader}>
          <QuizTimer
              onTimeout={actions.timeoutQuestion}
              value={quiz.get( 'timerValue' )}
          />
          <QuizScoreBoard
              current={quiz.get( 'passedQuestions' ).size}
              total={questions.size}
          />
        </View>
        <QuizQuestion
            onNextQuestion={actions.nextQuestion}
            onOptionSelect={actions.selectQuestionOption}
            options={options}
            target={target}
        />
      </View>
    );
  }
}



const styles = StyleSheet.create({

  quizHeader: {
    //flex: 1,
    marginTop: PixelRatio.getPixelSizeForLayoutSize( 15 ),
    flexDirection: 'row',
  },

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
