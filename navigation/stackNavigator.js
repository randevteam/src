import React from 'react';
import {View} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {Icon} from 'react-native-elements';

// import custom file
import SignUp from '../view/signUp';
import Login from '../view/login';
import Profile from '../view/profile';
import Home from '../view/home';
import Categdetails from '../view/Categdetails';
import Categdetailssub from '../view/Categdetailssub';
import Categdetailssubsub from '../view/Categdetailssubsub';
import Panier from '../view/panier';
import DetailProduct from '../view/detail_product';
import Search from '../view/search';
import Categories from '../view/categories';
import QrCode from '../view/qr_code';
import Account from '../view/account';
import Paypal from '../view/paypal';
import Order from '../view/order';
import Information from '../view/information';
import Query from '../view/query';
import {Color} from '../helper/color';
import {HeaderOptions} from '../helper/options';
import Wishlist from '../view/wishlist';
import Delivery from '../view/delivery_choice';
import Notifications from '../view/notifications';

import SearchInput from '../components/search_bar';

// create stack navigator for each page
const stackHome = createStackNavigator();
const stackCategdetails = createStackNavigator();
const stackCategdetailssub = createStackNavigator();
const stackCategdetailssubsub = createStackNavigator();
const stackSignUp = createStackNavigator();
const stackLogin = createStackNavigator();
const stackProfile = createStackNavigator();
const stackPanier = createStackNavigator();
const stackDetailProduct = createStackNavigator();
const stackCategory = createStackNavigator();
const stackQrCode = createStackNavigator();
const stackAccount = createStackNavigator();
const stackPaypal = createStackNavigator();
const stackOrder = createStackNavigator();
const stackInfo = createStackNavigator();
const stackQuery = createStackNavigator();
const stackWishlist = createStackNavigator();
const stackDelivery = createStackNavigator();
const stackNotif = createStackNavigator();

// stack navigator
const HomeStack = ({navigation, route}) => {
  return (
    <stackHome.Navigator
      initialRouteName="Home"
      headerMode="screen"
      screenOptions={{
        headerShown: false,
        headerHideShadow: true,
        headerStyle: {
          backgroundColor: Color,
        },
      }}>
      <stackHome.Screen name="Home" component={Home} />
    </stackHome.Navigator>
  );
};

const CategdetailsStack = ({navigation, route}) => {
  return (
    <stackCategdetails.Navigator
      initialRouteName="Categdetails"
      headerMode="screen"
      screenOptions={{
        headerShown: true,
        headerHideShadow: true,
        headerStyle: {
          backgroundColor: Color,
        },
      }}>
      <stackCategdetails.Screen
        name="Categdetails"
        component={Categdetails}
        options={{
          headerTitle: 'Sous-catégorie',
          headerTintColor: '#724018',
          headerBackTitle: 'Retour',
          headerTitleStyle: {
            fontWeight: '100',
          },
        }}
      />
    </stackCategdetails.Navigator>
  );
};

const CategdetailssubStack = ({navigation, route}) => {
  return (
    <stackCategdetailssub.Navigator
      initialRouteName="Categdetailssub"
      headerMode="screen"
      screenOptions={{
        headerShown: true,
        headerHideShadow: true,
        headerStyle: {
          backgroundColor: Color,
        },
      }}>
      <stackCategdetailssub.Screen
        name="Categdetailssub"
        component={Categdetailssub}
        options={{
          headerTitle: 'Sous-catégorie',
          headerTintColor: '#724018',
          headerBackTitle: 'Retour',
          headerTitleStyle: {
            fontWeight: '100',
          },
        }}
      />
    </stackCategdetailssub.Navigator>
  );
};

const CategdetailssubsubStack = ({navigation, route}) => {
  return (
    <stackCategdetailssubsub.Navigator
      initialRouteName="Categdetailssubsub"
      headerMode="screen"
      screenOptions={{
        headerShown: true,
        headerHideShadow: true,
        headerStyle: {
          backgroundColor: Color,
        },
      }}>
      <stackCategdetailssubsub.Screen
        name="Categdetailssubsub"
        component={Categdetailssubsub}
        options={{
          headerTitle: 'Sous-catégorie',
          headerTintColor: '#724018',
          headerBackTitle: 'Retour',
          headerTitleStyle: {
            fontWeight: '100',
          },
        }}
      />
    </stackCategdetailssubsub.Navigator>
  );
};

