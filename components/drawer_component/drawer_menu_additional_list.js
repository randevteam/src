import 'react-native-gesture-handler';
import React , { Component } from 'react';
import { View, StyleSheet , SafeAreaView , ScrollView , UIManager , Platform } from 'react-native'
import { List, Text } from 'react-native-paper';
import { fetch_url_get , fetch_url_get_and_store } from '../../helper/function/common-function/fetch';
import { api_get_category_url } from '../../helper/api_url';
import { paire_color, impaire_color , drawer_background_color } from '../../helper/color';
import { Icon } from 'react-native-elements';

import menu_principal_styles from './drawer_menu_principal_styles';

class Categories extends Component  {                       

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            children: [],
            isLoading: true,
            activeSections: [],
            expanded: true,
        };
    }

    handlePress = () => this.setState({
        expanded: !expanded
    });

    get_category = async () => {
        
        await fetch_url_get_and_store(api_get_category_url)
            .then((json) => {
                
                this.setState({
                    data: json
                })
            })
            .catch((error) => console.error(error))
            .finally(() => {
                this.setState({
                    isLoading: false
                });
            });
    }

    async componentDidMount() {
        await this.get_category();
    }

    showDetail = (data) => {
        this.props.navigation.navigate('Search',{
            screen: 'Search',
            params: {data: data}
        });
    }

    iconname = (name) => {
            if( name == " VÊTEMENT "){
                return "shirt" ;
            }
            if(name == " CHAUSSURE & BOTTES "){
                return "shoe-formal" ;
            }
            if( name == " ÉQUIPEMENT & ACCESSOIRES "){
                 return "camera" ;
            }
    }
    icontype = (type) => {
        if(type == " VÊTEMENT "){
            return "ionicon" ;
        }
        if(type == " CHAUSSURE & BOTTES "){
             return "material-community" ;
        }
        if( type == " ÉQUIPEMENT & ACCESSOIRES "){
            return "fontawesome" ;
        }
    }

    Accordion = (data) => {
        if( data.length != 0 ){     
            let i = 0;
            let j = 0;
            let k = 0;
            return data.map((item , index)=> {
                i += 1;
                k += 1;
                j += 1;
                var color =  drawer_background_color ;
                if( item.SousMenu.length != 0){
                        var SousMenu = item.SousMenu.map((item, index)=>{
                            var list = item.SousSousTitre.map((item, index)=>{
                                return (
                                  <List.Item
                                    key={k}
                                    title={
                                      <Text
                                        style={{color: 'grey', fontSize: 14}}>
                                        {item.SousSousSousTitre}{' '}
                                      </Text>
                                    }
                                    style={{
                                      marginLeft: 0,
                                      color: drawer_background_color,
                                    }}
                                    right={props => (
                                      <Icon
                                        color="grey"
                                        name="chevron-forward-circle"
                                        type="ionicon"
                                        size={20}
                                      />
                                    )}
                                    onPress={() => this.showDetail(item)}
                                    id={k}
                                  />
                                );
                            })

                            return (
                                <List.AccordionGroup>
                                    <List.Accordion 
                                        key={j}
                                        title={ <Text style= {{ marginLeft: 20 , fontSize: 12}}>{item.SousTitre[0].SousMenu} </Text>} 
                                        id={j}
                                        style={{backgroundColor : drawer_background_color, marginLeft : 20 ,  marginRight : 15 , borderBottomWidth : 0.5 , borderBottomColor : 'grey' , borderSpacing: 10 }} 
                                        
                                        >
                                        { list }
                                    </List.Accordion>
                                </List.AccordionGroup>
                            )



                        })
                }
                return (
                        <View>
                            <List.AccordionGroup>
                                <List.Accordion 
                                    title={ item.MenuName[0].Menu_Name } 
                                    id={i}
                                    key={i}
                                    style={{backgroundColor : color }} 
                                    left={props => <Icon 
                                        name= { this.iconname(item.MenuName[0].Menu_Name) } 
                                        type= { this.icontype(item.MenuName[0].Menu_Name)} 
                                        size={16}
                                        color='grey'
                                    />}
                                    >
                                    { SousMenu }
                                </List.Accordion>
                            </List.AccordionGroup>
                        </View>
                    );
            });
        }
    }



    render(){
        
        const { data, isLoading } = this.state;

            return(
                <SafeAreaView>
                    <ScrollView>
                        <View style={{ marginTop: '1%' , marginLeft : 15 }}>            
                        { this.Accordion(data) }         
                        </View>
                    </ScrollView>
                </SafeAreaView> 
                
            );
        }
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            marginTop: 0,
        },
        item: {
            backgroundColor: '#f9c2ff',
            padding: 5,
            marginVertical: 1,
            marginHorizontal: 16,
        },
        title: {
            fontSize: 16,
            textAlign: 'center'

        },
    });

export default Categories;