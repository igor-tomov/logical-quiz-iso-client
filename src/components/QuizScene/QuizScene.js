import React, {View, StyleSheet} from 'react-native';
import {COMMON_BACKGROUND_COLOR} from 'config/colors';
import PureComponent from 'shared/PureComponent';
import LoadableContent from 'shared/LoadableContent.ios';
//import i18n from 'i18n';
import QuizQuestion from './QuizQuestion';



export default class QuizScene extends PureComponent {
  render(){
    const {quiz} = this.props;

    if ( quiz.get( 'questions' ).size < 1 ){
      return null;
    }

    return (
      <View style={styles.container}>
        <LoadableContent
            indicatorSize="large"
            loaded={! quiz.get('isFetching')}
        >
            <QuizQuestion
                onOptionSelect={optionId => console.warn( `Option #${optionId} has been selected` )}
                options={quiz.getIn([ 'questions', 0 ]).get('options')}
            />
        </LoadableContent>
      </View>
    );
  }
}



const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COMMON_BACKGROUND_COLOR,
  },
});
