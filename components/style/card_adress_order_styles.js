import { StyleSheet } from 'react-native';
import { Color, primaryColor } from '../../helper/color';
export default card_adress_order_styles = StyleSheet.create({
    view: {
        marginTop: '5%',
        borderWidth: 0.3,
        borderColor: '#000000',
        borderRadius: 5,
        width: 250,
        marginRight: 5
    },

    view_selected: {
        marginTop: '5%',
        borderWidth: 0.3,
        borderColor: primaryColor,
        borderRadius: 5,
        width: 250,
        marginRight: 5,
        backgroundColor: Color,
    },

    name_container: {
        flexDirection: 'row',
        paddingHorizontal: '5%',
        justifyContent: 'space-between',
    },

    text_style: {
        flexDirection: 'row',
        flexShrink: 1,
        flexWrap: 'wrap',
        alignItems:'flex-end',
        justifyContent: 'flex-end'
    },

    name_text: {
        marginRight: 5,
    },

    fieldset: {
        position: 'absolute',
        top: -10,
        left: 10,
        fontWeight: 'bold',
        backgroundColor: '#E4E3E3',
        paddingHorizontal: 15,
        textAlign: 'center',
        borderRadius: 10,
        maxWidth: 150,
        flexWrap: 'wrap',
        flexShrink: 1,
        color: '#000000'
    },

    fieldset_selected: {
        position: 'absolute',
        top: -10,
        left: 10,
        fontWeight: 'bold',
        backgroundColor: primaryColor,
        paddingHorizontal: 15,
        textAlign: 'center',
        borderRadius: 10,
        maxWidth: 150,
        flexWrap: 'wrap',
        flexShrink: 1,
        color:"#FFFFFF"
    },

    info_container: {
        paddingVertical: '5%'
    },

    button_container: {
        marginBottom: '2%',
        paddingHorizontal: '5%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});