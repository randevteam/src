import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';

import { api_url } from '../helper/api_url';
import { primaryColor } from '../helper/color';
import panier_list_item_styles from './style/panier_list_item_styles';

class PanierListItem extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            item: this.props.item
        }
    }

    get_options = () => {
        let opt = this.state.item.optionsValueArr;
        // console.log(opt)
    }

    componentDidMount(){
        this.get_options()
    }

    show_price = () => {
        if(this.state.item){
            var unit_price = 0;
            var qtty = this.state.item.quantity;
            var total_price = 0;
            if (this.state.item.default_price) {
              unit_price = Math.round(this.state.item.default_price * 100) / 100;
            } else {
              unit_price =
                Math.round(this.state.item.default_price * 100) / 100;
            }

            total_price = unit_price * qtty;
            return (
              <View>
                <Text style={panier_list_item_styles.price}>
                  <Text style={panier_list_item_styles.label_name}>
                    Taille:
                  </Text>{" "}
                  {this.state.item.id_product_attribute}
                </Text>
                <Text style={panier_list_item_styles.price}>
                  <Text style={panier_list_item_styles.label_name}>
                    Prix unitaire:
                  </Text>{" "}
                  {unit_price} € ({this.state.item.method == 1 ? "TTC" : "HT"})
                </Text>
                <Text style={panier_list_item_styles.price}>
                  <Text style={panier_list_item_styles.label_name}>Total:</Text>{" "}
                  {total_price} € ({this.state.item.method == 1 ? "TTC" : "HT"})
                </Text>
              </View>
            );
        }
    }

    render(){
        const { delete_cart, addQuantity, dropQuantity, index } = this.props
        return(
            <Card
                containerStyle={panier_list_item_styles.constainerStyle}
                wrapperStyle={panier_list_item_styles.wrapperStyle}
            >
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    {/* <View style={panier_list_item_styles.view_image_content}>
                        <Image 
                            source={{ uri: 'https://www.passion-campagne.com/11830-medium_default/bottes-chaudes-seeland-woodcock-at18-5mm.jpg' }}
                            style={panier_list_item_styles.view_image}
                        />
                    </View> */}
                    <View style={panier_list_item_styles.view_content}>
                        <View style={panier_list_item_styles.view_name}>
                            <Text style={panier_list_item_styles.name}>
                                { this.state.item.product_name }
                            </Text>
                        </View>
                        {/* <View style={panier_list_item_styles.view_combination}>
                            <Text style={panier_list_item_styles.combination}>
                                Pointure
                            </Text>
                            <Text style={panier_list_item_styles.combination}>
                                44
                            </Text>
                        </View> */}
                        <View style={panier_list_item_styles.view_price}>
                            { this.show_price() }
                        </View>
                    </View>
                    <View style={panier_list_item_styles.view_quantity_content}>
                        <View style={panier_list_item_styles.button_plus_view}>
                            <Button 
                                icon={<Icon
                                    name='plus'
                                    type='entypo'
                                    color={primaryColor} 
                                    size={14}
                                />}
                                buttonStyle={panier_list_item_styles.button_style}
                                onPress={() => {
                                    addQuantity(index)
                                }}
                            />
                        </View>
                        <View style={panier_list_item_styles.quantity_view}>
                            <Text style={panier_list_item_styles.quantity_content}>
                                { this.state.item.quantity }
                            </Text>
                        </View>
                        <View style={panier_list_item_styles.button_minus_view}>
                            <Button 
                                icon={<Icon
                                    name='minus'
                                    type='entypo'
                                    color={primaryColor}
                                    size={14}
                                />}
                                buttonStyle={panier_list_item_styles.button_style}
                                onPress={() => {
                                    dropQuantity(index)
                                }}
                            />
                        </View>
                    </View>
                </View>
                <TouchableOpacity  
                    style={panier_list_item_styles.delete_button_view}
                    onPress={() => {
                        delete_cart(this.state.item.id_product, this.state.item.id_product_attribute)
                    }}
                >
                    <Text style={{color: '#ffffff'}}>
                        Delete
                    </Text>
                </TouchableOpacity>
            </Card>
        );
    }
}

export default PanierListItem;
