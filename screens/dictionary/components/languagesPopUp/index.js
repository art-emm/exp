import React, { Component } from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
// const translate = require('google-translate-api');
//import Header from '../../components/header2'
import {Platform, Dimensions} from 'react-native'
import ReactNative from 'react-native';
var RCTUIManager = require('NativeModules').UIManager;

// npmconst Translate = require('@google-cloud/translate');
import _ from 'lodash'

import {
  ScrollView,
  View,
  TextInput,
  Image,
  Animated,
  StyleSheet,
  TouchableHighlight
} from 'react-native'

import { Container, Title,
  Left, Icon, Right, Button, Body, 
  Content,Text, Card, CardItem 
} from "native-base"; 

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const onePercent = deviceWidth/100;

const platform = Platform.OS;
const platformStyle = undefined;
const isIphoneX = platform === "ios" && deviceHeight === 812 && deviceWidth === 375;
var isHidden = true

const allLangs = {
  'ru': 'Russian',
  'en': 'English',
  'en1': 'English',
  'en11': 'English',
  'en3': 'English',
  'es': 'es'
}

const languages = {
  rowOne: [
    {
      lang: 'Bulgarian',
      code: 'bg'
    }, {
      lang: 'Croatian',
      code: 'hr'
    }, {
      lang: 'Czech',
      code: 'cs'
    }, {
      lang: 'Danish',
      code: 'da'
    }, {
      lang: 'Dutch',
      code: 'nl'
    }, {
      lang: 'English',
      code: 'en'
    }, {
      lang: 'Estonian',
      code: 'et'
    }, {
      lang: 'Finnish',
      code: 'fi'
    }, {
      lang: 'French',
      code: 'fr'
    }, {
      lang: 'German',
      code: 'de'
    }, {
      lang: 'Greek',
      code: 'el'
    }, {
      lang: 'Hungarian',
      code: 'hu'
    }, {
      lang: 'Irish',
      code: 'ga'
    }
  ],
  rowTwo: [
    {
      lang: 'Italian',
      code: 'it'
    }, {
      lang: 'Latvian',
      code: 'lv'
    }, {
      lang: 'Lithuanian',
      code: 'lt'
    }, {
      lang: 'Maltese',
      code: 'mt'
    }, {
      lang: 'Polish',
      code: 'pl'
    }, {
      lang: 'Portuguese',
      code: 'pt'
    }, {
      lang: 'Romanian',
      code: 'ro'
    }, {
      lang: 'Russian',
      code: 'ru'
    }, {
      lang: 'Slovak',
      code: 'sk'
    }, {
      lang: 'Slovenian',
      code: 'sl'
    }, {
      lang: 'Spanish',
      code: 'es'
    }, {
      lang: 'Swedish',
      code: 'sv'
    }, {
      lang: 'Ukrainian',
      code: 'uk'
    }
  ]
}

export default class LanguagesPopUp extends Component {
  constructor () {
    super()
    this.state = {
      selectedLang: '',
      translates: {
        'ru': '',
        'fr': '',
        'es': ''
      },
    }
  }
  

