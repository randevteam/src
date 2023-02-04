import React from 'react';

import {
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  Share,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Avatar, Badge, Card, Button, Icon} from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown';

import {AuthContext} from '../helper/context/auth-context';
import {
  api_url,
  api_get_product_by_id_url,
  api_add_cart_url,
  api_combination_get_price_url,
  api_get_stock_by_id_attribute_product_url,
  api_get_link_rewrite,
  api_get_spec_prices_product,
} from '../helper/api_url';
import HTMLView from 'react-native-htmlview';
import {
  fetch_url_get,
  fetch_url_post,
} from '../helper/function/common-function/fetch';
import detail_product_styles from './style/detail_product_style';
import {primaryBackgroundColor} from '../helper/color';
import {parse, transform} from '@babel/core';
import SimilarProduct from '../components/similar_product';
import {db} from '../configs';
import {
  ref,
  onValue,
  orderByChild,
  equalTo,
  get,
  query,
} from 'firebase/database';
class DetailProduct extends React.Component {
  static contextType = AuthContext;

  margincoter = 5;
  dimensions = Dimensions.get('window');
  imageHeight = Math.round((this.dimensions.width * 11) / 16);
  imageWidth = this.dimensions.width + this.margincoter;

  constructor(props) {
    super(props);
  }
  state = {
    product: null,
    price: 'Choisir option',
    qtty: 1,
    guest: null,
    arrayDeclChoice: null,
    currentCombination: null,
    changeCart: 0,
    customer: null,
    stock: null,
    decl_count: null,
    only_choice: null,
    loading: false,
    id_category: null,
    url_to_web: null,
    specific_price: null,
    selectedValue: '',
    price_final: null,
    prices: null,
    isloadingPrice: true,
  };

