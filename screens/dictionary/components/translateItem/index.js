import React, { Component } from 'react'
import {
  View,
  ScrollView,
  Button,
  Text,
  Image,
  StyleSheet, TouchableOpacity, 
  TouchableWithoutFeedback,
} from 'react-native'

import {Platform, Dimensions} from 'react-native'
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
import SvgUri from 'react-native-svg-uri'

const one = deviceWidth / 100

class TranslateItem extends Component {
  constructor () {
    super()
    this.state = {
      modalVisible: false,
      showTranslates: false,
      selectedItems: []
    }
    this.openLibrary = this.openLibrary.bind(this)
  }

  openLibrary () {
    let { value, searchText = '' } = this.props
    console.log('>>>>',sentenseArr)
    console.log('>>>>',this.props)

    const {showTranslates, selectedItems} = this.state
    let sentenseArr = searchText.split(' ')
    sentenseArr = sentenseArr || []
    let words = []
    sentenseArr = sentenseArr.filter(v => v !== '')

    console.log(JSON.stringify(sentenseArr))

    if(selectedItems.length > 0) {
      const words = []
      const translates = []
      selectedItems.map(item => {
        const word = sentenseArr[item];
        words.push(word)
        if(value.alter && value.alter[word]) {
          translates.push(value.alter[word].join(', '))
        }
      })
      this.props.onNavigate(words, translates)
    } else {
      this.props.onNavigate(this.props.searchText, this.props.value)
    }   
  }

  toggleTranslates () {
    const {showTranslates} = this.state
    this.setState({showTranslates: !showTranslates})
  }

  selectItem = (i) => {
    const {selectedItems} = this.state
    if(selectedItems.includes(i)){
      selectedItems.splice(selectedItems.indexOf(i), 1);

    } else {
      selectedItems.push(i)
    }
    this.setState({selectedItems})
  }

  render () {
    let { value, lang, searchText = '' } = this.props
    const {showTranslates, selectedItems} = this.state
    let sentenseArr = searchText.split(' ')
    console.log('sentenseArr', sentenseArr)
    sentenseArr = sentenseArr || []
    let words = []
    sentenseArr = sentenseArr.filter(v => v !== '')
    if (value && value.alter && Object.keys(value.alter)) {
      words = Object.keys(value.alter)
    }
    const shadowOpt = {
      width:160,
      height:20,
      color:"#000",
      border:2,
      radius:1,
      opacity:0.2,
      x:0,
      y:0,
      
    }
    return (
      <View style={styles.baseRow}>
        <View style={styles.row}>
          <TouchableOpacity onPress={this.props.onChooseLang}>
            <View onPress={this._toggleLangs}>
              <View style={styles.pointSmall} />
              <View style={styles.pointSmall} />
              <View style={styles.pointSmall} />
              {/* <Image style={styles.dotsIcon} source={require('../../../../public/dots.png')} /> */}
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
                  <View style={styles.triangle} />
                  <View style={styles.triangleInner} />
                  <Text style={styles.textColor} >{value.text}</Text>
                </View>
            </TouchableWithoutFeedback>

          </View>
          <TouchableOpacity
            style={{width: 20, height: 20}} 
            onPress={this.openLibrary}>
            <SvgUri
              width='20'
              height='20'
              fill='#46C3CF'
              source={require('../../../../assets/images/addIcon.svg')}
            />
          </TouchableOpacity>
                  

        </View>
        {showTranslates && !!sentenseArr.length &&
        <View style={styles.synWrapper}>
          <View style={styles.synHeaderRow}>
            <View style={styles.synIconWrapper}>
              <View style={styles.lineHorizontal} />
              <View style={styles.lineSmall} />
            </View>
          </View>
          {sentenseArr.map((word, i) => {
            let pointClass = styles.point
            if(selectedItems.includes(i)) {
              pointClass = styles.pointFilled
            }
            return (
              <TouchableOpacity key={i}
                style={styles.synRow}
                onPress={this.selectItem.bind(this, i)}>
                <View style={styles.synIconWrapper}>
                  <View style={styles.lineSmall} />
                  <View style={pointClass} />
                  <View style={styles.line} />
                </View>
                <View style={styles.synTextWrapper}>
                  <Text style={styles.synTextHeader}>{word }</Text>
                  <Text style={styles.synTextContent}>{value.alter && value.alter[word] && value.alter[word].join(', ')}</Text>
                </View>
              </TouchableOpacity>
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

const triangleMargin = ((one * 62) / 2)
const styles = StyleSheet.create({
  triangleInner: {
    position: 'absolute',
    bottom: -8,
    left: triangleMargin + 2,
    width: 0,
    height: 0,
    borderTopColor: 'white',
    borderTopWidth: 8,
    borderRightWidth: 11,
    borderRightColor: 'transparent',
    borderLeftWidth: 11,
    borderLeftColor: 'transparent',
    zIndex: 100000
  },
  triangle: {
    position: 'absolute',
    bottom: -9,
    left: triangleMargin,
    width: 0,
    height: 0,
    borderTopColor: '#46C3CF',
    borderTopWidth: 9,
    borderRightWidth: 13,
    borderRightColor: 'transparent',
    borderLeftWidth: 13,
    borderLeftColor: 'transparent',

  },
  point: {
    width: 11,
    height: 11,
    borderWidth: 1,
    borderColor: '#95989A',
    borderRadius: 15
  },
  pointFilled: {
    width: 11,
    height: 11,
    borderWidth: 1,
    borderColor: '#95989A',
    borderRadius: 15,
    backgroundColor: '#46C3CF'
  },
  pointSmall: {
    width: 6,
    height: 6,
    borderWidth: 1,
    borderColor: '#95989A',
    borderRadius: 15,
    marginBottom: 2,
    marginRight: 2
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
    height: 50,    
    overflow: 'hidden',
    marginRight: 5,
  },

  textColor: {
    color: '#46C3CF'
  },

  transText: {
    width: one * 70,
    marginTop: 0,
    borderBottomColor: '#46C3CF',
    borderBottomWidth: 1,
    height: 25,
    marginBottom: 24,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: {
        height: 3.5,
        width: 0
    },
  },
  
})

export default TranslateItem
