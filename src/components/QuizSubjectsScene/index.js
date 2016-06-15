import React, {PropTypes} from 'react';
import {StyleSheet, PixelRatio, View, Text} from 'react-native';
import {Map} from 'immutable';
import {COMMON_BACKGROUND_COLOR} from 'config/colors';
import PureComponent from 'shared/PureComponent';
import i18n from 'i18n';

import QuizSubjectList from './QuizSubjectList';



export default class QuizSubjectsScene extends PureComponent {
  static propTypes = {
    navigateToQuiz:   PropTypes.func.isRequired,
    subjects:         PropTypes.instanceOf( Map ).isRequired,
  };



  _renderLoadingFailureMessage () {
    return (
      <View style={styles.loadingFailed}>
        <Text style={styles.loadingFailedMessage}>{i18n.t( 'quiz.subjects-loading-failed' )}</Text>
      </View>
    );
  }


  render () {
    const { subjects, navigateToQuiz } = this.props;

    if ( subjects.get( 'isFetchingFailed' ) ) {
      return this._renderLoadingFailureMessage();
    }


    return (
      <View style={styles.container}>
        <QuizSubjectList
            onSubjectSelect={navigateToQuiz}
            subjects={subjects.get( 'items' )}
        />
      </View>
    );
  }
}



const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COMMON_BACKGROUND_COLOR,
    marginTop: PixelRatio.getPixelSizeForLayoutSize( 25 ),
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
