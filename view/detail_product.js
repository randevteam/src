import React from 'react';

import { View, ScrollView, Text, ActivityIndicator, Dimensions, Image, TextInput, TouchableOpacity, Share, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Avatar, Badge, Card, Button, Icon } from "react-native-elements";
// import Icon from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown';


import { AuthContext } from '../helper/context/auth-context';
import { api_url, api_get_product_by_id_url, api_add_cart_url, api_combination_get_price_url, api_get_stock_by_id_attribute_product_url, api_get_link_rewrite, api_get_spec_prices_product } from '../helper/api_url';
import { fetch_url_get, fetch_url_post } from '../helper/function/common-function/fetch';
import detail_product_styles from './style/detail_product_style';
import { primaryBackgroundColor } from '../helper/color';
import { parse, transform } from '@babel/core';
import SimilarProduct from '../components/similar_product';

class DetailProduct extends React.Component {

    static contextType = AuthContext;

    margincoter = 5;
    dimensions = Dimensions.get('window');
    imageHeight = Math.round(this.dimensions.width * 11 / 16);
    imageWidth = (this.dimensions.width + this.margincoter);

    constructor(props) {
        super(props);

    }
    state = {
        product: null,
        price: "Choisir option",
        qtty: 1,
        guest: null,
        arrayDeclChoice: null,
        currentCombination: null,
        changeCart: 0,
        customer: null,
        stock: null,
        decl_count: null,
        only_choice: null,
        loading: false,
        id_category: null,
        url_to_web: null,
        specific_price: null,
        selectedValue: '',
        price_final: null,
    }

