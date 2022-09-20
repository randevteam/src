import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';

import { api_url } from '../helper/api_url';
import { primaryColor } from '../helper/color';
import order_list_item_styles from './style/order_list_item_styles';

class OrderListItem extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            item: this.props.item
        }
    }

    get_options = () => {
        let opt = this.state.item.optionsValueArr;
    }

    show_price = () => {
        if(this.state.item){
            var unit_price = 0;
            var qtty = this.state.item.quantity;
            var total_price = 0;
            if(this.state.item.spec_price){
                unit_price = (Math.round(this.state.item.spec_price * 100) /100);
            }else{
                unit_price = (Math.round(this.state.item.default_price * 100) /100);
            }

            total_price = unit_price * qtty;
            return(
                <View>
                    <Text style={order_list_item_styles.price}>
                        <Text style={order_list_item_styles.label_name}>Prix unitaire:</Text> { unit_price } € 
                    </Text>
                    <Text style={order_list_item_styles.price}>
                        <Text style={order_list_item_styles.label_name}>Total:</Text> { total_price } € 
                    </Text>
                </View>
            );
        }
    }

    componentDidMount(){
        this.get_options()
    }

    render(){
        const { delete_cart } = this.props
        return(
            <Card
                containerStyle={order_list_item_styles.constainerStyle}
                wrapperStyle={order_list_item_styles.wrapperStyle}
            >
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <View style={order_list_item_styles.view_content}>
                        <View style={order_list_item_styles.view_name}>
                            <Text style={order_list_item_styles.name}>
                                { this.state.item.product_name }
                            </Text>
                        </View>
                        <View style={order_list_item_styles.view_price}>
                            { this.show_price() }
                        </View>
                    </View>
                    <View style={order_list_item_styles.view_quantity_content}>
                        <View style={order_list_item_styles.quantity_view}>
                            <Text style={order_list_item_styles.quantity_content}>
                                { this.state.item.quantity }
                            </Text>
                        </View>
                    </View>
                </View>
            </Card>
        );
    }
}

export default OrderListItem;
