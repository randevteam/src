import React from 'react';

import { View ,ScrollView, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';

import profile_styles from './style/profile_styles';
import { AuthContext } from '../helper/context/auth-context';
import info_styles from './style/information_style';
import { primaryColor } from '../helper/color'
import { api_edit_customer_url,  } from '../helper/api_url';
import { storeCustomer } from '../helper/storage/user-storage';
import { fetch_url_post } from '../helper/function/common-function/fetch';

class Information extends React.Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props)
        this.state = {
            customer: null,
            passwd: null,
            new_passwd: null,
            firstname: null,
            lastname: null,
            email: null,
            birthday: null,
            error: {
                passwd: null,
                new_passwd: null,
                firstname: null,
                lastname: null,
                email: null,
                birthday: null,
            },
            isLoading: false
        }
    }

    edit_info = async () => {
        this.setState({
            isLoading: true,
        });
        var birthday;
        if(this.state.birthday && this.state.birthday != ""){
            if(this.form_validation(this.state.birthday)){
                birthday = this.state.birthday;
                await this.edit_process(birthday);
            }else{
                this.setState({
                    error: {
                        birthday: "Forme invalide (ex: 0000-00-00)"
                    },
                    isLoading: false
                })
            }
        }else{
            birthday = "0000-00-00";
            await this.edit_process(birthday);
        }
    }

    edit_process = async (birthday) => {
        let body = {
            "firstname": this.state.firstname,
            "lastname": this.state.lastname,
            "email": this.state.email,
            "passwd": this.state.passwd,
            "new_passwd": this.state.new_passwd ? this.state.new_passwd : "",
            "birthday": birthday
        }
        console.log(api_edit_customer_url + this.state.customer.id, body)
        await fetch_url_post(api_edit_customer_url + this.state.customer.id, body).then(async (data) => {
            this.setState({
                isLoading: false
            });
            // console.log(data)
            if(data.response){
                if(data.response == 'error'){
                    this.setState({
                        isLoading: false,
                        error: {
                            passwd: "Veuillez remplir le champs mot de passe"
                        }
                    });
                }else if(data.response && data.response == 'error password'){
                    this.setState({
                        isLoading: false,
                        error: {
                            passwd: "Mot de passe invalide"
                        }
                    });
                }else{
                    this.setState({
                        isLoading: false,
                    });
                    this.context.customer = data.response.customer;
                    await storeCustomer(data.response.customer);
                    this.init_customer();
                    alert('Information mise à jour');
                }
            }else{
                this.setState({
                    isLoading: false,
                });
                alert('Une erreur s\'est produite, Veuillez réessayer');
            }
        }); 
    }

    form_validation = (data) => {
        var birthday_valid = "^[0-9]{4}-[0-9]{2}-[0-9]{2}$";
        if(data.match(birthday_valid)){
            return true;
        }else{
            return false;
        }
    }

    display_button = () => {
        if(this.state.isLoading){
            return(
                <ActivityIndicator 
                    color={primaryColor}
                    size={40}
                />
            );
        }else{
            return(
                <Button
                    buttonStyle={info_styles.buttonStyle}
                    type="outline"
                    title="Enregistrer"
                    titleStyle={info_styles.title_button}
                    onPress={() => {
                        this.edit_info();
                    }}
                />
            );
        }
    }

    profile = () => {
        return(
            <View style={{ flex: 1, paddingTop: '5%' }}>
                <ScrollView style={{ flex: 1}}>
                    <View style={info_styles.input_container}>
                        <Input 
                            style={info_styles.input_text}
                            label="Prénom"
                            labelStyle={info_styles.label}
                            value={this.state.customer && this.state.firstname == null ? this.state.customer.firstname : this.state.firstname}
                            onChangeText={(value) => {
                                this.setState({
                                    firstname: value
                                });
                            }}
                        />
                    </View>
                    <View style={info_styles.input_container}>
                        <Input 
                            style={info_styles.input_text}
                            label="Nom"
                            labelStyle={info_styles.label}
                            value={this.state.customer && this.state.lastname == null ? this.state.customer.lastname : this.state.lastname}
                            onChangeText={(value) => {
                                this.setState({
                                    lastname: value
                                });
                            }}
                        />
                    </View>
                    <View style={info_styles.input_container}>
                        <Input 
                            style={info_styles.input_text}
                            label="Email"
                            labelStyle={info_styles.label}
                            value={this.state.customer && this.state.email == null ? this.state.customer.email : this.state.email}
                            onChangeText={(value) => {
                                this.setState({
                                    email: value
                                });
                            }}
                            disabled
                        />
                    </View>
                    <View style={info_styles.input_container}>
                        <Input 
                            style={info_styles.input_text}
                            label="Mot de passe"
                            labelStyle={info_styles.label}
                            value={this.state.passwd}
                            secureTextEntry = {true}
                            onChangeText={(value) => {
                                this.setState({
                                    passwd: value
                                });
                            }}
                            errorMessage={this.state.error.passwd}
                        />
                    </View>
                    <View style={info_styles.input_container}>
                        <Input 
                            style={info_styles.input_text}
                            label="Nouveau mot de passe"
                            labelStyle={info_styles.label}
                            value={this.state.new_passwd}
                            secureTextEntry = {true}
                            onChangeText={(value) => {
                                this.setState({
                                    new_passwd: value
                                });
                            }}
                            errorMessage={this.state.error.new_passwd}
                        />
                    </View>
                    <View style={info_styles.input_container}>
                        <Input 
                            style={info_styles.input_text}
                            label={() => {
                                return(
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ color: '#000000', fontWeight: 'bold' }}>Anniversaire</Text>
                                        <Text style={{ color: '#000000' }}> *(facultatif)</Text>
                                    </View>
                                )
                            }}
                            labelStyle={info_styles.label}
                            placeholder="(ex: AAAA-MM-JJ)"
                            value={this.state.customer && this.state.customer.birthday != '0000-00-00' && this.state.birthday == null ? this.state.customer.birthday : this.state.birthday}
                            onChangeText={(value) => {
                                this.setState({
                                    birthday: value
                                });
                            }}
                            errorMessage={this.state.error.birthday}
                            renderErrorMessage={false}
                        />
                    </View>
                    <View style={info_styles.input_button_container}>
                        { this.display_button() }
                    </View>
                </ScrollView>
            </View>
        );
    }

    displayProfile = () => {
        if(this.context.customer){
            return this.profile();
        }
    }

    init_customer = () => {
        this.setState({
            customer: this.context.customer,
            firstname: this.context.customer.firstname,
            lastname: this.context.customer.lastname,
            email: this.context.customer.email,
            birthday: this.context.customer.birthday && this.context.customer.birthday != "0000-00-00" ? this.context.customer.birthday : null,
        });
    }

    componentDidMount(){
        this.init_customer();
    }

    render(){
        return(
            <View style={profile_styles.container}>
                { this.displayProfile() }
            </View>
        );
    }
}

export default Information;