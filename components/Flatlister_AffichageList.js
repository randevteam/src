import React , { Component } from 'react';
import { View, FlatList, StyleSheet, Text, ScrollView, StatusBar } from 'react-native';


import CardProduct from './card_products';
import { api_products_by_id_categorie, api_get_promotion_state } from '../helper/api_url'
import { fetch_url_get , fetch_url_get_and_store } from '../helper/function/common-function/fetch';


// const fetch_url_get = async (url, data = null) => {
//   var data = null;
//   await fetch(url)
//       .then((response) => response.json())
//       .then((json) => {
//           data = json;
//       }).catch((error) => {
//           return error;
//       });
//   if(data) return data;
// }

class Flatlister_AffichageList extends Component {


  constructor(props) {
    super(props)
    this.state = {
        guest: null,
        products: null,
        isLoading: false,
        idCategories: null ,
        data: [],
        data1: [],
    }
}

  renderItem = ( item ) => {
    return  (
      <CardProduct item={item.item} showDetail={this.showDetail}/>
    )
  }
   
  ;

  getProduct = async (idCategories) => {
    var products = null;
    products = await fetch_url_get_and_store( api_products_by_id_categorie + this.props.idCategories  );
    this.setState({
        products: products.product
    });
  }
  getPromo = async () => {
    var promo = null;
    promo = await fetch_url_get(api_get_promotion_state);

    this.setState({
        promo: promo.specific_price
    });
  }

  componentDidMount(){
          // console.log("ComponentDidMount"       
        this.getProduct();
        this.getPromo();
        // if (this.state.products) {
        //   const data = this.state.products;
        //   console.log(data);
        //   const data1 = this.state.promo;
        //     data.map((item) => {
        //       data1.map((promotion) => {
        //         if(promotion.id_product == item.id){
        //           console.log("promo")
        //         }
        //       })
        //     })
        // }
        

  }

  showDetail = (data) => {
    this.props.navigation.navigate('DetailProduct', {
        screen: 'DetailProduct',
        params: { data: data.id ,
        defaultGroup: this.context.customer ? this.customer.id_default_group: 1}
    });
}
  
  render(){
    
    if(this.state.products){
      const data =  this.state.products ;
    }
    // console.log(this.state.products);
    if(this.state.promo){
      
      this.state.promo.map((promotion)=>{
        console.log(promotion);
        this.state.products.map((produit)=>{
          console.log(produit);
          if(promotion.id_product == produit.id){
            return (
                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} >
                  <FlatList
                    progressViewOffset={1}
                    horizontal={true}
                    data={produit}
                    renderItem={this.renderItem}
                    keyExtractor={item => this.props.key}
                  />
                </ScrollView>     
            );
          } else {
            return (

              <Text >
                0
              </Text>     
      
          );
          }
        })
      })
      
    } else {
      return (

          <Text >
            Pas de promotion dans cette catégorie!
          </Text>     
  
      );
    }
  }
  

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#20232A',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    height : 200, 
    width : 250
  },
  title: {
    fontSize: 32,
  },
});

export default Flatlister_AffichageList ;