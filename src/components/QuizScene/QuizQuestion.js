import React, {
  PropTypes,
  StyleSheet,
  PixelRatio,
  ScrollView,
  TouchableHighlight,
  View,
  Text,
} from 'react-native';

import PureComponent from 'shared/PureComponent';
import {COMMON_BACKGROUND_COLOR, COMMON_BORDER_COLOR} from 'config/colors';



/**
 * Represents Question option
 */
class QuizQuestionOption extends PureComponent {

  static propTypes = {
    id:             PropTypes.string.isRequired,
    isFirstChild:   PropTypes.bool,
    onClick:        PropTypes.func.isRequired,
    value:          PropTypes.string.isRequired,
  };



  constructor ( props ) {
    super( props );

    this.handleOptionClick = this.handleOptionClick.bind( this );
  }



  handleOptionClick () {
    const {id, onClick} = this.props;

    onClick( id );
  }



  render() {
    const props = this.props;

    return (
      <TouchableHighlight onPress={this.handleOptionClick}>
        <View style={[ styles.questionOption, props.isFirstChild && styles.firstQuestionOption ]}>
          <Text style={styles.questionOptionValue}>{this.props.value}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}



/**
 * Represents Quiz question
 */
export default class QuizQuestion extends PureComponent {

  static propTypes = {
    onOptionSelect:   PropTypes.func.isRequired,
    options:          PropTypes.object.isRequired,
  };



  render(){
    const {options, onOptionSelect} = this.props;

    return (
      <ScrollView contentContainerStyle={styles.questionContainer}>
        {options.map( ( option, i ) =>
          <QuizQuestionOption
              {...option.toObject()}
              isFirstChild={i === 0}
              key={option.get('id')}
              onClick={onOptionSelect}
          /> )
        }
      </ScrollView>
    );
  }
}


/**
 * Quiz game container
 */



// styles
const styles = StyleSheet.create({

  questionContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  questionOption: {
    flex: 1,
    height: PixelRatio.getPixelSizeForLayoutSize( 60 ),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COMMON_BACKGROUND_COLOR,
    borderColor: COMMON_BORDER_COLOR,
    borderBottomWidth: PixelRatio.getPixelSizeForLayoutSize( 1 ),
  },

  firstQuestionOption: {
    borderTopWidth: PixelRatio.getPixelSizeForLayoutSize( 1 ),
  },

  questionOptionValue: {
    fontSize: PixelRatio.getPixelSizeForLayoutSize( 10 ),
    textAlign: 'center',
  },
});
