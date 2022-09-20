import { StyleSheet } from 'react-native';
import { primaryColor } from '../../helper/color';
export default info_styles = StyleSheet.create({
    input_container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: '7%',
    },

    input_label: {
        flex: 1,
        textAlign: 'left',
    },

    input_text: {
        flex: 2,
        // borderWidth: 0.6,
        // borderColor: '#000000',
        backgroundColor: '#D3D3D3',
        paddingVertical: 8,
        paddingHorizontal: 5
    },

    label: {
        fontSize: 13,
        color: "#000000"
    },

    input_button_container: {
        paddingHorizontal: '10%',
        marginTop: '10%'
    },

    buttonStyle: {
        borderColor: primaryColor
    },

    title_button: {
        color: primaryColor
    }
});