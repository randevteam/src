import React from 'react';
import { View, FlatList, Text } from 'react-native';
import CardWishlist from './card_wishlist';

class Wishlister extends React.Component {

    constructor(props) {
        super(props)
    }

    showDetail = (data) => {
        this.props.navigation.navigate('DetailProduct', {
            screen: 'DetailProduct',
            params: { data: data.id }
        });
    }

    

    render() {
        if (Array.isArray(this.props.products)) {
            return (
                <View style={{ flex: 1 }}>
                    <FlatList
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        data={this.props.products}
                        renderItem={({ item }) => (
                            <CardWishlist
                                item={item}
                                showDetail={this.showDetail}
                            />
                        )}
                        keyExtractor={item => item.id}
                    />
                </View>
            );
        } else {
            var products = [];
            products.push(this.props.products);
            return (
                <View style={{ flex: 1 }}>
                    <FlatList
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        data={products}
                        renderItem={({ item }) => (
                            <CardSearch
                                item={item}
                                showDetail={this.showDetail}
                            />
                        )}
                        keyExtractor={item => item.id}
                    />
                </View>
            );
        }
    }
}
export default Wishlister