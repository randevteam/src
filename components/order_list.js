import React from 'react';

import { View ,ScrollView, Text, ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import  panier_styles  from '../view/style/panier_styles';
import OrderListItem from './order_list_item';
import panier_list_item_styles from './style/panier_list_item_styles';

class OrderList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            total: null,
            update: false
        }
    }

    render(){
        const { cartP, refresh, reload, delete_cart } = this.props
        return(
            <View style={panier_list_item_styles.view}>
                <FlatList
                    numColumns={1}
                    data={cartP}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.refresh}
                            onRefresh={() => {
                                this.props.reload();
                            }}
                        />
                    }
                    renderItem={({ item }) => (
                        <OrderListItem 
                            item={item} 
                            delete_cart={delete_cart}
                        />
                        
                    )}
                    keyExtractor={(item, index) => index}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        );
    }

}

export default OrderList;