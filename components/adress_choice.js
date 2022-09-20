import React from 'react';
import { Button, Overlay, Divider } from "react-native-elements";
import { View, FlatList, Text } from 'react-native';

import CardAdressOrder from './card_order_adress';

class AdressChoice extends React.Component{
    constructor(props) {
        super(props);
    }

    go_to_account = () => {
        this.props.navigation.navigate('Account', {
            screen: 'Account'
        });
    }

    overlay_adress = () => {
        if(this.props.adress){
            // console.log(this.props.adress)
            return(
                <View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{ textTransform: 'uppercase', marginBottom: 5, fontWeight: 'bold' }}>Choisir Addresse de livraison:</Text>
                        <AdressList 
                            adress={this.props.adress}
                            id_adress={this.props.id_adress}
                            id_adress_invoice={this.props.id_adress_invoice}
                            set_adress_id={this.props.set_adress_id}
                            toggleAdress={this.props.toggleAdress}
                            same_adress={this.props.same_adress}
                            type="delivery"

                        />
                    </View>
                    <Divider style={{ marginTop: 20 }}/>
                    <View style={{ flex: 1, marginTop: 10, alignItems: 'center' }}>
                        <Text style={{ textTransform: 'uppercase', marginBottom: 5, fontWeight: 'bold' }}>Choisir Addresse de facturation:</Text>
                        <AdressList 
                            adress={this.props.adress}
                            id_adress={this.props.id_adress}
                            id_adress_invoice={this.props.id_adress_invoice}
                            set_adress_id={this.props.set_adress_id}
                            toggleAdress={this.props.toggleAdress}
                            same_adress={this.props.same_adress}
                            type="invoice"

                        />
                    </View>
                </View>
            );
        }else{
            return(
                <View>
                    <Text style={{ marginBottom: 10 }}>Vous n'avez aucune addresse</Text>
                    <Button 
                        title="Ajouter Addresse"
                        type="outline"
                        onPress={() => {
                            this.go_to_account();
                        }}
                    />
                </View>
            );
        }
    }
    
    render(){
        const { adress_visible, toggleAdress, adress, id_adress, id_adress_invoice, same_adress, set_adress_id } = this.props;
        return(
            <Overlay 
                isVisible={adress_visible}
                onBackdropPress={toggleAdress}
                overlayStyle={{
                    width: '90%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexShrink: 1,
                    height: 380
                }}
            >
                { this.overlay_adress() }
            </Overlay>
        );
    }
}

const AdressList = ({adress, id_adress, id_adress_invoice, set_adress_id, toggleAdress, same_adress, type}) => {
    return(
        <FlatList 
            numColumns={1}
            data={adress}
            keyExtractor={(item, index) => index}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            progressViewOffset={1}
            renderItem={({item, index}) => (
                <CardAdressOrder 
                    item={item}
                    index={index}
                    id_adress={id_adress}
                    id_adress_invoice={id_adress_invoice}
                    set_adress_id={set_adress_id}
                    toggleAdress={toggleAdress}
                    same_adress={same_adress}
                    type={type}
                />
            )}
        />
    );
}

export default AdressChoice;