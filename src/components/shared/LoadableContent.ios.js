import React, {PropTypes, View, ActivityIndicatorIOS} from 'react-native';



export default function LoadableContent( props ) {
  if ( props.loaded ){
    return props.children;
  } else {
    return (
      <View style={props.indicatorStyle}>
        <ActivityIndicatorIOS
            animating
            color={props.indicatorColor}
            size={props.indicatorSize}
        />
      </View>
    );
  }
}


LoadableContent.propTypes = {
  children:         PropTypes.node,
  indicatorColor:   PropTypes.string,
  indicatorSize:    PropTypes.oneOf( ['small', 'large'] ),
  indicatorStyle:   PropTypes.oneOfType( [PropTypes.number, PropTypes.object] ),
  loaded:           PropTypes.bool,
};


LoadableContent.defaultProps = {
  loaded: false,
  indicatorSize: 'small',
};