    shareto = async () => {
        //console.log('share it');
        try {
            const result = await Share.share({
                title: 'React Native | A framework for building native apps using React',
                message: this.state.url_to_web,
            });
            //console.log(result);
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    }

    show_promotion = () => {
        if (this.state.specific_price) {
            return (
                <View
                    style={{
                        position: 'absolute',
                        left: '2%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 50
                    }}
                >
                    <Icon
                        type="foundation"
                        name="burst"
                        size={90}
                        color="gold"
                        containerStyle={{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    />
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: 16,
                            position: 'absolute',
                            transform: [{
                                rotate: "-45deg"
                            }],
                        }}
                    >
                        -{this.state.specific_price}%
                    </Text>
                </View>
            );
        }
    }

    getProduct = async () => {
        this.setState({
            loading: true
        });
        try {

            await fetch_url_get(
                api_get_product_by_id_url +
                this.props.route.params.data +
                '&idDefaultGroup=' +
                this.props.route.params.defaultGroup,
            ).then(async data => {
                if (data.prices != 'null') {
                    var price = parseFloat(data.prices.specific_price.reduction) * 100;
                } else {
                    var price = null;
                }
                await this.setState({
                    product: data,
                    id_category: data.product.product.associations.categories.category,
                    guest: this.context.guest,
                    customer: this.context.customer,
                    price: this.props.route.params.price,
                    decl_count: data.declinaison.length,
                    only_choice:
                        data.declinaison.length == 0
                            ? data.product.product.associations.stock_availables
                            : null,
                    specific_price: price,
                });
                //   console.log(this.state.specific_price);
                // console.log(this.state.id_category[0].id);
                // console.log(this.state.product.product.product.id);
                // console.log(this.state.product.product.product);
                if (data.declinaison.length == 0) {
                    let choice = {
                        idAttribute: this.state.only_choice.id,
                        idProduct: this.state.product.product.product.id,
                    };

                    await fetch_url_get(
                        api_get_stock_by_id_attribute_product_url(choice),
                    ).then(results => {
                        let stock = results.stock_available.quantity;
                        this.setState({
                            stock: stock,
                            loading: false,
                        });
                    });
                } else {
                    // init combination
                    await data.declinaison.forEach(async item => {
                        let id = item.id;
                        let opt =
                            item.associations.product_option_values.product_option_value_T;
                        let qt = 1;
                        let id_group_customer;
                        if (this.context.customer) {
                            id_group_customer = this.context.customer.id_default_group;
                        } else {
                            id_group_customer = 1;
                        }
                        let opt_value;
                        if (opt.name != undefined) {
                            opt_value = opt.id;
                        } else {
                            opt_value = opt[0].id;
                        }
                        await this.changeDeclinaison(
                            opt_value,
                            id,
                            qt,
                            id_group_customer,
                        );
                        // console.log(item)
                    });

                    // ---------------
                    this.setState({
                        loading: false,
                    });
                }
                this.updateFinalPrice();// update price to show with product info
            });
        } catch (err) {
            console.log(err)
        }

        await fetch_url_get(api_get_link_rewrite + this.state.id_category[1].id).then(async (data) => {
            //console.log(data.language);
            //const url = 'http://www.projets-omega-web.net/' + data.language + '/' + this.state.product.product.product.id + '-' + this.state.product.product.product.link_rewrite.language + '.html'
            const url = api_url + data.language + '/' + this.state.product.product.product.id + '-' + this.state.product.product.product.link_rewrite.language + '.html';
            await this.setState({
                url_to_web: url
            });
        })
    }

    change_product = async (id) => {
        await this.props.navigation.setParams({
            data: id
        });
        this.getProduct();
    }


    updateFinalPrice = async () => {
        console.log("___________product_________start");
        console.log(this.state.product);
        console.log("___________product_________end");
        // console.log("__________specific_price_____start");
        // console.log(this.state.product.prices.specific_price);
        // console.log("__________specific_price_____end");

        let id_default_combination_data = this.state.product.product.product.id_default_combination ? this.state.product.product.product.id_default_combination : 0;
        let id_product_data = this.state.product.product.product.id;

        try {
            const response = await fetch(
                api_get_spec_prices_product + '&idCombination_sp=' + id_default_combination_data + '&idProduct_sp=' + id_product_data + '&quantity_sp=1'
            );
            const json = await response.json();
            // console.log("___________api_get_spec_prices_product_________start");
            // console.log(json);
            //return json.movies;
            this.setState({
                price_final: json.product.my_price,
            });
        } catch (error) {
            console.error(error);
        }
    }

    show_price_after_promo = () => {


        return (
            <View
                style={{
                    backgroundColor: primaryBackgroundColor,
                    paddingHorizontal: '5%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    bottom: '30%',
                    left: '5%',
                    flexDirection: 'row',

                }}
            >
                
                {parseFloat(this.state.price_final).toFixed(2)!=this.props.route.params.price ? (
                    <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 25,
                        color: 'white',
                        marginRight: 15,
                        textDecorationLine: this.state.price_final ? 'line-through' : 'none'
                    }}
                >
                    {this.state.price}€ TTC
                </Text>
                ) : (
                    <Text></Text>
                )}
                
                {this.state.price_final ? (
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: 25,
                            color: 'white'
                        }}
                    >{parseFloat(this.state.price_final).toFixed(2)}€ TTC</Text>
                ) : (
                    <Text></Text>
                )}
            </View>
        );



    }



    getoption = (opt) => {
        //console.log('valeur des taille de vetement' + JSON.stringify(opt))
        if (typeof opt != null) {
            if (opt.product_option_value_T.name != undefined) {
                var data = opt.product_option_value_T
                // alert(data.name)
                var optToReturn = (
                    <View>
                        <SelectDropdown
                            data={data}
                            buttonStyle={{
                                width: "96%",
                                marginLeft: "2%",
                                marginRight: "2%",
                            }}
                            defaultButtonText={"Séléctionners votre taille"}
                            onSelect={(value, combinationId) => {
                                var qt = 1;
                                let id_group_customer;
                                if (this.context.customer) {
                                    id_group_customer =
                                        this.context.customer.id_default_group;
                                }
                                else {
                                    id_group_customer = 1;
                                }
                                this.changeDeclinaison(value.id, combinationId, qt, id_group_customer);
                                this.setState({ selectedValue: value });
                            }
                            }
                            buttonTextAfterSelection={
                                (selectedItem, index) => {
                                    return selectedItem;
                                }
                            }
                            rowTextForSelection={(item, index) => {
                                return item;
                            }}
                        />
                    </View>
                );
                //<Picker.Item label={opt.product_option_value_T.name} value={opt.product_option_value_T.id} />

            } else {
                var optToReturn = (
                    <View>
                        <SelectDropdown
                            data={opt.product_option_value_T}
                            defaultButtonText={"Séléctionner votre taille"}
                            buttonStyle={{
                                width: "96%",
                                marginLeft: "2%",
                                marginRight: "2%",
                            }}
                            onSelect={(value, combinationId) => {
                                // alert(value.id);
                                var qt = 1;
                                let id_group_customer;
                                if (this.context.customer) {
                                    id_group_customer =
                                        this.context.customer.id_default_group;
                                } else {
                                    id_group_customer = 1;
                                }
                                this.changeDeclinaison(
                                    value.id,
                                    combinationId,
                                    qt,
                                    id_group_customer
                                );
                                this.setState({ selectedValue: value.name });
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem.name;
                            }}
                            rowTextForSelection={(item, index) => {
                                return item.name;
                            }}
                        />
                    </View>
                );
                // opt.product_option_value_T.map((combOpt, i) => {

                //     return (

                //         // <Picker.Item key={i} label={combOpt.name} value={combOpt.name} />
                //         )
                //     });
            }
            return optToReturn;
        }
    }

    changeQuantity = (qtt) => {
        this.setState({
            qtty: qtt,
        })
        if (qtt != "" && qtt != 0) {
            var value = 0;
            var combinationId = 0;
            this.changeDeclinaison(value, combinationId, parseInt(qtt));
        }
    }

    add_quantity = () => {
        if (this.state.qtty < this.state.stock || this.state.qtty <= 4) {
            this.setState({
                qtty: this.state.qtty + 1
            });
        }
    }

    remove_quantity = () => {
        if (this.state.qtty > 1) {
            this.setState({
                qtty: this.state.qtty - 1
            });
        }
    }

    reload_screen = () => {
        this.props.navigation.addListener('focus', () => {
            this.getProduct();
        })
    }
    // show(value,combinationId){

    //     this.setState({selectValue: value})
    //     var qt = 1;
    //                             let id_group_customer;
    //                             if (this.context.customer) {
    //                                 id_group_customer = this.context.customer.id_default_group;
    //                             } else {
    //                                 id_group_customer = 1;
    //                             }
    //                             this.changeDeclinaison(value, combinationId, qt, id_group_customer);
    // }

    addToCart = async () => {
        if (this.state.currentCombination) {
            var product_attribute = this.state.currentCombination.product.currentCombinationId;
            var size = this.state.selectedValue;
            var quantity = this.state.qtty;
            if (this.state.customer) {
                var idCustomer = this.state.customer.id
            } else {
                idCustomer = 0;
            }
            if (product_attribute == undefined) {
                product_attribute = 0;
            }
            var body = {
                id_product: this.props.route.params.data,
                product_attribute: size,
                quantity: quantity,
                guest: this.state.guest,
                idCustomer: idCustomer,
            };

            //console.log('  contenu du body '+JSON.stringify(body))
            await fetch_url_post(api_add_cart_url, body).then(() => {
                Alert.alert("Alerte", "Ajout au panier!");
                global.statut = true
            }).catch((error) => console.error(error));
        } else if (this.state.arrayDeclChoice == null) {
            var quantity = this.state.qtty;
            var size = this.state.selectedValue;
            var body = {
                id_product: this.props.route.params.data,
                product_attribute: size,
                quantity: quantity,
                guest: this.state.guest,
                idCustomer: idCustomer,
            };

            //console.log(' contenu du body '+JSON.stringify(body))
            await fetch_url_post(api_add_cart_url, body).then(() => {
                Alert.alert("Alerte", "Ajout au panier!");
                global.statut = true
            }).catch((error) => console.error(error));
        }
    }

    changeDeclinaison = async (valueSent, combinationIdSent, qt, id_group_customer) => {
        //  alert(valueSent)
        if (valueSent != 0) {
            var value = valueSent;

            var combinationId = combinationIdSent;
            var default_Val = false;
        } else {
            var default_Val = true;
        }
        var qtt = qt;

        if (this.state.arrayDeclChoice == null) {
            var myArrayO = [];
            this.state.product.declinaison.map((combinationVar, i) => {


                var combinationId = combinationVar.id;
                combinationId = combinationVar.id;
                var arrayFinalC = { idOption: combinationId, optionValue: 0, quantitys: qtt };
                myArrayO.push(arrayFinalC);
                this.setState({
                    arrayDeclChoice: myArrayO
                });

            });
        }

        var priceTo = this.state.product.product.product.price;
        if (this.state.arrayDeclChoice == null) {
            var myArray = myArrayO;
        } else {
            var myArray = this.state.arrayDeclChoice;
        }

        if (myArray) {
            if (default_Val == false) {
                let index = myArray.findIndex(x => x.idOption == combinationId);
                myArray[index].optionValue = value;
                myArray[index].quantity = qtt;
            } else {
                var ind = 0;
                myArray.map(newArr => {
                    myArray[ind].quantity = qtt
                    ind++;
                });
            }
            if (value != 'null') {
                var Bd = {
                    id_product: this.props.route.params.data,
                    optVal: myArray,
                    id_group_customer: id_group_customer
                };
                fetch_url_post(api_combination_get_price_url, Bd)
                    .then(async (json) => {

                        // //console.log(json)
                        this.setState({
                            currentCombination: json
                        })
                        var data = {
                            idAttribute: this.state.currentCombination.product.currentCombinationId,
                            idProduct: this.state.currentCombination.product.id
                        }
                        await fetch_url_get(api_get_stock_by_id_attribute_product_url(data)).then((result) => {
                            this.setState({
                                stock: result.stock_available.quantity
                            });
                        });
                        if (json.error != "1") {
                            var new_price = parseFloat(json.product.my_price);
                            new_price = Math.round(new_price * 1000) / 1000;
                            this.setState({
                                price: new_price
                            });
                        }
                    })
                    .catch((error) => console.error(error))
            }
        }

    }

    componentDidUpdate() {
        if (this.props.route.params.reload == true) {
            // this.child.reload();
        }
    }

    componentDidMount() {
        //this.updateFinalPrice();
        this.reload_screen();
    }


    render() {

        //console.log('vue du details produits' + JSON.stringify(this.props.route.params.price))
        if (this.state.product && this.state.product != "no data" && !this.state.loading) {
            var combinationTplNew = this.state.product.declinaison.map((combinationVar, i) => {
                var combinationId = combinationVar.id;

                return (
                    <View style={detail_product_styles.view} key={i}>
                        <Text style={detail_product_styles.name}>{combinationVar.public_name.language} :</Text>
                        {this.getoption(combinationVar.associations.product_option_values)}
                        {/* <Picker
                            selectedValue={this.state.selectValue}
                            onValueChange={(value,combinationId)=>{this.show(value,combinationId)}}
                            >
                            {this.getoption(combinationVar.associations.product_option_values)}
                        </Picker> */}
                    </View>
                )
            });
        }
        if (this.state.product && this.state.product != "no data" && !this.state.loading) {
            var productInfo = this.state.product.product.product;
            var ImgUrl = api_url + productInfo.id_default_image + "-medium_default/" + productInfo.link_rewrite.language[0] + ".jpg";
            var condition = productInfo.condition;
            if (productInfo.description_short.language && typeof productInfo.description_short.language != 'object' && !Array.isArray(productInfo.description_short.language) && productInfo.description_short.language !== null) {
                var description_short = productInfo.description_short.language;
            } else {
                var description_short = "...";
            }
            if (productInfo.description.language && typeof productInfo.description.language != 'object' && !Array.isArray(productInfo.description.language) && productInfo.description.language !== null) {
                var description = productInfo.description.language;
            } else {
                var description = "...";
            }
            var title = productInfo.name.language;

            // console.log("____________productInfo_description__start");
            // console.log(productInfo.description.language);
            // console.log("______");
            // console.log(productInfo.description_short.language);
            // console.log("____________productInfo_description__end");

            var detailProduct = <View style={{ flex: 1 }}>
                <View style={{ flex: 8, backgroundColor: 'white', paddingTop: '5%' }}>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    >
                        <View>
                            <Image
                                source={{ uri: ImgUrl }}
                                style={{
                                    height: 400,
                                    width: '100%',
                                    resizeMode: 'contain',
                                }}
                            />

                            {this.show_promotion()}

                            {this.show_price_after_promo()}

                        </View>
                        <View style={detail_product_styles.name_price}>
                            <Text style={detail_product_styles.name}>
                                {title.toUpperCase()}
                            </Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={detail_product_styles.price}>
                                    {parseFloat(this.state.price_final).toFixed(2)}€ TTC
                                </Text>
                                {combinationTplNew}
                            </View>
                        </View>
                        <View style={detail_product_styles.description}>

                            {description_short ? (
                                <Text style={detail_product_styles.description_text}>{description_short}</Text>
                            ) : (
                                <Text>...</Text>
                            )}
                            
                            {description ? (
                                <Text style={detail_product_styles.description_text}>{description}</Text>
                            ) : (
                                <Text>...</Text>
                            )}

                        </View>
                        <Text style={detail_product_styles.similar_title}>Produits similaires</Text>
                        {
                            this.state.id_category
                                ?
                                (<SimilarProduct change_product={this.change_product} id_category={this.state.id_category} navigation={this.props.navigation} />)
                                :
                                (<View></View>)
                        }
                    </ScrollView>
                    <TouchableOpacity style={detail_product_styles.share} onPress={() => this.shareto()}>
                        <Icon
                            type="entypo"
                            name="share"
                            size={25}
                        />
                    </TouchableOpacity>
                    <View style={detail_product_styles.panel_add_number}>
                        <TouchableOpacity style={detail_product_styles.plus_panel} onPress={() => { this.add_quantity() }}>
                            <Icon
                                name='plus'
                                type='font-awesome'
                                color='#FFFFFF'
                                size={18}
                                containerStyle={{
                                    backgroundColor: '#efe4d0',
                                    borderRadius: 50,
                                }}

                            />
                        </TouchableOpacity>
                        <View style={detail_product_styles.input_panel_container}>
                            <View style={detail_product_styles.input_panel}>
                                <TextInput
                                    style={detail_product_styles.input_number}
                                    keyboardType="numeric"
                                    selectionColor='#713F18'
                                    value={String(this.state.qtty)}
                                    onChangeText={(qtt) => this.changeQuantity(qtt)}
                                />
                            </View>
                        </View>
                        <TouchableOpacity style={detail_product_styles.plus_panel} onPress={() => { this.remove_quantity() }}>
                            <Icon
                                name='minus'
                                type='font-awesome'
                                color='#FFFFFF'
                                size={18}
                                containerStyle={{
                                    backgroundColor: '#efe4d0',
                                    borderRadius: 50,
                                }}

                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={detail_product_styles.button_view}>
                    {
                        this.state.stock && this.state.stock != 0
                            ?
                            (
                                <View style={detail_product_styles.button_view_content}>
                                    <Button
                                        buttonStyle={detail_product_styles.button}
                                        title="Ajouter au panier"
                                        onPress={() => {
                                            this.addToCart();
                                        }}
                                    />
                                    <Button
                                        icon={<Icon name='credit-card' color='#713F18' size={20} style={{ marginRight: 5 }} />}
                                        buttonStyle={detail_product_styles.button_outline}
                                        titleStyle={detail_product_styles.title_style_button_outline}
                                        title="Acheter"
                                        type="outline"
                                    />
                                </View>
                            )
                            :
                            (
                                this.state.stock == null
                                    ?
                                    (
                                        <View style={[detail_product_styles.button_view_content, { alignItems: 'center' }]}>
                                            <Text>Veuillez choisir</Text>
                                        </View>
                                    )
                                    : (
                                        <View style={[detail_product_styles.button_view_content, { alignItems: 'center' }]}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Icon
                                                    type="font-awesome"
                                                    name="warning"
                                                    size={16}
                                                    color="#E0A80D"
                                                />
                                                <Text style={{ color: "#E0A80D" }}> Il n'y a plus de stock</Text>
                                            </View>
                                        </View>
                                    )
                            )
                    }
                </View>
            </View>
        } else {
            var detailProduct = <ActivityIndicator style={{ paddingTop: 11 }} size="large" color={"#713F18"} />;
        }

        return (
            <View style={{ flex: 1 }}>
                {detailProduct}
            </View>
        );
    }
}

export default DetailProduct;