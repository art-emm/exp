import React from "react";
import { Dimensions, AppRegistry, Image, StatusBar,StyleSheet, View } from "react-native";
import { Container, Content, Text, List, ListItem } from "native-base";
import CircleItem from '../screens/library/components/circleItem'
const baseRoutes = ["Home", "Compilation", "Traning"];
const futureRoutes = ["Game", "Shop"]
let ScreenHeight = Dimensions.get("window").height;

export default class SideBar extends React.Component {
  render() {
    let ScreenHeight = Dimensions.get("window").height;

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
                  uri={'https://develop.backendless.com/76F8A504-3B6A-6FB4-FF49-80D009895D00/console/rybybqdyapoojmimusnrjbqxqxilcgfdirmr/files/view/public/Group%201@3x.png'}
                  isNew
                  showText={false}
                />
              </View>
              <View style={styles.titles}>
                <View style={styles.row} >
                  <Text style={styles.userName}>Unknown user</Text>
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
                  onPress={() => this.props.navigation.navigate('Home')}
                >
                  {r}
                </Text>
              )}
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
    maxHeight: 150
  },
  row: {
    marginBottom: 15
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
    fontWeight: "600"
  },
  userName: {
    fontSize: 13,
    color: '#15304E',
    textDecorationColor: '#15304E',
    fontWeight: "600"
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
    borderRadius : 20,
    //xborderWidth: 2
   // backgroundColor: 'red'
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