import React from 'react';

import {
  View,
  FlatList,
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';
import {DotsLoader} from 'react-native-indicator';
import {Icon, Button} from 'react-native-elements';

import {AuthContext} from '../helper/context/auth-context';
import {
  api_get_product_home_url,
  api_get_HomeOrganizer,
  api_get_all_notif,
  api_get_category_url,
} from '../helper/api_url';
import {fetch_url_get} from '../helper/function/common-function/fetch';
import ProductList from '../components/product_list';
import {primaryColor} from '../helper/color';
import {getCustomer} from '../helper/storage/user-storage';
import home_styles from './style/home_style';
import FlatLister from '../components/Flatlister';
import {notification} from '../notification/Notification';
import FooteraSocial from './FooteraSocial';
class Home extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      guest: null,
      products: null,
      isLoading: false,
    };
  }

  get_notif = async () => {
    try {
      const response = await fetch_url_get(api_get_all_notif);
      const json = await response;
      this.setState({
        data: json,
      });
    } catch (error) {
      // console.log(error);
    } finally {
      this.setState({isLoading: false});
    }
  };

  getGuest = async () => {
    this.get_notif();
    var guest = null;
    guest = await this.context.getGuest();
    if (guest) {
      this.setState({
        guest: guest,
      });
      this.context.guest = guest;
    }
  };

  getProduct = async () => {
    var products = null;
    products = await fetch_url_get(api_get_category_url);

    this.setState({
      products: products,
    });
  };

  showSameCategories = data => {
    // this.props.navigation.navigate('Search', {
    //   screen: 'Search',
    //   params: {data: data},
    // });
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

  displayLoading = () => {
    if (this.state.isLoading) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <DotsLoader color={primaryColor} betweenSpace={20} size={20} />
        </View>
      );
    }
  };


  /*  recheck here randev  */
  
  displayProduct = () => {
    if (!this.state.isLoading && this.state.products) {
      const data = this.state.products;

      let i = 0;
      let j = 0;
      let k = 0;

      var HomeOrganizer = data.map((item) => {
        i += 1;
        k += 1;
        j += 1;

        var SousCategorie = item.SousMenu.map(item => {
          var list = item.SousSousTitre.map(item => {
            return (
              <View style={{marginBottom: 10, backgroundColor: 'bleu'}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View
                    style={{
                      width: '50%',
                      flexDirection: 'row',
                      paddingLeft: 10,
                    }}>
                    <Icon name="bookmark-outline" type="ionicon" color="grey" />
                    <Text style={styles.title_text_under}>
                      {item.SousSousSousTitre}
                    </Text>
                  </View>
                  <View
                    style={{width: '50%', flex: 1, justifyContent: 'center'}}>
                    <Button
                      titleStyle={{fontSize: 12, position: 'absolute'}}
                      title="Voir la catégorie"
                      buttonStyle={{
                        backgroundColor: 'red',
                        width: 100,
                        height: 20,
                        marginLeft: 'auto',
                        marginRight: 10,
                      }}
                      color="red"
                      onPress={() => this.showSameCategories(item)}
                    />
                  </View>
                </View>
                <View>
                  <FlatLister
                    key={j}
                    idCategories={item.IdCategorie}
                    navigation={this.props.navigation}
                  />
                </View>
              </View>
            );
          })
          return (
            <View>
              <View style={{marginBottom: 20}}>{list}</View>
            </View>
          )
        })
        return (
          <View>
            <View style={styles.title_view}>
              <Text style={styles.title_text}>
                {item.MenuName[0].Menu_Name}
              </Text>
            </View>
            <View style={{marginBottom: 20}}>{SousCategorie}</View>
          </View>
        )
      })

      return (
        <View>
            {HomeOrganizer}
        </View>
      );
    }
  };
  isIncreasing(xs) {
    var prev, cur;

    for (var i = 0; i < xs.length; i++) {
      cur = xs[i];
      if (i && cur !== prev && cur !== prev + 1) return false;
      prev = cur;
    }

    return true;
  }

  async componentDidMount() {
    
    this.setState({
      isLoading: true,
    });
    await this.getGuest();
    await this.getProduct();
    this.setState({
      isLoading: false,
    });

    var array = [];

    for (let prop in this.state.data) {
      array.push(this.state.data[prop]);
    }

    //8  console.log('json=', array[0].titre);

    var a = await this.isIncreasing(array);

    await this.get_notification(
      '1',
      array[array.length - 1].titre,
      array[array.length - 1].description,
      array[array.length - 1].media,
      array[array.length - 1].lien,
    );
  }

  get_notification = (id, titre, desc, image,url) => {
    
    notification.configure(url);
    notification.buatchannel('1');
    notification.kirimNotificationJadwal(id, titre, desc, image);
    
  };

  render() {
    const data = this.state;
    return (
      <View style={{flex: 1, maxWidth: '100%'}}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {this.displayLoading()}
          {/* {this.displayProduct()} */}
        </ScrollView>
        <FooteraSocial navigation={this.props.navigation}/>  
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //   marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#20232A',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    height: 200,
    width: 250,
  },
  title: {
    fontSize: 32,
  },
  title_view: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title_text: {
    fontSize: 20,
    color: '#713F18',
    textTransform: 'uppercase',
  },
  title_text_under: {
    fontSize: 11,
    color: 'grey',
    marginLeft: 5,
    fontWeight: 'bold',
  },
});

export default Home;
