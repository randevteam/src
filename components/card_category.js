import React from 'react';
import {
  Text,
  TouchableOpacity,
  Button,
  ActivityIndicator,
  View,
} from 'react-native';
import {Card} from 'react-native-paper';
import {Image, Icon} from 'react-native-elements';
import {DotsLoader} from 'react-native-indicator';

import card_product_styles from './card_product_style';
import {
  api_post_wishlist_,
  api_url,
  api_get_category_by_id_url,
} from '../helper/api_url';
import {primaryColor} from '../helper/color';
import {fetch_url_post} from '../helper/function/common-function/fetch';
import {AuthContext} from '../helper/context/auth-context';
import Wishlist from './Wishlist_categories';
import {fetch_url_get} from '../helper/function/common-function/fetch';
import {db} from '../configs';
import {
  ref,
  onValue,
  orderByChild,
  equalTo,
  get,
  query,
} from 'firebase/database';
import FastImage from 'react-native-fast-image2';

class CardCategory extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      wished: false,
      id_product: null,
      id_category: null,
      isModalVisible: false,
      checked: false,
      isLoading: false,
      id_wishlistfromModal: null,
      dataCategory: [],
      img_category: null,
    };
  }

  showModal = () => this.setState({isModalVisible: true});
  hideModal = () => this.setState({isModalVisible: false});
  redHeart = () => this.setState({wished: true});
  id_wishlistfromModal = id_wishlist =>
    this.setState({id_wishlistfromModal: id_wishlist});

  getCategoryCard = async () => {
    this.setState({
      isLoading: true,
    });
    const startCountRef = query(
      ref(db, 'getCategories/category'),
      orderByChild('id'),
      equalTo(this.props.item.id),
    );
    get(startCountRef).then(snapshot => {
      var data = [];
      data = snapshot.val();
      this.setState({
        dataCategory: data,
        isLoading: false,
      });
    });
  };
  displayLoading = () => {
    if (this.state.isLoading) {
      return (
        <View
          style={{
            /* flex: 1, */
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 150,
          }}>
          <DotsLoader color={primaryColor} betweenSpace={20} size={20} />
        </View>
      );
    }
  };
  displayCategory = () => {
    // console.log(typeof this.state.dataCategory);
    const {showDetail} = this.props;
    var tpl = Object.values(this.state.dataCategory).map(data => (
      <View>
        <Card style={card_product_styles.card}>
          <TouchableOpacity onPress={() => showDetail(data)}>
            <Image
              style={card_product_styles.img_product}
              source={{uri: this.state.img_category}}
            />
          </TouchableOpacity>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              margin: 10,
            }}>
            {/* texte */}
            {data.name.language}
          </Text>
        </Card>
      </View>
    ));
    return tpl;
    // {
    //   this.state.dataCategory &&
    //     !Array.isArray(this.state.dataCategory) &&
    //     Object.values(this.state.dataCategory).map(data => {
    // return (
    //   <View>
    //     <Card style={card_product_styles.card}>
    //       <TouchableOpacity onPress={() => showDetail(data)}>
    //         <Image
    //           style={card_product_styles.img_product}
    //           source={{uri: this.state.img_category}}
    //         />
    //       </TouchableOpacity>
    //       <Text
    //         numberOfLines={2}
    //         ellipsizeMode="tail"
    //         style={{
    //           alignItems: 'center',
    //           justifyContent: 'center',
    //           margin: 10,
    //         }}>
    //         texte
    //         {/* {data.name.language} */}
    //       </Text>
    //     </Card>
    //   </View>
    // );
    // });
    // }
  };
  componentDidMount = async () => {
    // this.setState({
    //   id_category: this.props.item.id,
    // });

    // const category = await fetch_url_get(
    //   api_get_category_by_id_url + this.props.item.id,
    // );

    // this.setState({
    //   dataCategory: category,
    // });
    //var imageurl = api_url + "c/" + this.props.item.id + "-large_default" + "/" + category.link_rewrite.language + ".jpg";
    var imageurl = api_url + 'img/c/' + this.props.item.id + '.jpg';

    Image.prefetch(imageurl);
    // console.log(imageurl)
    this.setState({
      img_category: imageurl,
    });
    await this.getCategoryCard();

    // console.log("rrrrrrrrr");
    // console.log(this.state.img_category);
    // console.log("rrrrrrrr");
  };

  render() {
    const {item, showDetail} = this.props;
    const data = this.state.dataCategory;
    // console.log('rrrrrrrrr');
    // console.log(this.state.dataCategory);
    // console.log('rrrrrrrr');

    return (
      <View>
        {this.displayLoading()}
        {this.displayCategory()}
      </View>
    );

    // this.state.dataCategory.map(data => {
    //   if (
    //     data &&
    //     typeof data === 'object' &&
    //     typeof data.name.language !== 'object'
    //   ) {
    //     return (
    //       <View>
    //         <Card style={card_product_styles.card}>
    //           <TouchableOpacity onPress={() => showDetail(data)}>
    //             <Image
    //               style={card_product_styles.img_product}
    //               source={{uri: this.state.img_category}}
    //             />
    //           </TouchableOpacity>
    //           <Text
    //             umberOfLines={2}
    //             ellipsizeMode="tail"
    //             style={{
    //               alignItems: 'center',
    //               justifyContent: 'center',
    //               margin: 10,
    //             }}>
    //             {data.name.language}
    //           </Text>
    //         </Card>
    //       </View>
    //     );
    //   } else {
    //     return (
    //       <View>
    //         <Text>...</Text>
    //       </View>
    //     );
    //   }
    // });
  }
}

export default CardCategory;

{
  /* <DotsLoader color={primaryColor} betweenSpace={20} size={20} style={{ backgroundColor: 'white', flex: 1, width: '100%' }}/> */
}
{
  /* <ActivityIndicator color={primaryColor} style={{ backgroundColor: 'white', flex: 1, width: '100%' }} /> */
}
