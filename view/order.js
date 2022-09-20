import React from 'react';
import { Text, TouchableOpacity, ActivityIndicator, View, Flatlist } from 'react-native';
import OrderList from '../components/order_list';
import  order_styles  from './style/order_styles';
import { Button } from "react-native-elements";
import home_styles from './style/home_style';
import { primaryColor } from '../helper/color';
import { AuthContext } from '../helper/context/auth-context';
import { storeAdress, getAdress, storeAdressFacturation, getAdressFacturation, removeAdress } from '../helper/storage/user-storage';
import { fetch_url_get } from '../helper/function/common-function/fetch';
import { api_get_all_adress_by_id_customer_url } from '../helper/api_url';

import AdressChoice from '../components/adress_choice';

class Order extends React.Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            total_price: "0",
            adress: null,
            id_adress: null,
            id_adress_invoice: null,
            id_adress_zone: null,
            same_adress: true,
            adress_visible: false,
            id_zone: null,
        }
    }

    go_to_pay = () => {
        this.props.navigation.navigate('Paypal', {
            screen: 'Paypal',
            params: {
                price: '1000'
            }
        });
    }

    go_to_delivery_choice = () => {
        this.props.navigation.navigate('Delivery', {
            screen: 'Delivery',
            params: {
                data: {
                    product: this.state.data,
                    id_zone: this.state.id_zone,
                }
            }
        })
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

    get_adress_id = async () => {
        let adress = await fetch_url_get(api_get_all_adress_by_id_customer_url + this.context.customer.id);
        if(adress && adress.response != "no data"){
            let adress_tmp = [];
            if(Array.isArray(adress.response.address)){
                adress_tmp = adress.response.address;
            }else{
                adress_tmp = [adress.response.address];
            }
            // console.log(adress_tmp)
            this.setState({
                id_adress: adress_tmp[0].id,
                id_adress_invoice: adress_tmp[0].id,
                id_zone: adress_tmp[0].id_zone_country,
                adress: adress_tmp
            });
        }
    }

    toggleAdress = () => {
        this.setState({
            adress_visible: !this.state.adress_visible
        });
    }

    set_adress_id = async (data) => {
        await this.setState({
            id_adress: data.id_adress,
            id_adress_invoice: data.id_adress_invoice,
            id_zone: data.id_zone
        })
    }


    async componentDidMount(){
        await this.get_adress_id();
        await this.setState({
            data: this.props.route.params.data
        });
        await this.get_total_price();   
    }

    render(){
        if (this.state.data != null && this.state.data != 'no-data') {
            var tplCart = <View style={order_styles.view} >
                    <OrderList cartP={this.state.data}/>
                    <AdressChoice 
                        adress={this.state.adress} 
                        id_adress={this.state.id_adress}
                        id_adress_invoice={this.state.id_adress_invoice}
                        same_adress={this.state.same_adress}
                        adress_visible={this.state.adress_visible}
                        toggleAdress={this.toggleAdress}
                        set_adress_id={this.set_adress_id}
                        navigation={this.props.navigation}
                    />
                    <View style={order_styles.adress_choice_button_view}>
                        <Text 
                            style={order_styles.adress_choice_button_text}
                            onPress={() => {
                                this.toggleAdress();
                            }}
                        >
                            Choix d'adresse
                        </Text>
                    </View>
                    <View style={order_styles.button_view}>
                        <View style={order_styles.view_total}>
                            <Text style={order_styles.total_content}>Total</Text>
                            <Text style={[order_styles.total_content, order_styles.value_total]}>{ this.state.total_price } €</Text>
                        </View>
                        <Button
                            onPress={() => {
                                this.go_to_delivery_choice();
                            }}
                            title={"Continuer"}
                            buttonStyle={order_styles.button_style}
                        />
                    </View>
                    
                </View>
        } else if (this.state.cartP == 'no-data') {
            var tplCart = <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Pas de panier</Text></View>;
        }
        else {
            var tplCart = <ActivityIndicator style={{ paddingTop: 11 }} size="large" color={primaryColor} />;
        }
        return(
            <View style={{ flexDirection: "column", flex: 1, alignContent: 'center', justifyContent: 'center' }}>
                <View style={home_styles.title_view}>
                    <Text style={home_styles.title_text}>Vos commandes</Text>
                </View>
                {tplCart}   
            </View>
        );
    }

}

export default Order;