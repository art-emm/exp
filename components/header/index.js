import React, { Component } from 'react'
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableHighlight,
  Touchable,
  TouchableOpacity,
  Keyboard,
  Dimensions
} from 'react-native'
const deviceWidth = Dimensions.get('window').width
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
    this.setState({showSearch}, () => {
      if(showSearch) this.textInput.focus()
    })
  }

  onChange (value) {
    if (this.props.onTextChange) this.props.onTextChange(value)
  }

  render () {
    const { showSearch } = this.state
    if (showSearch) {
      return (<View style={{
          maxHeight: 34,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row'
        }}>
        <View style={{
              maxWidth: one * 88,
              backgroundColor: '#EEEEEE',
              flex: 1,
              flexDirection: 'row',
              borderColor: 'green',
              alignItems:'flex-end'
            }}>
        <View style={{
           borderColor: '#95989A',
           borderLeftWidth: 1,
           height: 9

        }}></View>
          <TextInput 
            onChangeText={this.onChange.bind(this)}
            underlineColorAndroid='transparent'
            ref={ref => this.textInput = ref}
            style={{
              borderColor: '#95989A',
              borderBottomWidth: 1,
              marginBottom: 4,
              height: 30,
              flex:1
            }} 
            />

               <View style={{
          borderColor: '#95989A',
          borderLeftWidth: 1,
          height: 9

        }}></View>
            </View>
      </View>)
    }
    return (
      <View style={{
        maxHeight: 34,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <TouchableOpacity 
          onPress={this.toggleSearch.bind(this)}
          style={styles.headerTitle}
        >
          <Text 
            style={styles.text}>
              {this.props.title}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  textInput: {
    minHeight: 34
  },
  text: {
    // fontFamily: 'Helvetica Neue',
    fontSize: 15,
    fontWeight: '500',
    color: '#95989A'
    // ,
    // borderBottomWidth: 1
  },
  headerTitleText: {
    flex: 1,
    maxHeight: 34,
    padding: 3,
    fontSize: 14,
    width: one * 88,
    color: '#95989A',
    fontWeight: 'normal',
    alignItems: 'center',
    borderBottomWidth: 1
  },
  vertical: {
    borderWidth: 1,

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
