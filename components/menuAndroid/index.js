import React, { Component, PropTypes } from 'react'

import {
  View,
  ScrollView,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import CircleItem from '../../screens/library/components/circleItem'
import Icon from 'react-native-vector-icons/Ionicons'
const menuItems = [
  {
    thumb: 'lighthouse_lindau',
    index: 1,
    label: 'Dictionary'
  },
  {
    thumb: 'lighthouse_fanad',
    index: 2,
    label: 'Library'
  },
  {
    thumb: 'lighthouse_fanad',
    index: 3,
    label: 'New Dictionary'
  }
]
class MenuAndroid extends Component {
  constructor (props) {
    super(props)
    this.state = {route: 0}
    this.navigateTo = this.navigateTo.bind(this)
  }

  navigateTo (index) {
    this.props.navigate(index)
  }

  render () {
    return (
      <ScrollView style={styles.drawer}>
        <View style={styles.header} key={0}>
          <View style={styles.headerIcon} key={0}>
            <CircleItem key='new'
              percent={0}
              radius={42}
              knowledge={0}
              words={0}
              subject={'...'}
              borderWidth={8}
              color='#3399FF'
              shadowColor='#fff'
              uri={'https://develop.backendless.com/5D654901-52CA-3D17-FF6E-A316FAE35800/console/momvhmxveouhvqjoxlthiaxwawdwsyxihdad/files/view/public/header-profile-skin-1.png'}
              isNew
              showText={0}
              innerCircleColor='#15304E'
        />
          </View>
          <View style={styles.headerText} key={0}>
            <Icon name='md-boat' size={50} color='#fff' />
          </View>
        </View>
        <View style={styles.content} key={1}>
          {menuItems.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.listItem}
              onPress={this.navigateTo.bind(this, item.index)}>
              <Text style={styles.listItemTitle}>{item.label}</Text>
            </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    )
  }
}

MenuAndroid.propTypes = {
  navigate: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    paddingTop: 30,
    paddingLeft: 40,
    paddingRight: 30,
    backgroundColor: '#15304E'
  },
  header: {
    flex: 1,
    paddingBottom: 16
  },
  content: {
    flex: 3,
    borderColor: '#46C3CF',
    borderTopWidth: 1
  },

  headerInfo: {
  },

  headerIcon: {

  },

  headerTitle: {
    color: '#fff',
    fontSize: 20
  },
  headerEmail: {
    color: '#fff',
    fontSize: 16
  },
  listItemTitle: {
    marginTop: 16,
    fontSize: 18,
    flexShrink: 1,
    color: '#fff'
  }
})

export default MenuAndroid
