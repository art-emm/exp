import React, { Component } from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
//import ProgressCircle from 'react-native-progress-circle'
import CircleItem from '../../screens/library/components/circleItem'
import uniqueId from 'react-native-unique-id'
//import Header from '../../components/header'
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight
} from 'react-native'

import {Header, BaseHeader} from '../../components'

import {Platform, Dimensions} from 'react-native'
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const one = deviceWidth / 100
var isHidden = true
const url = 'https://api.backendless.com/D1BC80DA-DD04-346F-FF38-040EFB614000/9E6B269F-9856-7AB7-FFD7-3DEFC793F500/data/dictionary'
class Library extends Component {
  constructor () {
    super()
    this.state = {
      dictionaries: []
    }
  }
  async componentDidMount () {
    try {
      const id = await uniqueId()
      const fetchResult = await fetch(`${url}?where=deviceId%3D'${id}'`)
      let dictionaries = await fetchResult.json()
      dictionaries = dictionaries.sort((a,b) => {return b.created - a.created})      
      this.setState({dictionaries})
    } catch (error) {
      alert(JSON.stringify(error))
    }
  }
  createNew = () => {
    this.props.navigation.navigate('CreateNew', {passedProps: {translate: this.props.translate}})
  }

  async handleSearch (value) {
    try {
      const id = await uniqueId()
      const fetchResult = await fetch(`${url}?where=deviceId%3D'${id}'%20and%20title%20like%20'%25${value}%25'`)
      let dictionaries = await fetchResult.json() || []
      dictionaries = dictionaries.sort((a,b) => {return b.created - a.created})
      this.setState({dictionaries})
    } catch (error) {
      alert(JSON.stringify(error))
    }
  }

  openDictionary = async (dictionaryId) => {    
    if(this.props.navigation.state && this.props.navigation.state.params 
        && this.props.navigation.state.params.passedProps) {
      const passedData = this.props.navigation.state.params.passedProps;      
      const key = passedData.text;
      const value = passedData.value.text;

      const fetchResult = await fetch(`${url}?where=objectId%3D'${dictionaryId}'`)
      let dictionary = await fetchResult.json()
      try {
      dictionary = JSON.parse(JSON.stringify(dictionary[0]))
      } catch(err) {
        console.log(err)
      }
      if(!dictionary.words) {
        dictionary.words = 0
      } 

      dictionary.words = dictionary.words + 1
      alert(JSON.stringify(dictionary))
      fetch(`${url}?where=objectId%3D'${dictionaryId}'`,
      {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dictionary)
      }).then(function (json) {
      }).catch(err => console.log)

      this.props.navigation.state.params.passedProps = null
      fetch('https://api.backendless.com/D1BC80DA-DD04-346F-FF38-040EFB614000/9E6B269F-9856-7AB7-FFD7-3DEFC793F500/data/words',
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({key, value, dictionaryId})
      }).then(function (json) {
        self.props.navigation.navigate('Library')
        this.props.navigation.state.params.passedProps = null
      }).catch(err => console.log)
    } else {
      this.props.navigation.navigate('OpenedDictionary', {dictionaryId})    
    }
  }

  render () {
    const { dictionaries = [] } = this.state
    if (!dictionaries) return null
    return <View style={{flex: 1, backgroundColor: 'white', borderWidth: 1}}>
      {/* <Header title='My words' toInput onTextChange={this.handleSearch.bind(this)} /> */}
      <BaseHeader title='Library' navigation={this.props.navigation}/>
      <Header title='Library' />

      <ScrollView contentContainerStyle={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        // marginTop: 10
        flex: 1,
        //flexFlow: 'row wrap',
        borderWidth: 1,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingLeft: one * 6,
        paddingRight: one * 6,
        paddingTop: one * 3

      }}>

        <CircleItem key='new'
          percent={0}
          radius={one * 12}
          knowledge={0}
          words={0}
          subject={'...'}
          borderWidth={8}
          color='#3399FF'
          shadowColor='#fff'
          uri={'https://develop.backendless.com/5D654901-52CA-3D17-FF6E-A316FAE35800/console/momvhmxveouhvqjoxlthiaxwawdwsyxihdad/files/view/public/header-profile-skin-1.png'}
          isNew
          onPress={this.createNew}
        />

        {dictionaries.map(d => {
          return (
            <CircleItem 
              key={Math.random()}
              percent={d.knowledge}
              radius={one * 12}
              knowledge={d.knowledge || 0}
              words={d.words}
              subject={d.title}
              borderWidth={8}
              color='#3399FF'
              shadowColor='#fff'
              uri={d.image || 'https://develop.backendless.com/5D654901-52CA-3D17-FF6E-A316FAE35800/console/momvhmxveouhvqjoxlthiaxwawdwsyxihdad/files/view/public/header-profile-skin-1.png'}
              isNew
              onPress={this.openDictionary.bind(this, d.objectId)}
              id={d.objectId}

           />)
        })}
      <View style={{width: one * 24 }}/>
      </ScrollView>
    </View>
  }
}

const styles = StyleSheet.create({
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
    flexWrap: 'wrap',
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
    alignItems: 'flex-start',
    padding: 20,
    zIndex: 1,
    borderWidth: 1
  },

  input: {
    width: 300,
    borderBottomColor: 'gray'
  },

  header1: {
    fontSize: 24,
    marginBottom: 10
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

export default Library
