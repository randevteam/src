import React from 'react';
import { Text, TouchableOpacity, Button, ActivityIndicator, View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { DotsLoader } from 'react-native-indicator';

import card_adress_styles from './style/card_adress_styles';
import { primaryColor } from '../helper/color';

class CardAdress extends React.Component{
    constructor(props) {
        super(props)
    }

    get_alias = (item) => {
        if(item.alias){
            return <Text style={card_adress_styles.fieldset}>{item.alias}</Text>
        }else{
            return <Text style={card_adress_styles.fieldset}>Addresse {index + 1}</Text>
        }
    }

    render(){
        const { item, index } = this.props;
        return(
            <View style={card_adress_styles.view}>
                {this.get_alias(item)}
                <View style={card_adress_styles.info_container}>
                    <View style={card_adress_styles.name_container}>
                        <Text style={card_adress_styles.name_text}>Destinataire :</Text>
                        <View  style={card_adress_styles.text_style}>
                            <Text style={card_adress_styles.name_text}>{ item.firstname }</Text>
                            <Text style={card_adress_styles.name_text}>{ item.lastname }</Text>
                        </View>
                    </View>
                    <View style={card_adress_styles.name_container}>
                        <Text style={card_adress_styles.name_text}>Addresse :</Text>
                        <View  style={card_adress_styles.text_style}>
                            <Text style={card_adress_styles.name_text}>{ item.address1 }</Text>
                        </View>
                    </View>
                    <View style={card_adress_styles.name_container}>
                        <Text style={card_adress_styles.name_text}>Ville :</Text>
                        <View  style={card_adress_styles.text_style}>
                            <Text style={card_adress_styles.name_text}>{ item.city }, </Text>
                            <Text style={card_adress_styles.name_text}>{ item.postcode }</Text>
                        </View>
                    </View>
                    <View style={card_adress_styles.name_container}>
                        <Text style={card_adress_styles.name_text}>Pays :</Text>
                        <View  style={card_adress_styles.text_style}>
                            <Text style={card_adress_styles.name_text}>{ item.country } </Text>
                        </View>
                    </View>
                    <View style={card_adress_styles.name_container}>
                        <Text style={card_adress_styles.name_text}>Téléphone :</Text>
                        <View  style={card_adress_styles.text_style}>
                            <Text style={card_adress_styles.name_text}>{ item.phone == "null" ? "aucun numero": item.phone} </Text>
                        </View>
                    </View>
                </View>
                <View style={ card_adress_styles.button_container }>
                    <Icon 
                        type="font-awesome"
                        name="edit"
                        color="#056C86"
                        onPress={() => {
                            this.props.mode_edit_adress(item);
                        }}
                    />
                    <Icon 
                        type="font-awesome"
                        name="trash"
                        color="#A80101"
                        onPress={() => {
                            this.props.delete_adress(item.id);
                        }}
                    />
                </View>
            </View>
        );
    }
}

export default CardAdress;
