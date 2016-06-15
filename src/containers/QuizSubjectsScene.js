import React, {Component, PropTypes} from 'react';
import {StyleSheet, PixelRatio, View} from 'react-native';
import {Map} from 'immutable';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {COMMON_BACKGROUND_COLOR} from 'config/colors';
import LoadableContent from 'shared/LoadableContent.ios';
import QuizSubjectsScene from '../components/QuizSubjectsScene';
import * as subjectActions from '../actions/subjects';



class QuizSubjectsSceneContainer extends Component {

  static propTypes = {
    actions:            PropTypes.objectOf( PropTypes.func ).isRequired,
    navigatePop:        PropTypes.func.isRequired,
    navigatePush:       PropTypes.func.isRequired,
    navigationPayload:  PropTypes.object.isRequired,
    subjects:           PropTypes.instanceOf( Map ).isRequired,
  }



  constructor ( props ) {
    super( props );

    this.navigateToQuiz = this.navigateToQuiz.bind( this );
  }


  componentWillMount () {
    this.props.actions.fetchQuizSubjects();
  }



  navigateToQuiz ( subjectId ) {
    const {props} = this;
    const subject = props.subjects.get( 'items' ).find( subject => subject.get( 'id' ) === subjectId );

    if ( subject ){
      props.navigatePush( props.navigationPayload.nextScene, subject.toObject() );
    }
  }



  render () {
    const { subjects } = this.props;

    if ( subjects.get( 'isIdle' ) ) {
      return null;
    }

    return (
      <View style={styles.container}>
        <LoadableContent
            indicatorSize="large"
            indicatorStyle={styles.loadingIndicator}
            loaded={! subjects.get('isFetching')}
        >
          <QuizSubjectsScene
              navigateToQuiz={this.navigateToQuiz}
              subjects={subjects}
          />
        </LoadableContent>
      </View>
    );
  }
}



export default connect(
  state => ({ subjects: state.subjects }),
  dispatch => ({ actions: bindActionCreators( subjectActions, dispatch ) })
)( QuizSubjectsSceneContainer );



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
