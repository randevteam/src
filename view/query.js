import React from 'react';

import {
  View,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
  Picker,
  ScrollView,
} from 'react-native';
import {DotsLoader} from 'react-native-indicator';
import {SearchBar, Icon} from 'react-native-elements';
import SearchListTwo from '../components/SearchListTwo';
import {AuthContext} from '../helper/context/auth-context';
import {
  api_get_search_result,
  getProductsManufacturer,
  api_products_by_id_categorie,
} from '../helper/api_url';

import {fetch_url_get} from '../helper/function/common-function/fetch';
import SearchList from '../components/search_list';
import {primaryColor, title_search_color} from '../helper/color';
import ImageBackgroundGlobal from '../components/image_background_global';
import FooteraSocial from './FooteraSocial';
import detail_product_styles from './style/detail_product_style';

import SelectDropdown from 'react-native-select-dropdown';

import {db} from '../configs';
import {
  ref,
  onValue,
  orderByChild,
  equalTo,
  get,
  query,
} from 'firebase/database';

class Query extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      guest: null,
      products: [],
      productTwo: [],
      isLoading: false,
      IdCategories: null,
      titre: null,
      stringToSearch: null,
      mode: false,
      Text: null,
      manufacturers: null,
      selectedValue: '',
      monsearch: '',
      sortDirection: 'asc',
      manufactureData: [],
      productFiltre: [],
    };
  }

  updateSearch = text => {
    this.setState({monsearch: text});
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
    this.setState({isLoading: true});
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
      const startCountRef = query(
        ref(db, 'getCategories/category'),
        orderByChild('id'),
        equalTo(this.props.route.params.data.IdCategorie.toString()),
      );
      // console.log('id');
      // console.log(typeof this.props.route.params.data.IdCategorie.toString());
      get(startCountRef).then(snapshot => {
        var data = [];
        snapshot.forEach(snapshotChild => {
          data.push(snapshotChild.val());
        });

        this.setState({
          products: data,
          isLoading: false,
        });

        // this.setState({
        //   product: data,
        //   loading: false,
        // });
        // Object.values(this.state.product).map(item =>
        //   this.setState({
        //     id_category: item.associations.categories.category,
        //   }),
        // );
      });
      // products = await fetch_url_get(
      //   api_products_by_id_categorie +
      //     this.props.route.params.data.IdCategorie +
      //     "&language=1"
      // );
      // console.log(api_products_by_id_categorie + this.props.route.params.data.IdCategorie + '&language=1');
    } else if (
      (!this.props.route.params.data.IdCategorie ||
        this.props.route.params.data.IdCategorie == 0) &&
      this.props.route.params.data.SousSousSousTitre != null
    ) {
      products = await fetch_url_get(
        api_get_search_result +
          this.props.route.params.data.SousSousSousTitre +
          '&language=1',
      );
      this.setState({
        products: products,
        isLoading: false,
      });
    } else {
      this.setState({isLoading: true});
      // console.log( api_get_search_result +  + '&language=1')
      // products = await fetch_url_get(
      //   api_get_search_result +
      //     this.props.route.params.data.Text +
      //     '&language=1',
      // );
      // // products = await fetch_url_get(api_get_search_result + this.state.search + '&language=1' );
      // this.setState({
      //   products: products,
      //   isLoading: false,
      // });
      products = await fetch_url_get(
        api_get_search_result + this.props.route.params.data + '&language=1',
      );
      // products = await fetch_url_get(api_get_search_result + this.state.search + '&language=1' );
      // this.setState({ selectedValue: this.props.route.params.data });

      this.setState({
        productTwo: products.product.product,
        manufactureData: products.product.product,
        monsearch: this.props.route.params.data,
        isLoading: false,
      });
      // console.log('--------00manufacturers------');
      // console.log(this.state.productTwo);
      // console.log(this.state.isLoading);
      // console.log('--------001manufacturers------');
      //      return (
      //         <SearchList products={this.state.products} navigation={this.props.navigation} selectedValue={this.state.selectedValue} />
      //         );
    }
  };

  runDirectSearch = async textSearch => {
    this.setState({isLoading: true});
    // const startCountRef = query(
    //   ref(db, 'getAllproductsBrut/product/'),
    //   orderByChild('name/language'),
    //   equalTo('Chaussures'),
    // );
    // get(startCountRef).then(snapshot => {
    //   var data = [];
    //   snapshot.forEach(snapshotChild => {
    //     data.push(snapshotChild.val());
    //   });
    // console.log(data);
    // this.setState({
    //   products: products.product,
    //   selectedValue: textSearch,
    //   isLoading: false,
    // });
    // });
    // alert(textSearch);
    var products = [];
    products = await fetch_url_get(
      api_get_search_result + textSearch + '&language=1',
    );

    this.setState({
      productTwo: products.product.product,
      manufactureData: products.product.product,
      selectedValue: textSearch,
      isLoading: false,
    });

    // console.log('--------00manufacturers------');
    // console.log(this.state.productTwo);
    // console.log(this.state.isLoading);
    // console.log('--------001manufacturers------');

    // this.setState({
    //   products: resultat,
    //   selectedValue: textSearch,
    //   isLoading: false,
    // });

    // console.log("--------002------");
    // console.log(this.state.products);
    // console.log(this.state.isLoading);
    // console.log("--------002------");
    if (!this.state.isLoading && this.state.productTwo) {
      // console.log('--------003------');
      // console.log(this.state.productTwo);
      // console.log(this.state.isLoading);
      // console.log('--------003------');
      return (
        <SearchListTwo
          products={this.state.productTwo}
          navigation={this.props.navigation}
          selectedValue={this.state.selectedValue}
        />
      );
    }
  };
  handleSortDirectionChangeFiltre = (index, value) => {
    const {productFiltre} = this.state;

    if (value === 'asc') {
      this.setState({
        productFiltre: productFiltre.sort((a, b) =>
          a.name.language.localeCompare(b.produit),
        ),
        sortDirection: 'asc',
      });
    } else {
      this.setState({
        productFiltre: productFiltre.sort((a, b) =>
          b.name.language.localeCompare(a.produit),
        ),
        sortDirection: 'desc',
      });
    }
  };
  handleSortDirectionChange = (index, value) => {
    const {productTwo} = this.state;

    if (value === 'asc') {
      this.setState({
        productTwo: productTwo.sort((a, b) =>
          a.name.language.localeCompare(b.produit),
        ),
        sortDirection: 'asc',
      });
    } else {
      this.setState({
        productTwo: productTwo.sort((a, b) =>
          b.name.language.localeCompare(a.produit),
        ),
        sortDirection: 'desc',
      });
    }
  };

  getManufacturers = id => {
    const filteredProducts = this.state.productTwo.filter(
      product => product.id_manufacturer === id,
    );
    this.setState({productFiltre: filteredProducts});
    // console.log(filteredProducts);
    // var manufacturers = null;
    // manufacturers = await fetch_url_get(getProductsManufacturer);
    // this.setState({
    //   manufacturers: manufacturers.manufacturer,
    // });
  };
  displayMarques = () => {
    // this.getManufacturers();
    if (this.state.manufactureData.length > 0) {
      let newData = this.state.manufactureData.map(item => {
        return {name: item.manufacturer_name, id: item.id_manufacturer};
      });
      const data = Array.from(new Set(newData.map(JSON.stringify)), JSON.parse);
      // console.log(data);
      const {sortDirection} = this.state;
      return (
        <View>
          <SelectDropdown
            data={data}
            defaultButtonText={'Séléctionner la Marque'}
            buttonStyle={{width: '96%', marginLeft: '2%', marginRight: '2%'}}
            onSelect={(selectedItem, index) => {
              //console.log(selectedItem, index);
              // this.setState({selectedValue: selectedItem.id}),
              this.getManufacturers(selectedItem.id);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem.name;
            }}
            rowTextForSelection={(item, index) => {
              return item.name;
            }}
          />
          {this.AfficheFiltreAZ()}
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
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <DotsLoader color={primaryColor} betweenSpace={20} size={20} />
        </View>
      );
    }
  };

  displayProduct = () => {
    if (
      !this.state.isLoading &&
      this.state.products &&
      this.state.productTwo.length === 0
    ) {
      var tpl = Object.values(this.state.products).map(data => (
        <SearchList
          products={data.associations.products.product}
          navigation={this.props.navigation}
          selectedValue={this.state.selectedValue}
        />
      ));
      return tpl;
    }
  };

  AfficheProduct = () => {
    if (
      !this.state.isLoading &&
      this.state.productTwo.length &&
      this.state.productFiltre.length === 0
    ) {
      return (
        <SearchListTwo
          products={this.state.productTwo}
          navigation={this.props.navigation}
          selectedValue={this.state.selectedValue}
        />
      );
      // <SearchListTwo
      //   products={this.state.productTwo}
      //   navigation={this.props.navigation}
      //   selectedValue={this.state.selectedValue}
      // />
    } else {
      return (
        <SearchListTwo
          products={this.state.productFiltre}
          navigation={this.props.navigation}
          selectedValue={this.state.selectedValue}
        />
      );
    }
  };
  AfficheFiltreAZ = () => {
    const {sortDirection} = this.state;
    if (
      !this.state.isLoading &&
      this.state.productTwo.length &&
      this.state.productFiltre.length === 0
    ) {
      return (
        <SelectDropdown
          data={['A-Z', 'Z-A']}
          onSelect={(index, value) =>
            this.handleSortDirectionChange(index, value)
          }
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          defaultButtonText="Trier par"
          buttonStyle={{width: '100%'}}
          buttonTextStyle={{color: '#000'}}
          dropdownStyle={{backgroundColor: '#fff'}}
          dropdownTextStyle={{color: '#000'}}
          selectedOptionIndex={sortDirection === 'asc' ? 0 : 1}
        />
      );
      // <SearchListTwo
      //   products={this.state.productTwo}
      //   navigation={this.props.navigation}
      //   selectedValue={this.state.selectedValue}
      // />
    } else {
      return (
        <SelectDropdown
          data={['A-Z', 'Z-A']}
          onSelect={(index, value) =>
            this.handleSortDirectionChangeFiltre(index, value)
          }
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          defaultButtonText="Trier par"
          buttonStyle={{width: '100%'}}
          buttonTextStyle={{color: '#000'}}
          dropdownStyle={{backgroundColor: '#fff'}}
          dropdownTextStyle={{color: '#000'}}
          selectedOptionIndex={sortDirection === 'asc' ? 0 : 1}
        />
      );
    }
  };

  displayTitre = titre => {
    if (this.state.titre) {
      return <Text style={{color: '#000000', fontSize: 16}}> {titre} </Text>;
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
    // this.getManufacturers();
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
      <View style={{flex: 1, maxWidth: '100%', marginBottom: '2%'}}>
        <ScrollView>
          <View
            style={{
              height: 50,
              padding: '2%',
              marginBottom: 10,
            }}>
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
              onChangeText={text => {
                this.updateSearch(text);
              }}
              value={this.state.monsearch}
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
                    iconStyle={{paddingLeft: 5}}
                  />
                );
              }}
            />
          </View>
          <View>{this.displayMarques()}</View>
          <View style={{marginTop: 10}}>
            {/* {this.AfficheFiltreAZ()} */}
            {/* {this.displayMarques()} */}
            {this.displayLoading()}
            {/* {this.state.productTwo && (
              <SearchListTwo
                products={this.state.productTwo}
                navigation={this.props.navigation}
                selectedValue={this.state.selectedValue}
              />
            )}
            {} */}
            {this.AfficheProduct()}
            {/* {this.state.productFiltre ? (
              <SearchListTwo
                products={this.state.productFiltre}
                navigation={this.props.navigation}
                selectedValue={this.state.selectedValue}
              />
            ) : (
              <SearchListTwo
                products={this.state.productTwo}
                navigation={this.props.navigation}
                selectedValue={this.state.selectedValue}
              />
            )} */}
            {this.displayProduct()}
          </View>
        </ScrollView>
        <FooteraSocial navigation={this.props.navigation} />
      </View>
    );
  }
}

export default Query;
