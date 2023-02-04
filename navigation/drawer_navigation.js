import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {HomeStack} from './stackNavigator';
import {DrawerMenuContent} from '../components/drawer_component/drawer_menu_principal';

import {drawer_background_color} from '../helper/color';

const DrawerMenu = createDrawerNavigator();

const HomeNavigator = () => {
  return (
    <DrawerMenu.Navigator
      drawerContent={props => <DrawerMenuContent {...props} />}
      drawerStyle={{backgroundColor: drawer_background_color}}
      overlayColor="#FFFFFF67"
      screenOptions={{headerShown: false}}>
      <DrawerMenu.Screen name=" " component={HomeStack} />
    </DrawerMenu.Navigator>
  );
};

export {HomeNavigator};
