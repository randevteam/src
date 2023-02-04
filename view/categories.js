import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import {List, Text} from 'react-native-paper';
import {fetch_url_get} from '../helper/function/common-function/fetch';
import {DotsLoader} from 'react-native-indicator';
import {api_url, api_get_category_by_id_url} from '../helper/api_url';
import {paire_color, impaire_color} from '../helper/color';
import Flatlistercategory from '../components/Flatlistercategory';
global.idCategory_main = 2;
import {db} from '../configs';
import {
  ref,
  onValue,
  orderByChild,
  equalTo,
  get,
  query,
} from 'firebase/database';
class Categories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      children: [],
      isLoading: true,
      activeSections: [],
      expanded: true,
      idCategorie: null,
      dataCategory: null,
      isLoading: false,
    };
  }
  getCategory = async () => {
    // console.log("***home***idCategory_main****");
    // console.log(global.idCategory_main);
    // console.log("***home***idCategory_main****");

    // var category = null;
    // category = await fetch_url_get(
    //   api_get_category_by_id_url + global.idCategory_main,
    // );
    // // console.log("********");
    // // console.log(category);
    // // console.log("********");
    // this.setState({
    //   dataCategory: category,
    // });

    const startCountRef = query(
      ref(db, 'getCategories/category'),
      orderByChild('id'),
      equalTo(global.idCategory_main),
    );
    get(startCountRef).then(snapshot => {
      var data = [];
      snapshot.forEach(snapshotChild => {
        data.push(snapshotChild.val());
      });
      // console.log('--------- Category List ------------');
      // console.log(data);
      this.setState({
        // dataCategory: data,
        // loading: false,
      });
    });
  };
  showProductList = data => {
    this.props.navigation.navigate('Query', {
      screen: 'Query',
      params: {
        data: {
          IdCategorie: data.IdCategorie,
          SousSousSousTitre: data.titre,
          Text: data.text,
        },
      },
    });
  };
  displayLoading = () => {
    if (this.state.isLoading) {
      return (
        <View
          style={{
            /* flex: 1, */
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 150,
          }}>
          <DotsLoader color={primaryColor} betweenSpace={20} size={20} />
        </View>
      );
    }
  };

  displayCategory = () => {
    // console.log("===========****===========");
    // console.log(this.state.isLoading);
    // console.log("***")
    // console.log(this.state.dataCategory);
    // console.log("===========****==========");

    if (!this.state.isLoading && this.state.dataCategory) {
      const data = this.state.dataCategory;

      console.log('=======00E000=');
      // // //console.log(api_url + "c/" + data.id + "-category_default" + "/" + data.link_rewrite.language + ".jpg");
      console.log(data);
      console.log('=======00E000=');

      if (data) {
        return (
          <View>
            <View style={styles.title_view}>
              <Text style={styles.title_text}>
                {data.name.language ? data.name.language : ''}
              </Text>
            </View>

            <Image
              style={styles.img_product}
              source={{
                uri:
                  api_url +
                  'c/' +
                  data.id +
                  '-category_default' +
                  '/' +
                  data.link_rewrite.language +
                  '.jpg',
              }}
            />

            {/* <View style={{ flex: 1, margin: 20 }}></View> */}
            <View style={styles.title_view}>
              <TouchableOpacity
                style={styles.title_text}
                onPress={() => {
                  this.props.navigation.navigate('Categorie');
                }}>
                <Text style={styles.title_text}>Les Sous-rubriques</Text>
              </TouchableOpacity>
            </View>

            <View>
              <Flatlistercategory
                key={data.id}
                idCategory={data.id}
                navigation={this.props.navigation}
              />
            </View>
          </View>
        );
      } else {
        return (
          <View>
            <Text>Cette catégorie n'existe pas.</Text>
          </View>
        );
      }
    }
  };

  async componentDidMount() {
    this.setState({
      isLoading: true,
    });
    // await this.get_category();
    await this.getCategory();
    this.setState({
      isLoading: false,
    });
  }

  showDetail = data => {
    this.props.navigation.navigate('Search', {
      screen: 'Search',
      params: {data: data},
    });
  };

  //   Accordion = (data) => {
  //     if (data.length != 0) {
  //       return data.map((item, index) => {
  //         var color = index % 2 == 0 ? paire_color : impaire_color;
  //         if (item.SousMenu.length != 0) {
  //           var SousMenu = item.SousMenu.map((item) => {
  //             var list = item.SousSousTitre.map((item) => {
  //               return (
  //                 <List.Item
  //                   title={item.SousSousSousTitre}
  //                   style={{ marginLeft: 20, color: "#F2F1EF" }}
  //                   left={(props) => <List.Icon {...props} icon="circle-small" />}
  //                   onPress={() => this.showDetail(item)}
  //                 />
  //               );
  //             });

  //             return (
  //               <List.AccordionGroup>
  //                 <List.Accordion
  //                   title={
  //                     <Text style={{ marginLeft: 20 }}>
  //                       {item.SousTitre[0].SousMenu}{" "}
  //                     </Text>
  //                   }
  //                   id="1"
  //                   style={{ backgroundColor: "#ABB7B7" }}
  //                 >
  //                   {list}
  //                 </List.Accordion>
  //               </List.AccordionGroup>
  //             );
  //           });
  //         }

  //         return (
  //           <View>
  //             {/* <List.AccordionGroup>
  //               <List.Accordion
  //                 title={item.MenuName[0].Menu_Name}
  //                 id="1"
  //                 style={{ backgroundColor: color }}
  //               >
  //                 {SousMenu}
  //               </List.Accordion>
  //             </List.AccordionGroup> */}
  //             {this.displayCategory()}
  //           </View>
  //         );
  //       });
  //     }
  //   };

  render() {
    const {data, isLoading} = this.state;

    return (
      <SafeAreaView>
        {this.displayCategory()}
        {/* <ScrollView>
          <View style={{ marginTop: "1%" }}>{this.Accordion(data)}</View>
        </ScrollView> */}
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
    textAlign: 'center',
  },
  title_view: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title_text: {
    fontSize: 25,
    color: '#713F18',
    fontStyle:'italic',
  },
  img_product: {
    height: 300,
    width: '95%',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
});

export default Categories;
