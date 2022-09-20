import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {homeStack} from './stackNavigator';
import {DrawerMenuContent} from '../components/drawer_component/drawer_menu_principal';

import {drawer_background_color} from '../helper/color';

const DrawerMenu = createDrawerNavigator();

const homeNavigator = () => {
  return (
    <DrawerMenu.Navigator
      drawerContent={props => <DrawerMenuContent {...props} />}
      drawerStyle={{backgroundColor: drawer_background_color}}
      overlayColor="#FFFFFF67">
      <DrawerMenu.Screen name="Home" component={homeStack} />
    </DrawerMenu.Navigator>
  );
};

export {homeNavigator};
