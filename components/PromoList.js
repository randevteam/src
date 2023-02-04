import React from 'react';
import {View, FlatList} from 'react-native';
import CardPromo from './card_search_list';

class PromoList extends React.Component {
  constructor(props) {
    super(props);
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
    if (Array.isArray(this.props.products)) {
      //   console.log(this.props.products);
      return (
        <View style={{flex: 1}}>
          <FlatList
            numColumns={2}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={this.props.products}
            renderItem={({item}) => (
              <CardPromo item={item} showDetail={this.showDetail} />
            )}
            keyExtractor={item => item.id}
          />
        </View>
      );
    } else {
      var products = [];
      products.push(this.props.products);
      return (
        <View style={{flex: 1}}>
          <FlatList
            numColumns={2}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={products}
            renderItem={({item}) => (
              <CardPromo item={item} showDetail={this.showDetail} />
            )}
            keyExtractor={item => item.id}
          />
        </View>
      );
    }
  }
}
export default PromoList;
