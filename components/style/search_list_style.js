import { StyleSheet } from 'react-native';
export default card_search_styles = StyleSheet.create({
    condition: {
        width:'20%',
        paddingBottom:5,
        color:'white',
        textAlign:'right',
        backgroundColor:'#713F18',
    },
    img_product:{
        height: 150, 
        width: "100%", 
        borderRadius: 3,
        resizeMode:'contain'
    },
    name:{
        fontSize: 13,
        textAlign: 'center',
        padding: 5,
        color: 'grey',
    },
    price:{
        color:'#713F18' , 
        fontWeight: 'bold',
        fontSize:18
    },
    card:{
        padding: 8,
        margin: 5,
        borderColor: "#cccecf",
        borderRadius: 0,
        flex: 1
    }
});