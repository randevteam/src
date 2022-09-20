import { StyleSheet } from 'react-native';
export default order_styles = StyleSheet.create({
    view: { 
        flexDirection: "column", 
        flex: 6,
    },

    button_view: { 
        width: '100%', 
        alignSelf: 'center', 
        flex: 0.2,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff'
    },

    button_style: {
        backgroundColor: "#9E5823",
        borderRadius: 3,
        width: '90%',
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        marginTop: '1%',
    },

    view_total: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '6%',
    },

    total_content: {
        fontWeight: 'bold',
        width: 150,
    },

    value_total: {
        textAlign: 'right'
    },

    button_container: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

    save_button: {
        backgroundColor: "#18B313",
        borderRadius: 3,
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        marginTop: '1%',
        width: '80%'   
    },

    cancel_button: {
        backgroundColor: "#FDFDFD",
        borderRadius: 3,
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        marginTop: '1%',
        borderColor: "#E4311A",
        borderWidth: 0.6,
        width: '80%'
    },

    adress_choice_button_view: { 
        height: 30, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },

    adress_choice_button_text: { 
        textAlign: 'center',
        color: '#1598AA'
    }
});

