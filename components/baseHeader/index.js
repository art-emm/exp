import React, { Component } from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import { Left, Icon, Right, Button, Body, Header, Text } from 'native-base'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import fontelloConfig from './config.json'
  
const RightMenu = createIconSetFromFontello(fontelloConfig)
const deviceWidth = Dimensions.get('window').width
class BaseHeader extends Component {

  render () {
    console.log('>>>', this.props.navigation)
    return (
      <Header style={styles.BaseHeader}>
        <Left style={{minWidth: deviceWidth}}>
          <Button
            transparent
            onPress={() => this.props.navigation.navigate('DrawerOpen')}>
            <Icon name='menu' />
          </Button>
        </Left>
        <Body />
        <Right>
          <Button
            transparent
            onPress={() => this.props.navigation.navigate('Library')}
            style={{width: deviceWidth * 0.21}}>
            <RightMenu
              name='headericon'
              size={20}
              color='#46C3CF' />
          </Button>
        </Right>
      </Header>)
  }
}

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
