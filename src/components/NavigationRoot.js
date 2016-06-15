import React, {PropTypes, Component} from 'react';
import {NavigationExperimental} from 'react-native';
import {connect} from 'react-redux';
import {Map} from 'immutable';

import * as navigationActions from '../actions/navigation';
import QuizSubjectsScene from '../containers/QuizSubjectsScene';
import QuizScene from '../containers/QuizScene';



const {CardStack} = NavigationExperimental;



class NavigationRoot extends Component {

  static propTypes = {
    navigation: PropTypes.instanceOf( Map ).isRequired,
  }


  static sceneMap = {
    subjects: QuizSubjectsScene,
    quiz: QuizScene,
  }



  constructor( props ){
    super( props );

    this.handleNavigatePush = this.handleNavigate.bind( this, 'push' );
    this.handleNavigatePop  = this.handleNavigate.bind( this, 'pop' );

    this.renderScene = this.renderScene.bind( this );
  }



  handleNavigate ( type, routeKey, payload ) {
    const {props} = this;

    if ( type === 'push' ) {
      props.navigatePush({
        key: routeKey,
        payload,
      });
    } else if ( type === 'pop' ) {
      props.navigatePop();
    }
  }


  renderScene ( { scene } ) {
    const {key, payload} = scene.navigationState;
    const CurrentScene   = NavigationRoot.sceneMap[key];

    return (
      <CurrentScene
          navigatePop={this.handleNavigatePop}
          navigatePush={this.handleNavigatePush}
          navigationPayload={payload}
      />
    );
  }



  render () {
    return (
      <CardStack
          navigationState={this.props.navigation.toJS()}
          onNavigate={this.handleNavigate}
          renderScene={this.renderScene}
          style={{ flex: 1 }}
      />
    );
  }
}



export default connect(
  state => state,
  navigationActions
)( NavigationRoot );
