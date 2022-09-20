import React from 'react';
import { Text, TouchableOpacity, Button, ActivityIndicator, View } from 'react-native';
import { Card } from 'react-native-paper';
import { Image, Icon } from 'react-native-elements';
import { DotsLoader } from 'react-native-indicator';

import card_product_styles from './card_product_style';
import { api_url } from '../helper/api_url';
import { primaryColor } from '../helper/color';
import { fetch_url_post } from '../helper/function/common-function/fetch';
import { api_post_wishlist_ADD } from '../helper/api_url';
import { AuthContext } from '../helper/context/auth-context';

class CardProduct extends React.Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props)
        this.state = {
            wished: false,
            id_product: null
        }
    }

    addToMyWishlist = async () => {
        var url = api_post_wishlist_ADD + 'ADD';
        console.log("url");
        console.log(url);
        console.log(this.context.customer.id);
        console.log(this.state.id_product);
        var result = await fetch_url_post(url, {
            id_customer: this.context.customer.id,
            id_product: this.state.id_product
        });
        console.log(result);
        this.setState({
            wished: true
        })
    }

    removeToMyWishlist = () => {

    }


    Wishlist = () => {
        if (this.state.wished) {
            return (

                <Icon
                    type="font-awesome"
                    name="heart"
                    size={22}
                    color='red'
                    onPress={() => this.setState({
                        wished: false
                    })}
                />

            )
        } else {
            return (
                <Icon
                    type="font-awesome"
                    name="heart-o"
                    size={22}
                    color='grey'
                    onPress={() => this.addToMyWishlist()}
                />

            )
        }
    }

    componentDidMount() {
        this.setState({
            id_product: this.props.item.id
        })
    }

    render() {
        const { item, showDetail } = this.props
        return (
            <Card style={card_product_styles.card}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                    <Text style={card_product_styles.condition}>{item.condition}</Text>
                    {this.Wishlist()}
                </View>
                <TouchableOpacity onPress={() => showDetail(item)}>
                    <Image
                        PlaceholderContent={<ActivityIndicator color={primaryColor} style={{ backgroundColor: 'white', flex: 1, width: '100%' }} />}
                        style={card_product_styles.img_product}
                        source={{ uri: api_url + item.id_default_image + "-small_default" + "/" + item.link_rewrite.language + ".jpg" }}
                    />
                </TouchableOpacity>
                <Text style={card_product_styles.price}>€ {parseFloat(item.price).toFixed(2)} </Text>
                <Text
                    style={card_product_styles.name}
                    numberOfLines={2}
                    ellipsizeMode='tail'
                >
                    {item.name.language}
                </Text>
            </Card>
        );
    }
}

export default CardProduct;

{/* <DotsLoader color={primaryColor} betweenSpace={20} size={20} style={{ backgroundColor: 'white', flex: 1, width: '100%' }}/> */ }
{/* <ActivityIndicator color={primaryColor} style={{ backgroundColor: 'white', flex: 1, width: '100%' }} /> */ }