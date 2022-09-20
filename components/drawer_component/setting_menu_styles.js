import { StyleSheet } from 'react-native';

export default setting_menu_styles = StyleSheet.create({
    headerRight: { 
        marginRight: 0, 
        flexDirection: 'row',
        width: '130%',
        height: 200,
        justifyContent: 'space-between'
    },

    header_right_icon_panel: { 
        justifyContent: 'center',
        
    },

    header_right_menu_container: {
        borderBottomWidth: 0.6,
        borderBottomColor: '#000000',
    },

    header_right_menu_content: {
        flexDirection: 'row',
        width: "100%",
    },

    customStyles: {
        
    }
});