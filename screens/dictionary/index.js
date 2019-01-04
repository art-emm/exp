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

import LanguagesPopUp from './components/languagesPopUp'
import { dictionariesStore } from '../../store'

import {Header, BaseHeader} from '../../components'

import Library from '../library/index'

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

import {TranslateItem} from './components'
import {computed} from 'mobx';
import {observer} from 'mobx-react';
// import {debounce} from 'throttle-debounce';

@observer
class Dictionary extends Component {
  constructor () {
    super()

    this.state = {
      searchText: '',
      showLangs: false,
      selectedLang: '',
      translates: {
        'ru': '',
        'fr': '',
        'es': ''
      },
      bounceValue: new Animated.Value(0),  // This is the initial position of the subview
      arrowIndex: 0
    }
    this.navigateTo = this.navigateTo.bind(this)
    this.handleTextInputDelayed = _.debounce(this.handleTextInput, 200, false);
    this.onChangeTextDelayed = _.debounce(this.handleTextInput, 500);
  }


  componentWillMount () {
        // this.handleTextInputDelayed = _.debounce(this.handleTextInput, 200, false);

  }
  
 
  toggleLangs = (selectedLang, arrowIndex) => {
    let { showLangs } = this.state
    showLangs = !showLangs
    this.setState({showLangs, selectedLang, arrowIndex})
  }

  navigateTo (text, value) {
    this.props.navigation.navigate('Library', {passedProps: {text, value}});
  }
  
  @computed get user () {
    return dictionariesStore.user
  }

  render () {
    let { translates, bounceValue, showLangs, selectedLang, arrowIndex, textToTranslate='' } = this.state
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
      <View style={styles.layout} >
        <BaseHeader title='Dictionary' navigation={this.props.navigation}/>
        <Header title='Dictionary'/>
        <TextInput
          ref='translate'
          autoFocus={true}
          underlineColorAndroid='transparent'
          style={styles.input}
          editable
          onChangeText={this.onChangeTextDelayed}
        />
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {langs.length > 0 && langs.map((l, i) => {
            return (
              <TranslateItem key={l}
                ref={'_translateItem_' + i}
                onNavigate={this.navigateTo}
                onChooseLang={this.toggleLangs.bind(this, l, i)}
                lang={l}
                value={translates[l]}
                searchText={textToTranslate}
              />
            )
          })}
        </ScrollView>
        {showLangs &&  
          <LanguagesPopUp
            arrowIndex={arrowIndex}
            translates={translates}
            selectedLang={selectedLang}
            onSelectLang={this.selectLang} />
        }
        {/* {this.user.deviceId &&  
        !this.user.defaultLang &&
          <LanguagesPopUp
            selectDefaultLang
            arrowIndex={arrowIndex}
            translates={translates}
            selectedLang={selectedLang}
            onSelectLang={this.selectDefaultLang} />
        } */}
      </View>
    )
  }

  selectDefaultLang = async (lang) => {
    await dictionariesStore.updateUserLang(lang)
  }

  selectLang = (newLang, oldLang) => {
    console.log('set lng')
    let { translates } = this.state
    let keys = Object.keys(translates)
    if(keys.includes(newLang)) return
    const indexOfItem = keys.indexOf(oldLang)
    keys[indexOfItem] = newLang
    translates = {}
    keys.map(k => {
      translates[k] = ''
    })
    console.log({translates2: translates})
    this.setState({selectedLang: newLang, translates, showLangs: false}, () => {
      this.handleTextInput(this.state.textToTranslate || "")      
      this.refs['translate'].focus();
    })    
  }

  handleTextInput = (text) => {
    from = this.user && this.user.defaultLang || 'en'
    const { translates } = this.state
    console.log('hinp', translates)
    this._translate.apply(this, [text, '', ...Object.keys(translates)])
    .then(translates => {
      console.log({translates})
      if(translates.message) {
        console.warn('Request error', translates)
      } else {
        this.setState({translates, textToTranslate: text})
      }
    })
    .catch(err => {
      console.log('>',err)
    })
  }

  _getTranslateUrl (from, text, lang1, lang2, lang3) {
    const url = `https://api.backendless.com/76F8A504-3B6A-6FB4-FF49-80D009895D00/0F9323A5-62DC-6C5C-FFAB-3AE8F65FA900/services/SampleService/translate?from="${from}"&q="${text}"&lang1="${lang1}"&lang2="${lang2}"&lang3="${lang3}"`
    console.log(url)
    return url
  }
  _translate (text, from, lang1,lang2, lang3) {
    return fetch(this._getTranslateUrl(from, text, lang1, lang2, lang3))
     .then((response) => response.json())
  }

  async componentDidMount () {
    await dictionariesStore.checkUser()
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
    top: isIphoneX ? 150 : 126,
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

export default Dictionary
