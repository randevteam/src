import React from 'react';
import { Text, TouchableOpacity, Button, ActivityIndicator, View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { DotsLoader } from 'react-native-indicator';
import { RadioButton, Badge } from 'react-native-paper';

import card_adress_order_styles from './style/card_adress_order_styles';

class CardAdressOrder extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            selected_adress: {
                title: card_adress_order_styles.fieldset,
                content: card_adress_order_styles.view
            },
            id_adress: null,
            id_adress_invoice: null,
            item: null,
            selected: false
        }
    }

    get_alias = (item) => {
        if(item && item.alias){
            return <Text numberOfLines={1} style={this.state.selected_adress.title}>{item.alias}</Text>
        }else{
            return <Text numberOfLines={1} style={this.state.selected_adress.title}>Addresse {this.props.index + 1}</Text>
        }
    }

    get_selected = async () => {
        // type delivery
        if(this.props.id_adress && this.props.type == "delivery"){
            if(this.props.item.id == this.props.id_adress){
                await this.setState({
                    selected_adress: {
                        title: card_adress_order_styles.fieldset_selected,
                        content: card_adress_order_styles.view_selected
                    },
                    selected: true
                });
            }else{
                await this.setState({
                    selected_adress: {
                        title: card_adress_order_styles.fieldset,
                        content: card_adress_order_styles.view
                    },
                    selected: false
                });
            }
        }
        // type invoice
        if(this.props.id_adress_invoice && this.props.type == "invoice"){
            if(this.props.item.id == this.props.id_adress_invoice){
                await this.setState({
                    selected_adress: {
                        title: card_adress_order_styles.fieldset_selected,
                        content: card_adress_order_styles.view_selected
                    },
                    selected: true
                });
            }else{
                await this.setState({
                    selected_adress: {
                        title: card_adress_order_styles.fieldset,
                        content: card_adress_order_styles.view
                    },
                    selected: false
                });
            }
        }

    }

    show_checked = () => {
        if(this.state.selected){
            return(
                <Badge 
                    style={{ 
                        position: 'absolute',
                        top: -7,
                        right: 5, 
                        backgroundColor: '#37DF0D'
                    }}
                    size={17}
                >
                    <Text style={{ color: "#FFFFFF", fontSize: 11, fontWeight: 'bold' }}>&#10003;</Text>
                </Badge>
            );
        }
    }

    get_adress_id = () => {
        this.setState({
            item: this.props.item
        });
    }

    async componentDidUpdate(prevProps){
        if(prevProps != this.props){
            await this.get_adress_id();
            await this.get_selected();
        }
    }

    async componentDidMount(){
        await this.get_adress_id();
        await this.get_selected();
    }

    render(){
        const { item, index, id_adress, id_adress_invoice, set_adress_id } = this.props;
        if(this.state.item){
            return(
                <TouchableOpacity 
                    style={this.state.selected_adress.content}
                    onPress={() => {
                        if(this.props.type && this.props.type == "delivery"){
                            set_adress_id({
                                id_adress: item.id,
                                id_adress_invoice: id_adress_invoice,
                                id_zone: item.id_zone_country
                            });
                        }

                        if(this.props.type && this.props.type == "invoice"){
                            set_adress_id({
                                type: this.props.type,
                                id_adress: id_adress,
                                id_adress_invoice: item.id,
                                id_zone: item.id_zone_country
                            });
                        }
                    }}
                >
                    {this.get_alias(this.state.item)}
                    {this.show_checked()}
                    <View style={card_adress_order_styles.info_container}>
                        <View style={card_adress_order_styles.name_container}>
                            <Text style={card_adress_order_styles.name_text}>Destinataire :</Text>
                            <View  style={card_adress_order_styles.text_style}>
                                <Text style={card_adress_order_styles.name_text}>{ this.state.item.firstname ? this.state.item.firstname  : '' }</Text>
                                <Text style={card_adress_order_styles.name_text}>{ this.state.item.lastname  ? this.state.item.lastname  : '' }</Text>
                            </View>
                        </View>
                        <View style={card_adress_order_styles.name_container}>
                            <Text style={card_adress_order_styles.name_text}>Addresse :</Text>
                            <View  style={card_adress_order_styles.text_style}>
                                <Text style={card_adress_order_styles.name_text}>{ this.state.item.address1  ? this.state.item.address1  : '' }</Text>
                            </View>
                        </View>
                        <View style={card_adress_order_styles.name_container}>
                            <Text style={card_adress_order_styles.name_text}>Ville :</Text>
                            <View  style={card_adress_order_styles.text_style}>
                                <Text style={card_adress_order_styles.name_text}>{ this.state.item.city  ? this.state.item.city  : '' }, </Text>
                                <Text style={card_adress_order_styles.name_text}>{ this.state.item.postcode  ? this.state.item.postcode  : '' }</Text>
                            </View>
                        </View>
                        <View style={card_adress_order_styles.name_container}>
                            <Text style={card_adress_order_styles.name_text}>Pays :</Text>
                            <View  style={card_adress_order_styles.text_style}>
                                <Text style={card_adress_order_styles.name_text}>{ this.state.item.country  ? this.state.item.country  : '' } </Text>
                            </View>
                        </View>
                        <View style={card_adress_order_styles.name_container}>
                            <Text style={card_adress_order_styles.name_text}>Téléphone :</Text>
                            <View  style={card_adress_order_styles.text_style}>
                                <Text style={card_adress_order_styles.name_text}>{ this.state.item.phone && this.state.item.phone == "null" ? "aucun numero": this.state.item.phone} </Text>
                            </View>
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

export default CardAdressOrder;
