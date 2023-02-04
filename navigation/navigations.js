// import react native package
import React from 'react';
import {StatusBar, View, Text, Image, TouchableOpacity} from 'react-native';

// import external package
import {NavigationContainer, DrawerActions} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Anticon from 'react-native-vector-icons/AntDesign';
import Evilicon from 'react-native-vector-icons/EvilIcons';
import {Icon} from 'react-native-elements';

import {HomeNavigator} from './drawer_navigation';
import HeaderRight from '../components/drawer_component/setting_menu';
import SendEmail from '../view/SendEmail';
import Nouveaute from '../view/Nouveaute';
import Promotion from '../view/Promotion';
import Boutique from '../view/Boutique';

// import custom file
import {
  HomeStack,
  SignUpStack,
  LoginStack,
  DetailProductStack,
  CategdetailsStack,
  CategdetailssubStack,
  CategdetailssubsubStack,
  ProfileStack,
  PanierStack,
  CategoriesStack,
  SearchStack,
  QrcodeStack,
  AccountStack,
  PaypalStack,
  OrderStack,
  QueryStack,
  InfoStack,
  WishlistStack,
  DeliveryStack,
  NotifStack,
} from './stackNavigator';
import Presentation from '../view/presentation';
// import Test from '../view/test';
import Search from '../view/search';
import {
  activeTintColor,
  activeBackgroundColor,
  inactiveBackgroundColor,
  inactiveTintColor,
  Color,
} from '../helper/color';
import {HeaderOptions} from '../helper/options';
import navigation_styles from './navigation_styles';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    enableScreens();
  }

  render() {
    return (
      <NavigationContainer>
        <StatusBar backgroundColor="#efe4d0" />
        <StackNavigator />
      </NavigationContainer>
    );
  }
}

// create navigator
const btmTab = createBottomTabNavigator();
const stackNative = createStackNavigator();

const image = require('../ressources/logo.png');

