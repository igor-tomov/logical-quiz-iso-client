import React, {
  PropTypes,
  StyleSheet,
  PixelRatio,
  ScrollView,
  TouchableHighlight,
  View,
  Animated,
} from 'react-native';

import PureComponent from 'shared/PureComponent';
import {
  COMMON_BACKGROUND_COLOR,
  COMMON_BORDER_COLOR,
  COMMON_TEXT_COLOR,
  QUESION_OPTION_SUCCESS_COLOR,
  QUESION_OPTION_FAILURE_COLOR,
} from 'config/colors';



/**
 * Represents Question option
 */
class QuizQuestionOption extends PureComponent {

  static propTypes = {
    id:             PropTypes.string.isRequired,
    isFirstChild:   PropTypes.bool,
    onClick:        PropTypes.func.isRequired,
    onNext:         PropTypes.func.isRequired,
    target:         PropTypes.string.isRequired,
    value:          PropTypes.string.isRequired,
  };



  constructor ( props ) {
    super( props );

    this.state = {
      translateXText: new Animated.Value( 0 ),
      scaleText:      new Animated.Value( 1 ),
      textColor:      COMMON_TEXT_COLOR,
      isAnimating:    false,
    };

    this.handleOptionClick = this.handleOptionClick.bind( this );
  }



  animateSuccess () {
    return new Promise( resolve =>
      Animated.sequence([
        Animated.timing( this.state.scaleText, { toValue: 1.2, duration: 400 } ),
        Animated.timing( this.state.scaleText, { toValue: 1, duration: 400 } ),
      ]).start( resolve )
    );
  }



  animateFailure () {
    return new Promise( resolve =>
      Animated.sequence([
        Animated.timing(
          this.state.translateXText,
          {
            toValue: PixelRatio.getPixelSizeForLayoutSize( 5 ),
            duration: 200,
          }
        ),
        Animated.timing(
          this.state.translateXText,
          {
            toValue: PixelRatio.getPixelSizeForLayoutSize( -5 ),
            duration: 400,
          }
        ),
        Animated.timing(
          this.state.translateXText,
          {
            toValue: PixelRatio.getPixelSizeForLayoutSize( 0 ),
            duration: 200,
          }
        ),
      ]).start( resolve )
    );
  }



  handleOptionClick () {
    if ( ! this.state.isAnimating ){
      const {id, target, onClick, onNext} = this.props;
      let textColor, animationPromise;

      if ( target === id ) {
        animationPromise = this.animateSuccess();
        textColor        = QUESION_OPTION_SUCCESS_COLOR;
      } else {
        animationPromise = this.animateFailure();
        textColor        = QUESION_OPTION_FAILURE_COLOR;
      }

      onClick( id );

      this.setState({
        isAnimating: true,
        textColor,
      });

      animationPromise.then( onNext );
    }
  }



  render() {
    const props = this.props;
    const { textColor, translateXText, scaleText }  = this.state;

    return (
      <TouchableHighlight onPress={this.handleOptionClick}>
        <View style={[ styles.questionOption, props.isFirstChild && styles.firstQuestionOption ]}>
          <Animated.Text
              style={[
                styles.questionOptionValue,
                {
                  color: textColor,
                  transform: [
                    { translateX: translateXText },
                    { scaleX: scaleText },
                    { scaleY: scaleText },
                  ],
                },
              ]}

          >
            {this.props.value}
          </Animated.Text>
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
    onNextQuestion:   PropTypes.func.isRequired,
    onOptionSelect:   PropTypes.func.isRequired,
    options:          PropTypes.object.isRequired,
    target:           PropTypes.string.isRequired,
  };



  render(){
    const {options, target, onOptionSelect, onNextQuestion} = this.props;

    return (
      <ScrollView contentContainerStyle={styles.questionContainer}>
        {options.map( ( option, i ) =>
          <QuizQuestionOption
              {...option.toObject()}
              isFirstChild={i === 0}
              key={option.get('id')}
              onClick={onOptionSelect}
              onNext={onNextQuestion}
              target={target}
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
