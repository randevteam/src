import { StyleSheet } from 'react-native';
export default card_adress_styles = StyleSheet.create({
    view: {
        marginTop: '5%',
        borderWidth: 0.3,
        borderColor: '#000000',
        borderRadius: 5,
    },

    name_container: {
        flexDirection: 'row',
        paddingHorizontal: '5%',
        justifyContent: 'space-between'
    },

    text_style: {
        flexDirection: 'row',
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
        width: 100,
        textAlign: 'center',
        borderRadius: 10
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