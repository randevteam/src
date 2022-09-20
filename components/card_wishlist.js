import React from 'react';
import { Text, TouchableOpacity, Image, Button } from 'react-native';
import { Card } from 'react-native-paper';

import card_search_styles from './style/search_list_style';
import { api_url } from '../helper/api_url';

import FastImage from 'react-native-fast-image2'

class CardWishlist extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            imageurl: api_url + this.props.item.id_default_image + "-medium_default" + "/" + this.props.item.link_rewrite.language + ".jpg"
        }
    }

    async componentDidMount() {
        Image.prefetch(this.state.imageurl)
        
    }

    render() {
        const { item, showDetail } = this.props
        return (
            <Card style={card_search_styles.card}>
                {/* <Text style={card_search_styles.condition}>{item.condition}</Text> */}
                <TouchableOpacity onPress={() => showDetail(item)}>
                    <Image style={card_search_styles.img_product}
                        source={{
                            uri: this.state.imageurl
                        }}
                    />
                </TouchableOpacity>
                <Text style={card_search_styles.price}>€ {parseFloat(item.price).toFixed(2)} </Text>
                <Text
                    style={card_search_styles.name}
                    numberOfLines={2}
                    ellipsizeMode='tail'
                >
                    {item.name.language}
                </Text>
            </Card>
        );
    }
}

export default CardWishlist;