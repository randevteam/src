import React from 'react';
import { Text, TouchableOpacity, Image, Button } from 'react-native';
import { Card } from 'react-native-paper';

import card_search_styles from './style/search_list_style';
import { api_url } from '../helper/api_url';

class CardPromo extends React.Component{
    constructor(props) {
        super(props)
    }

    render(){
        const { item, showDetail } = this.props
            return(
                <Card style={ card_search_styles.card }>
                    {/* <Text style={card_search_styles.condition}>{item.condition}</Text> */}
                    <Text style={card_search_styles.condition}>Promo</Text>
                    <TouchableOpacity onPress={() => showDetail(item)}>
                        <Image style={card_search_styles.img_product}
                            source={{ uri: api_url + item.id_default_image + "/" + item.link_rewrite.language + ".jpg" }} />
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

export default CardPromo;