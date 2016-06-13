import React, {PropTypes} from 'react';
import {
  StyleSheet,
  PixelRatio,
  View,
  Text,
} from 'react-native';

import PureComponent from 'shared/PureComponent';



export default class QuizTimer extends PureComponent {

  static propTypes = {
    onTimeout: PropTypes.func,
    value: PropTypes.number,
  }



  componentDidUpdate () {
    const { value, onTimeout } = this.props;

    if ( value === 0 && onTimeout ) {
      onTimeout();
    }
  }



  _formattedValue (value ) {
    if ( value < 10 ) {
      return `0${value}`;
    } else {
      return value.toString();
    }
  }



  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.content}>{this._formattedValue( this.props.value )}</Text>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: PixelRatio.getPixelSizeForLayoutSize( 3 ),
  },

  content: {
    fontSize: PixelRatio.getPixelSizeForLayoutSize( 16 ),
    textAlign: 'center',
  },
});
