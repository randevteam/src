import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import Swiper from 'react-native-swiper';

import {Color, primaryColor} from '../helper/color';
import styles from './presentation_pages_styles';

export default class SwiperComponent extends Component {
  render() {
    const image = require('../ressources/bg-presentation-2.jpg');
    const {same_category} = this.props;
    return (
      <ImageBackground
        style={{flex: 1, width: '100%', alignItems: 'center'}}
        source={{
          uri: 'https://www.passion-campagne.com/bg-presentation-2.jpg',
        }}>
        <Swiper
          style={[styles.wrapper, {zIndex: 1}]}
          showsButtons={false}
          activeDotColor="#DB9320"
          dotColor="white"
          bounces={false}
          paginationStyle={{
            position: 'absolute',
            bottom: '17%',
          }}>
          <View style={styles.slide1}>
            {/* <View > */}
            <TouchableOpacity
              style={{width: '80%'}}
              activeOpacity={1}
              onPress={() => {
                same_category({
                  IdCategorie: 76,
                  titre: 'Vêtements de chasse',
                  text: 'Vêtement',
                });
              }}>
              <Image
                style={{
                  height: 250,
                  width: '100%',
                  resizeMode: 'contain',
                  borderTopRightRadius: 30,
                  borderBottomLeftRadius: 30,
                }}
                source={{
                  uri: 'https://www.passion-campagne.com/12491-medium_default/pull-col-zip-vert-laksen-norfolk.jpg',
                }}
              />
            </TouchableOpacity>
            <Text style={styles.text}>VÊTEMENT DE CHASSE</Text>
            {/* </View> */}
          </View>

          <View style={styles.slide2}>
            <TouchableOpacity
              style={{width: '80%'}}
              activeOpacity={1}
              onPress={() => {
                same_category({
                  IdCategorie: 102,
                  titre: 'Chaussures de chasse',
                  text: 'Chaussures',
                });
              }}>
              <Image
                //onPress={()=> {console.log("predddddddddd") }}
                style={{
                  height: 250,
                  width: '100%',
                  resizeMode: 'contain',
                  borderTopRightRadius: 30,
                  borderBottomLeftRadius: 30,
                }}
                source={{
                  uri: 'https://www.passion-campagne.com/11584-medium_default/chaussures-tres-chaudes-ariat-catalyst-vx-gtx-8-400g.jpg',
                }}
              />
            </TouchableOpacity>
            <Text style={styles.text}>CHAUSSURES DE CHASSE</Text>
          </View>

          <View style={styles.slide3}>
            <TouchableOpacity
              style={{width: '80%'}}
              activeOpacity={1}
              onPress={() => {
                same_category({
                  IdCategorie: 42,
                  titre: 'Sacs de chasse',
                  text: 'Sac',
                });
              }}>
              <Image
                style={{
                  height: 250,
                  width: '100%',
                  resizeMode: 'contain',
                  borderTopRightRadius: 30,
                  borderBottomLeftRadius: 30,
                }}
                source={{
                  uri: 'https://www.passion-campagne.com/10522-medium_default/etui-toile-marron-et-cuir-clair-a-12-balles-maremmano.jpg',
                }}
                //onPress={()=> {console.log("predddddddddd") }}
              />
            </TouchableOpacity>
            <Text style={styles.text}>SACS DE CHASSE</Text>
          </View>
        </Swiper>
      </ImageBackground>
    );
  }
}
