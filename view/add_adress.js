import React from 'react';
import { View, ScrollView, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Title } from 'react-native-paper';
import { Input, Button } from 'react-native-elements';

import { AuthContext } from '../helper/context/auth-context';
import { storeAdress, getAdress } from '../helper/storage/user-storage';
import account_styles from './style/account_style';
import { api_get_countries_url, api_get_state_country_url, api_create_adress_url } from '../helper/api_url';
import { fetch_url_get, fetch_url_post } from '../helper/function/common-function/fetch'
import { primaryColor } from '../helper/color';
import { DotsLoader } from 'react-native-indicator';

class AddAdress extends React.Component {

    static contextType = AuthContext;

    constructor(props){
        super(props);
        this.state = {
            customer: null,
            nom: null,
            prenom: null,
            addresComplement: null,
            city: null,
            etat: 0,
            etatVal: null,
            postalCode: null,
            country: null,
            countryAll: null,
            phone: null,
            idCustomer: null,
            adress: null,
            alias: null,
            isChanged: null,
            isLoading: false,
        }
    }

    save_adress = async () => {
        if(this.props.edit_mode && this.props.edit_mode == true){
            let id = this.props.adress_to_edit.id;
            var bodys = {
                id_country: this.state.country && this.state.country != "null" ? this.state.country : null,
                id_state: this.state.etatVal && this.state.etatVal != "null" ? this.state.etatVal : null,
                lastname: this.state.nom,
                firstname: this.state.prenom,
                address1: this.state.adress,
                address2: this.state.addresComplement && this.state.addresComplement != "null" ? this.state.addresComplement : null,
                postcode: this.state.postalCode && this.state.postalCode != "null" ? this.state.postalCode : null,
                city: this.state.city && this.state.city != "null" ? this.state.city : null,
                phone: this.state.phone && this.state.phone != "null" ? this.state.phone : null,
                alias: this.state.alias
            };
            this.props.edit_adress(bodys, id);
        }else{
            this.props.setLoadingTrue();
            var bodys = {
                id_customer: this.state.idCustomer,
                id_country: this.state.country,
                id_state: this.state.etatVal,
                lastname: this.state.nom,
                firstname: this.state.prenom,
                address1: this.state.adress,
                address2: this.state.addresComplement,
                postcode: this.state.postalCode,
                city: this.state.city,
                phone: this.state.phone,
                alias: this.state.alias
            };

            await fetch_url_post(api_create_adress_url, bodys).then((data) => {
                this.props.end_add();
            });
        }
    }

    init_all = async () => {
        this.props.setLoadingTrue();
        if(this.state.customer != null && this.state.isChanged == null) {
            this.setState({
                idCustomer: this.state.customer.id,
            })
        }
        await this.get_countries();
        await this.get_states();
        this.props.setLoadingFalse();
    }

    get_states = async () => {
        await fetch_url_get(api_get_state_country_url + this.state.country).then((data) => {
            this.setState({
                etat: data
            });
        });
    }

    get_countries = async () => {
        this.setState({
            isLoading: true
        });
        await fetch_url_get(api_get_countries_url).then((data) => {
            this.setState({
                countryAll: data,
                isLoading: false
            });
        });
    }

    display_button = () => {
        if(this.state.isLoading){
            return (
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <DotsLoader color={primaryColor} betweenSpace={20} size={20} />
                </View>
            );
        }else{
            return(
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Button
                        onPress={() => {
                            this.save_adress();
                        }}
                        title={"Enregistrer"}
                        type="outline"
                        buttonStyle={{
                            borderColor: primaryColor,
                            borderWidth: 0.4,
                            paddingHorizontal: '10%'
                        }}
                        titleStyle={{ color: primaryColor }}
                    />
                    <Button
                        type="outline"
                        buttonStyle={{
                            borderColor: '#F65252',
                            borderWidth: 0.4,
                            paddingHorizontal: '10%'
                        }}
                        onPress={() => {
                            this.props.end_add();
                        }}
                        title={"Annuler"}
                        titleStyle={{ color: '#F65252' }}
                    />
                </View>
            );
        }
    }

    get_state_t = () => {
        if (this.state.etat != 0) {
            if (this.state.etat.state != undefined) {
                var optToReturn =
                    this.state.etat.state.map(combOpt => {
                        return (
                            <Picker.Item label={combOpt.name} value={combOpt.id} />
                        )
                    });
                return optToReturn;
            }
        }
    }

