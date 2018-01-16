import React, { Component } from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import ProgressCircle from 'react-native-progress-circle'
import CircleItem from '../../screens/library/components/circleItem'
import {Header, BaseHeader} from '../../components'
const uniqueId = require('react-native-unique-id')
import {Platform, Dimensions} from 'react-native'
import PhotoGrid from 'react-native-thumbnail-grid'
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  Animated,
  StyleSheet,
  TouchableHighlight
} from 'react-native'
var isHidden = true
const defaultImage = 'https://develop.backendless.com/76F8A504-3B6A-6FB4-FF49-80D009895D00/console/rybybqdyapoojmimusnrjbqxqxilcgfdirmr/files/view/public/Group%20425.svg'

class Library extends Component {
  constructor () {
    super()
    this.state = {
      dictionaries: [],
      showImages: true,
      images: [],
      selectedImage: ''
    }
    this.save = this.save.bind(this)
  }
  handleChange = async (text) => {
    const {showImages} = this.state
    //if (key === 'title') {
    showImages && this.setState({image: await this.getImage(text), text})
    //}
    !showImages && this.setState({text})
  }

  getImage = (title) => {
    return fetch(`https://api.unsplash.com/search/photos?limit=1&query=${title}&client_id=014af3c35810cd05ddd64eb714c4829487bde743a526aad0ead52188b7b39167`)
      .then((response) => response.json())
      .then((responseJson) => {
        const images = responseJson.results.map(i => i.urls.small)
        this.setState({images})
      })
      .catch((error) => {
        console.error(error)
      })
  }

  save = () => {
    const {title, image, description, images, selectedImage, text} = this.state
    let self = this
    console.log(title, description)
    uniqueId()
    .then(deviceId => {
      fetch('https://api.backendless.com/D1BC80DA-DD04-346F-FF38-040EFB614000/9E6B269F-9856-7AB7-FFD7-3DEFC793F500/data/dictionary',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            deviceId,
            title: text,
            image:  selectedImage,
            description: text })
        }).then(function (json) {
          console.log(self.props)
          self.props.navigation.navigate('Library')

          // t.props.navigation.navigate.push({
          //   index: 2,
          //   passProps: {
          //     name: 'property'
          //   }
          // })
        }).catch(err => console.log(err))
    })
    .catch(error => console.log(error))
  }


  setImage = (selectedImage) => {
    this.setState({selectedImage, showImages: false})
  }
  render () {
    const {image = '', showImages, images, selectedImage} = this.state
    console.log('data >', images)
    return <View style={{flex: 1}}>
      <BaseHeader title='Library' navigation={this.props.navigation}/>
      <View style={{flex:1, alignItems: 'center', paddingLeft: 20, paddingRight: 20}}>
      <Header title='My new dictionary' />
      <View style={styles.topRow}>
      <CircleItem 
        key='new'
        percent={0}
        radius={60}
        knowledge={0}
        words={0}
        subject={'...'}
        borderWidth={8}
        color='#3399FF'
        shadowColor='#fff'
        uri={selectedImage || defaultImage}
        isNew
        showText={0}
        onPress={()=>{this.setState({showImages: true})}}
       // innerCircleColor='#15304E'
      />
        <View style={styles.text}>
          <View style={styles.textRow}>
            <Text style={styles.mainText}>Knowledge</Text><Text style={styles.secondText}> 0%</Text>
          </View>
          <View style={styles.textRow}>
            <Text style={styles.mainText}>Subject</Text><Text style={styles.secondText}>{' ' + this.state.title || '...'}</Text>
          </View>
          <View style={styles.textRow}>
            <Text style={styles.mainText}>Words</Text><Text style={styles.secondText} > 0</Text>
          </View>
        </View>

      </View>


      <View style={styles.inputWrapper}>
        <View style={styles.verticalLine} />
        <TextInput 
          underlineColorAndroid='transparent'
          style={styles.input}
          editable
          onChangeText={this.handleChange.bind(this)}
        />
        <View style={styles.verticalLine} />
      </View>

     {!showImages && 
     <View>
      <View style={styles.inputWrapper}>
        <View style={styles.verticalLine} />
        <TextInput onChangeText={this.handleChange.bind(this, 'description')} />
        <View style={styles.verticalLine} />
      </View>
      <TouchableHighlight onPress={this.save.bind(this)}>
        <Text style={styles.create}>CREATE DICTIONARY</Text>
      </TouchableHighlight>
      </View>}
      {showImages && <View>
        <PhotoGrid 
          source={images}
          width={320}
          onPressImage={uri => this.setImage(uri)}
        />

        </View>}
    </View>
    </View>

  }
}

const styles = StyleSheet.create({
  create: {
    marginTop: 30,
    fontSize: 20,
    color: '#46C3CF'
  },
  input: {
    width: 320,
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
  textInput: {
  },
  inputWrapper: {

  },
  verticalLine: {

  },
  secondText: {
    fontSize: 15,
    fontWeight: 'normal'
  },
  mainText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ADB0B1'
  },
  text: {
    borderColor: 'green',
    width: 150,
    paddingLeft: 30
  },
  topRow: {
    flex: 1,
    flexDirection: 'row',
    borderColor: 'red',
    maxHeight: 120,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 25,
    marginLeft: 0,
    //borderWidth: 1,
    minWidth: 320
  },
  textRow: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: 20
  }
})

export default Library
