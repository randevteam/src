import React from 'react';

import { View, Button, FlatList, Text, TouchableOpacity, Picker, ScrollView } from 'react-native';
import { DotsLoader } from 'react-native-indicator';
import { SearchBar, Icon } from 'react-native-elements';

import { AuthContext } from '../helper/context/auth-context';
import { api_get_search_result, getProductsManufacturer, api_products_by_id_categorie } from '../helper/api_url';


import { fetch_url_get } from '../helper/function/common-function/fetch';
import SearchList from '../components/search_list';
import { primaryColor, title_search_color } from '../helper/color';
import ImageBackgroundGlobal from '../components/image_background_global';
import FooteraSocial from './FooteraSocial';
import detail_product_styles from './style/detail_product_style';

import SelectDropdown from 'react-native-select-dropdown';

class Query extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      guest: null,
      products: null,
      isLoading: false,
      IdCategories: null,
      titre: null,
      stringToSearch: null,
      mode: false,
      Text: null,
      manufacturers: null,
      selectedValue: "",
      monsearch: "",
    };
  }

  updateSearch = (text) => {
    this.setState({ monsearch: text });
  };

  getGuest = async () => {
    var guest = null;
    guest = await this.context.getGuest();
    if (guest) {
      this.setState({
        guest: guest,
      });
      this.context.guest = guest;
    }
  };
  // daty = {
  //           IdCategorie: this.props.route.params.data.IdCategorie,
  //           SousSousSousTitre: this.props.route.params.data.titre,
  //           Text: this.props.route.params.data.text,
  //         }
  getProduct = async () => {
    this.setState({ isLoading: true });
    // var products = null;
    // products = await fetch_url_get(api_products_by_id_categorie + this.state.IdCategories);
    // this.setState({
    //     products: products
    // });

    var products = null;
    // of from presentaion page
    // alert('cuocuoc')

    // console.log(this.props.route.params.data);
    // console.log(this.props.route.params.data.IdCategorie);
    // console.log(this.state.IdCategories);

    // this.setState({
    //     IdCategories: this.props.route.params.data.IdCategorie
    // });

    if (
      this.props.route.params.data.IdCategorie != null &&
      this.props.route.params.data.IdCategorie != 0
    ) {
      products = await fetch_url_get(
        api_products_by_id_categorie +
          this.props.route.params.data.IdCategorie +
          "&language=1"
      );
      // console.log(api_products_by_id_categorie + this.props.route.params.data.IdCategorie + '&language=1');
      this.setState({
        products: products,
        isLoading: false,
      });
    } else if (
      (!this.props.route.params.data.IdCategorie ||
        this.props.route.params.data.IdCategorie == 0) &&
      this.props.route.params.data.SousSousSousTitre != null
    ) {
      products = await fetch_url_get(
        api_get_search_result +
          this.props.route.params.data.SousSousSousTitre +
          "&language=1"
      );
      this.setState({
        products: products,
        isLoading: false,
      });
    } else {
      // console.log( api_get_search_result +  + '&language=1')
      products = await fetch_url_get(
        api_get_search_result +
          this.props.route.params.data.Text +
          "&language=1"
      );
      // products = await fetch_url_get(api_get_search_result + this.state.search + '&language=1' );
      this.setState({
        products: products,
        isLoading: false,
      });
      products = await fetch_url_get(
        api_get_search_result + this.props.route.params.data + "&language=1"
      );
      // products = await fetch_url_get(api_get_search_result + this.state.search + '&language=1' );
      // this.setState({ selectedValue: this.props.route.params.data });

      this.setState({
        products: products.product,
        isLoading: false,
      });
      console.log(this.state.products.product);
      //      return (
      //         <SearchList products={this.state.products} navigation={this.props.navigation} selectedValue={this.state.selectedValue} />
      //         );
    }
  };

  runDirectSearch = async (textSearch) => {
    this.setState({ isLoading: true });
    // alert(textSearch);
    var products = null;
    products = await fetch_url_get(
      api_get_search_result + textSearch + "&language=1"
    );

    // console.log("--------001------");
    // console.log(products);
    // console.log(this.state.isLoading)
    // console.log("--------001------");

    this.setState({
      products: products.product,
      selectedValue: textSearch,
      isLoading: false,
    });

    // console.log("--------002------");
    // console.log(this.state.products);
    // console.log(this.state.isLoading);
    // console.log("--------002------");
    if (!this.state.isLoading && this.state.products) {
      // console.log(this.state.IdCategories)
      return (
        <SearchList
          products={this.state.products.product}
          navigation={this.props.navigation}
          selectedValue={this.state.selectedValue}
        />
      );
    }
  };
 

  getManufacturers = async () => {
    var manufacturers = null;
    manufacturers = await fetch_url_get(getProductsManufacturer);
    this.setState({
      manufacturers: manufacturers.manufacturer,
    });
  };
  displayMarques = () => {
    this.getManufacturers();
    if (this.state.manufacturers) {
      let data = this.state.manufacturers;
      return (
        <View>
          <SelectDropdown
            data={data}
            defaultButtonText={"Séléctionner la Marque"}
            buttonStyle={{ width: "96%", marginLeft: "2%", marginRight: "2%" }}
            onSelect={(selectedItem, index) => {
              //console.log(selectedItem, index);
              this.setState({ selectedValue: selectedItem.id });
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem.name;
            }}
            rowTextForSelection={(item, index) => {
              return item.name;
            }}
          />
        </View>
      );
    }
  };

  displayLoading = () => {
    if (this.state.isLoading) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <DotsLoader color={primaryColor} betweenSpace={20} size={20} />
        </View>
      );
    }
  };

  displayProduct = () => {
    if (!this.state.isLoading && this.state.products) {
      // console.log(this.state.IdCategories)
      return (
        <SearchList
          products={this.state.products.product}
          navigation={this.props.navigation}
          selectedValue={this.state.selectedValue}
        />
      );
    }
  };

  displayTitre = (titre) => {
    if (this.state.titre) {
      return <Text style={{ color: "#000000", fontSize: 16 }}> {titre} </Text>;
    }
  };

  async componentDidMount() {
    this.setState({
      IdCategories: this.props.route.params.data.IdCategorie,
      titre: this.props.route.params.data.SousSousSousTitre,
      Text: this.props.route.params.data.text,
    });
    this.setState({
      isLoading: true,
    });

    await this.getGuest();
    this.getProduct();
    this.getManufacturers();
    this.setState({
      isLoading: false,
    });
  }

  componentDidUpdate(prevProps) {}

  render() {
    // console.log(this.props)
    // onSubmitEditing={()=> {
    //     this.setState({stringToSearch : this.state.search})
    // }}
    return (
      <View style={{ flex: 1, maxWidth: "100%", marginBottom: "2%" }}>
        <ScrollView>
          <View
            style={{
              height: 50,
              padding: "2%",
              marginBottom: 10,
            }}
          >
            <SearchBar
              returnKeyType="search"
              onSubmitEditing={() => {
                // this.props.route.params.data.SousSousSousTitre = this.state.search;
                //alert(this.state.search);

                this.runDirectSearch(this.state.monsearch);

                // products = await fetch_url_get(api_get_search_result + this.props.route.params.data.SousSousSousTitre + '&language=1');
                // this.setState({
                //     products: products
                // });
              }}
              placeholder="Rechercher..."
              onChangeText={(text) => {
                this.updateSearch(text);
              }}
              value={this.state.monsearch}
              inputContainerStyle={{
                borderRadius: 50,
                backgroundColor: "#FFFFFF",
                height: "90%",
              }}
              containerStyle={{
                backgroundColor: "#FFFFFF",
                borderBottomWidth: 0,
                borderTopWidth: 0,
                height: "100%",
                width: "100%",
                padding: 0,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 50,
                flex: 1,
              }}
              inputStyle={{
                fontSize: 14,
              }}
              searchIcon={() => {
                return (
                  <Icon
                    type="font-awesome"
                    name="search"
                    size={18}
                    iconStyle={{ paddingLeft: 5 }}
                  />
                );
              }}
            />
          </View>
          <View>{/* {this.displayMarques()} */}</View>
          <View style={{ marginTop: 10 }}>
            {this.displayLoading()}
            {this.displayProduct()}
          </View>
        </ScrollView>
        <FooteraSocial navigation={this.props.navigation} />
      </View>
    );
  }
}

export default Query;