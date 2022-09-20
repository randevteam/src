import React from 'react';
import { Text, TouchableOpacity, ActivityIndicator, View, Flatlist } from 'react-native';
import OrderList from '../components/order_list';
import  order_styles  from './style/order_styles';
import { Button } from "react-native-elements";
import home_styles from './style/home_style';
import { primaryColor } from '../helper/color';
import { AuthContext } from '../helper/context/auth-context';
import { fetch_url_get, fetch_url_post } from '../helper/function/common-function/fetch';
import { api_get_all_delivery_url } from '../helper/api_url';

import DeliveryChoice from '../components/delivery_choice';

class Delivery extends React.Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            total_price: "0",
            livraison_price: 0,
            delivery: null,
            carrier: null,
            id_zone: null,
            selected_delivery: null,
            selected_index: null,
        }
    }

    go_to_pay = () => {
        this.props.navigation.navigate('Paypal', {
            screen: 'Paypal',
            params: {
                price: this.state.total_price
            }
        });
    }

    get_total_price = () => {
        if(this.state.data){
            var total = 0;
            var cart = [];
            if(Array.isArray(this.state.data)){
                cart = this.state.data;
            }else{
                cart = [this.state.data];
            }
            cart.forEach(item => {
                var price = 0;
                var qtty = 0
                if(item.spec_price != "null"){
                    price = parseFloat(item.spec_price);
                    qtty = item.quantity;
                }else{
                    price = parseFloat(item.default_price);
                    qtty = item.quantity;
                }
                total = total + (price * qtty);
            });
            this.setState({
                total_price: (Math.round(total *100)/100).toString()
            });
        }
    }

    get_all_delivery = async () => {
        let data = {
            "id_zone": this.state.id_zone,
            "price": this.state.total_price,
            "weight" : 0
        }
        let result = await fetch_url_post(api_get_all_delivery_url, data);
        var delivery;
        var carrier;
        if(result && result.carrier){
            if(Array.isArray(result.carrier)){
                carrier = result.carrier;
            }else{
                carrier = [result.carrier];
            }
        }

        if(result && result.delivery){
            if(Array.isArray(result.delivery)){
                delivery = result.delivery;
            }else{
                delivery = [result.delivery];
            }
        }
        await this.setState({
            carrier: carrier,
            delivery: delivery,
            selected_delivery: delivery[0].id,
            selected_index: 0
        });

        await this.calcul_price_depend_delivery();
    }

    calcul_price_depend_delivery = async () => {
        let price = (Math.round(this.state.delivery[this.state.selected_index].price *100)/100).toString();
        await this.setState({
            total_price: parseFloat(this.state.total_price) + parseFloat(price),
            livraison_price: price,
        });
    }

    set_delivery_id = async (data) => {
        await this.setState({
            selected_index: data.selected_index,
            selected_delivery: data.selected_delivery
        });
    }


    async componentDidMount(){
        await this.setState({
            data: this.props.route.params.data.product,
            id_zone: this.props.route.params.data.id_zone
        });
        await this.get_total_price();  
        await this.get_all_delivery(); 
    }

    render(){
        if (this.state.data != null && this.state.data != 'no-data') {
            var tplCart = <View style={order_styles.view} >
                    <DeliveryChoice 
                        carrier={this.state.carrier}
                        delivery={this.state.delivery}
                        set_delivery_id={this.set_delivery_id}
                        navigation={this.props.navigation}
                        selected_delivery={this.state.selected_delivery}
                        selected_index={this.state.selected_index}
                    />
                    <View style={order_styles.button_view}>
                        <View style={order_styles.view_total}>
                            <Text style={order_styles.total_content}>Livraison</Text>
                            <Text style={[order_styles.total_content, order_styles.value_total]}>{ this.state.livraison_price } €</Text>
                        </View>
                        <View style={order_styles.view_total}>
                            <Text style={order_styles.total_content}>Total</Text>
                            <Text style={[order_styles.total_content, order_styles.value_total]}>{ this.state.total_price } €</Text>
                        </View>
                        <Button
                            onPress={() => {
                                this.go_to_pay();
                            }}
                            title={"Payer"}
                            buttonStyle={order_styles.button_style}
                        />
                    </View>
                    
                </View>
        } else if (this.state.cartP == 'no-data') {
            var tplCart = <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Aucun transport disponible</Text></View>;
        }
        else {
            var tplCart = <ActivityIndicator style={{ paddingTop: 11 }} size="large" color={primaryColor} />;
        }
        return(
            <View style={{ flexDirection: "column", flex: 1, alignContent: 'center', justifyContent: 'center' }}>
                {tplCart}   
            </View>
        );
    }

}

export default Delivery;