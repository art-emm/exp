import React, { Component } from 'react'
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  StyleSheet, TouchableOpacity, Modal
} from 'react-native'

class Langs extends Component {
  constructor() {
    super()
    this.state = {
      modalVisible: false
    }
  }

  render() {
    let { value, lang } = this.props
    console.log(value)
    return (
      <View style={styles.row}>
        <TouchableOpacity onPress={this._toggleLangs}>
          <View onPress={this._toggleLangs}>
            <Image
              style={styles.dotsIcon}
              source={require('../../../../public/dots.png')}
          />
          </View>
        </TouchableOpacity>
        <View style={styles.lang}>
          <Text style={styles.langText}>{lang.toUpperCase()}</Text>
        </View>
        <View style={styles.trans}>
          <Text style={styles.transText}>{value}</Text>
        </View>
        <View style={styles.addIcon}>
          <Image
            source={require('../../../../public/sound.png')}
          />
        </View>
        <View>
          <Image
            source={require('../../../../public/add.png')}
          />
        </View>

      </View>
    )
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible})
  }
}

const styles = StyleSheet.create({
  row: {
    // flex: 1
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginTop: 10
  },
  dotsIcon: {
    height: 25,
    marginRight: 5
  },
  addIcon: {
    height: 25,
    marginRight: 5
  },

  lang: {
    justifyContent: 'center',
    width: 50
  },

  langText: {
    // fontFamily: 'Helvetica Neue',
    fontSize: 30,
    fontWeight: '400'
  },

  trans: {
    flex: 1,
    justifyContent: 'center',
    height: 50
  },

  transText: {
    marginTop:0,
    color: '#46C3CF',
    borderBottomColor: '#46C3CF',
    borderBottomWidth: 1,
    height: 25,
    marginBottom: 24,
    marginRight:10

  }
})

export default Langs
