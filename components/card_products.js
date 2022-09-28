import React from 'react';
import { Text, TouchableOpacity, Button, ActivityIndicator, View } from 'react-native';
import { Card } from 'react-native-paper';
import { Image, Icon } from 'react-native-elements';
import { DotsLoader } from 'react-native-indicator';

import card_product_styles from './card_product_style';
import { api_post_wishlist_,api_get_wishlist, api_url,api_get_wishlist_categories  } from '../helper/api_url';
import { primaryColor } from '../helper/color';
import { fetch_url_post,fetch_url_get} from '../helper/function/common-function/fetch';
import { AuthContext } from '../helper/context/auth-context';
import Wishlist from './Wishlist_categories';

import FastImage from 'react-native-fast-image2'

class CardProduct extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    // state = {};
  }
  state = {
    idSelect: null,
    wished: false,
    id_product: null,
    isModalVisible: false,
    checked: false,
    id_wishlistfromModal: null,
    Fav: [],
    list: null,
  };

  showModal = (id) => this.setState({ isModalVisible: true, idSelect: id });
  hideModal = () => this.setState({ isModalVisible: false });
  redHeart = () => this.setState({ wished: true });
  id_wishlistfromModal = (id_wishlist) =>
    this.setState({ id_wishlistfromModal: id_wishlist });
  getidCategorieWishlist = async () => {
    var list = await fetch_url_get(
      api_get_wishlist_categories + this.context.customer.id
    );

    list.map((item) => {
      this.setState({
        list: item.id_wishlist,
      });
    });
  };
  removeToMyWishlist = async (id) => {
    if (this.state.Fav.findIndex((item) => item.id == id) !== -1) {
      // console.log("id " + id);
      // console.log("this.state.id_wishlistfromModal " + this.state.list);
      // console.log("this.context.customer.id " + this.context.customer.id);
      var url = api_post_wishlist_ + "REMOVE";
      let body = {
        id_wishlist: this.state.list,
        id_customer: this.context.customer.id,
        id_product: id,
        id_product_attribute: null,
      };
      //console.log(JSON.stringify(body));
      try {
        let envoi = await fetch_url_post(url, body);
        //console.log("response=", envoi);
        if (envoi) {
          alert("Votre produit a bien été supprimé des favoris");
          this.setState({ wished: false });
        } else {
          alert("impossible de supprimer");
        }
      } catch (e) {
        alert("Erreur sur l'api");
      }
    }
  };

  Wishlist = (id) => {
    if (this.state.Fav.findIndex((item) => item.id == id) !== -1) {
      return (
        <Icon
          type="font-awesome"
          name="heart"
          size={22}
          color="red"
          onPress={() => this.removeToMyWishlist(id)}
        />
      );
    } else {
      return (
        <Icon
          type="font-awesome"
          name="heart-o"
          size={22}
          color="grey"
          onPress={() => {
            this.showModal(id);
          }}
        />
      );
    }
  };

  CheckIfProductAreAlreadyWishlisted = async () => {
    if (this.state.wished == false) {
      var url = api_post_wishlist_ + "CheckProducts";
      var result = null;
      result = await fetch_url_post(url, {
        id_customer: this.context.customer.id,
        id_product: this.props.item.id,
      });
      if (result) {
        this.setState({ wished: true });
      }
    }
  };

  async componentDidMount() {
    this.setState({
      id_product: this.props.item.id,
    });
    if (this.context.customer.id != null) {
      let result = await fetch_url_get(
        api_get_wishlist + this.context.customer.id
      );
      this.setState({ Fav: result.product });
    }
    this.getidCategorieWishlist();
    this.CheckIfProductAreAlreadyWishlisted();
    var imageurl =
      api_url +
      this.props.item.id_default_image +
      "-small_default" +
      "/" +
      this.props.item.link_rewrite.language +
      ".jpg";
    Image.prefetch(imageurl);
  }

  render() {
    //console.log("card this.props");

    //console.log(this.props);
    const { item, showDetail } = this.props;
    return (
      <View>
        <Card style={card_product_styles.card}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {/* <Text style={card_product_styles.condition}>{item.condition}</Text> */}
            {this.Wishlist(item.id)}
          </View>
          <TouchableOpacity onPress={() => showDetail(item)}>
            {/* <FastImage
                            PlaceholderContent={<ActivityIndicator color={primaryColor} style={{ backgroundColor: 'white', flex: 1, width: '100%' }} />}
                            style={card_product_styles.img_product}
                            source={{
                                uri: api_url + item.id_default_image + "-small_default" + "/" + item.link_rewrite.language + ".jpg",
                                priority: FastImage.priority.normal,
                                cache: FastImage.cacheControl.cacheOnly,
                            }}
                            
                        /> */}
            <Image
              style={card_product_styles.img_product}
              source={{
                uri:
                  api_url +
                  item.id_default_image +
                  "-small_default" +
                  "/" +
                  item.link_rewrite.language +
                  ".jpg",
              }}
            />
          </TouchableOpacity>
          <Text style={card_product_styles.price}>
            € {parseFloat(item.price* (1+20/100)).toFixed(2)}{" "}
          </Text>
          <Text
            style={card_product_styles.name}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {item.name.language}
          </Text>
        </Card>
        <Wishlist
          visible={this.state.isModalVisible}
          dismiss={this.hideModal}
          id_product={this.state.idSelect}
          redHeart={this.redHeart}
          navigation={this.props.navigation}
          id_wishlistfromModal={this.id_wishlistfromModal}
        />
      </View>
    );
  }
}

export default CardProduct;

{/* <DotsLoader color={primaryColor} betweenSpace={20} size={20} style={{ backgroundColor: 'white', flex: 1, width: '100%' }}/> */ }
{/* <ActivityIndicator color={primaryColor} style={{ backgroundColor: 'white', flex: 1, width: '100%' }} /> */ }