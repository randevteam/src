import { StyleSheet } from 'react-native';
export default detail_product_styles = StyleSheet.create({
    view: {
        // marginTop:10,
        // marginBottom:10,
        flex: 1,
    },
    name: {
        fontSize:20
    },
    view_detail: { 
        flexDirection: "column", 
        flex: 6 
    },
    card_image: {
        resizeMode: 'contain'
    },
    condition: { 
        width: '20%', 
        textAlign: 'center', 
        color: 'white', 
        fontSize: 25, 
        paddingBottom: 5 
    },
    price: { 
        margin: 10, 
        fontSize: 20, 
        textAlign: 'center' 
    },
    description: { 
        marginBottom: 10 
    },
    view_quantity: { 
        flex: 0.3, 
        padding: 20, 
        flexDirection: "row" 
    },
    view_quantity_child: { 
        flex: 2,
        paddingRight:10 
    },
    input: { 
        height: 40, 
        borderWidth: 1,
        padding:2,
        textAlign:'center' 
    },
    button: { 
        //flex: 1,
        // width:'40%', 
        backgroundColor: '#713F18',
    },

    button_outline: {
        //flex: 1,
        // width:180, 
        borderColor: '#713F18',
        borderWidth: 1.5
    },

    button_view: {
        flex: 1, 
        justifyContent: 'space-around', 
        alignItems: 'center', 
        flexDirection: 'row',
        backgroundColor: '#efe4d0'
    },

    button_view_content: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around', 
        height: '70%'
    },

    title_style_button: {

    },

    title_style_button_outline: {
        color: '#713F18'
    },
    name_price: { 
        borderTopColor: 'black',
        // borderTopWidth: 0.9,
        borderBottomColor: 'black',
        // borderBottomWidth: 0.9,
        // height: 120, 
        justifyContent: 'center', 
        paddingVertical: '2%',
        paddingHorizontal: '5%',
        backgroundColor: '#D6D6D6'
    },
    name:{
        fontSize: 15,
        color: '#000000',
        fontWeight: 'bold'
    },

    price:{
        marginTop: '1%',
        fontSize: 14,
        color: '#FFFFFF',
        flex: 0.5
    },

    description: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5%',
    },
    description_text: {
        textAlign: 'justify'
    },

    panel_add_number: {
        position: 'absolute', 
        top: 80, 
        right: 20, 
        width: 40, 
        height: 130, 
        backgroundColor: '#efe4d0',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        flex: 1,
        shadowOffset: {
            width: 5,
            height: 5
        },
        shadowOpacity: 1,
        shadowColor: 'black',
        elevation: 4
    },

    share: {
        position: 'absolute',
        top: 20, 
        right: 20, 
        width: 40,
        height: 40,
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#efe4d0',
        borderRadius: 50,
        shadowOffset: {
            width: 5,
            height: 5
        },
        shadowOpacity: 1,
        shadowColor: 'black',
        elevation: 4
    },

    plus_panel: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        width: '100%'
    },

    input_panel_container: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        width: '80%',
        backgroundColor: 'white'
    },

    input_panel: {
        width: '80%',
    },

    input_number: {
        padding: 0,
        borderBottomWidth: 0,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 100,
        color: '#000000'
        
    }
});