// navigator
const StackNavigator = () => {
  return (
    <stackNative.Navigator
      initialRouteName="Presentation"
      screenOptions={{
        // headerShown: true,
        headerHideShadow: true,
        headerStyle: {
          backgroundColor: Color,
        },
        headerTintColor: '#ffffff',
        // headerTitle: "Passion campagne"
      }}>
      <stackNative.Screen
        name="Presentation"
        component={Presentation}
        options={({navigation}) => ({
          headerShown: false,
        })}
      />
      <stackNative.Screen
        name="Categdetails"
        component={CategdetailsStack}
        options={({navigation}) => ({
          headerShown: false,
        })}
      />
      <stackNative.Screen
        name="Categdetailssub"
        component={CategdetailssubStack}
        options={({navigation}) => ({
          headerShown: false,
        })}
      />
      <stackNative.Screen
        name="Categdetailssubsub"
        component={CategdetailssubsubStack}
        options={({navigation}) => ({
          headerShown: false,
        })}
      />
      <stackNative.Screen
        name="Categorie"
        component={CategoriesStack}
        options={({navigation}) => ({
          headerShown: false,
        })}
      />
      <stackNative.Screen
        name="DetailProduct"
        component={DetailProductStack}
        options={({navigation}) => ({
          headerShown: false,
          headerLeft: () => {
            return (
              <View
                style={{
                  marginLeft: 15,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <Icon
                  type="evilicon"
                  name="navicon"
                  size={35}
                  onPress={() => {
                    navigation.dispatch(DrawerActions.toggleDrawer());
                  }}
                />
                <TouchableOpacity>
                  <Icon
                    style={{marginLeft: 10}}
                    type="font-awesome"
                    name="search"
                    size={20}
                    onPress={() => {
                      navigation.navigate('Query', {
                        screen: 'Query',
                        params: {data: ''},
                      });
                    }}
                  />
                </TouchableOpacity>
              </View>
            );
          },
          headerRight: () => {
            return <HeaderRight navigation={navigation} />;
          },
          headerTitle: () => {
            return (
              // <Text style={{ color: "#000000", textTransform: 'uppercase', width: '80%' }}>Passion Campagne</Text>

              <TouchableOpacity
                style={navigation_styles.header_title}
                onPress={() => {
                  navigation.navigate('View', {
                    screen: 'View',
                  });
                }}>
                <Image
                  style={{
                    height: 50,
                    width: 150,
                    resizeMode: 'contain',
                    left: 0,
                  }}
                  source={image}
                />
              </TouchableOpacity>
            );
          },
        })}
      />
      <stackNative.Screen
        name="SignUp"
        component={SignUpStack}
        options={({navigation}) => ({
          headerShown: false,
        })}
      />
      <stackNative.Screen
        name="SendEmail"
        component={SendEmail}
        options={({navigation}) => ({
          headerShown: false,
        })}
      />
      <stackNative.Screen
        name="Promotion"
        component={Promotion}
        options={({navigation}) => ({
          headerShown: true,
        })}
      />
      <stackNative.Screen
        name="Nouveaute"
        component={Nouveaute}
        options={({navigation}) => ({
          headerShown: true,
        })}
      />
      <stackNative.Screen
        name="Boutique"
        component={Boutique}
        options={({navigation}) => ({
          headerShown: true,
        })}
      />
      <stackNative.Screen
        name="Login"
        component={LoginStack}
        options={({navigation}) => ({
          headerShown: true,
        })}
      />
      <stackNative.Screen
        name="View"
        component={HomeNavigator}
        options={({navigation}) => ({
          headerShown: true,
          headerLeft: () => {
            return (
              <View
                style={{
                  marginLeft: 15,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Icon
                  type="evilicon"
                  name="navicon"
                  size={35}
                  onPress={() => {
                    navigation.dispatch(DrawerActions.toggleDrawer());
                  }}
                />
                <TouchableOpacity style={{marginLeft: 30}}>
                  <Icon
                    type="font-awesome"
                    name="search"
                    size={35}
                    onPress={() => {
                      navigation.navigate('Query', {
                        screen: 'Query',
                        params: {data: ''},
                      });
                    }}
                  />
                </TouchableOpacity>
              </View>
            );
          },
          headerRight: () => {
            return <HeaderRight navigation={navigation} />;
          },
          headerTitle: () => {
            return (
              // <Text style={{ color: "#000000", textTransform: 'uppercase', width: '80%' }}>Passion Campagne</Text>

              <TouchableOpacity
                style={navigation_styles.header_title}
                onPress={() => {
                  navigation.navigate('View', {
                    screen: 'View',
                  });
                }}>
                <Image
                  style={{
                    height: 50,
                    width: 150,
                    resizeMode: 'contain',
                  }}
                  source={image}
                />
              </TouchableOpacity>
            );
          },
        })}
      />
      <stackNative.Screen
        name="Search"
        component={SearchStack}
        options={({navigation}) => ({
          headerShown: false,
        })}
      />
      <stackNative.Screen
        name="Cart"
        component={PanierStack}
        options={({navigation}) => ({
          headerShown: true,
          headerLeft: () => {
            return (
              <View
                style={{
                  marginLeft: 15,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <Icon
                  type="evilicon"
                  name="navicon"
                  size={35}
                  onPress={() => {
                    navigation.dispatch(DrawerActions.toggleDrawer());
                  }}
                />
                <TouchableOpacity>
                  <Icon
                    style={{marginLeft: 65}}
                    type="font-awesome"
                    name="search"
                    size={20}
                    onPress={() => {
                      navigation.navigate('Query', {
                        screen: 'Query',
                      });
                    }}
                  />
                </TouchableOpacity>
              </View>
            );
          },
          headerRight: () => {
            return <HeaderRight navigation={navigation} />;
          },
          headerTitle: () => {
            return (
              // <Text style={{ color: "#000000", textTransform: 'uppercase', width: '80%' }}>Passion Campagne</Text>

              <TouchableOpacity
                style={navigation_styles.header_title}
                onPress={() => {
                  navigation.navigate('View', {
                    screen: 'View',
                  });
                }}>
                <Image
                  style={{
                    height: 50,
                    width: 150,
                    resizeMode: 'contain',
                    left: '15%',
                  }}
                  source={image}
                />
              </TouchableOpacity>
            );
          },
        })}
      />
      <stackNative.Screen
        name="Qrcode"
        component={QrcodeStack}
        options={({navigation}) => ({
          headerShown: false,
        })}
      />
      <stackNative.Screen
        name="Notifications"
        component={NotifStack}
        options={({navigation}) => ({
          headerShown: false,
        })}
      />
      <stackNative.Screen
        name="Profile"
        component={ProfileStack}
        options={({navigation}) => ({
          headerShown: true,
          headerLeft: () => {
            return (
              <View
                style={{
                  marginLeft: 15,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <Icon
                  type="evilicon"
                  name="navicon"
                  size={35}
                  onPress={() => {
                    navigation.dispatch(DrawerActions.toggleDrawer());
                  }}
                />
                <TouchableOpacity>
                  <Icon
                    style={{marginLeft: 10}}
                    type="font-awesome"
                    name="search"
                    size={20}
                    onPress={() => {
                      navigation.navigate('Query', {
                        screen: 'Query',
                        params: {data: ''},
                      });
                    }}
                  />
                </TouchableOpacity>
              </View>
            );
          },
          headerRight: () => {
            return <HeaderRight navigation={navigation} />;
          },
          headerTitle: () => {
            return (
              // <Text style={{ color: "#000000", textTransform: 'uppercase', width: '80%' }}>Passion Campagne</Text>

              <TouchableOpacity
                style={navigation_styles.header_title}
                onPress={() => {
                  navigation.navigate('View', {
                    screen: 'View',
                  });
                }}>
                <Image
                  style={{
                    height: 50,
                    width: 150,
                    resizeMode: 'contain',
                    left: '15%',
                  }}
                  source={image}
                />
              </TouchableOpacity>
            );
          },
        })}
      />
      <stackNative.Screen
        name="Account"
        component={AccountStack}
        options={({navigation}) => ({
          headerShown: true,
          headerLeft: () => {
            return (
              <View
                style={{
                  marginLeft: 15,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <Icon
                  type="evilicon"
                  name="navicon"
                  size={35}
                  onPress={() => {
                    navigation.dispatch(DrawerActions.toggleDrawer());
                  }}
                />
                <TouchableOpacity>
                  <Icon
                    style={{marginLeft: 10}}
                    type="font-awesome"
                    name="search"
                    size={20}
                    onPress={() => {
                      navigation.navigate('Query', {
                        screen: 'Query',
                        params: {data: ''},
                      });
                    }}
                  />
                </TouchableOpacity>
              </View>
            );
          },
          headerRight: () => {
            return <HeaderRight navigation={navigation} />;
          },
          headerTitle: () => {
            return (
              // <Text style={{ color: "#000000", textTransform: 'uppercase', width: '80%' }}>Passion Campagne</Text>

              <TouchableOpacity
                style={navigation_styles.header_title}
                onPress={() => {
                  navigation.navigate('View', {
                    screen: 'View',
                  });
                }}>
                <Image
                  style={{
                    height: 50,
                    width: 150,
                    resizeMode: 'contain',
                    left: '15%',
                  }}
                  source={image}
                />
              </TouchableOpacity>
            );
          },
        })}
      />
      <stackNative.Screen
        name="Paypal"
        component={PaypalStack}
        options={({navigation}) => ({
          headerShown: false,
        })}
      />
      <stackNative.Screen
        name="Information"
        component={InfoStack}
        options={({navigation}) => ({
          headerShown: false,
        })}
      />
      <stackNative.Screen
        name="Order"
        component={OrderStack}
        options={({navigation}) => ({
          headerShown: true,
          headerLeft: () => {
            return (
              <View
                style={{
                  marginLeft: 15,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <Icon
                  type="evilicon"
                  name="navicon"
                  size={35}
                  onPress={() => {
                    navigation.dispatch(DrawerActions.toggleDrawer());
                  }}
                />
                <TouchableOpacity>
                  <Icon
                    style={{marginLeft: 10}}
                    type="font-awesome"
                    name="search"
                    size={20}
                    onPress={() => {
                      navigation.navigate('Query', {
                        screen: 'Query',
                        params: {data: ''},
                      });
                    }}
                  />
                </TouchableOpacity>
              </View>
            );
          },
          headerRight: () => {
            return <HeaderRight navigation={navigation} />;
          },
          headerTitle: () => {
            return (
              // <Text style={{ color: "#000000", textTransform: 'uppercase', width: '80%' }}>Passion Campagne</Text>

              <TouchableOpacity
                style={navigation_styles.header_title}
                onPress={() => {
                  navigation.navigate('View', {
                    screen: 'View',
                  });
                }}>
                <Image
                  style={{
                    height: 50,
                    width: 150,
                    resizeMode: 'contain',
                    left: '15%',
                  }}
                  source={image}
                />
              </TouchableOpacity>
            );
          },
        })}
      />
      <stackNative.Screen
        name="Query"
        component={QueryStack}
        options={({navigation}) => ({
          headerShown: false,
        })}
      />
      <stackNative.Screen
        name="Wishlist"
        component={WishlistStack}
        options={({navigation}) => ({
          headerShown: true,
          headerLeft: () => {
            return (
              <View
                style={{
                  marginLeft: 15,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <Icon
                  type="evilicon"
                  name="navicon"
                  size={35}
                  onPress={() => {
                    navigation.dispatch(DrawerActions.toggleDrawer());
                  }}
                />
                <TouchableOpacity>
                  <Icon
                    style={{marginLeft: 10}}
                    type="font-awesome"
                    name="search"
                    size={20}
                    onPress={() => {
                      navigation.navigate('Query', {
                        screen: 'Query',
                        params: {data: ''},
                      });
                    }}
                  />
                </TouchableOpacity>
              </View>
            );
          },
          headerRight: () => {
            return <HeaderRight navigation={navigation} />;
          },
          headerTitle: () => {
            return (
              // <Text style={{ color: "#000000", textTransform: 'uppercase', width: '80%' }}>Passion Campagne</Text>

              <TouchableOpacity
                style={navigation_styles.header_title}
                onPress={() => {
                  navigation.navigate('View', {
                    screen: 'View',
                  });
                }}>
                <Image
                  style={{
                    height: 50,
                    width: 150,
                    resizeMode: 'contain',
                    left: '15%',
                  }}
                  source={image}
                />
              </TouchableOpacity>
            );
          },
        })}
      />
      <stackNative.Screen
        name="Delivery"
        component={DeliveryStack}
        options={({navigation}) => ({
          headerShown: false,
        })}
      />
    </stackNative.Navigator>
  );
};

export default Navigation;
