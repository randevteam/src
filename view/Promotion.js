import React from 'react';

import {
  View,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
  Picker,
  ScrollView,
} from 'react-native';
import {DotsLoader} from 'react-native-indicator';
import {SearchBar, Icon} from 'react-native-elements';

import {AuthContext} from '../helper/context/auth-context';
import {
  api_get_search_result,
  api_products_by_id_categorie,
  api_get_promotion_state,
  getAllProductPromo,
} from '../helper/api_url';

import {fetch_url_get} from '../helper/function/common-function/fetch';
import PromoList from '../components/PromoList';
import {primaryColor, title_search_color} from '../helper/color';
import ImageBackgroundGlobal from '../components/image_background_global';
import FooteraSocial from './FooteraSocial';
import detail_product_styles from './style/detail_product_style';
import {db} from '../configs';
import {ref, onValue} from 'firebase/database';
class Promotion extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      guest: null,
      products: null,
      isLoading: true,
      IdCategories: null,
      titre: null,
      stringToSearch: null,
      mode: false,
      Text: null,
    };
  }

  getGuest = async () => {
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
    const startCountRef = ref(db, 'getAllProductPromo/product/');
    onValue(startCountRef, snapshot => {
      const data = snapshot.val();
      // console.log(data);
      this.setState({
        products: data,
        isLoading: false,
      });
    });
    // var products = null;
    // products = await fetch_url_get(getAllProductPromo);
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

  displayProduct = () => {
    // this.getProduct();
    if (!this.state.isLoading && this.state.products) {
      // console.log(this.state.IdCategories)
      return (
        <PromoList
          products={this.state.products}
          navigation={this.props.navigation}
        />
      );
    }
  };

  displayTitre = titre => {
    if (this.state.titre) {
      return <Text style={{color: '#000000', fontSize: 16}}> {titre} </Text>;
    }
  };

  async componentDidMount() {
    // console.log('Promotion firebase Charger');
    await this.getProduct();
    this.setState({
      IdCategories: this.props.route.params.data.IdCategorie,
      titre: this.props.route.params.data.SousSousSousTitre,
      Text: this.props.route.params.data.text,
    });

    await this.getGuest();
  }

  render() {
    // console.log(this.state.products);
    return (
      <View style={{flex: 1, maxWidth: '100%', marginBottom: '2%'}}>
        <ScrollView>
          {this.displayLoading()}
          {this.displayProduct()}
        </ScrollView>
        <FooteraSocial navigation={this.props.navigation} />
      </View>
    );
  }
}

export default Promotion;
