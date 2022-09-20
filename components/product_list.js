import React from 'react';
import { View, FlatList} from 'react-native';
import CardProduct from './card_products';

class ProductList extends React.Component {

    constructor(props) {
        super(props)
    }

    showDetail = (data) => {
        this.props.navigation.navigate('DetailProduct', {
            screen: 'DetailProduct',
            params: { data: data.id }
        });
    }

    render(){
        return(
            <View style={{ alignItems: 'space-around', justifyContent: 'space-around', width: '100%', flex: 1 }}>
                <FlatList
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={this.props.products}
                    renderItem={({item}) => (
                        <CardProduct 
                            item={item}
                            showDetail={this.showDetail}
                        />
                    )}
                    keyExtractor={item => item.id}
                />
            </View>
        );
    }
}
export default ProductList