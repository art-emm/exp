import React, { Component } from "react";
import Dictionary from "./dictionary";
import Library from './library'
import CreateNew from './newDictionary'
import openedDictionary from './openedDictionary'
import { DrawerNavigator } from "react-navigation";
import SideBar from '../sidebar'
console.log(SideBar)
const HomeScreenRouter = DrawerNavigator(
  {
    Home: { screen: Dictionary },
    Library: { screen: Library },
    CreateNew: { screen: CreateNew },
    OpenedDictionary: { screen: openedDictionary }    
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);
export default HomeScreenRouter;