const ProfileStack = ({navigation, route}) => {
  return (
    <stackProfile.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: true,
        headerHideShadow: true,
        headerStyle: {
          backgroundColor: Color,
        },
      }}>
      <stackProfile.Screen
        name="Profile"
        component={Profile}
        options={HeaderOptions(Color, 'Produit recent', navigation, route)}
      />
    </stackProfile.Navigator>
  );
};

const SignUpStack = ({navigation, route}) => {
  return (
    <stackSignUp.Navigator
      initialRouteName="SignUp"
      screenOptions={{
        headerShown: true,
        headerHideShadow: true,
        headerStyle: {
          backgroundColor: Color,
        },
      }}>
      <stackSignUp.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
    </stackSignUp.Navigator>
  );
};

const LoginStack = ({navigation, route}) => {
  return (
    <stackLogin.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: true,
        headerHideShadow: true,
        headerStyle: {
          backgroundColor: Color,
        },
      }}>
      <stackLogin.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
    </stackLogin.Navigator>
  );
};

const DetailProductStack = ({navigation, route}) => {
  return (
    <stackDetailProduct.Navigator
      initialRouteName="DetailProduct"
      headerMode="screen"
      screenOptions={{
        headerShown: true,
        headerHideShadow: true,
        headerStyle: {
          backgroundColor: Color,
        },
      }}>
      <stackDetailProduct.Screen
        name="DetailProduct"
        component={DetailProduct}
        options={{
          headerTitle: () => {
            return (
              <View
                style={{
                  /*flexDirection: 'row',
                  justifyContent: 'space-between',*/
                  width: 270,
                  height: 30,
                }}>
                <SearchInput
                  color={Color}
                  navigation={navigation}
                  route={route}
                />
              </View>
            );
          },
          headerRight: () => {
                        return(
                            <View style={{ 
                                marginRight: 20,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Icon 
                                    type="font-awesome"
                                    name="shopping-bag"
                                    size={30}
                                    onPress={() => {
                                        navigation.navigate('Cart')
                                    }}
                                />
                            </View>
                        )
                    },
          /*headerHideShadow: true,*/
          headerTintColor: '#724018',
          headerBackTitle: 'Retour',
          headerTitleStyle: {
            fontWeight: '100',
          },
        }}
      />
    </stackDetailProduct.Navigator>
  );
};

const PanierStack = ({navigation, route}) => {
  return (
    <stackPanier.Navigator
      initialRouteName="Panier"
      screenOptions={{
        headerShown: true,
        headerHideShadow: true,
        headerStyle: {
          backgroundColor: Color,
        },
      }}>
      <stackPanier.Screen
        name="Panier"
        component={Panier}
        options={HeaderOptions(Color, 'Produit recent', navigation, route)}
      />
    </stackPanier.Navigator>
  );
};

const CategoriesStack = ({navigation, route}) => {
  return (
    <stackCategory.Navigator
      initialRouteName="Category"
      screenOptions={{
        headerShown: true,
        headerHideShadow: true,
        headerStyle: {
          backgroundColor: Color,
        },
      }}>
      <stackCategory.Screen
        name="Panier"
        component={Categories}
        options={HeaderOptions(Color, 'Produit recent', navigation, route)}
      />
    </stackCategory.Navigator>
  );
};

const QrcodeStack = ({navigation, route}) => {
  return (
    <stackQrCode.Navigator
      initialRouteName="Qrcode"
      screenOptions={{
        headerShown: true,
        headerHideShadow: true,
        headerStyle: {
          backgroundColor: Color,
        },
      }}>
      <stackQrCode.Screen
        name="Qrcode"
        component={QrCode}
        options={{
          title: 'Scanne Qr Code',
        }}
      />
    </stackQrCode.Navigator>
  );
};

const AccountStack = ({navigation, route}) => {
  return (
    <stackAccount.Navigator
      initialRouteName="Account"
      screenOptions={{
        headerShown: true,
        headerHideShadow: true,
        headerStyle: {
          backgroundColor: Color,
        },
      }}>
      <stackAccount.Screen
        name="Account"
        component={Account}
        options={{
          title: 'Mes addresses',
        }}
      />
    </stackAccount.Navigator>
  );
};

const PaypalStack = ({navigation, route}) => {
  return (
    <stackPaypal.Navigator
      initialRouteName="Paypal"
      screenOptions={{
        headerShown: false,
        headerHideShadow: true,
        headerStyle: {
          backgroundColor: Color,
        },
      }}>
      <stackPaypal.Screen
        name="Paypal"
        component={Paypal}
        options={{
          title: 'Paypal',
        }}
      />
    </stackPaypal.Navigator>
  );
};

const OrderStack = ({navigation, route}) => {
  return (
    <stackOrder.Navigator
      initialRouteName="Order"
      screenOptions={{
        headerShown: false,
        headerHideShadow: true,
        headerStyle: {
          backgroundColor: Color,
        },
      }}>
      <stackOrder.Screen
        name="Order"
        component={Order}
        options={{
          title: 'Mes commandes',
        }}
      />
    </stackOrder.Navigator>
  );
};

const InfoStack = ({navigation, route}) => {
  return (
    <stackOrder.Navigator
      initialRouteName="Information"
      screenOptions={{
        headerShown: true,
        headerHideShadow: true,
        headerStyle: {
          backgroundColor: Color,
        },
      }}>
      <stackOrder.Screen
        name="Information"
        component={Information}
        options={{
          title: 'Informations Personnelles',
        }}
      />
    </stackOrder.Navigator>
  );
};

const SearchStack = ({navigation, route}) => {
  return (
    <stackPanier.Navigator
      initialRouteName="Search"
      screenOptions={{
        headerShown: true,
        headerHideShadow: true,
        headerStyle: {
          backgroundColor: Color,
        },
      }}>
      <stackPanier.Screen
        name="Search"
        component={Search}
        options={{
          headerTitle: 'Résultats de recherche',
          headerTitleStyle: {
            fontWeight: '100',
          },
        }}
      />
    </stackPanier.Navigator>
  );
};

const QueryStack = ({navigation, route}) => {
  return (
    <stackQuery.Navigator
      initialRouteName="Query"
      screenOptions={{
        headerShown: true,
        headerHideShadow: true,
        headerStyle: {
          backgroundColor: Color,
        },
      }}>
      <stackQuery.Screen
        name="Query"
        component={Query}
        options={{
          headerTitle: 'Résultats',
          headerTintColor: '#724018',
          headerBackTitle: 'Retour',
          headerTitleStyle: {
            fontWeight: '100',
          },
        }}
      />
    </stackQuery.Navigator>
  );
};

const WishlistStack = ({navigation, route}) => {
  return (
    <stackQuery.Navigator
      initialRouteName="Wishlist"
      screenOptions={{
        headerShown: true,
        headerHideShadow: true,
        headerStyle: {
          backgroundColor: Color,
        },
      }}>
      <stackQuery.Screen
        name="Wishlist"
        component={Wishlist}
        options={{
          headerTitle: 'Mes liste de souhaits',
          headerTitleStyle: {
            fontWeight: '100',
          },
        }}
      />
    </stackQuery.Navigator>
  );
};

const DeliveryStack = ({navigation, route}) => {
  return (
    <stackDelivery.Navigator
      initialRouteName="Delivery"
      screenOptions={{
        headerShown: true,
        headerHideShadow: true,
        headerStyle: {
          backgroundColor: Color,
        },
      }}>
      <stackDelivery.Screen
        name="Delivery"
        component={Delivery}
        options={{
          headerTitle: 'Choix de livraison',
          headerTitleStyle: {
            fontWeight: '100',
          },
        }}
      />
    </stackDelivery.Navigator>
  );
};

const NotifStack = ({navigation, route}) => {
  return (
    <stackNotif.Navigator
      initialRouteName="Notifications"
      screenOptions={{
        headerShown: true,
        headerHideShadow: true,
        headerStyle: {
          backgroundColor: Color,
        },
      }}>
      <stackNotif.Screen name="notifications" component={Notifications} />
    </stackNotif.Navigator>
  );
};

export {
  HomeStack,
  CategdetailsStack,
  CategdetailssubStack,
  CategdetailssubsubStack,
  SignUpStack,
  LoginStack,
  DetailProductStack,
  ProfileStack,
  PanierStack,
  SearchStack,
  CategoriesStack,
  QrcodeStack,
  AccountStack,
  PaypalStack,
  OrderStack,
  InfoStack,
  QueryStack,
  WishlistStack,
  DeliveryStack,
  NotifStack,
};
