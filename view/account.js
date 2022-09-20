import React from 'react';
import { View, ScrollView, TextInput, FlatList, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Title } from 'react-native-paper';
import { Input, Button } from 'react-native-elements';

import { AuthContext } from '../helper/context/auth-context';
import { storeAdress, getAdress } from '../helper/storage/user-storage';
import account_styles from './style/account_style';
import { api_get_all_adress_by_id_customer_url, api_delete_adress_by_id_adress_url, api_edit_adress_by_id_adress_url } from '../helper/api_url';
import { fetch_url_get, fetch_url_post } from '../helper/function/common-function/fetch'
import AddAdress from './add_adress';
import { DotsLoader } from 'react-native-indicator';
import CardAdress from '../components/card_adress';
import { primaryColor } from '../helper/color' ;
import { Alert } from 'react-native';

class Account extends React.Component {

    static contextType = AuthContext;

    constructor(props){
        super(props);
        this.state = {
            customer: null,
            adress: null,
            isAdding: false,
            isLoading: false,
            adress_to_edit: null,
            edit_mode: false
        }
    }

    init_state = async () => {
        this.setState({
            isLoading: true,
        });
        await fetch_url_get(api_get_all_adress_by_id_customer_url + this.context.customer.id).then((data) => {
            this.setState({
                customer: this.context.customer,
                adress: data.response.address,
                isLoading: false,
            });
        });
        this.setState({
            isLoading: false,
        });
    }

    displayLoading = () => {
        if (this.state.isLoading) {
            return (
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <DotsLoader color={primaryColor} betweenSpace={20} size={20} />
                </View>
            )
        }
    }

    add_mode = () => {
        this.setState({
            isAdding: true,
        });
    }

    setLoadingTrue = () => {
        this.setState({
            isLoading: true,
        });
    }

    setLoadingFalse = () => {
        this.setState({
            isLoading: false,
        });
    }

    end_add_mode = async () => {
        this.setState({
            isLoading: true,
            isAdding: false,
        });
        await this.init_state();
        this.setState({
            isLoading: false,
            edit_mode: false,
            adress_to_edit: null
        });
    }

    delete_adress = async (id) => {
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
                            await fetch_url_get(api_delete_adress_by_id_adress_url + id).then(() => {
                                this.init_state();
                            });
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

    mode_edit_adress = async (adress) => {
        this.setState({
            edit_mode: true,
            adress_to_edit: adress,
            isAdding: true,
        });
    }

    edit_adress = async(adress, id) => {
        try{
            this.setState({
                isLoading: true,
            });
            await fetch_url_post(api_edit_adress_by_id_adress_url + id, adress).then((data) => {
                // console.log(data)
                this.end_add_mode();
            })
        }catch(e){

        }
    }

    displayAdress = () => {
        if(this.state.isAdding || !this.state.adress){
            return(
                <AddAdress 
                    edit_adress={this.edit_adress}
                    edit_mode={this.state.edit_mode} 
                    adress_to_edit={this.state.adress_to_edit}  
                    setLoadingFalse={this.setLoadingFalse} 
                    end_add={this.end_add_mode} 
                    setLoadingTrue={this.setLoadingTrue} 
                    isLoading={this.state.isLoading} 
                />
            );
        }else{
            if(!this.state.isLoading && this.state.adress){
                if(Array.isArray(this.state.adress)){
                    var adresses = this.state.adress;
                }else{
                    var adresses = [this.state.adress]
                }
                return(
                    <View style={{
                        flex: 1,
                        marginTop: 10,
                        paddingBottom: 10
                    }}>
                        <FlatList 
                            numColumns={1}
                            data={adresses}
                            renderItem={({item, index}) => {
                                return(
                                    <CardAdress 
                                        mode_edit_adress={this.mode_edit_adress} 
                                        delete_adress={this.delete_adress} 
                                        item={item} 
                                        index={index} 
                                    />
                                );
                            }}
                            keyExtractor={(item, index) => index}
                        />
                        <View style={{ height: 60, justifyContent: 'center', alignItems: 'center' }}>
                            <Button 
                                title="Ajouter Addresse" 
                                type="outline"
                                buttonStyle={{
                                    borderColor: primaryColor,
                                    borderWidth: 0.4,
                                    paddingHorizontal: '10%'
                                }}
                                onPress={() => {
                                    this.add_mode();
                                }}
                                titleStyle={{ color: primaryColor }}
                            />
                        </View>
                    </View>
                )
            }
        }
    }

    componentDidMount(){
        this.init_state();
    }

    render(){
        return(
            <View style={{ flex: 1, paddingHorizontal: '2%', paddingVertical: '2%', }}>
                {this.displayLoading()}
                {this.displayAdress()}
            </View>
        );
    }

}

export default Account;