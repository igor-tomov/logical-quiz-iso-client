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

  constructor ( props ) {
    super( props );

    this.handleOptionClick = this.handleOptionClick.bind( this );
  }



  handleOptionClick () {
    const {id, onClick} = this.props;

    onClick( id );
  }



  render() {
    return (
      <TouchableHighlight onPress={this.handleOptionClick}>
        <View style={styles.questionOption}>
          <Text style={styles.questionOptionValue}>{this.props.value}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}


QuizQuestionOption.propTypes = {
  id:       PropTypes.string.isRequired,
  onClick:  PropTypes.func.isRequired,
  value:    PropTypes.string.isRequired,
};



/**
 * Represents Quiz question
 */
export default class QuizQuestion extends PureComponent {

  render(){
    const {options, onOptionSelect} = this.props;

    if ( options.size < 1 ){
      return null;
    }

    return (
      <ScrollView contentContainerStyle={styles.questionContainer}>
        {options.map( option =>
          <QuizQuestionOption
              {...option.toObject()}
              key={option.get('id')}
              onClick={onOptionSelect}
          /> )
        }
      </ScrollView>
    );
  }
}


QuizQuestion.propTypes = {
  onOptionSelect: PropTypes.func.isRequired,
  options:        PropTypes.object.isRequired,
};



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

  questionOptionValue: {
    fontSize: PixelRatio.getPixelSizeForLayoutSize( 10 ),
    textAlign: 'center',
  },
});
