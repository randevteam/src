import { StyleSheet } from 'react-native';
import {  } from '../../helper/color';

export default menu_principal_styles = StyleSheet.create({
    bottom_drawer_section: {
        marginBottom: 10,
        borderTopColor: '#E9E9E9',
        borderTopWidth: 1,
    },

    menu_item: {
        justifyContent: 'center',
        height: 45,
    },

    drawer_item_menu: { 
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: '3%',
    },

    item_text: {
        fontSize: 16,
        marginLeft: '3%',
    }
});