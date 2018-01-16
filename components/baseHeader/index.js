import React, { Component } from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'


import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from './icomoon2/selection.json';
console.log('>>>', icoMoonConfig)
const Iconn = createIconSetFromIcoMoon(icoMoonConfig);

import {
  ScrollView,
  View,
  TextInput,
  // Image,
  StyleSheet,
  TouchableHighlight,
  Touchable,
  TouchableOpacity
} from 'react-native'
import SvgIcon from 'react-native-svg-icon';
import svgs from './1.svg';

import Svg, {
  Use,
  Image,
  Path
} from 'react-native-svg'
import Ico from './ico'
import SvgUri from 'react-native-svg-uri';

// import Icon from 'react-native-vector-icons/FontAwesome';
import { Container,
    Left, Icon, Right, Button, Body, 
    Content,Text, Card, CardItem, Header
  } from "native-base";

import { Platform, Dimensions, PixelRatio } from "react-native";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
class BaseHeader extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showSearch: false
    }
  }
  toggleSearch () {
    let {showSearch} = this.state
    if (this.props.toInput)showSearch = !showSearch
    this.setState({showSearch})
  }

  onChange (value) {
    if (this.props.onTextChange) this.props.onTextChange(value)
  }
  render () {
    return(
    <Header style={styles.BaseHeader}>
      <Left style={{minWidth: deviceWidth - 25}}>
      <Button
          transparent
          onPress={() => {this.props.navigation.navigate("DrawerOpen")}}>
        <Icon name="menu" />
      </Button>
      </Left>
      <Right>
        {/* <Iconn /> */}
{/* // <Svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="37" height="24" viewBox="0 0 37 24">
// <Path fill="#46c3cf" d="M32 10.667c-2.933 0-5.333-2.4-5.333-5.333s2.4-5.333 5.333-5.333 5.333 2.4 5.333 5.333-2.4 5.333-5.333 5.333zM32 1.333c-2.267 0-4 1.733-4 4s1.733 4 4 4 4-1.733 4-4-1.733-4-4-4z"></Path>
// <Path fill="#46c3cf" d="M24 5.333c0 2.946-2.388 5.333-5.333 5.333s-5.333-2.388-5.333-5.333c0-2.946 2.388-5.333 5.333-5.333s5.333 2.388 5.333 5.333z"></Path>
// <Path fill="#46c3cf" d="M18.667 10.667c-2.933 0-5.333-2.4-5.333-5.333s2.4-5.333 5.333-5.333c2.933 0 5.333 2.4 5.333 5.333s-2.4 5.333-5.333 5.333zM18.667 1.333c-2.267 0-4 1.733-4 4s1.733 4 4 4 4-1.733 4-4-1.733-4-4-4z"></Path>
// <Path fill="#46c3cf" d="M10.667 5.333c0 2.946-2.388 5.333-5.333 5.333s-5.333-2.388-5.333-5.333c0-2.946 2.388-5.333 5.333-5.333s5.333 2.388 5.333 5.333z"></Path>
// <Path fill="#46c3cf" d="M5.333 10.667c-2.933 0-5.333-2.4-5.333-5.333s2.4-5.333 5.333-5.333 5.333 2.4 5.333 5.333-2.4 5.333-5.333 5.333zM5.333 1.333c-2.267 0-4 1.733-4 4s1.733 4 4 4 4-1.733 4-4-1.733-4-4-4z"></Path>
// <Path fill="#46c3cf" d="M32 24c-2.933 0-5.333-2.4-5.333-5.333s2.4-5.333 5.333-5.333 5.333 2.4 5.333 5.333-2.4 5.333-5.333 5.333zM32 14.667c-2.267 0-4 1.733-4 4s1.733 4 4 4 4-1.733 4-4-1.733-4-4-4z"></Path>
// <Path fill="#46c3cf" d="M18.667 24c-2.933 0-5.333-2.4-5.333-5.333s2.4-5.333 5.333-5.333c2.933 0 5.333 2.4 5.333 5.333s-2.4 5.333-5.333 5.333zM18.667 14.667c-2.267 0-4 1.733-4 4s1.733 4 4 4 4-1.733 4-4-1.733-4-4-4z"></Path>
// <Path fill="#46c3cf" d="M5.333 24c-2.933 0-5.333-2.4-5.333-5.333s2.4-5.333 5.333-5.333 5.333 2.4 5.333 5.333-2.4 5.333-5.333 5.333zM5.333 14.667c-2.267 0-4 1.733-4 4s1.733 4 4 4 4-1.733 4-4-1.733-4-4-4z"></Path>
// </Svg> */}

        {/* <Button
          transparent
          onPress={() => {this.props.navigation.navigate("Library")}}> */}
        {/* <SvgIcon svgs={svgs} /> */}
      {/* <Ico /> */}
      {/* <Image source={{uri: base64Icon}} /> */}

      {/* <Image style={{width: 100, height: 50, borderWidth: 1, borderColor: 'red'}} 
      source={{uri: base64Icon}}/> */}

      {/* </Button> */}
      </Right>
      <Body>
      </Body>
      <Right />
  </Header> )
  }
} 
const base64Icon= 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjQ1MzUgMTAzIDI4IDE4Ij4gIDxkZWZzPiAgICA8c3R5bGU+ICAgICAgLmNscy0xLCAuY2xzLTQgeyAgICAgICAgZmlsbDogbm9uZTsgICAgICB9ICAgICAgLmNscy0xLCAuY2xzLTIgeyAgICAgICAgc3Ryb2tlOiAjNDZjM2NmOyAgICAgIH0gICAgICAuY2xzLTIgeyAgICAgICAgZmlsbDogcmdiYSgyNTUsMjU1LDI1NSwwKTsgICAgICB9ICAgICAgLmNscy0zIHsgICAgICAgIHN0cm9rZTogbm9uZTsgICAgICB9ICAgIDwvc3R5bGU+ICA8L2RlZnM+ICA8ZyBpZD0iR3JvdXBfNDc2IiBkYXRhLW5hbWU9Ikdyb3VwIDQ3NiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDE3OSA4NykiPiAgICA8ZyBpZD0iRWxsaXBzZV81MzkiIGRhdGEtbmFtZT0iRWxsaXBzZSA1MzkiIGNsYXNzPSJjbHMtMSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzc2IDE2KSI+ICAgICAgPGNpcmNsZSBjbGFzcz0iY2xzLTMiIGN4PSI0IiBjeT0iNCIgcj0iNCIvPiAgICAgIDxjaXJjbGUgY2xhc3M9ImNscy00IiBjeD0iNCIgY3k9IjQiIHI9IjMuNSIvPiAgICA8L2c+ICAgIDxnIGlkPSJFbGxpcHNlXzkwNCIgZGF0YS1uYW1lPSJFbGxpcHNlIDkwNCIgY2xhc3M9ImNscy0yIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzNjYgMTYpIj4gICAgICA8Y2lyY2xlIGNsYXNzPSJjbHMtMyIgY3g9IjQiIGN5PSI0IiByPSI0Ii8+ICAgICAgPGNpcmNsZSBjbGFzcz0iY2xzLTQiIGN4PSI0IiBjeT0iNCIgcj0iMy41Ii8+ICAgIDwvZz4gICAgPGcgaWQ9IkVsbGlwc2VfOTA4IiBkYXRhLW5hbWU9IkVsbGlwc2UgOTA4IiBjbGFzcz0iY2xzLTIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDM1NiAxNikiPiAgICAgIDxjaXJjbGUgY2xhc3M9ImNscy0zIiBjeD0iNCIgY3k9IjQiIHI9IjQiLz4gICAgICA8Y2lyY2xlIGNsYXNzPSJjbHMtNCIgY3g9IjQiIGN5PSI0IiByPSIzLjUiLz4gICAgPC9nPiAgICA8ZyBpZD0iRWxsaXBzZV81MzktMiIgZGF0YS1uYW1lPSJFbGxpcHNlIDUzOSIgY2xhc3M9ImNscy0xIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzNzYgMjYpIj4gICAgICA8Y2lyY2xlIGNsYXNzPSJjbHMtMyIgY3g9IjQiIGN5PSI0IiByPSI0Ii8+ICAgICAgPGNpcmNsZSBjbGFzcz0iY2xzLTQiIGN4PSI0IiBjeT0iNCIgcj0iMy41Ii8+ICAgIDwvZz4gICAgPGcgaWQ9IkVsbGlwc2VfOTA0LTIiIGRhdGEtbmFtZT0iRWxsaXBzZSA5MDQiIGNsYXNzPSJjbHMtMSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzY2IDI2KSI+ICAgICAgPGNpcmNsZSBjbGFzcz0iY2xzLTMiIGN4PSI0IiBjeT0iNCIgcj0iNCIvPiAgICAgIDxjaXJjbGUgY2xhc3M9ImNscy00IiBjeD0iNCIgY3k9IjQiIHI9IjMuNSIvPiAgICA8L2c+ICAgIDxnIGlkPSJFbGxpcHNlXzkwNyIgZGF0YS1uYW1lPSJFbGxpcHNlIDkwNyIgY2xhc3M9ImNscy0xIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzNTYgMjYpIj4gICAgICA8Y2lyY2xlIGNsYXNzPSJjbHMtMyIgY3g9IjQiIGN5PSI0IiByPSI0Ii8+ICAgICAgPGNpcmNsZSBjbGFzcz0iY2xzLTQiIGN4PSI0IiBjeT0iNCIgcj0iMy41Ii8+ICAgIDwvZz4gIDwvZz48L3N2Zz4=)'

const styles = StyleSheet.create({
  BaseHeader: {
    borderWidth: 1,
    width: deviceWidth,
    backgroundColor: '#15304E'
  },
  headerTitleText: {
    flex: 1,
    maxHeight: 34,
    padding: 3,
    fontSize: 14,
    width: 320,
    color: '#95989A',
    fontWeight: 'normal',
    alignItems: 'flex-start'
  },
  
  headerTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 320,
    flex: 1,
    maxHeight: 34,
    backgroundColor: '#EEEEEE'
   // paddingTop: 6
  }})
export default BaseHeader
