import React from 'react';

import {
  View,
  FlatList,
  StyleSheet,
  ScrollView,
  Text,
  Alert,
  TouchableOpacity
} from 'react-native';
import { DotsLoader } from 'react-native-indicator';
import { Icon, Button, Image } from 'react-native-elements';
import { AuthContext } from '../helper/context/auth-context';
import {
  api_get_product_home_url,
  api_get_HomeOrganizer,
  api_get_all_notif,
  api_get_category_url,
  api_get_wishlist,
  api_post_wishlist_,
  api_url,
  api_get_category_by_id_url,
  getLatestProducts,
  api_get_wishlist_categories,
  viewAPI,
} from "../helper/api_url";
import { fetch_url_get,fetch_url_post } from '../helper/function/common-function/fetch';
import { primaryColor } from '../helper/color';
import Flatlistercategory from '../components/Flatlistercategory';
import FlatLister from '../components/Flatlister';
import { notification } from '../notification/Notification';
import FooteraSocial from './FooteraSocial';
import HTMLView from 'react-native-htmlview';
import { Card } from 'react-native-paper';
import card_product_styles from '../components/card_product_style';
import Wishlist from '../components/Wishlist_categories';
// global.idCategory_main = 2
//global.signBack = false
//global.signBackName = 'View';
class Home extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    // this.state = {};
  }
  state = {
    dataCategory: null,
    idSelect: null,
    data: [],
    datas: [],
    Data: [],
    Fav: [],
    guest: null,
    isLoading: false,
    idCategorie: null,
    wished: false,
    list: null,
    id_product: null,
    isModalVisible: false,
    checked: false,
    id_wishlistfromModal: null,
  };

  getProduct_Viewed = async () => {
    const resultat = await fetch_url_get(viewAPI);
    this.setState({
      Data: resultat,
    });
    // console.log("viewed Product begin")
    // console.log(resultat)
    // console.log("viewed Product after")
  };
  // getFavoris = async()=>{
  //   let result = await fetch_url_get(api_get_wishlist+this.context.customer.id);
  //   this.setState({Fav : result.product})
  //   // console.log('list de mes favoris '+JSON.stringify(this.state.Fav))

  // }

  showModal = (id) => this.setState({ isModalVisible: true, idSelect: id });
  hideModal = () => this.setState({ isModalVisible: false });
  redHeart = () => this.setState({ wished: true });
  id_wishlistfromModal = (id_wishlist) =>
    this.setState({ id_wishlistfromModal: id_wishlist });

  get_notif = async () => {
    try {
      const response = await fetch_url_get(api_get_all_notif);
      const json = await response;
      this.setState({
        data: json,
      });
    } catch (error) {
      // console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };
  showDetail = (data) => {
    this.props.navigation.navigate("DetailProduct", {
      screen: "DetailProduct",
      params: {
        data: data ? data.id : data.id_product,
        defaultGroup: this.context.customer
          ? this.context.customer.id_default_group
          : 1,
      },
    });
  };
  showDetails = (data) => {
    this.props.navigation.navigate("DetailProduct", {
      screen: "DetailProduct",
      params: {
        data: data.id_product,
        defaultGroup: this.context.customer
          ? this.context.customer.id_default_group
          : 1,
      },
    });
  };
  getGuest = async () => {
    this.get_notif();
    var guest = null;
    guest = await this.context.getGuest();
    if (guest) {
      this.setState({
        guest: guest,
      });
      this.context.guest = guest;
    }
  };

  // getCategory = async () => {
  //   // console.log("***home***idCategory_main****");
  //   // console.log(global.idCategory_main);
  //   // console.log("***home***idCategory_main****");

  //   var category = null;
  //   category = await fetch_url_get(
  //     api_get_category_by_id_url + global.idCategory_main
  //   );
  //   // console.log("********");
  //   // console.log(category);
  //   // console.log("********");
  //   this.setState({
  //     dataCategory: category,
  //   });
  // };

  // showProductList = data => {

  //   this.props.navigation.navigate('Query', {
  //     screen: 'Query',
  //     params: {
  //       data: {
  //         IdCategorie: data.IdCategorie,
  //         SousSousSousTitre: data.titre,
  //         Text: data.text,
  //       },
  //     },
  //   });

  // };

  displayLoading = () => {
    if (this.state.isLoading) {
      return (
        <View
          style={{
            /* flex: 1, */
            alignItems: "center",
            justifyContent: "center",
            marginTop: 150,
          }}
        >
          <DotsLoader color={primaryColor} betweenSpace={20} size={20} />
        </View>
      );
    }
  };

  /*  recheck here randev  */

  displayCategory = () => {
    // console.log("===========****===========");
    // console.log(this.state.isLoading);
    // console.log("***")
    // console.log(this.state.dataCategory);
    // console.log("===========****==========");

    if (!this.state.isLoading) {
      // && this.state.dataCategory
      // const data = this.state.dataCategory;

      // console.log("=======00E000=");
      // //console.log(api_url + "c/" + data.id + "-category_default" + "/" + data.link_rewrite.language + ".jpg");
      // console.log(data);
      // console.log("=======00E000=");

      // if (data) {
      return (
        <View>
          <View style={styles.title_view}>
            <Text style={styles.title_text}>Accueil</Text>
          </View>

          <Image
            style={styles.img_product}
            source={{
              uri: "https://www.ow.randev.ovh/modules/ps_imageslider/images/a8711f28ec87f9394b89282ae9a04c9dea0b3fdc_musto rentrée 2019 1920 x 674 px_V2.jpg",
            }}
          />

          <View style={{ flex: 1, margin: 20 }}>
            {/* <HTMLView
                value={
                  data.description.language &&
                  typeof data.description.language !== "object" &&
                  data.description.language !== null
                    ? data.description.language
                    : ""
                }
                stylesheet={styles}
              /> */}
            <Text>
              Passion-Campagne: Le sérieux d'une boutique, la souplesse d'un
              site internet ! Le seul site internet chasse et campagne à avoir
              une boutique à Paris (17eme arrondissement). Passion Campagne,
              boutique de vêtements et accessoires de chasse à Paris vous
              présente dans sa boutique en ligne une large gamme de vêtements de
              chasse, chaussures, knickers, bottes, vestes chasse pour hommes,
              femmes et enfants. Passion Campagne vous propose, chasseur ou
              amoureux de la campagne, des équipements de qualité en provenance
              des plus grandes marques telles que : Härkila, Le Chameau,
              Barbour, Deerhunter, Chiruca, DuBarry, Laksen, Chevalier, Ariat,
              Seeland, Club Interchasse, Pennine, Beretta, DeXShell, Alexandre
              Mareuil, Maremmano, Stetson, Jumfil, Musto, Fynch-Hatton,
              Filson...
            </Text>
          </View>

          <View style={styles.title_view}>
            <Text style={styles.title_text}>PRODUITS NOUVEAUX</Text>
          </View>

          <View>
            <FlatList
              data={this.state.datas}
              renderItem={this.renderItem}
              keyExtractor={(item) => item.id}
              horizontal={true}
            />
            <View style={styles.title_view}>
              <Text style={styles.title_text}>PRODUITS DEJA VUE</Text>
            </View>
            <FlatList
              data={this.state.Data}
              renderItem={this.renderItems}
              keyExtractor={(item) => item.id_product}
              horizontal={true}
            />
          </View>
          <View style={styles.title_view}></View>

          <View style={styles.title_view}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.props.navigation.navigate("Categorie");
              }}
            >
              <Text style={[styles.title_texts, { color: "white" }]}>
                Voir les SOUS-CATEGORIES
              </Text>
            </TouchableOpacity>
          </View>

          {/* <View>
              <Flatlistercategory
                key={data.id}
                idCategory={data.id}
                navigation={this.props.navigation}
              />
            </View> */}
        </View>
      );
      // } else {
      //   return (
      //     <View>
      //       <Text>Cette catégorie n'existe pas.</Text>
      //     </View>
      //   );
      // }
    }
  };

  isIncreasing(xs) {
    var prev, cur;

    for (var i = 0; i < xs.length; i++) {
      cur = xs[i];
      if (i && cur !== prev && cur !== prev + 1) return false;
      prev = cur;
    }
    return true;
  }

  getData = async () => {
    const resultat = await fetch_url_get(getLatestProducts);
    //    console.log('les produits nouveaut ' +JSON.stringify (resultat.product))
    this.setState({ datas: resultat.product });
  };
  CheckIfProductAreAlreadyWishlisted = async () => {
    if (this.state.wished == false) {
      var url = api_post_wishlist_ + "CheckProducts";
      var result = null;
      result = await fetch_url_post(url, {
        id_customer: this.context.customer.id,
        id_product: this.props.item.id,
      });
      console.log(result);
      if (result) {
        this.setState({ wished: true });
      }
    }
  };

  async componentDidMount() {
    // console.log('mon id '+ this.context.customer.id)
    this.setState({
      isLoading: true,
    });
    await this.getData(),
      // await this.getFavoris(),
      await this.getProduct_Viewed(),
      await this.getGuest();
    await this.getCategory();
    this.setState({
      isLoading: false,
    });
    this.getidCategorieWishlist();

    if (this.context.customer.id != null) {
      let result = await fetch_url_get(
        api_get_wishlist + this.context.customer.id
      );
      this.setState({ Fav: result.product });
    }

    var array = [];

    for (let prop in this.state.data) {
      array.push(this.state.data[prop]);
    }

    //8  console.log('json=', array[0].titre);

    var a = await this.isIncreasing(array);

    await this.get_notification(
      "1",
      array[array.length - 1].titre,
      array[array.length - 1].description,
      array[array.length - 1].media,
      array[array.length - 1].lien
    );
    this.setState({
      id_product: this.props.item.id,
    });
    this.CheckIfProductAreAlreadyWishlisted();
    var imageurl =
      api_url +
      item.id_default_image +
      "-small_default" +
      "/" +
      item.link_rewrite.language +
      ".jpg";
    Image.prefetch(imageurl);
  }

  get_notification = (id, titre, desc, image, url) => {
    notification.configure(url);
    notification.buatchannel("1");
    notification.kirimNotificationJadwal(id, titre, desc, image);
  };
  getidCategorieWishlist = async () => {
    var list = await fetch_url_get(
      api_get_wishlist_categories + this.context.customer.id
    );

    list.map((item) => {
      this.setState({
        list: item.id_wishlist,
      });
    });
  };
  //   async componentDidUpdate(prevProps, prevState) {
  //     if (prevState != this.state.Fav) {
  //       let result = await fetch_url_get(api_get_wishlist+this.context.customer.id);
  //           this.setState({Fav : result.product})
  //     }
  // }
  // async componentDidUpdate(prevProps, prevState){

  //     let result = await fetch_url_get(api_get_wishlist+this.context.customer.id);
  //     this.setState({Fav : result.product})

  // }
  removeToMyWishlist = async (id) => {
    if (!this.state.wished) {
      console.log("id " + id);
      console.log("this.state.id_wishlistfromModal " + this.state.list);
      console.log("this.context.customer.id " + this.context.customer.id);
      var url = api_post_wishlist_ + "REMOVE";
      let body = {
        id_wishlist: this.state.list,
        id_customer: this.context.customer.id,
        id_product: id,
        id_product_attribute: null,
      };
      console.log(JSON.stringify(body));
      try {
        let envoi = await fetch_url_post(url, body);
        console.log("response=", envoi);
        if (envoi) {
          Alert.alert(
            "Information",
            "iVotre produit a bien été supprimer aux favoris!"
          );
          this.setState({ wished: false });
        } else {
          Alert.alert("Information", "impossible de supprimer!");
        }
      } catch (e) {
        Alert.alert("Information", "Erreur sur l'api!");
      }
    }
  };
  Wishlist = (id) => {
    if (
      this.state.Fav.findIndex((item) => item.id == id) !== -1 &&
      !this.state.wished
    ) {
      return (
        <Icon
          type="font-awesome"
          name="heart"
          size={22}
          color="red"
          onPress={() => this.removeToMyWishlist(id)}
        />
      );
    } else {
      return (
        <Icon
          type="font-awesome"
          name="heart-o"
          size={22}
          color="grey"
          onPress={() => {
            this.showModal(id);
          }}
        />
      );
    }
  };
  Wishlists = (id) => {
    if (this.state.Fav.findIndex((item) => item.id == id) !== -1) {
      return (
        <Icon
          type="font-awesome"
          name="heart"
          size={22}
          color="red"
          onPress={() => this.removeToMyWishlist(id)}
        />
      );
    } else {
      return (
        <Icon
          type="font-awesome"
          name="heart-o"
          size={22}
          color="grey"
          onPress={() => {
            this.showModal(id);
          }}
        />
      );
    }
  };

  renderItem = ({ item }) => (
    <View>
      <Card style={card_product_styles.card}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {/* <Text style={card_product_styles.condition}>{item.condition}</Text> */}
          {this.Wishlist(item.id)}
        </View>
        <TouchableOpacity onPress={() => this.showDetail(item)}>
          {/* <FastImage
                          PlaceholderContent={<ActivityIndicator color={primaryColor} style={{ backgroundColor: 'white', flex: 1, width: '100%' }} />}
                          style={card_product_styles.img_product}
                          source={{
                              uri: api_url + item.id_default_image + "-small_default" + "/" + item.link_rewrite.language + ".jpg",
                              priority: FastImage.priority.normal,
                              cache: FastImage.cacheControl.cacheOnly,
                          }}
                          
                      /> */}
          <Image
            style={card_product_styles.img_product}
            source={{
              uri:
                "https://www.ow.randev.ovh/" +
                item.id_default_image +
                "-medium_default/" +
                item.link_rewrite.language +
                ".jpg",
            }}
          />
        </TouchableOpacity>
        <Text style={card_product_styles.price}>
          € {parseFloat(item.price * (1+20/100) ).toFixed(2)}{" "}
        </Text>
        <Text
          style={card_product_styles.name}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {item.name.language}
        </Text>
      </Card>
      <Wishlist
        visible={this.state.isModalVisible}
        dismiss={this.hideModal}
        id_product={this.state.idSelect}
        redHeart={this.redHeart}
        navigation={this.props.navigation}
        id_wishlistfromModal={this.id_wishlistfromModal}
      />
    </View>
    // <View style={styles.slide1} >
    //     <TouchableOpacity style={{width: '100%'}} activeOpacity={1} onPress={()=> {this.props.same_category({IdCategorie: item.id_category_default, titre: item.name.language, text: 'Vêtement'}) }}>
    //         <Image

    //             style={{
    //                 height: 250,
    //                 width: "100%",
    //             resizeMode: 'contain',
    //             borderTopRightRadius: 30,
    //             borderBottomLeftRadius: 30
    //             }}
    //             source={{ uri: 'https://www.passion-campagne.com/'+item.id_default_image+'-medium_default/'+item.link_rewrite.language+'.jpg' }}
    //         />
    //     </TouchableOpacity>
    //     <Text style={styles.text}>{item.id}</Text>
    // </View>
  );
  renderItems = ({ item }) => (
    <View>
      <Card style={card_product_styles.card}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {/* <Text style={card_product_styles.condition}>{item.condition}</Text> */}
          {this.Wishlists(item.id_product)}
        </View>
        <TouchableOpacity onPress={() => this.showDetails(item)}>
          {/* <FastImage
                          PlaceholderContent={<ActivityIndicator color={primaryColor} style={{ backgroundColor: 'white', flex: 1, width: '100%' }} />}
                          style={card_product_styles.img_product}
                          source={{
                              uri: api_url + item.id_default_image + "-small_default" + "/" + item.link_rewrite.language + ".jpg",
                              priority: FastImage.priority.normal,
                              cache: FastImage.cacheControl.cacheOnly,
                          }}
                          
                      /> */}
          <Image
            style={card_product_styles.img_product}
            source={{
              uri:
                "https://www.ow.randev.ovh/" +
                item.id_image +
                "-medium_default/" +
                item.link_rewrite +
                ".jpg",
            }}
          />
        </TouchableOpacity>
        <Text style={card_product_styles.price}>
          € {parseFloat(item.price).toFixed(2)}{" "}
        </Text>
        <Text
          style={card_product_styles.name}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {item.name}
        </Text>
      </Card>
      <Wishlist
        navigation={this.props.navigation}
        visible={this.state.isModalVisible}
        dismiss={this.hideModal}
        id_product={this.state.idSelect}
        redHeart={this.redHeart}
        id_wishlistfromModal={this.id_wishlistfromModal}
      />
    </View>
    // <View style={styles.slide1} >
    //     <TouchableOpacity style={{width: '100%'}} activeOpacity={1} onPress={()=> {this.props.same_category({IdCategorie: item.id_category_default, titre: item.name.language, text: 'Vêtement'}) }}>
    //         <Image

    //             style={{
    //                 height: 250,
    //                 width: "100%",
    //             resizeMode: 'contain',
    //             borderTopRightRadius: 30,
    //             borderBottomLeftRadius: 30
    //             }}
    //             source={{ uri: 'https://www.passion-campagne.com/'+item.id_default_image+'-medium_default/'+item.link_rewrite.language+'.jpg' }}
    //         />
    //     </TouchableOpacity>
    //     <Text style={styles.text}>{item.id}</Text>
    // </View>
  );

  render() {
    const data = this.state;
    // console.log('id item checked ' +JSON.stringify(this.props))
    return (
      <View style={{ flex: 1, maxWidth: "100%" }}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {this.displayLoading()}
          {this.displayCategory()}
        </ScrollView>
        <FooteraSocial navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //   marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#20232A",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    height: 200,
    width: 250,
  },
  title: {
    fontSize: 32,
  },
  title_view: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  title_text: {
    fontSize: 25,
    color: "#713F18",
    textTransform: "uppercase",
  },
  title_texts: {
    fontSize: 25,
    color: "#713F18",
    marginTop:5,
    textTransform: "uppercase",
  },
  title_text_under: {
    fontSize: 11,
    color: "grey",
    marginLeft: 5,
    fontWeight: "bold",
  },
  img_product: {
    height: 300,
    width: "95%",
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  button: {
    marginTop: 30,
    marginBottom: 60,
    backgroundColor: "#713F18",
    borderRadius: 10,
    color: "#ffff",
    height: 50,
    width: "95%",
    alignItems: "center",
  },
});



export default Home;
