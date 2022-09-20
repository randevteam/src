import React from 'react';

import { View ,ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import profile_styles from './style/profile_styles';
import { AuthContext } from '../helper/context/auth-context';
import { removeUser, removeAdress } from '../helper/storage/user-storage';

class Profile extends React.Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props)

        this.state = {
            reload: false,
            firstname: null,
            lastname: null
        }
    }

    signUpPage = () => {
        return(
            <View style={profile_styles.signup_view}>
                <Button 
                    title='Sign Up'
                    buttonStyle={profile_styles.button_signup_style}
                    onPress={() => { this.goToSignUp() }}
                />
                <TouchableOpacity
                    style={{ flexDirection: 'row', marginTop: 10 }}
                    onPress={() => { this.goToLogin() }}
                >
                    <Text style={{textAlign:'center', color:'grey'}}>
                        Have an account ? 
                    </Text>
                    <Text style={{textAlign:'center', fontWeight:'bold', color:'black', marginLeft: 2}}> 
                            Sign in
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    goToLogin = () => {
        this.props.navigation.navigate('Login');
    }

    goToSignUp = () => {
        this.props.navigation.navigate('SignUp');
    }

    goToAccount = () => {
        this.props.navigation.navigate('Account', {
            screen: 'Account'
        })
    }

    goToInfo = () => {
        this.props.navigation.navigate('Information', {
            screen: 'Information'
        })
    }

    log_out = async () => {
        await removeUser();
        await removeAdress();
        this.context.customer = null;
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'Presentation' }],
        });
    }

    init = () => {
        this.props.navigation.addListener('focus', () => {
            this.setState({
                firstname: this.context.customer && this.context.customer.firstname ? this.context.customer.firstname : "No",
                lastname: this.context.customer && this.context.customer.lastname ? this.context.customer.lastname : "Name",
            });
        })
    }

    show_name = () => {
    }

    componentDidMount(){
        this.init();
    }

    profile = () => {
        return(
            <View style={{ flex: 1 }}>
                <View style={profile_styles.info_container}>
                    <View style={{
                        elevation: 2,
                        padding: 2,
                        borderRadius: 100,
                    }}>
                        <Image 
                            source={{ uri: 'https://image.freepik.com/vecteurs-libre/homme-affaires-caractere-avatar-icone-vector-illustration-design_24877-18271.jpg' }}
                            style={{
                                height: 150,
                                width: 150,
                                borderRadius: 100,
                                resizeMode: 'cover',
                            }}
                        />
                    </View>
                    <Text style={profile_styles.name_profile}>{ this.state.lastname + ' ' + this.state.firstname}</Text>
                </View>
                <View style={profile_styles.profile_content}>
                <TouchableOpacity 
                        style={profile_styles.view_content_profile}
                        onPress={() => {
                            this.goToInfo()
                        }}
                    >
                        <View style={profile_styles.icon_ref}>
                            <Icon
                                name='user'
                                type='evilicon' 
                                size={40}
                                color='#33A8EB'
                            />
                        </View>
                        <View style={profile_styles.title_ref}>
                            <Text style={profile_styles.title_ref_style}>
                                Identité
                            </Text>
                        </View>
                        <View style={profile_styles.arrow_ref}>
                            <Icon
                                name='chevron-forward-outline'
                                type='ionicon' 
                                size={30}
                                color='#C1C6C8'
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={profile_styles.view_content_profile}
                        onPress={() => {
                            this.goToAccount()
                        }}
                    >
                        <View style={profile_styles.icon_ref}>
                            <Icon
                                name='home'
                                type='font-awesome' 
                                size={40}
                                color='#D8DA8B'
                            />
                        </View>
                        <View style={profile_styles.title_ref}>
                            <Text style={profile_styles.title_ref_style}>
                                Mes Addresses
                            </Text>
                        </View>
                        <View style={profile_styles.arrow_ref}>
                            <Icon
                                name='chevron-forward-outline'
                                type='ionicon' 
                                size={30}
                                color='#C1C6C8'
                            />
                        </View>
                    </TouchableOpacity>
                    <View style={profile_styles.view_content_profile}>
                        <View style={profile_styles.icon_ref}>
                            <Icon
                                name='clock-o'
                                type='font-awesome' 
                                size={30}
                                color='#C673EC'
                            />
                        </View>
                        <View style={profile_styles.title_ref}>
                            <Text style={profile_styles.title_ref_style}>
                                Historiques d'achats et commandes
                            </Text>
                        </View>
                        <View style={profile_styles.arrow_ref}>
                            <Icon
                                name='chevron-forward-outline'
                                type='ionicon' 
                                size={30}
                                color='#C1C6C8'
                            />
                        </View>
                    </View>
                    <View style={profile_styles.view_content_profile}>
                        <View style={profile_styles.icon_ref}>
                            <Icon
                                name='gear'
                                type='evilicon' 
                                size={35}
                                color='#A39349'
                            />
                        </View>
                        <View style={profile_styles.title_ref}>
                            <Text style={profile_styles.title_ref_style}>
                                Paramètres
                            </Text>
                        </View>
                        <View style={profile_styles.arrow_ref}>
                            <Icon
                                name='chevron-forward-outline'
                                type='ionicon' 
                                size={30}
                                color='#C1C6C8'
                            />
                        </View>
                    </View>
                    <View style={profile_styles.view_content_profile}>
                        <View style={profile_styles.icon_ref}>
                            <Icon
                                name='phone'
                                type='font-awesome' 
                                size={30}
                                color='#71A349'
                            />
                        </View>
                        <View style={profile_styles.title_ref}>
                            <Text style={profile_styles.title_ref_style}>
                                Contact Us
                            </Text>
                        </View>
                        <View style={profile_styles.arrow_ref}>
                            <Icon
                                name='chevron-forward-outline'
                                type='ionicon' 
                                size={30}
                                color='#C1C6C8'
                            />
                        </View>
                    </View>
                </View>
                <View style={profile_styles.logout_section}>
                    <Button 
                        buttonStyle={profile_styles.button_style}
                        type="outline"
                        title='Log Out'
                        titleStyle={profile_styles.title_style}
                        onPress={() => {
                            this.log_out();
                        }}
                    />
                </View>
            </View>
        );
    }

    displayProfile = () => {
        if(this.context.customer){
            return this.profile();
        }else{
            return this.signUpPage();
        }
    }

    render(){
        return(
            <View style={profile_styles.container}>
                { this.displayProfile() }
            </View>
        );
    }
}

export default Profile;