    get_country = () => {
        if (this.state.countryAll != null) {
            var idCountry = this.state.countryAll.country.id;
            if (idCountry != undefined) {
                var optToReturn = <Picker.Item label={this.state.countryAll.country.name.language} value={this.state.countryAll.country.id} />
            } else {
                var optToReturn =
                    this.state.countryAll.country.map(combOpt => {
                        return (
                            <Picker.Item label={combOpt.name.language} value={combOpt.id} key={combOpt.id}/>
                        )
                    });
            }
            return optToReturn;
        }
    }

    change_country = async (value) => {
        this.setState({ country: value });
        await this.init_all();
    }

    update_customer = () => {
        this.setState({
            customer: this.context.customer,
            idCustomer: this.context.customer.id,
            nom: this.props.adress_to_edit && this.props.adress_to_edit.firstname ? this.props.adress_to_edit.firstname : this.context.customer.firstname,
            prenom: this.props.adress_to_edit && this.props.adress_to_edit.lastname ? this.props.adress_to_edit.lastname : this.context.customer.lastname,
            addresComplement: this.props.adress_to_edit && this.props.adress_to_edit.address2 && this.props.adress_to_edit.address2 != "null" ? this.props.adress_to_edit.address2 : null,
            adress: this.props.adress_to_edit && this.props.adress_to_edit.address1 ? this.props.adress_to_edit.address1 : null, 
            city:  this.props.adress_to_edit && this.props.adress_to_edit.city ? this.props.adress_to_edit.city : null, 
            country:  this.props.adress_to_edit && this.props.adress_to_edit.id_country ? this.props.adress_to_edit.id_country : null, 
            etatVal:  this.props.adress_to_edit && this.props.adress_to_edit.id_state ? this.props.adress_to_edit.id_state : null, 
            postalCode:  this.props.adress_to_edit && this.props.adress_to_edit.postcode ? this.props.adress_to_edit.postcode : null, 
            phone:  this.props.adress_to_edit && this.props.adress_to_edit.phone && this.props.adress_to_edit.phone != "null" ? this.props.adress_to_edit.phone : null, 
            alias: this.props.adress_to_edit && this.props.adress_to_edit.alias ? this.props.adress_to_edit.alias : null
        });
    }

    async componentDidMount(){
        await this.get_countries();
        this.update_customer();
    }

    render(){
        return(
            <View style={{ flex: 1, padding: 7 }}>
                <ScrollView>
                    {/* <Input
                        label="ID"
                        value={this.state.idCustomer}
                        placeholder=""
                        readonly="true"
                        disabled
                    /> */}
                    <Input
                        label="Alias"
                        onChangeText={(value) => { this.setState({ alias: value }) }}
                        value={this.state.alias}
                        placeholder=""
                    />
                    <Input
                        label="Nom"
                        onChangeText={(value) => { this.setState({ nom: value }) }}
                        value={this.state.nom}
                        placeholder=""
                    />
                    <Input
                        label="Prenom"
                        onChangeText={(value) => { this.setState({ prenom: value }) }}
                        value={this.state.prenom}
                    />
                    <Input
                        label="Adress Complement"
                        onChangeText={(value) => { this.setState({ addresComplement: value }) }}
                        value={this.state.addresComplement}
                    />
                    <Input
                        label="Address"
                        onChangeText={(value) => { this.setState({ adress: value }) }}
                        value={this.state.adress}
                    />
                    <Input
                        label="City"
                        onChangeText={(value) => { this.setState({ city: value }) }}
                        value={this.state.city}
                    />
                    <Picker
                        selectedValue={this.state.country}
                        onValueChange={(value) => { this.change_country(value) }}>
                        <Picker.Item label="Choisir pays" value="" key={0}/>
                        {this.get_country()}
                    </Picker>
                    <Picker
                        selectedValue={this.state.etatVal}
                        onValueChange={(value) => { this.setState({ etatVal: value }) }}>
                        <Picker.Item label="Choisir etat" value="null" />
                        {this.get_state_t()}
                    </Picker>
                    <Input
                        label="Postal Code"
                        onChangeText={(value) => { this.setState({ postalCode: value }) }}
                        value={this.state.postalCode}
                    />
                    <Input
                        label="Phone"
                        onChangeText={(value) => { this.setState({ phone: value }) }}
                        value={this.state.phone}
                        keyboardType="numeric"
                    />
                    <View style={{  }}>
                        {this.display_button()}
                    </View>
                </ScrollView>
            </View>
        );
    }

}

export default AddAdress;