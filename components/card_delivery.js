import React from 'react';
import { Text, TouchableOpacity, Button, ActivityIndicator, View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { DotsLoader } from 'react-native-indicator';
import { RadioButton, Badge } from 'react-native-paper';

import card_delivery_styles from './style/card_delivery_styles';

class CardDelivery extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            selected_adress: {
                title: card_delivery_styles.fieldset,
                content: card_delivery_styles.view
            },
            selected_index: null,
            selected_delivery: null,
            delivery: null,
            carrier: null,
            selected: false
        }
    }

    get_selected = async () => {
        // type delivery
        if(this.props.delivery.id == this.props.selected_delivery){
            await this.setState({
                selected_adress: {
                    title: card_delivery_styles.fieldset_selected,
                    content: card_delivery_styles.view_selected
                },
                selected: true
            });
        }else{
            await this.setState({
                selected_adress: {
                    title: card_delivery_styles.fieldset,
                    content: card_delivery_styles.view
                },
                selected: false
            });
        }

    }

    show_checked = () => {
        if(this.state.selected){
            return(
                <Badge 
                    style={{ 
                        position: 'absolute',
                        top: '10%',
                        right: 5, 
                        backgroundColor: '#37DF0D'
                    }}
                    size={35}
                >
                    <Text style={{ color: "#FFFFFF", fontSize: 25, fontWeight: 'bold' }}>&#10003;</Text>
                </Badge>
            );
        }
    }

    get_delivery_id = () => {
        this.setState({
            delivery: this.props.delivery,
            carrier: this.props.carrier
        });
    }

    show_price_deliver = () => {
        if(this.state.delivery.price){
            let price = (Math.round(this.state.delivery.price *100)/100).toString();
            if(price > 0 ){
                return(
                    <Text style={card_delivery_styles.name_price}>{ price } €</Text>
                );
            }else{
                return(
                    <Text style={card_delivery_styles.name_text}>Livraison gratuit</Text>
                );
            }
        }
    }

    async componentDidUpdate(prevProps){
        if(prevProps != this.props){
            await this.get_delivery_id();
            await this.get_selected();
        }
    }

    async componentDidMount(){
        await this.get_delivery_id();
        await this.get_selected();
    }

    render(){
        const { delivery, index, set_delivery_id } = this.props;
        if(this.state.delivery){
            return(
                <TouchableOpacity 
                    style={this.state.selected_adress.content}
                    onPress={() => {
                        set_delivery_id({
                            selected_delivery: delivery.id,
                            selected_index: index,
                        });
                    }}
                >
                    {this.show_checked()}
                    <View style={card_delivery_styles.info_container}>
                        <View style={card_delivery_styles.name_container}>
                            <Text style={card_delivery_styles.name_carrier}>{ this.state.carrier.name ? this.state.carrier.name  : '' }</Text>
                        </View>
                        <View style={card_delivery_styles.name_container}>
                            <Text style={card_delivery_styles.name_text}>{ this.state.carrier.delay ? this.state.carrier.delay.language  : '' }</Text>
                        </View>
                        <View style={card_delivery_styles.name_container}>
                            { this.show_price_deliver() }
                        </View>
                    </View>
                </TouchableOpacity>
            );
        }else{
            return(
                <View></View>
            )
        }
    }
}

export default CardDelivery;
