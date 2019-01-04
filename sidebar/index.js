import React from 'react';
import { Dimensions, AppRegistry, Image, StatusBar, StyleSheet, View, AsyncStorage } from 'react-native';
import { Container, Content, Text, List, ListItem } from 'native-base'
import CircleItem from '../screens/library/components/circleItem'
const baseRoutes = ['Home', 'Compilation', 'Traning']
const futureRoutes = ['Game', 'Shop']
let ScreenHeight = Dimensions.get('window').height;
import { AuthSession } from 'expo';

const FB_APP_ID = '560104297698065'
export default class SideBar extends React.Component {

  constructor () {
    super()
    this.state = {
      fbInfo: { name: 'Unknown user', picture: {data: {url: ''}}}
    }
  }
  async componentDidMount(){
    let fbInfo = await AsyncStorage.getItem('fbInfo');

    if(fbInfo) {
      fbInfo = JSON.parse(fbInfo)
      console.log(fbInfo)
      this.setState({fbInfo})
    }
  }

  render() {
    let ScreenHeight = Dimensions.get('window').height;
    // const fbId = await AsyncStorage.setItem('@expoStorage:fbId');
    // const fbName = await AsyncStorage.setItem('@expoStorage:fbName') || 'Unknown';
    // const fbImage = await AsyncStorage.setItem('@expoStorage:fbImage');
    const { fbInfo } = this.state
    return (
      <Container style={styles.wrapper}>
        <View style={styles.content}>
          <View style={styles.verticalLine}>
            <View style={styles.topCircleWrapper}>
              <View style={styles.topCircle} />
            </View>
            <View style={styles.vertical}/>
            <View style={styles.bottomCircleWrapper}>
              <View style={styles.bottomCircle} />
            </View>
          </View>
          <View style={styles.baseContent}>
            <View style={styles.header}>
              <View style={styles.icon}>
                <CircleItem key='new'
                  percent={0}
                  radius={50}
                  knowledge={0}
                  words={0}
                  subject={'...'}
                  borderWidth={8}
                  color='#3399FF'
                  shadowColor='#fff'
                  uri={fbInfo.picture.data.url}
                  isNew
                  showText={false}
                />
              </View>
              <View style={styles.titles}>
                <View style={styles.row} >
                  <Text style={styles.userName}>{fbInfo.name}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.h}>Native Language</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.h}>Level</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.hs}>More information</Text>
                </View>
              </View>
            </View>
            <View style={styles.baseItems}>
              {baseRoutes.map(r => 
                <Text key={r}
                  style={styles.baseItem}
                  onPress={() => this.props.navigation.navigate(r)}
                >
                  {r}
                </Text>
              )}
              {fbInfo.name === 'Unknown user' && <Text style={styles.baseItem}
                  onPress={this._fbLogin}>
                  Login with Facebook
              </Text>}
              {fbInfo.name !== 'Unknown user'  && <Text style={styles.baseItem}
                  onPress={this._fbLogout}>
                  Logout
              </Text>}
            </View>
            <View style={styles.futureItems}>
              {futureRoutes.map(r => 
                <Text key={r}
                  style={styles.futureItem}
                  onPress={() => this.props.navigation.navigate('Home')}
                >
                  {r}
                </Text>
              )}
            </View>
          </View>
        </View>
      </Container>
    );
  }

  _fbLogin = async () => {
    let redirectUrl = AuthSession.getRedirectUrl();
    console.log({ redirectUrl });
    let result = await AuthSession.startAsync({
      authUrl:
        `https://www.facebook.com/v2.8/dialog/oauth?response_type=token` +
        `&client_id=${FB_APP_ID}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}`,
    });

    if (result.type !== 'success') {
      //alert('Uh oh, something went wrong');
      return;
    }

    let accessToken = result.params.access_token;
    let userInfoResponse = await fetch(
      `https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,picture.type(large)`
    );
    const fbInfo = await userInfoResponse.json();
    AsyncStorage.setItem('fbInfo', JSON.stringify(fbInfo));

    this.setState({ fbInfo });
  };

  _fbLogout = () => {
    AsyncStorage.setItem('fbInfo', '');
    this.setState({
      fbInfo: { name: 'Unknown user', picture: {data: {url: ''}}}
    })
  }
}

const styles = StyleSheet.create({
  futureItem: {
    flex: 1,
    color: '#D5D7D8',
    fontSize: 20,
    marginTop: 15
  },
  futureItems: {
    marginTop: 20,
    flex: 1,
    borderTopWidth: 1,
    borderColor: 'violet',
    borderTopColor: '#D5D7D8',
    maxHeight: 150
  },
  
  baseItem: {
    flex: 1,
    color: '#46C3CF',
    fontSize: 20,
    marginTop: 15
  },
  baseItems: {
    marginTop: 20,
    flex: 1,
    borderTopWidth: 1,
    borderColor: 'violet',
    borderTopColor: '#46C3CF',
    maxHeight: 175
  },
  row: {
    marginBottom: 10
  },
  hs: {
    fontSize: 12,
    color: '#95989A',
    textDecorationColor: '#95989A'
  },
  h: {
    fontSize: 12,
    color: '#95989A',
    textDecorationColor: '#95989A',
    fontWeight: '600'
  },
  userName: {
    fontSize: 13,
    color: '#15304E',
    textDecorationColor: '#15304E',
    fontWeight: '600'
  },
  titles: {
    flex: 1,
    borderColor: 'green',
    paddingLeft: 15
  },
  icon: {
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    borderColor: 'violet',
    maxHeight: 110
  },
  wrapper: {
    borderTopRightRadius : 20,
    borderBottomRightRadius: 20,
    backgroundColor: 'white',
  },
  content: {
    flex:1,
    flexDirection: 'row',
    borderColor: 'green',
    paddingTop: 40,
    paddingBottom: 50,
    paddingRight: 20
  },
  verticalLine: {
    flex: 1,
    maxWidth: 45,
    height: ScreenHeight - 75,
    alignItems: 'center'
  },
  baseContent: {
    flex:1 ,
    borderColor: 'red',
    paddingTop: 40
  },
  topCircleWrapper: {
    width: 13,
    height: 13,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#95989A'
  },
  topCircle : {
    marginTop: 2,
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: '#15304E'
  },

  bottomCircleWrapper: {
    width: 13,
    height: 13,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#95989A'
  },
  bottomCircle : {
    marginTop: -1,
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: '#15304E'
  },
  vertical: {
    flex: 1,
    width: 2,
    backgroundColor: '#15304E'    
  }
})




  //   <List
  //   dataArray={routes}
  //   renderRow={data => {
  //     return (
  //       <ListItem
  //         button
  //         onPress={() => this.props.navigation.navigate(data)}>
  //         <Text>{data}</Text>
  //       </ListItem>
  //     );
  //   }}
  // />