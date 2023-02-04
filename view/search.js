import React from 'react';

import { View, ScrollView, Button, TouchableOpacity, FlatList, Text, Picker } from 'react-native';
import { DotsLoader } from 'react-native-indicator';
import { SearchBar, Icon } from 'react-native-elements';

import { AuthContext } from '../helper/context/auth-context';
import { api_products_by_id_categorie, getProductsManufacturer } from '../helper/api_url';


import { fetch_url_get } from '../helper/function/common-function/fetch';
import SearchList from '../components/search_list';
import { primaryColor, title_search_color } from '../helper/color';
import ImageBackgroundGlobal from '../components/image_background_global';
//import Animated from 'react-native-reanimated';

class Search extends React.Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props)
        this.state = {
            guest: null,
            products: null,
            isLoading: false,
            IdCategories: null,
            titre: null,
            searchMode: false,
            manufacturers:null,
            selectedValue:''

        }
    }
       

    getGuest = async () => {
        var guest = null;
        guest = await this.context.getGuest();
        if (guest) {
            this.setState({
                guest: guest
            });
            this.context.guest = guest;
        }
    }
    getManufacturers = async () => {
        var manufacturers = null; 
        manufacturers = await fetch_url_get(getProductsManufacturer);
        this.setState({
                manufacturers: manufacturers.manufacturer
        });
        
    }
    displayMarques = () => {
        this.getManufacturers();
        if(this.state.manufacturers){
            let data = this.state.manufacturers;
            return(
                <Picker
                        selectedValue={this.state.selectedValue}
                        style={{ height: 50, width: 400,}}
                        onValueChange = {(itemValue) =>{ 
                            this.setState({selectedValue:itemValue})
                        }}
                    >
                        <Picker.Item label="Marque" value="" />
                        { 
                            data.map((item)=>
                            <Picker.Item  label={item.name} value={item.id} key={item.id} />)
                        }
                </Picker>
            )
        }  
    }

    getProduct = async () => {
        var products = null;
        products = await fetch_url_get(api_products_by_id_categorie + this.state.IdCategories + '&limit=full');
        this.setState({
            products: products
        });

    }

    displayLoading = () => {
        if (this.state.isLoading) {
            return (
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <DotsLoader color={primaryColor} betweenSpace={20} size={20} />
                </View>
            )
        }
    }

    displayProduct = () => {
        if (this.state.searchMode == false) {
            //console.log(this.state.isLoading)
            if (!this.state.isLoading && this.state.products) {
                //console.log(this.state.products)
                //console.log(this.state.selectedValue)
                return (
                <SearchList products={this.state.products.product} navigation={this.props.navigation} selectedValue = {this.state.selectedValue} />
                );
            }
        } else {
            return (
                <TouchableOpacity onPress={()=> this.setState({ searchMode : false})}>
                    <View style={{ backgroundColor: "grey", height: "100%" , opacity : 0.2 }}>
                        <Text>
                            Search Mode
                        </Text>
                    </View>
                </TouchableOpacity>

            );
        }

    }

    displayTitre = (titre) => {
        if (this.state.searchMode == false) {
            if (this.state.titre) {
                return (
                    <View style={{ height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: title_search_color }}>
                    <Text style={{ color: '#000000', fontSize: 16 }}> {titre} </Text>
                    </View>
                );
            }
        }
        
    }

    async componentDidMount() {
        this.setState({
            IdCategories: this.props.route.params.data.IdCategorie,
            titre: this.props.route.params.data.SousSousSousTitre,
        });
        this.setState({
            isLoading: true,
        });
        await this.getGuest();
        await this.getProduct();
        await this.getManufacturers();
        this.setState({
            isLoading: false,
        });

    }

    componentDidUpdate(prevProps) {
    }

    render() {

        return (
            <View style={{ flex: 1, maxWidth: '100%', marginBottom: '2%' }}>
                <View style={{
                    height: 50,
                    padding: '2%',
                    marginBottom:-20
                }}>
                    <SearchBar
                        onPressIn={() => { this.setState({ searchMode : true})
                            
                        }}
                        onClear={() => {
                            this.setState({
                                searchMode: false
                            })
                        }}

                        placeholder="Search..."
                        onChangeText={(data) => { this.setState({ search: data }) }}
                        value={this.state.search}
                        inputContainerStyle={{
                            borderRadius: 50,
                            backgroundColor: '#FFFFFF',
                            height: '90%',
                        }}
                        containerStyle={{
                            backgroundColor: '#FFFFFF',
                            borderBottomWidth: 0,
                            borderTopWidth: 0,
                            height: '100%',
                            width: '100%',
                            padding: 0,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 50,
                            flex: 1
                        }}
                        inputStyle={{
                            fontSize: 14
                        }}
                        searchIcon={() => {
                            return (
                                <Icon
                                    type="font-awesome"
                                    name="search"
                                    size={18}
                                    iconStyle={{ paddingLeft: 5 }}
                                />
                            )
                        }}
                    />
                </View>
                <View>
                {this.displayMarques()}
                </View>
                <View style={{ backgroundColor: "grey"}} >
                {/* {this.displayTitre(this.state.titre)} */}
                {this.displayProduct()}
                </View>
                

            </View>
        );
    }
}

export default Search;