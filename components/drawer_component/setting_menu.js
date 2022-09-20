import React from 'react';

import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

import { View, TouchableOpacity, Text } from 'react-native';
import { Icon, Badge } from 'react-native-elements';
import { Provider, Button } from 'react-native-paper';
import setting_menu_styles from './setting_menu_styles';
import { AuthContext } from './../../helper/context/auth-context';
import { api_post_wishlist_, api_get_nb_cart_url } from './../../helper/api_url';
import { fetch_url_post, fetch_url_get } from './../../helper/function/common-function/fetch';


const pkg = require('../../../package.json');
global.statut = false

class HeaderRight extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props)
    this.state = {
      indicator: false,
      customer: null,
      guest: null,
      status_: "warning"
    }
  }

  set_user = async () => {
    await this.setState({
      guest: this.context.guest,
      customer: this.context.customer,

    });
    await this.getCart();

  }

  getCart = async () => {
    setInterval(() => {
      if (this.state.customer != null) {
        var idCustomer = this.state.customer.id;
      } else {
        var idCustomer = 0;
      }
      let data = {
        idCustomer: idCustomer,
        guest: this.state.guest,
        defaultGroup: this.context.customer
          ? this.context.customer.id_default_group
          : 1,
      };

      let url_cart = api_get_nb_cart_url(data);
      fetch_url_get(url_cart)
        .then(json => {
          if (json != undefined) {
            //  console.log(json.length);
            if (parseInt(json.length) > 0) {
              this.setState({
                status_: 'success',
              });
            } else {
              this.setState({
                status_: 'warning',
              });
            }
          }
          //console.log(json);
        })
        .catch(error => console.error(error));
    }, 1000);
  }

  WishlistIndicator = async () => {
    var url = api_post_wishlist_ + 'SettingMenuIndicator';
    var products = null;
    fetch_url_post(url, {
      id_customer: 8233
    }).then((indicator) => {
      this.setIndicator(indicator)
    });


  }

  setIndicator = (indicator) => {
    if (indicator == true) {
      this.setState({
        indicator: true
      })
    } else {
      this.setState({
        indicator: false
      })
    }
  }

  Indicator = () => {
    if (this.state.indicator) {
      return (<Badge color='green' size={17} style={{ top: -20, right: 0 }}>!</Badge>)
    } else {
      return (<Badge size={17} style={{ top: -20, right: 0, display: 'none' }}>0</Badge>)
    }
  }


  componentDidMount() {
    this.WishlistIndicator()
    this.set_user();
  }
  render() {
    return (
      <View style={setting_menu_styles.headerRight}>
        <TouchableOpacity
          style={setting_menu_styles.header_right_icon_panel}
          onPress={() => this.props.navigation.navigate('Cart')}>
          <View style={{ position: 'relative', borderRadius: 30, right: 7, top: 5, width: 10, height: 10, backgroundColor: global.statut ? 'green' : 'orange' }}></View>
          <Icon type="font-awesome" name="shopping-bag" size={20} />
          {/* {console.log("cart:",this.state.cartP)} */}

          <Badge
            status={this.state.status_}
            containerStyle={{
              position: 'absolute',
              top: '20%',
              right: '15%'
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={setting_menu_styles.header_right_icon_panel}
          onPress={() => {
            this.props.navigation.navigate('Qrcode', {
              screen: 'Qrcode',
            });
          }}>
          <Icon type="material-community" name="qrcode-scan" size={25} />
        </TouchableOpacity>

        {/* <View style={setting_menu_styles.header_right_icon_panel}>
                <Icon 
                    name="qrcode-scan"
                    type="material-community"
                    size={20}
                    onPress={() => {
                       this.props.navigation.navigate('Qrcode',{
                            screen: 'Qrcode',
                        });
                    }}
                />
            </View> */}

        <Menu style={setting_menu_styles.header_right_icon_panel}>
          <MenuTrigger
            style={{
              marginRight: 0,
              width: '100%',
            }}
            children={<Icon type="antdesign" name="user" size={25} />}
          />

          <MenuOptions
            optionsContainerStyle={{
              marginTop: '10%',
              marginLeft: '0%',
              backgroundColor: '#FFFFFF',
            }}>
            <MenuOption
              onSelect={() => {
                this.props.navigation.navigate('Profile', {
                  screen: 'Profile',
                });
              }}
              text={
                <View
                  style={setting_menu_styles.header_right_menu_content}>
                  <Icon
                    type="antdesign"
                    name="user"
                    size={20}
                    color="#747474"
                    style={{ marginLeft: 10 }}
                  />
                  <Text style={{ marginLeft: 20, color: '#747474' }}>
                    Moncompte
                  </Text>
                </View>
              }
              customStyles={{
                optionText: {
                  // height: 20,
                  // width: "100%",
                },
              }}
              style={setting_menu_styles.header_right_menu_container}
            />

            <MenuOption onSelect={() => {
              this.props.navigation.navigate('Notifications', {
                screen: 'notifications',
              });
            }}
              text={
                <View style={setting_menu_styles.header_right_menu_content}>
                  <Icon
                    type="font-awesome"
                    name="bell-o"
                    size={20}
                    color="#747474"
                    style={{ marginLeft: 10 }}
                  />
                  <Text style={{ marginLeft: 20, color: "#747474" }}>Notifications</Text>

                </View>
              }
              customStyles={{
                optionText: {
                  // height: 20,
                  // width: "100%",
                },
              }}
              style={setting_menu_styles.header_right_menu_container}
            />

            <MenuOption
              onSelect={() => {
                this.props.navigation.navigate('Wishlist', {
                  screen: 'Wishlist',
                });
              }}
              text={
                <View
                  style={setting_menu_styles.header_right_menu_content}>
                  <Icon
                    type="font-awesome"
                    name="heart-o"
                    size={20}
                    color="#747474"
                    style={{ marginLeft: 10 }}
                  />
                  {this.Indicator()}
                  <Text style={{ marginLeft: 20, color: '#747474' }}>
                    Liste de souhaits
                  </Text>
                </View>
              }
              customStyles={{
                optionText: {
                  // height: 20,
                  // width: "100%",
                },
              }}
              style={setting_menu_styles.header_right_menu_container}
            />

            <MenuOption
              onSelect={() => {
                //this.props.navigation.navigate('Profile',{
                //     screen: 'Profile',
                // });
              }}
              text={
                <View
                  style={setting_menu_styles.header_right_menu_content}>
                  <Icon
                    type="ionicon"
                    name="location-outline"
                    size={20}
                    color="#747474"
                    style={{ marginLeft: 10 }}
                  />
                  <Text style={{ marginLeft: 20, color: '#747474' }}>
                    Mes commandes
                  </Text>
                </View>
              }
              customStyles={{
                optionText: {
                  height: 20,
                  // width: "100%",
                },
              }}
              style={setting_menu_styles.header_right_menu_container}
            />

            {/* <MenuOption onSelect={() => {
                             //this.props.navigation.navigate('Profile',{
                             //     screen: 'Profile',
                             // });
                         }}
                             text={
                                 <View style={setting_menu_styles.header_right_menu_content}>
                                     <Icon
                                         type="ionicon"
                                         name="settings-outline"
                                         size={20}
                                         color="#747474"
                                         style={{ marginLeft: 10 }}
                                     />
                                     <Text style={{ marginLeft: 20, color: "#747474" }}>Paramètres</Text>

                                 </View>
                             }
                             customStyles={{
                                 optionText: {
                                     // height: 20,
                                     // width: "100%",
                                 },
                             }}
                             style={setting_menu_styles.header_right_menu_container}
                         /> */}

            {/* <MenuOption
                             text={
                                 <Text style={{ marginLeft: 20, color: "#747474" }}>Version {pkg.version}</Text>
                             }
                             customStyles={{
                                 optionText: {
                                     // height: 20,
                                     position: 'absolute',
                                     alignSelf: 'center',
                                     marginVertical: '2%',
                                     paddingHorizontal: '20%',
                                     width: "100%",
                                 },
                             }}
                         /> */}
          </MenuOptions>
        </Menu>
      </View>
    );
  }

}

export default HeaderRight;