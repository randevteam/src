import React from 'react';

import {View, ScrollView, Text, TouchableOpacity,StyleSheet, Modal, Touchable,Pressable} from 'react-native';
import {FAB} from 'react-native-paper';
import {DotsLoader} from 'react-native-indicator';

import {fetch_url_get} from '../helper/function/common-function/fetch';
import {api_create_guest_url} from '../helper/api_url';
import {AuthContext} from '../helper/context/auth-context';
import {ConfigContext} from '../helper/context/config-context';
import {
  storeGuest,
  removeGuest,
  getGuest,
  storeCustomer,
  getCustomer,
} from '../helper/storage/user-storage';
import {login, register} from '../helper/function/user/user-auth';
import styles from './style/presentation';
import {Color} from '../helper/color';
import SwiperComponent from '../components/presentation_pages';
import {Button} from 'react-native-elements';
import Cookie from 'react-native-cookie-use';

//global.signBack = true
//global.signBackName = null

// import * as RNFS from 'react-native-fs';
class Presentation extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      updateState: 0,
      modalVisible: true,
      content: null,
      tsta: ''
    };
  }
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }
  setModalVisibleGameOver = (visible) => {
      this.setState({ modalVisibleGameOver: visible });
  }

  navigate_to_view = () => {
    this.props.navigation.reset({
      index: 0,
      routes: [{name: 'View'}],
    });
  };
  readFile(){
    var d = null

      RNFS.readFile('./visite.json', 'ascii')
        .then((res) => {
          console.log(res);
           d = JSON.parse(res);
          this.setState({ content: d.type });
          console.log(this.state.content)
        })
        .catch((err) => {
          console.log(err.message, err.code);
        });
  }
  cookiesAccepter = ()=>{
    this.setModalVisible(!this.state.modalVisible)
  //  Cookie.set('https://www.passion-campagne.com/', 'PassionCamp', 'passion').then(() => console.log('success'));
  
  
    //   CookieManager.set('http://example.com', {
  //   name: 'nouveauCouki',
  //   value: 'myValue',
    
  //   path: '/',
  //   version: '1',
  //   expires: '2022-12-30T12:30:00.00-05:00'
  //   }).then((done) => {
  //     console.log('CookieManager.set =>', done);
  // });
  }

  continue_as_guest = async () => {
    this.setState({
      isLoading: true,
    });
    await getGuest().then(async data => {
      if (data) {
        this.context.guest = JSON.parse(data);
        await removeGuest();
        await storeGuest(JSON.parse(data));
        this.navigate_to_view();
        this.setState({
          isLoading: false,
        });
      } else {
        var guest = null;
        guest = await fetch_url_get(api_create_guest_url);
        if (guest) {
          await storeGuest(guest.response);
          this.context.guest = JSON.parse(guest.response);
          this.navigate_to_view();
          this.setState({
            isLoading: false,
          });
        } else {
          this.setState({
            isLoading: false,
          });
          console.log('error ato1 ');
        }
      }
    });
  };

  create_guest = async () => {
    this.setState({
      isLoading: true,
    });
    await getGuest().then(async data => {
      if (data) {
        this.context.guest = JSON.parse(data);
        await removeGuest();
        await storeGuest(JSON.parse(data));
        this.setState({
          isLoading: false,
        });
      } else {
        var guest = null;
        guest = await fetch_url_get(api_create_guest_url);
        if (guest) {
          await storeGuest(guest.response);
          this.context.guest = JSON.parse(guest.response);
          this.setState({
            isLoading: false,
          });
        } else {
          this.setState({
            isLoading: false,
          });
          console.log('error ato 2');
        }
      }
    });
  };

  isLoading = () => {
    if (this.state.isLoading) {
      return (
        <View style={styles.continue_guest}>
          <DotsLoader color={Color} betweenSpace={2} />
        </View>
      );
    } else {
      if (!this.context.customer) {
        return (
          <TouchableOpacity
            onPress={() => {
              this.continue_as_guest()
            }}
            style={styles.continue_guest}>
            <Text style={styles.text_guest}>Continuez en tant qu''invité</Text>
          </TouchableOpacity>
        );
      }
    }
  };

  verify_if_guest_exist = async () => {
    var check = null;
    await getGuest().then(data => {
      if (data) {
        check = JSON.parse(data);
      } else {
        check = null;
      }
    });
    return check;
  };
  fonction = async (vary) => {
    if(vary){
      this.setModalVisible(!this.state.modalVisible)
      this.setState({tsta : vary})
      
    }else{
      
    }
  }
  verify_if_customer_exist = async () => {
    var check = null;
    await getCustomer().then(data => {
      if (data) {
        check = JSON.parse(data);
      } else {
        check = null;
      }
    });
    return check;
  };
  variable = ''
  async componentDidMount() {
    if((Cookie.get('https://www.passion-campagne.com/', 'PassionCamp').then((cookie) => this.fonction(cookie) ))==null){
      // this.setModalVisible(!this.state.modalVisible)
      
    }else{
      
    }
    console.log(tst)
    // this.readFile()
    try {
      await this.create_guest().then(async () => {
        try {
          await this.verify_if_guest_exist().then(async data => {
            if (data) {
              this.context.guest = data;
            }
            try {
              await this.verify_if_customer_exist().then(data => {
                if (data) {
                  this.context.customer = data;
                }
                this.setState({
                  updateState: this.updateState + 1,
                });
              });
            } catch (e) {
              console.error('error verify customer');
            }
          });
        } catch (e) {
          console.error('error verify guest');
        }
      });
    } catch (e) {
      console.error('error create guest');
    }
  }

  showDetail = (data) => {
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

  goToLogin = () => {
    this.props.navigation.navigate('Login');
  };

  goToSignUp = () => {
    this.props.navigation.navigate('SignUp');
  };

  displayModal = () => {
    this.getManufacturers();
    if(this.state.tsta){
        
        return(
         
            <Picker
                    selectedValue={this.state.selectedValue}
                    style={{ height: 50, width: 150,}}
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

  render() {
    return (
      <View
        style={{
          flex: 1,
        }}>
       
        {/* <Modal
                    animationType="none"
                    transparent={true}
                    visible={this.state.modalVisible}
                   
                >
                    <View style={styless.centeredView}>
                        <View style={styless.modalView}>
                            <Text style={styless.modalText}>Nous utilisons des cookies sur ce site à des fins d'analyse du trafic et pour améliorer votre expérience utilisateur.En cliquant sur "J'accepte l'utilisation des cookies", vous donnez votre consentement pour l'utilisation de services tiers pouvant installer des cookies.</Text>
                            <Text style={styless.modalText}> {this.state.tmpSecret}</Text>
                            <Pressable
                                style={[styless.button, styless.buttonOpen]}
                                onPress={() => {this.cookiesAccepter()}}
                            >
                                <Text style={styless.textStyle}>Accepter</Text>
                            </Pressable>
                           
                        </View>
                    </View>
          </Modal> */}
        <SwiperComponent same_category={this.showDetail} />
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.fab}
          onPress={() => {
            if (this.context.customer) {
              this.navigate_to_view();
            } else {
              this.goToSignUp();
              //global.signBack ? global.signBackName = 'Presentation' : global.signBackName = 'View'
            }
          }}>
          <Text style={{fontWeight: 'bold', color: 'grey'}}>
            {!this.context.customer ? "S'enregistrer" : 'Continuer'}
          </Text>
        </TouchableOpacity>
        {/* <FAB
                    style={styles.fab}
                    small
                    onPress={() => { 
                        if(this.context.customer){
                            this.navigate_to_view();
                        }else{
                            this.goToSignUp();
                        }
                    }}
                    label={ !this.context.customer ? "S'enregistrer" : 'Continuer' }
                /> */}
        {this.isLoading()}
        {this.context.customer ? (
          <View></View>
        ) : (
          <View style={styles.have_account}>
            <Text
              style={styles.text_guest}
              onPress={() => {
                this.goToLogin();
              }}>
              Vous avez un compte? Connectez vous
            </Text>
          </View>
        )}
      </View>
    );
  }
}
const styless = StyleSheet.create({
  
  centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10
  },
  modalView: {
      backgroundColor: "white",
      borderRadius: 20,
      padding: 10,
      paddingVertical: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 2,
      width: '90%',
      marginLeft:'5%',
      marginRight:'5%',
  },
  button: {
      padding: 15,
      margin: 12,
      paddingVertical: 15,
      paddingHorizontal: 60,
  },
  buttonOpen: {
      backgroundColor: "green",
      paddingHorizontal: 70,
  },
  buttonClose: {
      backgroundColor: "red",
  },
  modalText : {
    fontSize : 14,
    lineHeight : 22,
    textAlign :'left'
  },
  textStyle : {
    color : 'white',
    fontSize : 18
  }


  
  
  
})
export default Presentation;
