import React, { Component } from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableHighlight,
  Touchable,
  TouchableOpacity
} from 'react-native'



import {Platform, Dimensions} from 'react-native'
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const one = deviceWidth / 100


class Header extends Component {
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
    const { showSearch } = this.state
    if (showSearch) return (<TextInput onChangeText={this.onChange.bind(this)} underlineColorAndroid='transparent' style={[styles.headerTitle, styles.headerTitleText]} />)
    return (
    <View style={{    
      maxHeight: 34, 
      flex:1,
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <TouchableOpacity onPress={this.toggleSearch.bind(this)} style={styles.headerTitle}>
        <Text style={styles.text}>{this.props.title}</Text>
      </TouchableOpacity>
    </View>
    )
  }
}
const styles = StyleSheet.create({
  text: {
    // fontFamily: 'Helvetica Neue',
    fontSize: 15,
    fontWeight: '500',
    color: '#95989A'
  },
  headerTitleText: {
    flex: 1,
    maxHeight: 34,
    padding: 3,
    fontSize: 14,
    width: one * 88,
    color: '#95989A',
    fontWeight: 'normal',
    alignItems: 'flex-start'
  },
  headerTitle: {
    // borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: one * 88,
    flex: 1,
    maxHeight: 34,
    backgroundColor: '#EEEEEE'
    // paddingTop: 6
  }})
export default Header
