import React from 'react';

import { View ,ScrollView, Text, ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import  panier_styles  from '../view/style/panier_styles';
import PanierListItem from './panier_list_item';
import panier_list_item_styles from './style/panier_list_item_styles';

class PanierList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            update: false
        }
    }

    componentDidMount(){
        if(this.props.cartP){
            this.setState({
                data: this.props.cartP
            });
        }
    }

    render(){
        console.log(" render for the props cartP")
        console.log(this.props)
        console.log(" render for the props cartP");

        const { cartP, addQuantity, dropQuantity, delete_cart } = this.props
        return(
            <View style={panier_list_item_styles.view}>
                <FlatList
                    numColumns={1}
                    data={cartP}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.refresh}
                            onRefresh={() => {
                                this.props.reload();
                            }}
                        />
                    }
                    renderItem={({ item, index }) => (
                        <PanierListItem 
                            item={item} 
                            delete_cart={delete_cart}
                            addQuantity={addQuantity}
                            dropQuantity={dropQuantity}
                            index={index}
                        />
                        
                    )}
                    keyExtractor={(item, index) => index}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        );
    }

}

export default PanierList;