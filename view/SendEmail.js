import React from 'react';
import { View, ScrollView, Text, SafeAreaView, ImageBackground, StyleSheet, TextInput, Image, Button, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';

import { Card } from 'react-native-paper';
import { Color } from '../helper/color';

import { fetch_url_post } from '../helper/function/common-function/fetch';
import { api_send_email } from '../helper/api_url';

import { AuthContext } from '../helper/context/auth-context';
import { storeCustomer } from '../helper/storage/user-storage';


class SendEmail extends React.Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            nom: null,
            prenom: null,
            email: null,
            message: "",

            error_nom: null,
            error_prenom: null,
            error_email: null,
            error_message: null,
        }
    }

    envoyer = async () => {
        let valide = await this.validate_form();
        console.log(valide)
        if(valide){
            let body = {
                nom: this.state.nom,
                prenom: this.state.prenom,
                email: this.state.email,
                message: this.state.message
            }
            try{                
                let envoi = await fetch_url_post(api_send_email, body);
                console.log("register=",envoi);
                if(envoi){
                    alert("Message envoyé")
                }else{
                    alert("Erreur d'envoi")
                }
            }catch(e){
                alert("Erreur sur l'api d'envoi email")
            }
        }
    }


    validate_form = async () => {
        let succes = true;

        await this.setState({
            error_nom: null,
            error_prenom: null,
            error_email: null,
            error_message: null,
        });

        if(!this.state.nom || this.state.nom == ""){
            succes = false;
            this.setState({
                error_nom: 'Champs réquis'
            });
        }

        if(!this.state.prenom || this.state.prenom == ""){
            succes = false;
            this.setState({
                error_prenom: 'Champs réquis'
            });
        }

        if(this.state.email && this.state.email != ""){
            let valide_email = "^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
            if(!this.state.email.match(valide_email)){
                succes = false;
                this.setState({
                    error_email: 'Email forme invalide'
                });
            }
        }else{
            succes = false;
            this.setState({
                error_email: 'Champs réquis'
            });
        }

        // if(this.state.message && this.state.message != ""){
        //         succes = false;
        //         this.setState({
        //             error_message: 'Champs réquis'
        //         });
        // }

        return succes;
    }

    render(){
        
        return(
            <ScrollView
                horizontal={ false}
                showsVerticalScrollIndicator={true}
                >
            <SafeAreaView style={styles.container}>
                <View style={{ backgroundColor: Color, flex: 1, paddingHorizontal: 10}}>

                    <View style={styles.container}>
                        <Card style={styles.card}>
                            <Text style={styles.signupTitle} onPress={() => this.props.navigation.goBack()}>retour</Text>
                            <Text style={styles.signupTitle}>Envoyer Email</Text>

                            <Input style = {styles.input}
                                underlineColorAndroid = "transparent"
                                placeholder = "Nom"
                                placeholderTextColor = "grey"
                                autoCapitalize = "none"
                                onChangeText={(value) =>{this.setState({nom:value})}}
                                value={this.state.nom}
                                errorMessage={this.state.error_nom}
                            />

                            <Input style = {styles.input}
                                underlineColorAndroid = "transparent"
                                placeholder = "Prénom"
                                placeholderTextColor = "grey"
                                autoCapitalize = "none"
                                onChangeText={(value) =>{this.setState({prenom:value})}}
                                value={this.state.prenom}
                                errorMessage={this.state.error_prenom}
                            />

                            <Input style = {styles.input}
                                underlineColorAndroid = "transparent"
                                placeholder = "Votre email"
                                placeholderTextColor = "grey"
                                autoCapitalize = "none"
                                onChangeText={(value) =>{this.setState({email:value})}}
                                value={this.state.email}
                                errorMessage={this.state.error_email}
                            />
                    
                            <TextInput style = {styles.inputText}
                                multiline
                                numberOfLines={10}
                                underlineColorAndroid = "transparent"
                                placeholder = "Votre message"
                                placeholderTextColor = "grey"
                                autoCapitalize = "none"
                                onChangeText={(value) =>{this.setState({message:value})}}
                                value={this.state.message}
                                errorMessage={this.state.error_message}
                            />  

                            <Button style={styles.loginButton}
                                
                                title="Envoyer"
                                color="darkgreen"
                                onPress={() => 
                                    this.envoyer()
                                }
                            />
                        </Card>
                    </View>
                </View>
            </SafeAreaView>
            </ScrollView>



        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },

    input: {
        width: 'auto',
        color: 'black',
        fontSize: 16,
        // height: 44,
        // paddingLeft: 10,
        // marginVertical: 10,
        // paddingLeft : 15,
        // marginLeft: 4,
        // marginRight: 4
    },
    inputText: {
        width: 'auto',
        color: 'black',
        fontSize: 16,
        textAlignVertical: 'top',
    },

    card : {
        color: 'black',
        padding: 20
    },

    signupTitle : {
        textAlign:'left', 
        fontWeight:'bold',
        fontSize : 20, 
        color:'black', 
        padding: 10
    }

});

export default SendEmail;