  render() {
    let { translates, arrowIndex, selectedLang, selectDefaultLang } = this.props
    let { bounceValue, showLangs, textToTranslate='' } = this.state
    let selectedCircle = {
      backgroundColor: '#47C3CF'
    }
    let marginTop = 65.5
    let top = {
      top:  marginTop + arrowIndex * 60
    }
    
    let topInner = {
      top:  marginTop + 1 + arrowIndex * 60
    }
    const langs = Object.keys(translates)

    return (
      <Animated.View style={styles.popupWrapper}>
        <View style={styles.talkBubble}>
          <View style={styles.talkBubbleSquare}>
            <View style={styles.rowOne}>
              {languages.rowOne.map(l => {
                return (
                  <TouchableHighlight
                    activeOpacity={100}
                    underlayColor="#47C3CF"
                    onPress={() => {this.props.onSelectLang(l.code, selectedLang)}}
                    style={styles.translate}
                    key={l.code}
                  >
                    <View style={styles.translate} key={l.code}>
                      <View
                        style={[
                          styles.translateCircle,
                          selectedLang === l.code && selectedCircle
                        ]}
                      />
                      <Text style={styles.translateText}>{l.lang}</Text>
                    </View>
                  </TouchableHighlight>
                );
              })}
            </View>
            <View style={styles.rowOne}>
              {languages.rowTwo.map(l => {
                return (
                  <TouchableHighlight
                    activeOpacity={100}
                    underlayColor="#47C3CF"
                    onPress={() => {this.props.onSelectLang(l.code, selectedLang)}}
                    style={styles.translate}
                    key={l.code}
                  >
                    <View style={styles.translate} key={l.code}>
                      <View
                        style={[
                          styles.translateCircle,
                          selectedLang === l.code && selectedCircle
                        ]}
                      />
                      <Text style={styles.translateText}>{l.lang}</Text>
                    </View>
                  </TouchableHighlight>
                );
              })}
            </View>
          </View>
        </View>
        {!selectDefaultLang && <View style={[styles.talkBubbleTriangle, top]} />}
        {!selectDefaultLang && <View style={[styles.talkBubbleTriangleInner, topInner]} />}
      </Animated.View>
    );
  }
}


const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20
  },
  translateText: {
    fontSize: 20,
    marginLeft: 5
  },
  translate: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10
  },
  translateCircle: {
    marginTop: 2,
    width: 14,
    height: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#95989A'
  },
  rowOne: {
    width: 120
  },
  talkBubble: {
    flex: 1,
    marginLeft: 50,
    backgroundColor: 'transparent'
  },

  talkBubbleSquare: {
    paddingTop: 16,
    paddingLeft: 10,
    paddingBottom: 16,
    flex: 1,
    flexDirection: 'row',
    width: 260,
    height: 390,
    borderRadius: 10,
    borderColor: '#95989A',
    borderWidth: 1,
    backgroundColor: '#EEEEEE'
  },

  talkBubbleTriangle: {
    position: 'absolute',
    left: 27,
    width: 0,
    height: 0,
    borderTopColor: 'transparent',
    borderTopWidth: 8,
    borderRightWidth: 24,
    borderRightColor: '#95989A',
    borderBottomWidth: 8,
    borderBottomColor: 'transparent'
  },

  talkBubbleTriangleInner: {
    position: 'absolute',
    left: 29,
    width: 0,
    height: 0,
    borderTopColor: 'transparent',
    borderTopWidth: 7,
    borderRightWidth: 23,
    borderRightColor: '#EEEEEE',
    borderBottomWidth: 7,
    borderBottomColor: 'transparent'
  },
  popupWrapper: {
    position: 'absolute',
    right: 12,
    top: isIphoneX ? 157 : 126,
    width: 310,
    height: 450,
    borderColor: 'black'
  },

  defaultLang: {
    flex: 10,
    flexWrap: 'wrap'

  },

  arrow: {
    position: 'absolute',
    bottom: 0,
    left: -2,
    top: 0,
    backgroundColor: 'blue',
    width: 50,
    height: 50,
    transform: [{rotate: '45 deg'}],
    zIndex: 9,
    elevation: 9
  },

  allLangs: {
    position: 'absolute',
    right: 0,
    overflow: 'visible',
    top: 0,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#e939e9',
    width: 270,
    height: 700,
    borderColor: 'green',
    zIndex: 2
  },

  layout: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: onePercent * 2.5,
    paddingTop: 0,
    zIndex: 1,
    backgroundColor: 'white'
  },

  input: {
    width: onePercent * 88,
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    ...Platform.select({
      ios: {
        marginTop: 15
      },
      android: {
        marginTop: 5
    }})
  },

  text: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 10
  },
  photo: {
    fontStyle: 'italic',
    marginBottom: 15
  }
})