  shareto = async () => {
    //console.log('share it');
    try {
      const result = await Share.share({
        title:
          'React Native | A framework for building native apps using React',
        message: this.state.url_to_web,
      });
      //console.log(result);
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  show_promotion = () => {
    if (this.state.specific_price) {
      return (
        <View
          style={{
            position: 'absolute',
            left: '2%',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 50,
          }}>
          <Icon
            type="foundation"
            name="burst"
            size={90}
            color="gold"
            containerStyle={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 16,
              position: 'absolute',
              transform: [
                {
                  rotate: '-45deg',
                },
              ],
            }}>
            -{this.state.specific_price}%
          </Text>
        </View>
      );
    }
  };
  componentWillUnmount() {
    this.setState({
      product: null,
    });
  }

  getProduct = async () => {
    this.setState({
      loading: true,
    });
    const startCountRef = query(
      ref(db, 'getAllproductsBrut/product'),
      orderByChild('id'),
      equalTo(this.props.route.params.data),
    );
    get(startCountRef).then(snapshot => {
      var data = [];
      snapshot.forEach(snapshotChild => {
        data.push(snapshotChild.val());
      });

      this.setState({
        product: data,
        loading: false,
      });
      Object.values(this.state.product).map(item =>
        this.setState({
          id_category: item.associations.categories.category,
        }),
      );
    });
    // const startCountRef = ref(db, 'getAllproductsBrut/product/');
    // onValue(startCountRef, snapshot => {
    //   const data = snapshot.val();
    //   const productWithId5185 = data.filter(
    //     product => product.id === this.props.route.params.data,
    //   );

    //   this.setState({product: productWithId5185, loading: false});
    //   productWithId5185.map(item => {
    //     this.setState({
    //       id_category: item.associations.categories.category,
    //     });
    //   });
    // });
    // await fetch_url_get(
    //   api_get_product_by_id_url +
    //     this.props.route.params.data +
    //     '&idDefaultGroup=' +
    //     this.props.route.params.defaultGroup,
    // ).then(async data => {
    //   console.log('-è-è-è-è-è-è-è-');
    //   console.log(data);

    //   // const price =
    //   //   data.prices !== null
    //   //     ? parseFloat(data.prices.specific_price.reduction) * 100
    //   //     : null;

    //   await this.setState({
    //     id_category: data.product.product.associations.categories.category,
    //     guest: this.context.guest,
    //     customer: this.context.customer,
    //     price: this.props.route.params.price,
    //     decl_count: data.declinaison.length,
    //     only_choice:
    //       data.declinaison.length == 0
    //         ? data.product.product.associations.stock_availables
    //         : null,
    //     specific_price: this.props.route.params.price,
    //   });
    // const declinaisons = data.declinaison.map(async item => {
    //   const id = item.id;
    //   const opt =
    //     item.associations.product_option_values.product_option_value_T;
    //   const opt_value = opt.name != undefined ? opt.id : opt[0].id;
    //   const id_group_customer = this.context.customer
    //     ? this.context.customer.id_default_group
    //     : 1;
    //   return await this.changeDeclinaison(
    //     opt_value,
    //     id,
    //     1,
    //     id_group_customer,
    //   );
    // });

    // if (data.declinaison.length != 0) {
    //   await Promise.all(declinaisons);
    // }
    //   // this.setState({loading: false});
    //   if (data.declinaison.length == 0) {
    //     let choice = {
    //       idattribute: this.state.only_choice.id,
    //       idProduct: this.state.product.product.product.id,
    //     };
    //     let stockData = await fetch_url_get(
    //       api_get_stock_by_id_attribute_product_url(choice),
    //     );
    //     this.setState({stock: stockData.stock_available.quantity});
    //   }
    //   this.updateFinalPrice();
    // });

    // await fetch_url_get(
    //   api_get_link_rewrite + this.state.id_category[1].id
    // ).then(async (data) => {
    //   //console.log(data.language);
    //   //const url = 'http://www.projets-omega-web.net/' + data.language + '/' + this.state.product.product.product.id + '-' + this.state.product.product.product.link_rewrite.language + '.html'
    //   const url =
    //     api_url +
    //     data.language +
    //     "/" +
    //     this.state.product.product.product.id +
    //     "-" +
    //     this.state.product.product.product.link_rewrite.language +
    //     ".html";
    //   await this.setState({
    //     url_to_web: url,
    //   });
    // });
  };

  change_product = async id => {
    await this.props.navigation.setParams({
      data: id,
    });
    this.getProduct();
  };

  updateFinalPrice = async () => {
    const {
      product: {
        product: {id_default_combination, id, price},
      },
    } = this.state;
    const {price: priceProp} = this.props.route.params;

    if (typeof id_default_combination !== 'string') {
      this.setState({
        price_final: priceProp,
        isloadingPrice: false,
      });
    } else {
      try {
        const response = await fetch(
          api_get_spec_prices_product +
            '&idCombination_sp=' +
            id_default_combination_data +
            '&idProduct_sp=' +
            id_product_data +
            '&quantity_sp=1',
        );
        const {
          product: {my_price},
        } = await response.json();
        this.setState({
          price_final: my_price,
          isloadingPrice: false,
        });
      } catch (error) {
        console.error(`erreur de prix ${error}`);
      }
    }
  };

  show_price_after_promo = () => {
    // console.log('___________product_________start');
    // console.log(this.state.product);
    if (!this.state.isloadingPrice) {
      var productInfo = this.state.product;

      var detailProduct = productInfo.map(item => (
        <View
          style={{
            backgroundColor: primaryBackgroundColor,
            paddingHorizontal: '5%',
            justifyContent: this.state.specific_price
              ? 'space-between'
              : 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: '30%',
            left: '5%',
            flexDirection: 'row',
          }}>
          {parseFloat(this.state.price_final).toFixed(2) !=
          this.props.route.params.price ? (
            <Text
              style={{
                textAlign: 'center',
                fontSize: 25,
                color: 'white',
                marginRight: 15,
                textDecorationLine: this.state.price_final
                  ? 'line-through'
                  : 'none',
              }}>
              {this.props.route.params.price
                ? parseFloat(this.props.route.params.price).toFixed(2)
                : parseFloat(item.price).toFixed(2)}
              € TTC
            </Text>
          ) : (
            <Text></Text>
          )}

          {this.state.price_final ? (
            <Text
              style={{
                textAlign: 'center',
                fontSize: 25,
                color: 'white',
              }}>
              {parseFloat(this.state.price_final).toFixed(2)}€ TTC{' '}
              {/* {this.showPrice()} */}
            </Text>
          ) : (
            <Text></Text>
          )}
        </View>
      ));
    } else {
      var productInfo = this.state.product;

      var detailProduct = productInfo.map(item => (
        <View
          style={{
            backgroundColor: primaryBackgroundColor,
            paddingHorizontal: '5%',
            justifyContent: this.state.specific_price
              ? 'space-between'
              : 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: '30%',
            left: '5%',
            flexDirection: 'row',
          }}>
          {parseFloat(this.state.price_final).toFixed(2) !=
          this.props.route.params.price ? (
            <Text
              style={{
                textAlign: 'center',
                fontSize: 25,
                color: 'white',
                marginRight: 15,
                textDecorationLine: this.state.price_final
                  ? 'line-through'
                  : 'none',
              }}>
              {this.props.route.params.price
                ? parseFloat(item.price).toFixed(2)
                : parseFloat(item.price).toFixed(2)}
              € TTC
            </Text>
          ) : (
            <Text></Text>
          )}

          {this.state.price_final ? (
            <Text
              style={{
                textAlign: 'center',
                fontSize: 25,
                color: 'white',
              }}>
              ... {/* {this.showPrice()} */}
            </Text>
          ) : (
            <Text></Text>
          )}
        </View>
      ));
    }
    return detailProduct;
  };

  getoption = (opt, combinationId) => {
    // alert('Idcombination '+combinationId);
    // console.log('valeur des taille de vetement' + JSON.stringify(opt))
    if (typeof opt != null) {
      if (opt.product_option_value_T.name != undefined) {
        var data = opt.product_option_value_T;
        // alert(data.name)

        var optToReturn = (
          <View>
            <SelectDropdown
              data={data}
              buttonStyle={{
                width: '96%',
                marginLeft: '2%',
                marginRight: '2%',
              }}
              defaultButtonText={'Séléctionners votre taille'}
              onSelect={value => {
                // alert(JSON.stringify('alert value 1 '+value.id));
                var qt = 1;
                let id_group_customer;
                if (this.context.customer) {
                  id_group_customer = this.context.customer.id_default_group;
                } else {
                  id_group_customer = 1;
                }
                this.changeDeclinaison(
                  value.id,
                  combinationId,
                  qt,
                  id_group_customer,
                );
                this.setState({selectedValue: value});
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
            />
          </View>
        );
        //<Picker.Item label={opt.product_option_value_T.name} value={opt.product_option_value_T.id} />
      } else {
        var optToReturn = (
          <View>
            <SelectDropdown
              data={opt.product_option_value_T}
              defaultButtonText={'Séléctionner votre taille'}
              buttonStyle={{
                width: '96%',
                marginLeft: '2%',
                marginRight: '2%',
              }}
              onSelect={value => {
                // alert(JSON.stringify('alerte value 2 '+value.id));
                var qt = 1;
                let id_group_customer;
                if (this.context.customer) {
                  id_group_customer = this.context.customer.id_default_group;
                } else {
                  id_group_customer = 1;
                }
                this.changeDeclinaison(
                  value.id,
                  combinationId,
                  qt,
                  id_group_customer,
                );
                this.setState({selectedValue: value.name});
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.name;
              }}
              rowTextForSelection={(item, index) => {
                return item.name;
              }}
            />
          </View>
        );
        // opt.product_option_value_T.map((combOpt, i) => {

        //     return (

        //         // <Picker.Item key={i} label={combOpt.name} value={combOpt.name} />
        //         )
        //     });
      }
      return optToReturn;
    }
  };

  changeQuantity = qtt => {
    this.setState({
      qtty: qtt,
    });
    if (qtt != '' && qtt != 0) {
      var value = 0;
      var combinationId = 0;
      this.changeDeclinaison(value, combinationId, parseInt(qtt));
    }
  };

  add_quantity = () => {
    if (this.state.qtty < this.state.stock || this.state.qtty <= 4) {
      this.setState({
        qtty: this.state.qtty + 1,
      });
    }
  };

  remove_quantity = () => {
    if (this.state.qtty > 1) {
      this.setState({
        qtty: this.state.qtty - 1,
      });
    }
  };

  reload_screen = () => {
    this.props.navigation.addListener('focus', () => {
      this.getProduct();
    });
  };
  // show(value,combinationId){

  //     this.setState({selectValue: value})
  //     var qt = 1;
  //                             let id_group_customer;
  //                             if (this.context.customer) {
  //                                 id_group_customer = this.context.customer.id_default_group;
  //                             } else {
  //                                 id_group_customer = 1;
  //                             }
  //                             this.changeDeclinaison(value, combinationId, qt, id_group_customer);
  // }

  addToCart = async () => {
    if (this.state.currentCombination) {
      var product_attribute =
        this.state.currentCombination.product.currentCombinationId;
      var size = this.state.selectedValue;
      var quantity = this.state.qtty;
      if (this.state.customer) {
        var idCustomer = this.state.customer.id;
      } else {
        idCustomer = 0;
      }
      if (product_attribute == undefined) {
        product_attribute = 0;
      }
      var body = {
        id_product: this.props.route.params.data,
        product_attribute: product_attribute,
        quantity: quantity,
        guest: this.state.guest,
        idCustomer: idCustomer,
      };

      // console.log('  contenu du body ' + JSON.stringify(body));
      await fetch_url_post(api_add_cart_url, body)
        .then(() => {
          Alert.alert('Alerte', 'Ajout au panier!');
          global.statut = true;
        })
        .catch(error => console.error(error));
    } else if (this.state.arrayDeclChoice == null) {
      var quantity = this.state.qtty;
      var size = this.state.selectedValue;
      var body = {
        id_product: this.props.route.params.data,
        product_attribute: size,
        quantity: quantity,
        guest: this.state.guest,
        idCustomer: idCustomer,
      };

      //console.log(' contenu du body '+JSON.stringify(body))
      await fetch_url_post(api_add_cart_url, body)
        .then(() => {
          Alert.alert('Alerte', 'Ajout au panier!');
          global.statut = true;
        })
        .catch(error => console.error(error));
    }
  };

  changeDeclinaison = async (
    valueSent,
    combinationIdSent,
    qt,
    id_group_customer,
  ) => {
    this.setState({isloadingPrice: true});
    //  alert(valueSent + " " + combinationIdSent);
    if (valueSent != 0) {
      var value = valueSent;

      var combinationId = combinationIdSent;
      var default_Val = false;
    } else {
      var default_Val = true;
    }
    var qtt = qt;

    if (this.state.arrayDeclChoice == null) {
      var myArrayO = [];
      this.state.product.declinaison.map((combinationVar, i) => {
        var combinationId = combinationVar.id;
        combinationId = combinationVar.id;
        var arrayFinalC = {
          idOption: combinationId,
          optionValue: 0,
          quantitys: qtt,
        };
        myArrayO.push(arrayFinalC);
        this.setState({
          arrayDeclChoice: myArrayO,
        });
      });
    }

    var priceTo = this.state.product.product.product.price;
    if (this.state.arrayDeclChoice == null) {
      var myArray = myArrayO;
    } else {
      var myArray = this.state.arrayDeclChoice;
    }

    if (myArray) {
      if (default_Val == false) {
        let index = myArray.findIndex(x => x.idOption == combinationId);
        myArray[index].optionValue = value;
        myArray[index].quantity = qtt;
      } else {
        var ind = 0;
        myArray.map(newArr => {
          myArray[ind].quantity = qtt;
          ind++;
        });
      }
      if (value != 'null') {
        var Bd = {
          id_product: this.props.route.params.data,
          optVal: myArray,
          id_group_customer: id_group_customer,
        };
        // console.log(Bd);
        fetch_url_post(api_combination_get_price_url, Bd)
          .then(async json => {
            // console.log('====================================');
            // console.log(json);
            // console.log('====================================');
            this.setState({
              currentCombination: json,
              isloadingPrice: false,
            });
            var data = {
              idAttribute:
                this.state.currentCombination.product.currentCombinationId,
              idProduct: this.state.currentCombination.product.id,
            };
            await fetch_url_get(
              api_get_stock_by_id_attribute_product_url(data),
            ).then(result => {
              this.setState({
                stock: result.stock_available.quantity,
              });
            });
            if (json.error != '1') {
              var new_price = parseFloat(json.product.my_price);
              // alert(new_price)
              // alert('new_price before calcul '+new_price)
              new_price = Math.round(new_price * 1000) / 1000;
              // alert('new_price after calcul '+new_price);
              this.setState({
                price_final: new_price,
              });
            }
          })
          .catch(error => console.error(error));
      }
    }
  };

  componentDidUpdate() {
    if (this.props.route.params.reload == true) {
      // this.child.reload();
    }
  }

  componentDidMount() {
    //this.updateFinalPrice();
    this.getProduct();

    // this.reload_screen();
  }
  showPrice = () => {
    if (!this.state.isloadingPrice) {
      return <Text>55555555555555555555555555</Text>;
    } else {
      return <Text>chargement du prix</Text>;
    }
  };

  render() {
    // console.log(
    //   'vue du details produits' + JSON.stringify(this.props.route.params.price),
    // );
    // console.log('randev details product ' + JSON.stringify(this.state.product));
    // if (
    //   this.state.product &&
    //   this.state.product != 'no data' &&
    //   !this.state.loading
    // ) {
    //   var combinationTplNew = this.state.product.map((combinationVar, i) => {
    //     var combinationId = combinationVar.id;
    //     return (
    //       <View style={detail_product_styles.view} key={i}>
    //         <Text style={detail_product_styles.name}>
    //           {combinationVar.public_name.language} :
    //         </Text>
    //         {this.getoption(
    //           combinationVar.associations.product_option_values,
    //           combinationId,
    //         )}
    //         {/* <Picker
    //                         selectedValue={this.state.selectValue}
    //                         onValueChange={(value,combinationId)=>{this.show(value,combinationId)}}
    //                         >
    //                         {this.getoption(combinationVar.associations.product_option_values)}
    //                     </Picker> */}
    //       </View>
    //     );
    //   });
    // }
    if (
      this.state.product &&
      this.state.product != 'no data' &&
      !this.state.loading
    ) {
      var productInfo = this.state.product;

      var detailProduct = productInfo.map(item => {
        // var Donnee = productInfo.map(item => {
        //   return item;
        // });
        // console.log(productInfo);
        // console.log('product productInfo.link_rewrite');
        // console.log(productInfo.id_default_image);
        var ImgUrl =
          api_url +
          item.id_default_image +
          '-medium_default/' +
          item.link_rewrite.language[0] +
          '.jpg';
        var condition = item.condition;
        if (
          item.description_short.language &&
          typeof item.description_short.language != 'object' &&
          !Array.isArray(item.description_short.language) &&
          item.description_short.language !== null
        ) {
          var description_short = item.description_short.language;
        } else {
          var description_short = '...';
        }
        if (
          item.description.language &&
          typeof item.description.language != 'object' &&
          !Array.isArray(item.description.language) &&
          item.description.language !== null
        ) {
          var description = item.description.language;
        } else {
          var description = '...';
        }
        var title = item.name.language;

        // console.log('____________productInfo_description__start');
        // console.log(item.description.language);
        // console.log('______');
        // console.log(item.description_short.language);
        // console.log('____________productInfo_description__end');
        return (
          <View style={{flex: 1}}>
            <View
              style={{
                flex: 8,
                backgroundColor: 'white',
                paddingTop: '5%',
              }}>
              <ScrollView>
                <View>
                  <Image
                    source={{uri: ImgUrl}}
                    style={{
                      height: 400,
                      width: '100%',
                      resizeMode: 'contain',
                    }}
                  />

                  {this.show_promotion()}

                  {this.show_price_after_promo()}
                </View>
                <View style={detail_product_styles.name_price}>
                  <Text style={detail_product_styles.name}>
                    {title.toUpperCase()}
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={detail_product_styles.price}>
                      {this.state.price_final
                        ? parseFloat(this.state.price_final).toFixed(2)
                        : this.props.route.params.price
                        ? parseFloat(this.props.route.params.price).toFixed(2)
                        : parseFloat(item.price).toFixed(2)}
                      € TTC
                    </Text>
                    {/* {combinationTplNew} */}
                  </View>
                </View>
                <View style={detail_product_styles.description}>
                  {description_short ? (
                    <HTMLView
                      value={description_short}
                      stylesheet={detail_product_styles.description_text}
                    />
                  ) : (
                    // <Text style={detail_product_styles.description_text}>
                    //   {description_short}
                    // </Text>
                    <Text>...</Text>
                  )}

                  {/* {description ? (
                    <HTMLView
                      value={description}
                      stylesheet={detail_product_styles.description_text}
                    />
                  ) : (
                    // <Text style={detail_product_styles.description_text}>
                    //   {description}
                    // </Text>
                    <Text>...</Text>
                  )} */}
                </View>
                {/* {this.state.id_category ? ( */}

                <SimilarProduct
                  change_product={this.change_product}
                  id_category={this.state.id_category}
                  navigation={this.props.navigation}
                />
                {/* ) : (
                <View></View> */}
                {/* )} */}
              </ScrollView>
              <TouchableOpacity
                style={detail_product_styles.share}
                onPress={() => this.shareto()}>
                <Icon type="entypo" name="share" size={25} />
              </TouchableOpacity>
              <View style={detail_product_styles.panel_add_number}>
                <TouchableOpacity
                  style={detail_product_styles.plus_panel}
                  onPress={() => {
                    this.add_quantity();
                  }}>
                  <Icon
                    name="plus"
                    type="font-awesome"
                    color="#FFFFFF"
                    size={18}
                    containerStyle={{
                      backgroundColor: '#efe4d0',
                      borderRadius: 50,
                    }}
                  />
                </TouchableOpacity>
                <View style={detail_product_styles.input_panel_container}>
                  <View style={detail_product_styles.input_panel}>
                    <TextInput
                      style={detail_product_styles.input_number}
                      keyboardType="numeric"
                      selectionColor="#713F18"
                      value={String(this.state.qtty)}
                      onChangeText={qtt => this.changeQuantity(qtt)}
                    />
                  </View>
                </View>
                <TouchableOpacity
                  style={detail_product_styles.plus_panel}
                  onPress={() => {
                    this.remove_quantity();
                  }}>
                  <Icon
                    name="minus"
                    type="font-awesome"
                    color="#FFFFFF"
                    size={18}
                    containerStyle={{
                      backgroundColor: '#efe4d0',
                      borderRadius: 50,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={detail_product_styles.button_view}>
              {this.state.stock && this.state.stock != 0 ? (
                <View style={detail_product_styles.button_view_content}>
                  <Button
                    buttonStyle={detail_product_styles.button}
                    title="Ajouter au panier"
                    onPress={() => {
                      //this.addToCart();
                    }}
                  />
                  <Button
                    icon={
                      <Icon
                        name="credit-card"
                        color="#713F18"
                        size={20}
                        style={{marginRight: 5}}
                      />
                    }
                    buttonStyle={detail_product_styles.button_outline}
                    titleStyle={
                      detail_product_styles.title_style_button_outline
                    }
                    title="Acheter"
                    type="outline"
                  />
                </View>
              ) : this.state.stock == null ? (
                <View style={detail_product_styles.button_view_content}>
                  <Button
                    buttonStyle={detail_product_styles.button}
                    title="Ajouter au panier"
                    onPress={() => {
                      //this.addToCart();
                    }}
                  />
                  <Button
                    icon={
                      <Icon
                        name="credit-card"
                        color="#713F18"
                        size={20}
                        style={{marginRight: 5}}
                      />
                    }
                    buttonStyle={detail_product_styles.button_outline}
                    titleStyle={
                      detail_product_styles.title_style_button_outline
                    }
                    title="Acheter"
                    type="outline"
                  />
                </View>
              ) : (
                // <View
                //   style={[
                //     detail_product_styles.button_view_content,
                //     { alignItems: "center" },
                //   ]}
                // >
                //   <Text>Veuillez choisir</Text>
                // </View>
                <View
                  style={[
                    detail_product_styles.button_view_content,
                    {alignItems: 'center'},
                  ]}>
                  <View style={{flexDirection: 'row'}}>
                    <Icon
                      type="font-awesome"
                      name="warning"
                      size={16}
                      color="#E0A80D"
                    />
                    <Text style={{color: '#E0A80D'}}>
                      {' '}
                      Il n'y a plus de stock
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>
        );
      });
    } else {
      var detailProduct = (
        <ActivityIndicator
          style={{paddingTop: 11}}
          size="large"
          color={'#713F18'}
        />
      );
    }

    return <View style={{flex: 1}}>{detailProduct}</View>;
  }
}

export default DetailProduct;
