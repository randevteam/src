import React from 'react';
import { View, ScrollView, Text, SafeAreaView, ImageBackground, StyleSheet, TextInput, Image, Button, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';

import { Card } from 'react-native-paper';
import { Color } from '../helper/color';

import { fetch_url_post, fetch_url_get } from '../helper/function/common-function/fetch';
import { api_register_url, api_login_url } from '../helper/api_url';

import { AuthContext } from '../helper/context/auth-context';
import { storeCustomer } from '../helper/storage/user-storage';
import SelectDropdown from 'react-native-select-dropdown'

class SignUp extends React.Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            // nom: null,
            // prenom: null,
            email: null,
            password: null,
            new_password: null,
            gender: "1",

            error_nom: null,
            error_prenom: null,
            error_email: null,
            error_password: null,
            error_new_password: null,
        }
    }

    goToLogin = () => {
        this.props.navigation.navigate('Login');
    }

    register = async () => {
        console.log("eee")
        let valide = await this.validate_form();
        if(valide){
            let body = {
                nom: this.state.nom,
                prenom: this.state.prenom,
                email: this.state.email,
                gender: this.state.gender,
                password: this.state.password
            }
            console.log(body)
            try{                
                let register = await fetch_url_post(api_register_url, body);
                console.log("register=",register);
                if(register){
                   
                    await this.login();
                }else{
                    alert("une erreur s'est produite")
                }
            }catch(e){
                alert('erreur register')
            }
        }
    }

    login = async () => {
        let body = {
            email: this.state.email,
            password: this.state.password
        };
        try{
            await fetch_url_post(api_login_url, body).then(async (data) => {
                if(data.response != 'error' && data.response){
                    await storeCustomer(data.response.customer);
                    this.context.customer = data.response.customer;
                    this.props.navigation.reset({
                        index: 0,
                        routes: [{ name: 'View' }],
                    });
                }else{
                    this.setState({
                        errorLogin: true
                    })
                }
                
            });
        }catch(e){
            console.log('error login after register')
            this.props.navigation.navigate('SignUp');
        }
    }

    validate_form = async () => {
        let succes = true;

        await this.setState({
            error_nom: null,
            error_prenom: null,
            error_email: null,
            error_password: null,
            error_new_password: null,
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

        if(this.state.password && this.state.password != ""){
            if(this.state.password.length < 8){
                succes = false;
                this.setState({
                    error_password: '8 charactères minimum'
                });
            }
        }else{
            succes = false;
            this.setState({
                error_password: 'Champs réquis'
            });
        }

        if(this.state.new_password && this.state.new_password != ""){
            if(this.state.new_password != this.state.password){
                succes = false;
                this.setState({
                    error_new_password: 'Mot de passe non identique'
                });
            }
        }else{
            succes = false;
            this.setState({
                error_new_password: 'Champs réquis'
            });
        }

        return succes;
    }
    dropdown = () => {
        const type=[{"id": 1, "sexe": "Femme"},{ "id": 2, "sexe": "Homme"}]
            return (<SelectDropdown
            data={type}
            defaultButtonText={"------ votre sexe ------"}
            onSelect={(selectedItem, index) => {
                console.log(selectedItem.id)
                this.setState({ gender: selectedItem })
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.sexe
            }}
            rowTextForSelection={(item, index) => {
                return item.sexe
            }}
        />)
    }

    render(){
        return(
            <ScrollView
                horizontal={ false}
                showsVerticalScrollIndicator={true}
                >
            <SafeAreaView style={styles.container}>
                <View style={{ backgroundColor: Color, flex: 1, paddingHorizontal: 10}}>
                    <View style={{padding: 10}}>
                            <Text>
                                <TouchableOpacity 
                                    /* onPress={() => {this.props.navigation.navigate(global.signBackName, {params: {}}); }} */
                                    onPress={() => {this.props.navigation.navigate("View", {params: {}}); }}
                                >
                                    <Text style={{fontSize: 17}}>Retour</Text>
                                </TouchableOpacity>
                            </Text>
                    </View>
                    <View style={styles.container}>
                        <Card style={styles.card}>

                            <Text style={styles.signupTitle}> Sign up</Text>

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
                                placeholder = "Email"
                                placeholderTextColor = "grey"
                                autoCapitalize = "none"
                                onChangeText={(value) =>{this.setState({email:value})}}
                                value={this.state.email}
                                errorMessage={this.state.error_email}
                            />
                    
                            <Input style = {styles.input}
                                underlineColorAndroid = "transparent"
                                placeholder = "Password"
                                secureTextEntry = {true}
                                placeholderTextColor = "grey"
                                autoCapitalize = "none"
                                onChangeText={(value) =>{this.setState({password:value})}}
                                value={this.state.password}
                                errorMessage={this.state.error_password}
                            />

                            <Input style = {styles.input}
                                underlineColorAndroid = "transparent"
                                placeholder = "Confirm Password"
                                secureTextEntry = {true}
                                placeholderTextColor = "grey"
                                autoCapitalize = "none"
                                onChangeText={(value) =>{this.setState({new_password:value})}}
                                value={this.state.new_password}
                                errorMessage={this.state.error_new_password}
                            
                            /> 

                            <View 
                                style={{
                                    borderBottomColor: 'grey',
                                    borderBottomWidth: 1,
                                    marginBottom: 5,
                                    width: 'auto',
                                }}
                            >
                                {this.dropdown()}
                                {/* <Picker
                                    selectedValue={this.state.gender}
                                    onValueChange={(value) => {
                                        this.setState({gender:value})
                                    }}
                                >
                                    <Picker.Item label="Monsieur" value="1" />
                                    <Picker.Item label="Madame" value="2" />
                                </Picker> */}
                            </View>

                            <Button style={styles.loginButton}
                                
                                title="Sign Up"
                                color="darkgreen"
                                onPress={() => 
                                    this.register()
                                }
                            />
                        </Card>

            
                        <TouchableOpacity onPress={() => { this.goToLogin() }}>
                            <Text style={{textAlign:'center', color:'white', paddingTop: 30}}>Vous avez un compte?
                            <Text style={{textAlign:'center', fontWeight:'bold', color:'black'}}> Connectez vous</Text></Text>
                        </TouchableOpacity>
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

export default SignUp;