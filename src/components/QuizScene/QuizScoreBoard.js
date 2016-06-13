import React, {PropTypes} from 'react';
import {
  StyleSheet,
  PixelRatio,
  View,
  Text,
} from 'react-native';

import PureComponent from 'shared/PureComponent';



export default class QuizScoreBoard extends PureComponent {

  static propTypes = {
    current: PropTypes.number,
    total: PropTypes.number,
  }



  _formattedValue (value ) {
    if ( value < 10 ) {
      return `0${value}`;
    } else {
      return value.toString();
    }
  }



  render () {
    const { current, total } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.content}>
          {this._formattedValue( current )}
          {"/"}
          {this._formattedValue( total )}
        </Text>
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
