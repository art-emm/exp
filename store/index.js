
import {observable} from 'mobx'
import uniqueId from 'react-native-unique-id'

const url = 'https://api.backendless.com/D1BC80DA-DD04-346F-FF38-040EFB614000/9E6B269F-9856-7AB7-FFD7-3DEFC793F500/data/dictionary'

class DictionariesStore {
  @observable 
  userDictionaries = []

  @observable user = {}
  
  async checkUser() {
    const deviceId = await uniqueId()
    const fetchResult = await fetch(`https://api.backendless.com/D1BC80DA-DD04-346F-FF38-040EFB614000/9E6B269F-9856-7AB7-FFD7-3DEFC793F500/data/user?where=deviceId%3D'${deviceId}'`)
    let user = await fetchResult.json()
    if(user.code === 1000 || user.length === 0) {
      await fetch('https://api.backendless.com/D1BC80DA-DD04-346F-FF38-040EFB614000/9E6B269F-9856-7AB7-FFD7-3DEFC793F500/data/user',
          {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({deviceId})
          })
      // const fetchResult = await fetch(`https://api.backendless.com/D1BC80DA-DD04-346F-FF38-040EFB614000/9E6B269F-9856-7AB7-FFD7-3DEFC793F500/data/user?where=deviceId%3D'${deviceId}'`)
      user = await fetchResult.json()

      this.user = user[0]
    } else {
      this.user = user[0]
    }
    console.log('user', this.user)
  }

  async updateUserLang(defaultLang){
    console.log(this.user)
    alert(defaultLang)

    const fetchResult = await fetch('https://api.backendless.com/D1BC80DA-DD04-346F-FF38-040EFB614000/9E6B269F-9856-7AB7-FFD7-3DEFC793F500/data/user/'+ this.user.objectId,
          {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({defaultLang: defaultLang})
          })
      // const fetchResult = await fetch(`https://api.backendless.com/D1BC80DA-DD04-346F-FF38-040EFB614000/9E6B269F-9856-7AB7-FFD7-3DEFC793F500/data/user?where=deviceId%3D'${deviceId}'`)
      user = await fetchResult.json()
      console.log(user)

  }
  
  async getUserDictionaries(value = null) {
    const id = await uniqueId()
    let fetchResult = null
    if(!value) {
      fetchResult = await fetch(`${url}?pageSize=100&where=deviceId%3D'${id}'`)
    } else {
      fetchResult = await fetch(`${url}?pageSize=100&where=deviceId%3D'${id}'%20and%20title%20like%20'%25${value}%25'`)
    }
    let dictionaries = await fetchResult.json()
    console.log(dictionaries)
    this.userDictionaries = dictionaries.sort((a,b) => {return b.created - a.created})  
  }

  async addWordToDictionary(passedData, dictionaryId) {
      //const passedData = this.props.navigation.state.params.passedProps;  
      let keys = []
      let values = []
      if(typeof passedData.text === 'string') {
        keys = [passedData.text]
        values = [passedData.value.text]
      } else {
        keys = passedData.text
        values = passedData.value
      }
  
      console.log(keys)
      console.log(values)

      // dictionary.words = dictionary.words + 1
      //.then(function (json) {
      // }).catch(err => console.log)

      //this.props.navigation.state.params.passedProps = null
    
      try {
        keys.forEach(async (key, i) => {
          const value = values[i];
          await fetch('https://api.backendless.com/D1BC80DA-DD04-346F-FF38-040EFB614000/9E6B269F-9856-7AB7-FFD7-3DEFC793F500/data/words',
          {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({key, value, dictionaryId})
          })
        });
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
        dictionary.words = dictionary.words + keys.length
        await fetch(`${url}?where=objectId%3D'${dictionaryId}'`, {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(dictionary)
        })
      } catch (error) {
        
      }
      // fetch('https://api.backendless.com/D1BC80DA-DD04-346F-FF38-040EFB614000/9E6B269F-9856-7AB7-FFD7-3DEFC793F500/data/words',
      // {
      //   method: 'POST',
      //   headers: {'Content-Type': 'application/json'},
      //   body: JSON.stringify({key, value, dictionaryId})
      // }).then(function (json) {
      //   //self.props.navigation.navigate('Library')
      //   // this.props.navigation.state.params.passedProps = null
      // }).catch(err => console.log)

  }

}


const dictionariesStore = new DictionariesStore()
export { dictionariesStore }