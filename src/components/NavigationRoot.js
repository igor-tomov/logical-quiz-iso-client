import React, {PropTypes, Component, NavigationExperimental} from 'react-native';
import {connect} from 'react-redux';
import * as navigationActions from '../actions/navigation';

import QuizScene from './QuizScene';



const {CardStack} = NavigationExperimental;
const SCENES = {
  quiz: QuizScene,
};


class NavigationRoot extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }



  constructor( props ){
    super( props );

    this.handleNavigate = this.handleNavigate.bind( this );
    this.renderScene    = this.renderScene.bind( this );
  }



  handleNavigate () {
  }


  renderScene ( { scene } ) {
    const CurrentScene = SCENES[ scene.navigationState.key ];

    return <CurrentScene />;
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
