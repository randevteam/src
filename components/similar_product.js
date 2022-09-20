import React from 'react';
import { View, FlatList} from 'react-native';
import CardProduct from './card_products';
import { fetch_url_get } from '../helper/function/common-function/fetch';
import { api_similar_product_url } from '../helper/api_url';

class SimilarProduct extends React.Component {

    constructor(props) {
        super(props);
       
    }
 state = {
            product: null
        }
    showDetail = (data) => {
        this.props.change_product(data.id);
    }

    get_similar_product = async () => {
        let id_category = Array();
        var id = null;
        if(Array.isArray(this.props.id_category)){
            id = this.props.id_category;
        }else{
            id = [this.props.id_category];
        }
        id.forEach(item => {
            id_category.push(item.id);
        })
        try{
            await fetch_url_get(api_similar_product_url + id_category.toString()).then((data) => {
                this.setState({
                    product: data.product
                });
            });
        }catch(e){
            console.log('error similar')
        }
    }

    componentDidMount(){
        this.get_similar_product();
    }

    render(){
        return(
            <View style={{ alignItems: 'space-around', justifyContent: 'space-around', width: '100%', flex: 1 }}>
                <FlatList
                    numColumns={1}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={this.state.product}
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
export default SimilarProduct