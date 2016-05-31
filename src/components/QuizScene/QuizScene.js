import React, {View, Text, StyleSheet} from 'react-native';
import PureComponent from 'shared/PureComponent';
import LoadableContent from 'shared/LoadableContent.ios';
import i18n from 'i18n';



export default class QuizScene extends PureComponent {
  render(){
    const {quiz} = this.props;

    return (
      <View style={styles.container}>
        <LoadableContent
            indicatorSize="large"
            loaded={! quiz.get('isFetching')}
        >
          <Text style={styles.welcome}>{i18n.t('quiz.welcome')}</Text>
        </LoadableContent>
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
