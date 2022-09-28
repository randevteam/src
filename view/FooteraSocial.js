import React from 'react';

import { View ,Button ,FlatList, Text, TouchableOpacity, StyleSheet, Image, Linking} from 'react-native';
//import { DotsLoader } from 'react-native-indicator';
import { SearchBar, Icon } from 'react-native-elements';

import { AuthContext } from '../helper/context/auth-context';
//import {api_get_search_result } from '../helper/api_url';


//import { fetch_url_get } from '../helper/function/common-function/fetch';
//import SearchList from '../components/search_list';
//import { primaryColor, title_search_color } from '../helper/color';
//import ImageBackgroundGlobal from '../components/image_background_global';

import detail_product_styles from './style/detail_product_style';

// import FloatingWhatsApp from 'react-floating-whatsapp'

class FooteraSocial extends React.Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props)
        
    }

    
    async componentDidMount(){
        
        
    }

    componentDidUpdate(prevProps){
    }
    showDetailProm = () => {
        this.props.navigation.navigate('AffichageList', {
          screen: 'AffichageList',
          params: {
            data: {
              IdCategorie: 76,
              SousSousSousTitre: 'Vêtements de chasse',
              Text: 'Vêtement',
            },
          },
        });
      };
    render(){
        
        // const nouvy = require('/nouveate.png')
        // const maily = require('./mail.png')
        return(
            <View>
                <View style={{flexDirection: 'row', height : 80,padding : 5,backgroundColor : '#F0E8DB'}}>
                    <TouchableOpacity style={{
                            marginTop: 18, alignItems: 'center', flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%' 
                        }} 
                        onPress={() => { Linking.openURL('http://api.whatsapp.com/send?phone=+261320410044') }}>
                        <Icon
                            name='whatsapp'
                            type='font-awesome'
                            color='#FFFFFF'
                            size={30}
                            containerStyle={{
                                backgroundColor: 'black',
                                borderRadius: 50,
                                width : '40%',
                            }}

                        /> 
                        <Text style={styles.title_icon_round} >whatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={detail_product_styles.plus_panel} onPress={() => { this.props.navigation.navigate('SendEmail') }}>
                        <Image
                            source={{uri:"https://www.passion-campagne.com/img/mail.png"}}
                            style={{
                                height: 50,
                                width: '40%',
                                resizeMode: 'contain',
                            }}
                        />
                        <Text style={styles.title} >E-mail</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                            marginTop: 18, 
                            alignItems: 'center', 
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%'
                        }}  
                        onPress={() => { this.props.navigation.navigate('Promotion');
                    }}>
                        <Icon
                            name='percent'
                            type='font-awesome'
                            color='#FFFFFF'
                            size={30}
                            containerStyle={{
                                backgroundColor: 'black',
                                borderRadius: 50,
                                width : '40%',
                            }}

                        />
                        <Text style={styles.title_icon_round} >Promotion</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={detail_product_styles.plus_panel} onPress={() => { this.props.navigation.navigate('Nouveaute') }}>
                        <Image
                            source={{uri:"https://www.passion-campagne.com/img/nouveate.png"}}
                            style={{
                                height: 50,
                                width: '40%',
                                resizeMode: 'contain',
                            }}
                        />
                        <Text style={styles.title} >Nouveauté</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                            marginTop: 18,
                            alignItems: 'center',
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%'
                        }}  
                        onPress={() => { this.props.navigation.navigate('Boutique');
                   }}>
                        <Icon
                            name='map-marker'
                            type='font-awesome'
                            color='#FFFFFF'
                            size={30}
                            containerStyle={{
                                backgroundColor: 'black',
                                borderRadius: 50,
                                width : '40%',
                            }}

                        />
                        <Text style={styles.title_icon_round} >Boutique</Text>
                    </TouchableOpacity>
                   
                   
                </View> 
            </View>
        );
    }
}
const styles = StyleSheet.create({
    title: {
      fontSize: 13,
      textAlign: 'center',
      color: "black"
    },
    title_icon_round: {
        fontSize: 13,
        textAlign: 'center',
        color: "black",
        lineHeight: 35
    }
  })
export default FooteraSocial;