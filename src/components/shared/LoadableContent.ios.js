import React, {PropTypes, ActivityIndicatorIOS} from 'react-native';



export default function LoadableContent( props ) {
  if ( props.loaded ){
    return props.children;
  } else {
    return (
      <ActivityIndicatorIOS
          animating
          color={props.indicatorColor}
          size={props.indicatorSize}
      />
    );
  }
}


LoadableContent.propTypes = {
  children:       PropTypes.node,
  indicatorColor: PropTypes.string,
  indicatorSize:  PropTypes.oneOf( ['small', 'large'] ),
  loaded:         PropTypes.bool,
};


LoadableContent.defaultProps = {
  loaded: false,
  indicatorSize: 'small',
};
