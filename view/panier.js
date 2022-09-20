import React from 'react';

import { View ,ScrollView, Text, ActivityIndicator, FlatList, RefreshControl, Alert } from 'react-native';
import { Card, Button } from "react-native-elements";

import { AuthContext } from '../helper/context/auth-context';
import { api_url, api_delete_cart_url, api_get_nb_cart_url, api_get_adress_url, api_validate_cart_url, api_edit_cart_url } from '../helper/api_url';
import { fetch_url_get, fetch_url_post } from '../helper/function/common-function/fetch';
import { getAdress, storeAdress } from '../helper/storage/user-storage';
import  panier_styles  from './style/panier_styles';
import PanierList from '../components/panier_list';
import { primaryColor } from '../helper/color';

class Panier extends React.Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            guest: null,
            cartP: null,
            changeCart: null,
            customer: null,
            changeCart: 0,
            address: null,
            reload: 0,
            refresh: false,
            total_price: "0",
            isLoading: false,
            editLoading: false,
            edit_mode: false,
            cartP_tmp: null,
        }
    }

    async componentDidMount(){
        await this.set_user();
        await this.get_cart_nb();
        // this.reload_on_focus();
    }

    addQuantity = (i) => {
        this.tmp_edit("add", i);
    }

    dropQuantity = (i) => {
        this.tmp_edit("drop", i);
    }

    tmp_edit = (type, i) => {
        let dataTmp = this.state.cartP;
        if(type == "add"){
            dataTmp[i].quantity = parseInt(dataTmp[i].quantity) + 1
        }else{
            if(dataTmp[i].quantity > 1){
                dataTmp[i].quantity = parseInt(dataTmp[i].quantity) - 1
            }
        }this.setState({
            cartP: dataTmp,
        });
        setTimeout(() => {
            this.edit_cart();
            this.setState({
                cartP: dataTmp,
            });
            this.get_total_price();
        },1000)
    }

    set_user = async () => {
        await this.setState({
            guest: this.context.guest,
            customer: this.context.customer,
            isLoading: true,
        });
        await this.get_cart_nb();
        this.setState({
            cartP_tmp: this.state.cartP,
            isLoading: false
        });
    }

    delete_cart = async (idProduct, idAttribute) => {
        let data = {
            idProduct: idProduct,
            idAttribute: idAttribute,
            guest: this.state.guest,
        };
        var url_delete_cart = api_delete_cart_url(data);

        Alert.alert(
            "Supprimer vraiment?", 
            null, 
            [
                {
                    text: 'Oui',
                    onPress: async () => {
                        this.setState({
                            isLoading: true
                        });
                        try{
                            await fetch_url_get(url_delete_cart).then((json) => {
                                this.setChangeCart();
                                this.reload();
                            }).catch((error) => console.error(error));
                        }catch(e){
                            console.log(e)
                            this.setState({
                                isLoading: false
                            });
                        }
                    },
                    
                },
                {
                    text: 'Annuler'
                }
            ]
        )
    }

    get_cart_nb = async () => {
        this.setState({
            cartP: null,
            isLoading: true
        })
        if (this.state.customer != null) {
            var idCustomer = this.state.customer.id;
        } else {
            var idCustomer = 0;
        }
        let data = {
            idCustomer: idCustomer,
            guest: this.state.guest,
            defaultGroup: this.context.customer ? this.context.customer.id_default_group : 1
        };

        let url_cart = api_get_nb_cart_url(data);
        await fetch_url_get(url_cart).then((json) => {
            if(json != undefined){
                if(json.response){
                    this.setState({
                        cartP: json.response,
                        isLoading: false
                    });
                }else{
                    this.setState({
                        cartP: json,
                        isLoading: false
                    });
                }
            }
            // console.log(this.state.cartP)
            this.get_total_price();
        }).catch((error) => console.error(error));
    }

    get_adress = async () => {
        try {
            const value = await getAdress();
            if (value !== null) {
                this.setState({
                    address: value,
                })
            } else {
                if (this.state.customer != null) {
                    fetch_url_get(api_get_adress_url + this.state.customer.id_customer)
                        .then((json) => {
                            if (json.response != "no data") {
                                storeAdress(json.response);
                                this.setState({
                                    address: json.response,
                                });
                            } else {
                                Alert.alert(
                                  "Alerte",
                                  "Veuillez enregistrer un adresse!"
                                );
                            }
                        })
                        .catch((error) => console.error(error))
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    go_to_pay = () => {
        this.props.navigation.navigate('Paypal', {
            screen: 'Paypal'
        });
    }

    setChangeCart() {
        this.setState({
            changeCart: Math.random(),
        })
    }

    changeCustomer = (newData) => {
        this.setState({
            customer: newData,
        });
        this.reload();
    }

    reload = async () => {
        await this.get_cart_nb();
    }

    get_total_price = () => {
        if(this.state.cartP){
          var total = 0;
          var cart = [];
          console.log("state cartP");
          console.log(this.state.cartP);
          console.log("state cartP");

          if (Array.isArray(this.state.cartP)) {
            cart = this.state.cartP;
            console.log(" cart");
            console.log(this.state.cartP);
            console.log("cart");
          } else {
            cart = [this.state.cartP];
          }
          cart.forEach((item) => {
            var price = 0;
            var qtty = 0;
            console.log("item.default_price");
            console.log(item.default_price);
            console.log("item.default_price");
            if (item.spec_price != "0.000000") {
              price = parseFloat(item.spec_price);
              qtty = item.quantity;
            } else {
              price = parseFloat(item.default_price);
              qtty = item.quantity;
            }
            total = total + price * qtty;
          });
          console.log("total prix");
          console.log(total);
          console.log("total prix");
          this.setState({
            total_price: (Math.round(total * 100) / 100).toString(),
          });
        }
    }

    edit_cart = async () => {
        this.setState({
            isLoading: true
        });
        let data = {
            data: []
        };
        const id_cart = this.state.cartP[0].idCart;
        for(const item of this.state.cartP){
            let tmp = {
                id_product: item.id_product,
                id_product_attribute: item.id_product_attribute,
                quantity: item.quantity
            }
            data.data.push(tmp)
        }
        try{
            await fetch_url_post(api_edit_cart_url + id_cart, data).then(async (data) => {
                
                if(data && data.response){
                    if(data.response == "success"){
                        await this.get_cart_nb();
                    }else{
                        this.setState({
                            isLoading: false,
                        });
                        console.log('error')
                    }
                }else{
                    this.setState({
                        isLoading: false,
                    });
                }
            });
        }catch(e){
            console.error(e)
            this.setState({
                editLoading: false,
            });
        }
    }

    // display_edit_loading = () => {
    //     if(this.state.editLoading){
    //         return(
    //             <View style={{ position: "absolute", justifyContent: 'center', width: "100%", height: "100%" }}>
    //                 <ActivityIndicator style={{ paddingTop: 11 }} size="large" color={primaryColor} />
    //             </View>
    //         );
    //     }
    // }

    validateCart = async () => {
        if(this.context.customer){
            this.props.navigation.navigate('Order', {
                screen: 'Order',
                params: {
                    data: this.state.cartP,
                }
            })
        }else{
            this.props.navigation.navigate('Login')
        }
        // if (this.state.customer != null) {
        //     let data = {
        //         customer: this.state.customer,
        //         guest: this.state.guest
        //     }
        //     var url_validate_cart = api_validate_cart_url(data);
        //     fetch_url_get(url_validate_cart)
        //         .then((json) => {
        //             if (json.response == 'ok') {
        //                 // navigate to order page

        //             }
        //         })
        //         .catch((error) => console.error(error))
        // } else {
            
        // }
    }

    render(){
        console.log(this.state.cartP);
        if (this.state.cartP != null && this.state.cartP != 'no-data' && this.state.total_price != 0 && !this.state.isLoading) {
            global.statut = true
            var tplCart = <View style={panier_styles.view} >
                    <PanierList
                        delete_cart={this.delete_cart} 
                        cartP={this.state.cartP} 
                        refresh={this.state.refresh} 
                        reload={this.reload}
                        addQuantity={this.addQuantity}
                        dropQuantity={this.dropQuantity}
                    />
                    
                    <View style={panier_styles.button_view}>
                        <View style={panier_styles.view_total}>
                            <Text style={panier_styles.total_content}>Total</Text>
                            <Text style={[panier_styles.total_content, panier_styles.value_total]}>{this.state.total_price} €</Text>
                        </View>
                        <Button
                            onPress={() => {
                                this.validateCart();
                            }}
                            title={"Continuer"}
                            buttonStyle={panier_styles.button_style}
                        />
                    </View>
                    
                </View>
        } else if (this.state.cartP == 'no-data' || this.state.total_price == 0 && !this.state.isLoading) {
            global.statut = false
            var tplCart = <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}><Text style={{ width: '100%', textAlign: 'center' }}>Pas de panier</Text></View>;
        }
        else {
            var tplCart = <ActivityIndicator style={{ paddingTop: 11 }} size="large" color={primaryColor} />;
        }
        return (
            
            <View style={{ flexDirection: "column", flex: 1, alignContent: 'center', justifyContent: 'center' }}>
                {tplCart}
            </View>


        );
    }
}

export default Panier;