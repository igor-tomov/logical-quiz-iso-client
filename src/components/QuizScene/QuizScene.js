import React, {View, Text, StyleSheet} from 'react-native';
import PureComponent from 'shared/PureComponent';
import i18n from 'i18n';



export default class QuizScene extends PureComponent {
  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{i18n.t('quiz.welcome')}</Text>
      </View>
    );
  }
}



const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
