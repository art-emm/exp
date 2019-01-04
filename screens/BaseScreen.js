import React from 'react'
import Compilation from './compilations'
import Dictionary from './dictionary'
import Library from './library'
import CreateNew from './newDictionary'
import openedDictionary from './openedDictionary'
import { DrawerNavigator } from 'react-navigation'
import SideBar from '../sidebar'

const HomeScreenRouter = DrawerNavigator(
  {
    Home: { screen: Dictionary },
    Library: { screen: Library },
    CreateNew: { screen: CreateNew },
    OpenedDictionary: { screen: openedDictionary },
    Compilation: { screen: Compilation }
  },
  {
    drawerBackgroundColor: 'transparent',
    contentComponent: props => <SideBar {...props} />
  }
)
export default HomeScreenRouter
