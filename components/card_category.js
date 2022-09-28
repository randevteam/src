import React from 'react';
import { Text, TouchableOpacity, Button, ActivityIndicator, View } from 'react-native';
import { Card } from 'react-native-paper';
import { Image, Icon } from 'react-native-elements';
import { DotsLoader } from 'react-native-indicator';

import card_product_styles from './card_product_style';
import { api_post_wishlist_, api_url, api_get_category_by_id_url } from '../helper/api_url';
import { primaryColor } from '../helper/color';
import { fetch_url_post } from '../helper/function/common-function/fetch';
import { AuthContext } from '../helper/context/auth-context';
import Wishlist from './Wishlist_categories';
import { fetch_url_get } from '../helper/function/common-function/fetch';


import FastImage from 'react-native-fast-image2'

class CardCategory extends React.Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props)
        this.state = {
            wished: false,
            id_product: null,
            id_category: null,
            isModalVisible: false,
            checked: false,
            id_wishlistfromModal: null,
            dataCategory: null,
            img_category: null,
        }
    }

    showModal = () => this.setState({ isModalVisible: true });
    hideModal = () => this.setState({ isModalVisible: false });
    redHeart = () => this.setState({ wished: true });
    id_wishlistfromModal = (id_wishlist) => this.setState({ id_wishlistfromModal: id_wishlist });

    componentDidMount = async () => {
        this.setState({
            id_category: this.props.item.id
        })

        const category = await fetch_url_get(api_get_category_by_id_url + this.props.item.id);

        this.setState({
            dataCategory: category,
        });

        var imageurl = api_url + "c/" + this.props.item.id + "-category_default" + "/" + category.link_rewrite.language + ".jpg"
        Image.prefetch(imageurl);
        // console.log(imageurl)
        this.setState({
            img_category: imageurl
        });


        // console.log("rrrrrrrrr");
        // console.log(this.state.img_category);
        // console.log("rrrrrrrr");
    }

    render() {
        const { item, showDetail } = this.props;
        const data = this.state.dataCategory;
        //console.log("rrrrrrrrr");
        //console.log(data);
        //console.log("rrrrrrrr");
        if (data && typeof data === 'object' && typeof data.name.language !== 'object') {
            return (
                <View>
                    <Card style={card_product_styles.card}>
                        <TouchableOpacity onPress={() => showDetail(data)}>

                            <Image style={card_product_styles.img_product}
                                source={{uri:this.state.img_category}} />
                        </TouchableOpacity>
                        <Text
                            umberOfLines={2}
                            ellipsizeMode='tail'
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: 10,
                            }}
                        >
                            {data.name.language}
                        </Text>
                    </Card>
                </View>

            );
        } else {
            return (
                <View>
                    <Text>...</Text>
                </View>
            );
        }

    }
}

export default CardCategory;

{/* <DotsLoader color={primaryColor} betweenSpace={20} size={20} style={{ backgroundColor: 'white', flex: 1, width: '100%' }}/> */ }
{/* <ActivityIndicator color={primaryColor} style={{ backgroundColor: 'white', flex: 1, width: '100%' }} /> */ }