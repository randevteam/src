import React from 'react';
import { Text, TouchableOpacity, Image, Button, View } from 'react-native';
import { Card } from 'react-native-paper';

import card_search_styles from './style/search_list_style';
import { api_url } from '../helper/api_url';

class CardSearch extends React.Component{
    constructor(props) {
        super(props)
    }

    render(){
        // console.log('mes datas')
        // var product = this.props;
        // console.log('props sur card search')
        // console.log(this.props);
        // console.log("props sur card search");

        const { item, showDetail, selectedValue} = this.props;
        // console.log("selectedValue"); 
        // console.log(selectedValue);
        
        // console.log(item);
        //   console.log(item.product);
        if(selectedValue != "" && selectedValue != undefined){
            // console.log(selectedValue);
            //  console.log(item.id_manufacturer);
           if(item.id_manufacturer == selectedValue){
            //    console.log(selectedValue);
                // console.log(item);
            return (
              <Card style={card_search_styles.card}>
                <Text style={card_search_styles.condition}>
                  {item.condition}
                </Text>
                <TouchableOpacity onPress={() => showDetail(item)}>
                  <Image
                    style={card_search_styles.img_product}
                    source={{
                      uri:
                        api_url +
                        item.id_default_image +
                        "/" +
                        item.link_rewrite.language +
                        ".jpg",
                    }}
                  />
                </TouchableOpacity>
                <Text style={card_search_styles.price}>
                  € {parseFloat(item.price * (1 + 20 / 100)).toFixed(2)}{" "}
                </Text>
                <Text
                  style={card_search_styles.name}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {item.name.language}
                </Text>
              </Card>
            );
           } else {
                //console.log(selectedValue);
                //console.log(item);
               return(
                <Card style={ card_search_styles.card }>
                {/* <Text style={card_search_styles.condition}>{item.condition}</Text> */}
                <TouchableOpacity onPress={() => showDetail(item)}>
                    <Image style={card_search_styles.img_product}
                        source={{ uri: api_url + item.id_default_image + "/" + item.link_rewrite.language + ".jpg" }} />
                </TouchableOpacity>
                <Text style={card_search_styles.price}>€ {parseFloat(item.price * (1 + 20 / 100)).toFixed(2)} </Text>
                <Text 
                    style={card_search_styles.name}
                    numberOfLines={2}
                    ellipsizeMode='tail'
                >
                    {item.name.language}
                </Text>
            </Card>
               )
           }
           
        } else {
            if (item && typeof item === 'object' && typeof item.link_rewrite === 'object' ) {
                return(
                    <Card style={ card_search_styles.card }>
                        {/* <Text style={card_search_styles.condition}>{item.condition}</Text> */}
                        <TouchableOpacity onPress={() => showDetail(item)}>
                            <Image style={card_search_styles.img_product}
                                source={{ uri: api_url + item.id_default_image + "/" + item.link_rewrite.language + ".jpg" }} />
                        </TouchableOpacity>
                        <Text style={card_search_styles.price}>€ {parseFloat(item.price * (1 + 20 / 100)).toFixed(2)} </Text>
                        <Text 
                            style={card_search_styles.name}
                            numberOfLines={2}
                            ellipsizeMode='tail'
                        >
                            {item.name.language}
                        </Text>
                    </Card>
                );
            } else {
                return (
                    <View>
                        <Text style={{
                            textAlign:'center', 
                            alignItems:'center',
                            width:'90%',
                            marginLeft:'5%',
                            marginRight:'5%',
                            }}>Aucun résultat ne corresponde à votre recherche.</Text>
                    </View>
                );
            }
            
        }
        
    }
}

export default CardSearch;