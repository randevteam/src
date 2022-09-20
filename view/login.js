import React from 'react';
import { View, ScrollView, Text, SafeAreaView, ImageBackground, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { HelperText } from 'react-native-paper';
import { Button } from 'react-native-elements';

import { fetch_url_post } from '../helper/function/common-function/fetch';
import { api_login_url } from '../helper/api_url';
import { AuthContext } from '../helper/context/auth-context';
import { storeCustomer } from '../helper/storage/user-storage';
import { BackgroundColor } from 'chalk';
import { Color } from '../helper/color';


class Login extends React.Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            isLoading: false,
            errorLogin: false,
            emailError: false,
            passwordError: false,
        }
    }

    goToSignUp = () => {
        this.props.navigation.navigate('SignUp');
    }

    validatorEmail = () => {
        if(this.state.email != ''){
            this.setState({
                emailError: false
            });
            return true;
        }else{
            this.setState({
                emailError: true
            });
            return false;
        }
    }

    validatorPassword = () => {
        if(this.state.password != ''){
            this.setState({
                passwordError: false
            });
            return true;
        }else{
            this.setState({
                passwordError: true
            });
            return false;
        }
    }

    login = async () => {
        let body = {
            email: this.state.email,
            password: this.state.password
        };
        let mail = this.validatorEmail();
        let pwd = this.validatorPassword();
        if(mail && pwd){
            await fetch_url_post(api_login_url, body).then(async (data) => {
                if(data.response != 'error' && data.response){
                    await storeCustomer(data.response.customer);
                    this.context.customer = data.response.customer;
                    this.navigate_to_view();
                }else{
                    this.setState({
                        errorLogin: true
                    })
                }
                
            });
        }
    }

    navigate_to_view = () => {
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'View' }],
        });
    }

    render(){
        return(
           
            <SafeAreaView style={styles.container}>
                <View style={{ backgroundColor: Color, flex: 1, paddingHorizontal: 10}}>

                    <View style={styles.container}>
                        <Card style={styles.card}>

                            <Text style={styles.signupTitle}> Sign up</Text>

                            <TextInput style = {[styles.input, { borderBottomColor: this.state.emailError ? 'red' : 'grey' }]}
                                underlineColorAndroid = "transparent"
                                placeholder = "Email"
                                placeholderTextColor = "grey"
                                autoCapitalize = "none"
                                value={this.state.email}
                                onChangeText={(data) => {
                                    this.setState({
                                        email: data
                                    });
                                }}
                            />
                        
                            <TextInput style = {[styles.input, { borderBottomColor: this.state.emailError ? 'red' : 'grey' }]}
                                underlineColorAndroid = "transparent"
                                placeholder = "Password"
                                secureTextEntry = {true}
                                placeholderTextColor = "grey"
                                autoCapitalize = "none"
                                value={this.state.password}
                                onChangeText={(data) => {
                                    this.setState({
                                        password: data
                                    });
                                }}
                            />

                            <Button buttonStyle={styles.loginButton}      
                                title="Login"
                                onPress={() => this.login()}
                            />

                            <HelperText type="error" visible={this.state.errorLogin}>
                                Email ou mot de passe érroné
                            </HelperText>
                
                        </Card>

                
                        <TouchableOpacity onPress={() => { this.goToSignUp() }}>
                            <Text style={{textAlign:'center', color:'grey', paddingTop: 30}}>Pas de compte ?
                            <Text style={{textAlign:'center', fontWeight:'bold', color:'black'}}> Enregistrez vous</Text></Text>
                        </TouchableOpacity>
                        
    
                    </View>
                </View>
            </SafeAreaView>



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
    fontSize: 18,
    height: 44,
    paddingLeft: 10,
    borderBottomWidth: 1,
    marginVertical: 10,
    paddingLeft : 15,
    borderBottomColor: 'grey',
    marginLeft: 4,
    marginRight: 4
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
  },

  loginButton: {
      marginTop: '8%',
      backgroundColor: 'darkgreen'
  }

});

export default Login;