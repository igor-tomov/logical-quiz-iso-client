import React, {Component, PropTypes} from 'react';
import {StyleSheet, PixelRatio, View, Text, TouchableHighlight, ScrollView} from 'react-native';
import {List} from 'immutable';
import PureComponent from 'shared/PureComponent';

import {COMMON_BACKGROUND_COLOR, COMMON_BORDER_COLOR} from 'config/colors';



class QuizSubjectItem extends Component {

  static propTypes = {
    desc:           PropTypes.string.isRequired,
    id:             PropTypes.string.isRequired,
    isFirstChild:   PropTypes.bool,
    onClick:        PropTypes.func.isRequired,
    thumbnail:      PropTypes.string.isRequired,
    title:          PropTypes.string.isRequired,
  }



  constructor ( props ) {
    super( props );

    this.handleClick = this.handleClick.bind( this );
  }



  handleClick () {
    const { id, onClick } = this.props;

    onClick( id );
  }



  render () {
    const {props} = this;

    return (
      <TouchableHighlight onPress={this.handleClick}>
        <View style={[ styles.subjectItemContainer, props.isFirstChild && styles.firstSubjectItem ]}>
          <View style={styles.subjectThumbnailWrapper}>
            <View style={styles.subjectThumbnail} />
          </View>
          <View style={styles.subjectTitleContainer}>
            <Text style={styles.subjectTitle}>{props.title}</Text>
          </View>
          <View style={styles.rightArrowContainer}>
            <View style={styles.rightArrow} />
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}



export default class QuizSubjectList extends PureComponent {

  static propTypes = {
    onSubjectSelect:  PropTypes.func.isRequired,
    subjects:         PropTypes.instanceOf( List ).isRequired,
  }



  render () {
    const {subjects, onSubjectSelect} = this.props;

    return (
      <ScrollView contentContainerStyle={styles.subjectListContainer}>
        {subjects.map( ( subject, i ) =>
          <QuizSubjectItem
              {...subject.toObject()}
              isFirstChild={i === 0}
              key={subject.get( 'id' ) + i}
              onClick={onSubjectSelect}
          />
        )}
      </ScrollView>
    );
  }

}



const styles = StyleSheet.create({

  subjectListContainer: {
    flex: 1,
  },

  subjectItemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: PixelRatio.getPixelSizeForLayoutSize( 40 ),
    borderBottomWidth: PixelRatio.getPixelSizeForLayoutSize( .5 ),
    backgroundColor: COMMON_BACKGROUND_COLOR,
    borderColor: COMMON_BORDER_COLOR,
  },

  firstSubjectItem: {
    borderTopWidth: PixelRatio.getPixelSizeForLayoutSize( .5 ),
  },

  subjectThumbnailWrapper: {
    width: PixelRatio.getPixelSizeForLayoutSize( 40 ),
    justifyContent: 'center',
    alignItems: 'center',
  },

  subjectThumbnail: {
    width: PixelRatio.getPixelSizeForLayoutSize( 35 ),
    height: PixelRatio.getPixelSizeForLayoutSize( 35 ),
    backgroundColor: '#5f9ea0',
    borderRadius: PixelRatio.getPixelSizeForLayoutSize( 5 ),
  },

  subjectTitleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: PixelRatio.getPixelSizeForLayoutSize( 5 ),
  },

  subjectTitle: {
    fontSize: PixelRatio.getPixelSizeForLayoutSize( 8 ),
  },

  rightArrowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: PixelRatio.getPixelSizeForLayoutSize( 5 ),
  },

  rightArrow: {
    width: PixelRatio.getPixelSizeForLayoutSize( 8 ),
    height: PixelRatio.getPixelSizeForLayoutSize( 8 ),
    borderTopWidth: PixelRatio.getPixelSizeForLayoutSize( 1 ),
    borderRightWidth: PixelRatio.getPixelSizeForLayoutSize( 1 ),
    transform: [
      { rotate: '45deg' },
    ],
  },
});
