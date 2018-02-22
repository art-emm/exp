import React, { Component, PropTypes } from 'react'
import { StyleSheet, View, Text, ViewPropTypes, Image, TouchableHighlight } from 'react-native'

// compatability for react-native versions < 0.44
const ViewPropTypesStyle = ViewPropTypes
  ? ViewPropTypes.style
  : View.propTypes.style

const styles = StyleSheet.create({
    outerCircle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerCircle: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftWrap: {
    position: 'absolute',
    top: 0,
  },
  halfCircle: {
    position: 'absolute',
    top: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
})

function percentToDegrees(percent) {
  return percent * 3.6
}

export default class PercentageCircle extends Component {
  static propTypes = {
    color: PropTypes.string,
    shadowColor: PropTypes.string,
    bgColor: PropTypes.string,
    radius: PropTypes.number.isRequired,
    borderWidth: PropTypes.number,
    children: PropTypes.node,
    containerStyle: ViewPropTypesStyle,
  };

  static defaultProps = {
    color: '#f00',
    shadowColor: '#999',
    bgColor: '#e9e9ef',
    borderColor: '#95989A',
    borderWidth: 2,
    children: null,
    containerStyle: null,
  };

  constructor(props) {
    super(props)
    this.state = this.getInitialStateFromProps(props)
  }

  onPress (){
    this.props.onPress && this.props.onPress()    
  }
  componentWillReceiveProps(nextProps) {
    this.setState(this.getInitialStateFromProps(nextProps))
  }

  getInitialStateFromProps(props) {
    const percent = Math.max(Math.min(100, props.percent), 0)
    const needHalfCircle2 = percent > 50
    let halfCircle1Degree
    let halfCircle2Degree
    // degrees indicate the 'end' of the half circle, i.e. they span (degree - 180, degree)
    if (needHalfCircle2) {
      halfCircle1Degree = 180
      halfCircle2Degree = percentToDegrees(percent)
    } else {
      halfCircle1Degree = percentToDegrees(percent)
      halfCircle2Degree = 0
    }

    return {
      halfCircle1Degree,
      halfCircle2Degree,
      halfCircle2Styles: {
        // when the second half circle is not needed, we need it to cover
        // the negative degrees of the first circle
        backgroundColor: needHalfCircle2
          ? this.props.color
          : this.props.shadowColor,
      },
    }
  }

  renderHalfCircle(rotateDegrees, halfCircleStyles) {
    const { radius, color } = this.props
    return (
      <View
        style={[
          styles.leftWrap,
          {
            left: radius,
            width: radius,
            height: radius * 2,
          },
        ]}
      >
        <View
          style={[
            styles.halfCircle,
            {
              left: -radius,
              width: radius,
              height: radius * 2,
              borderRadius: radius,
              transform: [
                { translateX: radius / 2 },
                { rotate: `${rotateDegrees}deg` },
                { translateX: -radius / 2 },
              ],
              backgroundColor: color,
              ...halfCircleStyles,
            },
          ]}
        />
      </View>
    )
  }

  renderInnerCircle() {
    const radiusMinusBorder = this.props.radius - this.props.borderWidth
    const radiusMinusBorder2 = this.props.radius - this.props.borderWidth - 4
    return (
      <View
        style={[
          styles.innerCircle,
          {
            width: radiusMinusBorder * 2,
            height: radiusMinusBorder * 2,
            borderRadius: radiusMinusBorder,
            backgroundColor: this.props.innerCircleColor || 'white',
            ...this.props.containerStyle,
            borderWidth: 1,
            borderColor: '#95989A'
          },
        ]}
      >
      <View 
      style={[
          styles.innerCircle,
          {
            width: radiusMinusBorder2 * 2,
            height: radiusMinusBorder2 * 2,
            borderRadius: radiusMinusBorder,
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: '#95989A',
            padding: 1,
            padding: 10,
            overflow: 'hidden',            
            ...this.props.containerStyle,
          },
        ]}>
          <Image resizeMode={'cover'} style={{
            width: radiusMinusBorder2 * 4,
            height: radiusMinusBorder2 * 4,
            borderRadius: radiusMinusBorder,
            backgroundColor: 'transparent',
            resizeMode: "cover"            
          }}
            source={{ uri: this.props.uri}}
          />   
        </View>
      </View>
    )
  }

  render() {
    const {
      halfCircle1Degree,
      halfCircle2Degree,
      halfCircle2Styles,
    } = this.state
    const {knowledge, words, subject} = this.props
    let {showText = true} = this.props
    let textH = 45    
    if(this.props.showText === 0) {
      showText = false
      textH = 0
    }
    return (
      <TouchableHighlight
        onPress={this.onPress.bind(this)} style={[
        styles.outerCircle,
        {
          flex:1,
          // alignItems: 'flexStart',
          // justifyContent: 'flexStart',
          minWidth: this.props.radius * 2,
          maxWidth: this.props.radius * 2 + 2,          
          maxHeight: this.props.radius * 2 + this.props.radius * 2,
          backgroundColor: this.props.shadowColor,
          borderRadius: 10,
         // marginRight: 15,
         //borderWidth: 1,
          marginBottom: 0,
          borderColor: '#95989A'
        },
      ]}>
      <View style={[
        styles.outerCircle,
        {
          flex:1,
          width: this.props.radius * 2 + 2,
          height: this.props.radius * 2  + textH ,
          backgroundColor: this.props.shadowColor,
          borderRadius: 100,
         // marginRight: 15,
          marginBottom: 0,
          borderColor: '#95989A'
        },
      ]}>
      <View
        style={[
          styles.outerCircle,
          {
            width: this.props.radius * 2 + 2,
            height: this.props.radius * 2 +2 ,
            borderRadius: 100,
            backgroundColor: this.props.shadowColor,
            borderWidth: 1,
            borderColor: '#95989A',       
            margin: 0
          },
        ]}
      >
        {this.renderHalfCircle(halfCircle1Degree)}
        {this.renderHalfCircle(halfCircle2Degree, halfCircle2Styles)}
        {this.renderInnerCircle()}
      </View>
      {showText && <View style={{marginTop: 5, minWidth: this.props.radius * 2}}>
        <Text style={{fontSize: 14, color: '#15304E', lineHeight: 18}}><Text style={{fontWeight: 'bold'}}>Words:</Text> {words}</Text>
        <Text style={{fontSize: 14, color: '#15304E', lineHeight: 18}}><Text style={{fontWeight: 'bold'}}>Knowlege:</Text> {knowledge}</Text>
        <Text style={{fontSize: 14, color: '#15304E', lineHeight: 18, textOverflow: 'ellipsis', overflow:'hidden', height: 32, whiteSpace: 'nowrap'}}><Text style={{fontWeight: 'bold'}}>Subject:</Text> {subject}</Text>
      </View>}
      </View>
      </TouchableHighlight>
    )
  }
}