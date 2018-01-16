import React, { Component } from 'react'
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet, TouchableOpacity, 
  TouchableWithoutFeedback, TouchableHighlight
} from 'react-native'
import Library from '../../../library'

import {Platform, Dimensions} from 'react-native'
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const one = deviceWidth / 100

class TranslateItem extends Component {
  constructor () {
    super()
    this.state = {
      modalVisible: false,
      showTranslates: false
    }
    this.openLibrary = this.openLibrary.bind(this)
  }

  openLibrary () {
    alert('on nav')
    this.props.onNavigate(this.props.searchText, this.props.value)
  }
  toggleTranslates () {
    const {showTranslates} = this.state
    this.setState({showTranslates: !showTranslates})
  }

  render () {
    let { value, lang, searchText = '' } = this.props
    const {showTranslates} = this.state
    let sentenseArr = searchText.split(' ')
    sentenseArr = sentenseArr? sentenseArr : []
    let words = []
    sentenseArr = sentenseArr.filter(v=>v!='');
    if(value && value.alter && Object.keys(value.alter)){
      words = Object.keys(value.alter)
    }
    
    return (
      <View style={styles.baseRow}>
        <View style={styles.row}>
          <TouchableOpacity onPress={this.props.onChooseLang}>
            <View onPress={this._toggleLangs}>
              <Image style={styles.dotsIcon} source={require('../../../../public/dots.png')} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.onChooseLang}>

          <View style={styles.lang}>
            <Text style={styles.langText}>{lang.toUpperCase()}</Text>
          </View>
          </TouchableOpacity>

          <View style={styles.trans}>
            <TouchableWithoutFeedback onPress={this.toggleTranslates.bind(this)}>
              <View style={styles.transText}>
                <Text style={styles.textColor} >{value.text}</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          {/* <View style={styles.addIcon}>
            <Image
              source={require('../../../../public/sound.png')}
          />
          </View> */}
          <TouchableOpacity onPress={this.openLibrary}>
            <Image onPress={this.openLibrary}
              source={require('../../../../public/add.png')}
          />
          </TouchableOpacity>
        </View>
        {showTranslates && 
        <View style={styles.synWrapper}>
          <View style={styles.synHeaderRow}>
            <View style={styles.synIconWrapper}>
              <View style={styles.lineHorizontal} />
              <View style={styles.lineSmall} />
            </View>
          </View>
          {sentenseArr.map((word, i) => {
            return (
              <View key={i} style={styles.synRow}>
                <View style={styles.synIconWrapper}>
                  <View style={styles.lineSmall} />
                  <View style={styles.point} />
                  <View style={styles.line} />
                </View>
                <View style={styles.synTextWrapper}>
                  <Text style={styles.synTextHeader}>{word }</Text>
                  <Text style={styles.synTextContent} >{value.alter && value.alter[word] && value.alter[word].join(', ')}</Text>
                </View>
              </View>
            )
          })}
          <View style={styles.synHeaderRow}>
            <View style={styles.synIconWrapper}>
            <View style={styles.lineSmall} />

              <View style={styles.lineHorizontal} />
            </View>
          </View>
        </View>}
      </View>
    )
  }

  setModalVisible (visible) {
    this.setState({modalVisible: visible})
  }
}

const styles = StyleSheet.create({
  point: {
    width: 11,
    height: 11,
    borderWidth: 1,
    borderColor: '#95989A',
    borderRadius: 15
  },

  line: {
    width: 1,
    height: 100,
    backgroundColor: '#95989A'
    
  },

  lineHorizontal: {
    marginLeft: 1,
    width: 9,
    height: 1,
    backgroundColor: '#95989A'
  },

  lineSmall: {
    width: 1,
    height: 5,
    // borderWidth: 1,
    backgroundColor: '#95989A'
  },

  synTextHeader: {
    marginLeft: 15,
    color: '#46C3CF',
    //borderBottomWidth: 1

  },

  synTextContent: {
    marginLeft: 15,
    color: '#95989A'
  },

  synRow: {
    // paddingTop: 2,
    // borderWidth: 1,
    flexShrink: 0,
    flexDirection: 'row',
    backgroundColor: '#F8F8F8'
  },

  synHeaderRow: {
   // flex: 1,
    maxHeight: 6,
    backgroundColor: '#F8F8F8'
  },

  synTextWrapper: {
    flex: 1,
 //   borderWidth: 1,
    flexGrow: 1,
    flexWrap: 'wrap'
  },

  synIconWrapper: {
    alignItems: 'center',
    width: 30,
    height: 50
  },

  synWrapper: {
   // flex: 1,
   //borderWidth: 1,
    width: one * 77.5,
    marginLeft: one * 2.5,
    overflow: 'hidden'
  },

  baseRow: {
    flexDirection: 'column',
   // justifyContent: 'center',
   // alignItems: 'center',
    marginTop: 10,
    marginLeft: 7,
    width: one * 88    
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  dotsIcon: {
    height: 25,
    marginRight: 2
  },

  addIcon: {
    height: 25,
    marginRight: 5
  },

  lang: {
    justifyContent: 'center',
    width: one * 10
  },

  langText: {
    // fontFamily: 'helvetica-neue',
    fontSize: 26,
    fontWeight: '400'
  },

  trans: {
    flex: 1,
    justifyContent: 'center',
    height: 50
  },

  textColor: {
    color: '#46C3CF',    
  },

  transText: {
    marginTop: 0,
    borderBottomColor: '#46C3CF',
    borderBottomWidth: 1,
    height: 25,
    marginBottom: 24,
    marginRight: 5
  }
})

export default TranslateItem
