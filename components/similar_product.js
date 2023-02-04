import React from 'react';
import {View, FlatList, Text} from 'react-native';
import CardProduct from './card_products';
import {fetch_url_get} from '../helper/function/common-function/fetch';
import {api_similar_product_url} from '../helper/api_url';
import {db} from '../configs';
// import detail_product_styles
import detail_product_style from '../view/style/detail_product_style';
// import detail_product_styles from './style/detail_product_style';
import {primaryColor} from '../helper/color';
import {DotsLoader} from 'react-native-indicator';
import {
  ref,
  onValue,
  orderByChild,
  equalTo,
  get,
  query,
} from 'firebase/database';
class SimilarProduct extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    isLoading: true,
    product: null,
  };
  showDetail = data => {
    this.props.change_product(data.id);
  };

  get_similar_product = async () => {
    // console.log(this.get_similar_product());
    setTimeout(() => {
      var id = this.props.id_category;
      Object.values(id).map(item => {
        try {
          const startCountRef = query(
            ref(db, 'getCategories/category'),
            orderByChild('id'),
            equalTo(item.id),
          );
          get(startCountRef).then(snapshot => {
            var data = [];
            data = snapshot.val();
            this.setState({
              product: data,
              isLoading: false,
            });
            // console.log('-------Debugage---------');
            // console.log(data);
            // Object.values(data).map(item => {
            //   Object.values(item.associations.products.product).map(item => {
            //     const startCountRef = query(
            //       ref(db, 'getAllproductsBrut/product'),
            //       orderByChild('id'),
            //       equalTo(item.id),
            //     );
            //     get(startCountRef).then(snapshot => {
            //       var data = [];
            //       snapshot.forEach(snapshotChild => {
            //         data.push(snapshotChild.val());
            //       });
            //       // console.log('--------Debugage-------');
            //       // console.log(data);
            //       this.setState({
            //         product: data,
            //         isLoading: false,
            //       });
            //     });
            //   });
            // });
            // this.setState({
            //   dataCategory: data,
            //   // loading: false,
            // });
          });
          // await fetch_url_get(api_similar_product_url + id.toString()).then(
          //   data => {
          //     this.setState({
          //       product: data.product,
          //     });
          //   },
          // );
        } catch (e) {
          this.setState({
            isLoading: false,
          });
          console.log('error similar');
        }
      });
    }, 3000);

    // console.log(id.toString());
    // let id_category = Array();
    // var id = null;
    // if (Array.isArray(this.props.id_category)) {
    //   id = this.props.id_category;
    // } else {
    //   id = [this.props.id_category];
    // }
    // id.forEach(item => {
    //   id_category.push(item.id);
    // });
  };

  async componentDidMount() {
    // console.log('Je suis charger');
    // setTimeout(() => {
    this.get_similar_product();
    // }, '5000');
    // await this.get_similar_product();
  }

  displayLoading = () => {
    if (this.state.isLoading) {
      return (
        <View
          style={{
            /* flex: 1, */
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <DotsLoader color={primaryColor} betweenSpace={20} size={20} />
        </View>
      );
    }
  };

  displayFlatlist = () => {
    if (this.state.product && !this.state.isLoading) {
      var tpl = Object.values(this.state.product).map(data => (
        <React.Fragment>
          <Text
            style={{
              fontSize: 25,
              color: '#713F18',
            }}>
            Produits similaires
          </Text>
          <FlatList
            numColumns={1}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={data.associations.products.product}
            renderItem={({item}) => (
              <CardProduct item={item} showDetail={this.showDetail} />
            )}
            keyExtractor={item => item.id}
          />
        </React.Fragment>
      ));
      return tpl;
    }
  };

  render() {
    return (
      <View
        style={{
          // alignItems: 'space-around',
          // justifyContent: 'space-around',
          left: 15,
          width: '100%',
          flex: 1,
        }}>
        {this.displayLoading()}
        {this.displayFlatlist()}
        {/* <FlatList
          numColumns={1}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={this.state.product}
          renderItem={({item}) => (
            <CardProduct item={item} showDetail={this.showDetail} />
          )}
          keyExtractor={item => item.id}
        /> */}
      </View>
    );
  }
}
export default SimilarProduct;
