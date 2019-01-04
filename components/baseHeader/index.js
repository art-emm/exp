import React, { Component } from 'react'
import { StyleSheet, Dimensions, Text, View, TouchableWithoutFeedback } from 'react-native'
import { Left, Icon, Right, Button, Body, Header } from 'native-base'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import fontelloConfig from './config.json'
import SvgUri from 'react-native-svg-uri'

const RightMenu = createIconSetFromFontello(fontelloConfig)
const deviceWidth = Dimensions.get('window').width
const onePercent = deviceWidth/100;

class BaseHeader extends Component {
  render () {
    return (
      <Header style={styles.BaseHeader}>
      <Left>
      <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('DrawerOpen')}>

          <View style={styles.left}>

            <SvgUri
              width={20}
              height={21}
              fill='#46C3CF'
              source={require('../../tmpImages/menu_1.svg')}
            />
          </View>
          </TouchableWithoutFeedback>

          </Left>
          <Body>
          <SvgUri width='60'
              height={35}
              fill='#FFFFFF'
            source={require('../../assets/images/logo.svg')}
          />
          </Body>
          <Right>
          <TouchableWithoutFeedback
            onPress={() => this.props.navigation.navigate('Library')}>
          <View style={styles.right}>
         
            <SvgUri 
              width={33}            
              height={34}
              source={require('../../tmpImages/men_2.svg')}
            />
          </View>
          </TouchableWithoutFeedback>

          </Right>


          {/* <Button style={{borderWidth:1, borderColor:'#15304E'}}
            transparent
            onPress={() => this.props.navigation.navigate('DrawerOpen')}>
           <SvgUri
            width={60}
            height={20}
            fill='#46C3CF'
            source={require('../../tmpImages/menu_1.svg')}
          />
          </Button>
          <SvgUri width='60'
            height='60'
            fill='#FFFFFF'
            source={require('../../assets/images/logo.svg')}
          />
          <TouchableWithoutFeedback
            transparent
            onPress={() => this.props.navigation.navigate('Library')}
            style={{borderWidth: 1}}>
            <RightMenu
              name='headericon'
              size={26}
              color='#46C3CF' />
          </Button> */}
      </Header>)
  }
}

const styles = StyleSheet.create({
  left: {
    // borderWidth: 1,
    justifyContent: 'flex-end',
    marginLeft: onePercent * 3.6,
    height: 30,
  },
  right: {
    // borderWidth: 1,
    alignItems: 'flex-end',
    marginRight: onePercent * 3.6,
    paddingRight: 0,
    height: 30,
    marginTop: 5
  },
  BaseHeader: {
    // borderWidth:1,
    // borderColor: 'red',
    width: deviceWidth,
    backgroundColor: '#15304E',
    justifyContent: 'flex-end',
    paddingBottom: 3
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
