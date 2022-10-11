import React, {Component} from 'react';
import {DrawerItem, DrawerContentScrollView} from '@react-navigation/drawer';
import {
  View,
  Linking,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Text, Drawer} from 'react-native-paper';
import {Icon} from 'react-native-elements';
import {fetch_url_get} from '../../helper/function/common-function/fetch';

import {api_get_category_url, api_get_category_url_constant} from '../../helper/api_url';
import menu_principal_styles from './drawer_menu_principal_styles';
import Categories from './drawer_menu_additional_list';

import Swiper from 'react-native-swiper';

export class DrawerMenuContent extends Component {
  constructor(props) {
    super(props);
    this.swiperRef = swiper => (this.swiper = swiper);
    this.scrollHandler = page => {
      this.swiper && this.swiper.scrollBy(page, true);
    };

    this.state = {
      data: [],
      children: [],
      isLoading: true,
      activeSections: [],
      expanded: true,
      choise: null,
      choiseSousMenu: null,
    };
  }

  get_Category_for_menuElements = async () => {
    // await fetch_url_get(api_get_category_url)
    //   .then(json => {
    //     this.setState({
    //       data: json,
    //     });
    //   })
    //   .catch(error => console.error(error))
    //   .finally(() => {
    //     this.setState({
    //       isLoading: false,
    //     });
    //   });

      this.setState({
        data: JSON.parse(api_get_category_url_constant),
      });

//  console.log("---------------------data--value--start");
//  console.log(data);
//  console.log("---------------------data--value--end");

  };

  /*showDetail = data => {
    this.props.navigation.navigate('Search', {
      screen: 'Search',
      params: {data: data},
    });
  };*/
  showDetail = (data) => {
    //console.log(data);
    this.props.navigation.navigate('Query', {
      screen: 'Query',
      params: {
        data: {
          IdCategorie: data.IdCategorie,
          SousSousSousTitre: data.titre,
          Text: data.text,
        },
      },
    });
  };

  Menu_categories_00 = () => {
    if (this.state.data.length != 0) {
      var Menu_categories_00_list = this.state.data.map((Menuitem, index) => {
        return (
          <View style={menu_principal_styles.menu_item}>
            <View style={menu_principal_styles.drawer_item_menu}>
              <Icon name="shopping-bag" type="material" size={20} />
              <Text
                style={menu_principal_styles.item_text}
                onPress={() => {
                  this.setState({choise: index});
                  this.swiper.scrollBy(1, true);
                }}>
                {Menuitem.MenuName[0].Menu_Name}
              </Text>
            </View>
          </View>
        );
      });
    }

    return Menu_categories_00_list;
  };

  Menu_categories_11 = () => {
    if (this.state.data.length != 0) {
      var Menu_categories_11_list = this.state.data.map((Menuitem, index1) => {
        if (index1 == this.state.choise) {
          var SousMenuItem = Menuitem.SousMenu.map((sousMenuItem, index2) => {
            return (
              <View style={menu_principal_styles.menu_item}>
                <View style={menu_principal_styles.drawer_item_menu}>
                  <Icon name="shopping-bag" type="material" size={20} />
                  <Text
                    style={menu_principal_styles.item_text}
                    onPress={() => {
                      this.setState({choiseSousMenu: index2});
                      this.swiper.scrollBy(2, true);
                    }}>
                    {sousMenuItem.SousTitre[0].SousMenu}
                  </Text>
                </View>
              </View>
            );
          });
        }

        return SousMenuItem;
      });
    }
    return (
      <View>
        <View style={menu_principal_styles.menu_item}>
          <View style={menu_principal_styles.drawer_item_menu}>
            <Icon name="arrow-back" type="material" size={20} />
            <Text
              style={menu_principal_styles.item_text}
              onPress={() => {
                this.swiper.scrollBy(-1, true);
              }}>
              GO BACK{' '}
            </Text>
          </View>
        </View>

        {Menu_categories_11_list}
      </View>
    );
  };

  Menu_categories_22 = () => {
    if (this.state.data.length != 0) {
      var Menu_categories_22_list = this.state.data.map((Menuitem, index1) => {
        if (index1 == this.state.choise) {
          var SousMenuItem = Menuitem.SousMenu.map((sousMenuItem, index2) => {
            if (index2 == this.state.choiseSousMenu) {
              // console.log(sousMenuItem);
              var SousSousTitre = sousMenuItem.SousSousTitre.map(
                (SousSousTitre, index3) => {
                  // console.log(SousSousTitre.SousSousSousTitre);

                  return (
                    <View style={menu_principal_styles.menu_item}>
                      <View style={menu_principal_styles.drawer_item_menu}>
                        <Icon name="shopping-bag" type="material" size={20} />
                        <Text
                          style={menu_principal_styles.item_text}
                          onPress={() => {
                            this.showDetail(SousSousTitre);
                          }}>
                          {SousSousTitre.SousSousSousTitre}
                        </Text>
                      </View>
                    </View>
                  );
                },
              );
            }

            return SousSousTitre;
          });
        }

        return SousMenuItem;
      });
    }
    return (
      <View>
        <View style={menu_principal_styles.menu_item}>
          <View style={menu_principal_styles.drawer_item_menu}>
            <Icon name="arrow-back" type="material" size={20} />
            <Text
              style={menu_principal_styles.item_text}
              onPress={() => {
                this.swiper.scrollBy(-1, true);
              }}>
              GO BACK{' '}
            </Text>
          </View>
        </View>

        {Menu_categories_22_list}
      </View>
    );
  };

  menuElementsOne = () => {
    return (
      <View style={{flex: 1}}>
        <DrawerContentScrollView>
          <View style={[menu_principal_styles.menu_item, {marginTop: -4}]}>
            <TouchableOpacity style={menu_principal_styles.drawer_item_menu}>
              <Icon name="home" type="anticon" size={20} />
              <Text
                style={menu_principal_styles.item_text}
                onPress={() => {
                  this.swiper.scrollBy(1, true);
                }}>
                accueil
              </Text>
            </TouchableOpacity>
          </View>
          <View style={menu_principal_styles.menu_item}>
            <View style={menu_principal_styles.drawer_item_menu}>
              <Icon name="store" type="material" size={20} />
              <Text
                style={menu_principal_styles.item_text}
                onPress={() => {Linking.openURL('https://www.passion-campagne.com/content/14-boutique-paris')
                  // this.props.navigation.navigate('Boutique')
                  // this.swiper.scrollBy(-1, true);
                }}>
                Boutique Paris
              </Text>
            </View>
          </View>
          {this.Menu_categories_00()}
        </DrawerContentScrollView>
        <Drawer.Section
          style={menu_principal_styles.bottom_drawer_section}></Drawer.Section>
      </View>
    );
  };

  menuElementsTwo = data => {
    return this.Menu_categories_11();
  };

  menuElementsThree = data => {
    return this.Menu_categories_22();
  };

  componentDidMount() {
    this.get_Category_for_menuElements();
  }

  render() {
    return (
      <ScrollView>
        <Swiper
          ref={this.swiperRef}
          showsButtons={false}
          showsPagination={false}
          index={0}
          loop={false}>
          {this.menuElementsOne()}
          {this.menuElementsTwo()}
          {this.menuElementsThree()}
        </Swiper>
      </ScrollView>
    );
  }
}
