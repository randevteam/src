import React from 'react';

import { View ,Linking ,TouchableOpacity,StyleSheet , Text} from 'react-native';
import {Icon  } from 'react-native-elements';

import { DotsLoader } from 'react-native-indicator';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

import { AuthContext } from '../helper/context/auth-context';
import { api_get_product_home_url } from '../helper/api_url';
import { fetch_url_get } from '../helper/function/common-function/fetch';
import { primaryColor, } from '../helper/color';




class QrCode extends React.Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props)
        this.state = {
            link : null ,
        }
    }

    onSuccess = e => {
        console.log(e.data)
        if(e.data){
            console.log(e.data)
            this.GoToResult(e.data)
            this.scanner.reactivate() 
        }
    };

    GoToResult = (data) => {
        this.props.navigation.navigate('Query',{
            screen: 'Query',
            params: {data: data}
        });
    }

    render(){
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <QRCodeScanner
                    ref={(node) => { this.scanner = node }}
                    onRead={this.onSuccess}
                    flashMode={RNCamera.Constants.FlashMode.off}
                    topViewStyle={{ display : 'none'}}
                    bottomViewStyle={{ backgroundColor :  "green"  }}
                    cameraStyle={{backgroundColor :  "grey" , height : '100%' }}
                    bottomContent={
                    <TouchableOpacity
                        onPress={()=>{this.scanner.reactivate() }}
                        style={styles.roundButton1}
                      >
                         <Icon 
                                    type="material-community"
                                    name="qrcode-scan"
                                    size={30}
                                    color="green"
                                    iconStyle={{ paddingLeft: 0 }}
                                />
                      </TouchableOpacity>
                    }
                />
            </View>   
        );
    }
}

export default QrCode;


const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    roundButton1: {
      width: 80,
      height: 80,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderRadius: 100,
      backgroundColor: 'white',
      position: 'absolute',
      bottom: 20
    },
  });