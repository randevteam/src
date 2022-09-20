import React from 'react';
import { TouchableOpacity, View, Text } from "react-native";
import { useNavigation } from '@react-navigation/native'
import { Icon } from 'react-native-elements';

import { Color, ColorIcon } from '../helper/color';
import SearchInput from '../components/search_bar';

export const HeaderOptions = (color, title, navigation, route) => {

    const goToSearch = (data) => {
        if (route.name == "Search") {
            // console.log(navigation)
            route.params.data = data;
        } else {
            navigation.navigate('Search', {
                name: 'Search',
                params: { data: data }
            });
        }
    }

    const goToScan = () => {
        navigation.navigate('Qrcode', {
            screen: 'Qrcode',
        });
    }


    return (
        {
            headerTitle: () => {
                return (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <SearchInput color={color} goToSearch={goToSearch} navigation={navigation} route={route} />
                    </View>
                )
            },
            headerRight: () => {
                return (
                    <View style={{
                        marginRight: 20,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Icon
                            name="qrcode-scan"
                            type="material-community"
                            size={30}
                            onPress={() => {
                                goToScan()
                            }}
                        />
                    </View>
                )
            },
            headerHideShadow: true,
        }
    );
}
