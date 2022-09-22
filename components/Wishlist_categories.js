import React from 'react';
import { View, Text, Button, ScrollView, ActivityIndicator, TouchableOpacity,Alert } from 'react-native';
import { ListItem, Avatar, CheckBox, Icon } from 'react-native-elements'
import { api_get_wishlist_categories, api_post_wishlist_ } from '../helper/api_url';
import { primaryColor } from '../helper/color';
import { AuthContext } from '../helper/context/auth-context';
import { fetch_url_get, fetch_url_post } from '../helper/function/common-function/fetch';
import { TextInput } from 'react-native-paper';



import Modal from './Modal';

class Wishlist extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    isModalVisible: false,
    checked: false,
    id_product: null,
    list: null,
    index: null,
    id_wishlist: null,
    showaddbutton: true,
    showInput: false,
    wishlist_name: null,
    text: "",
    showcreatebutton: true,
  };
  static contextType = AuthContext;


  showModal = () => this.setState({ isModalVisible: true });
  hideModal = () => this.setState({ isModalVisible: false });

  checked = (i) => {
    if (this.state.index == i) {
      return true;
    } else {
      return false;
    }
  };

  listItem = () => {
    // console.log("list:",this.state.list)
    if (this.state.list != null) {
      return (
        <View>
          {this.state.list.map((l, i) => {
            // <Icon
            //     type="font-awesome"
            //     name="edit"
            //     color="#056C86"
            //     onPress={() => {
            //         this.props.mode_edit_adress(item);
            //     }}
            // />

            return (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flex: 6 }}>
                  <CheckBox
                    key={i}
                    title={l.name}
                    checked={this.checked(i)}
                    onPress={() => {
                      this.setState({ index: i, id_wishlist: l.id_wishlist });
                    }}
                  />
                </View>
                {/* <View style={{ flex: 1, justifyContent: 'center' }} >
                                        <Icon
                                            type="font-awesome"
                                            name="edit"
                                            color={primaryColor}
                                            style={{marginRight: 10}}
                                        />
                                    </View> */}
              </View>
            );
          })}
        </View>
      );
    } else {
      return <ActivityIndicator size="small" color="red" />;
    }
  };

  getProduct = async () => {
    if (this.context.customer.id != null){
    try{
        var list = await fetch_url_get(
          api_get_wishlist_categories + this.context.customer.id
        );
      this.setState({
        list: list.reverse(),
      });

    }catch(err){
      console.error('errurrrr '+err)
    }
  }
  };

  setRedHeart = () => {};
  gotologin = () => {
    this.hideModal();
    this.props.navigation.navigate("Login");
  };

  addToMyWishlist = async () => {
    if (this.context.customer) {
      console.log("id:", this.state.id_wishlist);
      if (this.state.id_wishlist != null) {
        var url = api_post_wishlist_ + "ADD";
        console.log("url");
        console.log(url);
        console.log("id id_wishlist " + this.state.id_wishlist);
        console.log("customer " + this.context.customer.id);
        console.log("id product " + this.props.id_product);

        let body = {
          id_wishlist: this.state.id_wishlist,
          id_customer: this.context.customer.id,
          id_product: this.props.id_product,
          id_product_attribute: null,
          quantity: 1,
        };
        console.log(JSON.stringify(body));
        try {
          let envoi = await fetch_url_post(url, body);
          console.log("response=", envoi);
          if (envoi) {
            // this.props.navigation.navigate('Home')
            Alert.alert(
              "Information",
              "Votre produit a bien été ajouter aux favoris!"
            );
            this.props.id_wishlistfromModal(this.state.id_wishlist);

            // this.props.redHeart();
            this.props.dismiss();
          } else {
            Alert.alert("Information", "impossible d'ajouter au favoris!");
          }
        } catch (e) {
            Alert.alert("Information", "Erreur sur l'api d'envoi email!");
        }
        // result = await fetch_url_post(url, {
        //     id_wishlist: this.state.id_wishlist,
        //     id_customer: this.context.customer.id,
        //     id_product: this.props.id_product,
        //     id_product_attribute: null,
        //     quantity: 1
        // });
        //  console.log(result);
        // if (result) {
        //     this.props.id_wishlistfromModal(this.state.id_wishlist)
        //     this.props.redHeart()
        //     this.props.dismiss()
        // }else{
        //     alert("impossible d'ajouter au favoris")
        // }
      }
    } else {
      Alert.alert(
        "You need to be logged in to save products in your wishlist",
        null,
        [
          {
            text: "Sign in",
            onPress: async () => {
              this.props.navigation.navigate("Login");
              // this.gotologin();
            },
          },
          {
            text: "Annuler",
            style: "cancel",
          },
        ]
      );
    }
  };

  CreateNewWishlist = async () => {
    if (this.context.customer) {
      if (this.state.showInput == true && this.state.wishlist_name != null) {
        // var url = api_post_wishlist_ + 'ADD_CATEGORIES';
        // console.log(this.context.customer.id);
        // console.log(this.state.wishlist_name);
        try{
          var result = null;
          result = await fetch_url_post(url, {
            id_customer: this.context.customer.id,
            name: this.state.wishlist_name,
          });
          console.log(result);
          if (result) {
            this.setState({
              showInput: false,
              showcreatebutton: true,
            });
            this.getProduct();
          }
        }catch(err){
          Alert.alert("Information", "impossible de créer une nouvelle liste");
        }
      }
    } else {
      Alert.alert("You need to be logged in to create a new wishlist", null, [
        {
          text: "Sign in",
          onPress: async () => {
            this.gotologin();
          },
        },
        {
          text: "Annuler",
        },
      ]);
    }
  };
  // componentDidMount() {
  //   // this.getProduct();
  //   this.setState({
  //     id_product: this.props.id_product,
  //   });
  //   if (this.props.showcreatebutton) {
  //     this.setState({
  //       showcreatebutton: true,
  //     });
  //   }
  // }

  // async componentDidUpdate(prevProps) {
  //   if (prevProps != this.props) {
  //     this.setState({
  //       showInput: false,
  //       showcreatebutton: true,
  //     });
  //   }
  // }

  addtbutton = () => {
    // alert('ok')
    return (
      <Text style={{ textAlignVertical: "center", textAlign: "center" }}>
        {" "}
        Ajouter aux favoris{" "}
      </Text>
    );
  };
  createButton = () => {
    if (this.state.showcreatebutton) {
      return (
        <TouchableOpacity
          onPress={() => this.showWishlistInput()}
          style={{
            flexDirection: "row",
            flex: 1.5,
            backgroundColor: primaryColor,
            justifyContent: "center",
            alignContent: "center",
            borderColor: "grey",
            borderWidth: 1,
            marginRight: 10,
          }}
        >
          <Text
            style={{
              textAlignVertical: "center",
              textAlign: "center",
              color: "#ffffff",
            }}
          >
            {" "}
            Creér une nouvelle liste{" "}
          </Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() => this.CreateNewWishlist()}
          style={{
            flexDirection: "row",
            flex: 1.5,
            backgroundColor: "green",
            justifyContent: "center",
            alignContent: "center",
            borderColor: "grey",
            borderWidth: 1,
            marginRight: 10,
          }}
        >
          <Text
            style={{
              textAlignVertical: "center",
              textAlign: "center",
              color: "#ffffff",
            }}
          >
            {" "}
            Creér{" "}
          </Text>
        </TouchableOpacity>
      );
    }
  };

  showWishlistInput = () => {
    this.setState({ showInput: true });
    this.setState({ showcreatebutton: false });
  };
  HideWishlistInput = () => {
    this.setState({ showInput: false });
    this.setState({ showcreatebutton: true });
  };

  inputNewList = () => {
    if (this.state.showInput) {
      return (
        <View style={{ margin: 10, borderRadius: 10 }}>
          <TextInput
            value={this.state.wishlist_name}
            onChangeText={(text) => this.setState({ wishlist_name: text })}
            mode="outlined"
            outlineColor={primaryColor}
            placeholder="Wishlist Name"
            selectionColor={primaryColor}
            underlineColor={primaryColor}
            right={
              <TextInput.Icon
                name="close"
                onPress={() => {
                  this.HideWishlistInput();
                }}
              />
            }
            onSubmitEditing={() => this.CreateNewWishlist()}
          />
        </View>
      );
    } else {
      return <View />;
    }
  };

  render() {
    // const redHeart = this.props.id_product
    console.log("productId" + JSON.stringify(this.props));
    return (
      <View>
        <Modal
          visible={this.props.visible}
          dismiss={this.props.dismiss}
          onShow={this.getProduct}
        >
          <View
            style={{
              justifyContent: "center",
              marginBottom: 10,
              flexDirection: "row",
              height: 40,
            }}
          >
            <TouchableOpacity
              onPress={() => this.addToMyWishlist()}
              style={{
                flexDirection: "row",
                flex: 3,
                backgroundColor: "#ffffff",
                justifyContent: "center",
                borderColor: "grey",
                borderWidth: 1,
                marginRight: 5,
                marginLeft: 10,
              }}
            >
              {this.addtbutton()}
            </TouchableOpacity>
            {this.createButton()}
          </View>
          {this.inputNewList()}
          <ScrollView>{this.listItem()}</ScrollView>
        </Modal>
      </View>
    );
  }
}

export default Wishlist;