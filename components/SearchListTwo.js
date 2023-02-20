import React from 'react';
import {View, FlatList} from 'react-native';
import CardSearch from './card_search_list';

class SearchListTwo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
    };
  }

  showDetail = data => {
    var price = parseFloat(data.price * (1 + 20 / 100)).toFixed(2);
    this.props.navigation.navigate('DetailProduct', {
      screen: 'DetailProduct',
      params: {
        data: data.id,
        price: price,
        defaultGroup: this.context.customer
          ? this.customer.id_default_group
          : 1,
      },
    });
  };

  render() {
    // console.log(this.props.selectedValue)

    // console.log('--------004------');
    // console.log(this.props.products);
    // console.log('--------004------');

    if (Array.isArray(this.props.products)) {
      //   let data = [];
      //   data = this.props.products;
      console.log('select value ' + this.props.selectedValue);
      return (
        <View style={{flex: 1}}>
          <FlatList
            numColumns={2}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={this.props.products}
            renderItem={({item}) => (
              <CardSearch
                item={item}
                showDetail={this.showDetail}
                selectedValue={this.props.selectedValue}
              />
            )}
            keyExtractor={item => item.id}
          />
        </View>
      );
    } else {
      // console.log(this.props.products.product);
      // console.log("--------003------");
      // console.log(this.props.products.product);
      // console.log("--------003------");
      //   var products = [];
      //   products.push(this.props.products.product);
      return (
        <View style={{flex: 1}}>
          <FlatList
            numColumns={2}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={this.props.products}
            renderItem={({item}) => (
              <CardSearch
                item={item}
                showDetail={this.showDetail}
                selectedValue={this.props.selectedValue}
              />
            )}
            keyExtractor={item => item.id}
          />
        </View>
      );
    }
  }
}
export default SearchListTwo;