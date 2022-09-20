import { StyleSheet } from 'react-native';
import { Color } from '../../helper/color';

export default styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        marginLeft: '10%',
        marginRight: '10%',
        bottom: '9%',
        width: '80%',
        backgroundColor: Color,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius : 30
    },

    continue_guest: {
        position: 'absolute',
        right: '4%',
        top: '5.5%',
        width: '50%',
        paddingRight: 10,
        alignItems: 'flex-end'
    },

    text_guest: {
        fontSize: 13,
        color: Color
    },

    have_account: {
        position: 'absolute',
        bottom: '3.5%',
        width: '100%',
        alignItems: 'center'
    },
})