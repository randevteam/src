import { StyleSheet } from 'react-native';
export default card_product_styles = StyleSheet.create({
    condition: {
        width: 30,
        height : 16,
        paddingBottom:5,
        color:'white',
        textAlign:'center',
        backgroundColor: '#ff9478',
        borderRadius : 20 ,
        fontSize: 10 ,
        fontWeight: 'bold',
        position : "relative"

    },
    img_product:{
        height: 90, 
        width: "90%",
        borderRadius: 3,
        resizeMode:'contain',
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
        fontSize:14
    },
    card:{
        padding: 8,
        margin: 5,
        borderColor: "#cccecf",
        borderRadius: 0,
        width: 125,
        height: 180
    }
});