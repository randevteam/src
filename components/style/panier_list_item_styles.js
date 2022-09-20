import { StyleSheet } from 'react-native';
import { primaryColor } from '../../helper/color';
export default panier_list_item_styles = StyleSheet.create({
    view: {
        flex: 1,
        marginBottom: 10,
        marginTop: 10,
        marginLeft: '2%',
        marginRight: '2%',
        margin: 0,
        padding: 0,
    },

    constainerStyle: {
        flex: 1, 
        margin: 0, 
        borderWidth: 0,
        // flexDirection: 'row',
        padding: 0,
        borderRadius: 5,
        marginBottom: '2%',
    },

    wrapperStyle: {
        flex: 1, 
        width: '100%',
        // flexDirection: 'row',
        height: 130,
        borderRadius: 5,
    },
    
    view_image_content: {
        flex: 1.2,
        backgroundColor: '#FFFFFF',
        padding: 2,
        borderRightWidth: 0.8,
    },

    view_content: {
        flex: 2,
        padding: '1%',
        paddingLeft: '2%'
    },

    view_quantity_content: {
        flex: 0.4,
        justifyContent: 'center',
        alignItems: 'center',
    },

    view_image: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain', 
        // backgroundColor: '#C0C0C0',
    },

    name: {
        fontWeight: 'bold',
        fontSize: 13,
        color: '#727272'
    },

    price: {
        fontWeight: 'bold',
        fontSize: 14,
    },

    quantity_content: {
        fontSize: 25,
    },

    view_name: {
        flex: 1,
        justifyContent: 'center'
    },

    view_price: {
        flex: 1,
        justifyContent: 'center',
    },
    
    view_combination: {
        flex: 2,
        justifyContent: 'center',
        paddingLeft: '5%'
    },

    button_plus_view: {
        flex: 1.5,
        justifyContent: 'center',
    },

    quantity_view: {
        flex: 2,      
        justifyContent: 'center',
    },

    button_minus_view: {
        flex: 1.5,
        justifyContent: 'center',        
    },

    button_style: {
        borderColor: primaryColor,
        borderWidth: 1,
        backgroundColor: '#ffffff'
    },

    delete_button_view: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        marginTop: 10,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    }, 
    
    label_name: {
        color: '#A3A2A2',
        fontWeight: 'normal'
    }
});