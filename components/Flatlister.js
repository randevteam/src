import React, {Component} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  RefreshControl,
  ScrollView,
  StatusBar,
} from 'react-native';
import {db} from '../configs';
import {
  ref,
  onValue,
  orderByChild,
  equalTo,
  get,
  query,
} from 'firebase/database';

import CardProduct from './card_products';
import {
  api_productslimited_by_id_categorie,
  api_products_by_id_categorie,
} from '../helper/api_url';
import {
  fetch_url_get,
  fetch_url_get_and_store,
} from '../helper/function/common-function/fetch';

// const fetch_url_get = async (url, data = null) => {
//   var data = null;
//   await fetch(url)
//       .then((response) => response.json())
//       .then((json) => {
//           data = json;
//       }).catch((error) => {
//           return error;
//       });
//   if(data) return data;
// }

class Flatlister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guest: null,
      products: [],
      isLoading: false,
      idCategories: null,
      refresh: false,
    };
  }

  renderItem = item => {
    return (
      <CardProduct
        item={item.item}
        navigation={this.props.navigation}
        showDetail={this.showDetail}
      />
    );
  };

  getProduct = async idCategories => {
    const startCountRef = query(
      ref(db, 'getCategories/category'),
      orderByChild('id'),
      equalTo(this.props.idCategories),
    );
    get(startCountRef).then(snapshot => {
      var data = [];
      data = snapshot.val();
      this.setState({
        products: data,
      });
      // console.log('--------Debugage-------');
      // Object.values(this.state.products).map(data =>
      //   console.log(data.associations.products.product),
      // );
      // this.setState({
      //   dataCategory: data,
      //   // loading: false,
      // });
    });
    // var products = null;
    // products = await fetch_url_get(
    //   api_products_by_id_categorie + this.props.idCategories
    // );
    // this.setState({
    //   products: products.product,
    // });
  };
  reload = async () => {
    await this.getProduct();
  };

  async componentDidMount() {
    // console.log("ComponentDidMount"
    await this.getProduct();
  }

  showDetail = data => {
    this.props.navigation.navigate('DetailProduct', {
      screen: 'DetailProduct',
      params: {
        data: data.id,
        defaultGroup: this.context.customer
          ? this.customer.id_default_group
          : 1,
      },
    });
  };

  render() {
    if (this.state.products) {
      const data = this.state.products;
    }
    var tpl = Object.values(this.state.products).map(data => (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <FlatList
          progressViewOffset={1}
          horizontal={true}
          data={data.associations.products.product}
          renderItem={this.renderItem}
          keyExtractor={item => this.props.key}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0.1}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refresh}
              onRefresh={() => {
                this.reload();
              }}
            />
          }
        />
      </ScrollView>
    ));
    return tpl;
  }
}

export default Flatlister;
