import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Text, ScrollView, StatusBar } from 'react-native';

import { api_get_category_by_id_url } from '../helper/api_url'
import { fetch_url_get } from '../helper/function/common-function/fetch';
import {Button} from 'react-native-elements';
import Categdetails from '../view/Categdetails';
import CardCategorydetails from './card_category';



class Flatlistercategorydetails extends Component {


  constructor(props) {
    super(props)
    this.state = {
      idCategory: null,
      guest: null,
      dataCategory: null,
      isLoading: false,
    }
  }

  getCategory = async (idCategory) => {
    var category = null;
    category = await fetch_url_get(api_get_category_by_id_url + this.props.idCategory);
    console.log("======1111111111=");
    console.log(category);
    console.log("=======1111111111=");
    this.setState({
      dataCategory: category,
    });
    //console.log("==========33333333=");
    //console.log(this.state.dataCategory);
    //console.log("===========333333=");
  }

  componentDidMount() {
    // //console.log("ComponentDidMount"       
    this.getCategory();
  }

  showDetail = (data) => {

    // global.idCategory_main = data.id;

    // console.log("***Flatlistcategorydetails***idCategory_main****");
    // console.log(global.idCategory_main);
    // console.log("***Flatlistcategorydetails***idCategory_main****");

    this.props.navigation.navigate('Categdetailssub', {
      screen:'Categdetailssub',
      params: {
        idCategory: data
      }
    });
  }

  renderItem = ( item ) => {
    return  (
      <CardCategorydetails item={item.item} showDetail={this.showDetail}/>
    )
  }

  render() {

    if (this.state.dataCategory) {


      const ItemCategory = this.state.dataCategory;
      // console.log("==========222222222=");
      // console.log(ItemCategory.associations.categories.category);
      // console.log("===========2222222222=");

      return (

        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} >
          <FlatList
            progressViewOffset={1}
            horizontal={true}
            data={ItemCategory.associations.categories.category}
            renderItem={this.renderItem}
            keyExtractor={item => this.props.key}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={0.1}
          />
        </ScrollView>
      );

    } else {
      return (
        <Text>Pas de sous-catégorie</Text>
      )

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
    height: 200,
    width: 250
  },
  title: {
    fontSize: 32,
  },
});

export default Flatlistercategorydetails;