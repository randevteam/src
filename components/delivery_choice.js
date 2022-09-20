import React from 'react';
import { Button, Overlay, Divider } from "react-native-elements";
import { View, FlatList, Text } from 'react-native';

import CardDelivery from './card_delivery';

class DeliveryChoice extends React.Component{
    constructor(props) {
        super(props);
    }
    
    render(){
        const { carrier, delivery, set_delivery_id, selected_index, selected_delivery } = this.props;
        return(
            <View style={{ flex: 1, alignItems: 'center' }}>
                <DeliveryList 
                    delivery={delivery}
                    carrier={carrier}
                    set_delivery_id={set_delivery_id}
                    selected_index={selected_index}
                    selected_delivery={selected_delivery}
                />
            </View>
        );
    }
}

const DeliveryList = ({delivery, carrier, set_delivery_id, selected_index, selected_delivery}) => {
    return(
        <View style={{
            width: '100%',
            padding: 5
        }}>
            <FlatList 
                numColumns={1}
                data={delivery}
                keyExtractor={(item, index) => index}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                progressViewOffset={1}
                renderItem={({item, index}) => (
                    <CardDelivery 
                        delivery={item}
                        carrier={carrier[index]}
                        set_delivery_id={set_delivery_id}
                        selected_index={selected_index}
                        selected_delivery={selected_delivery}
                    />
                )}
            />
        </View>
    );
}

export default DeliveryChoice;