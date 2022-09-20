import { StyleSheet } from 'react-native';
import { primaryColor } from '../../helper/color';

export default profile_styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    info_container: {
        backgroundColor: '#ffffff',
        flex: 1.5, 
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: '10%',
    },

    profile_content: {
        flex: 3, 
        backgroundColor: '#ffffff',
        paddingHorizontal: '2%',
        paddingVertical: '4%'
    },

    logout_section: {
        backgroundColor: '#ffffff',
        flex: 1, 
        justifyContent: 'center',
    },

    name_profile: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#5D5C5C',
        marginTop: '2%'
    },

    button_style: {
        backgroundColor: '#ffffff',
        borderColor: primaryColor,
        alignSelf: 'center',
        width: '80%'
    },

    title_style: {
        color: primaryColor
    },

    view_content_profile: {
        flexDirection: 'row',
        height: '20%',
        alignItems: 'center',
    },

    icon_ref: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    title_ref: {
        flex: 5,
        paddingLeft: '8%',
        height: '100%',
        justifyContent: 'center',
    },

    arrow_ref: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    title_style: {
        fontSize: 14,
        color: primaryColor
    },

    title_ref_style: {
        fontSize: 16,
        color: '#2E2E2E'
    },

    signup_view: {
        flex: 1,
        backgroundColor: '#DBCAAAA9',
        justifyContent: 'center',
        alignItems: 'center'
    },

    button_signup_style: {
        backgroundColor: primaryColor,
        borderColor: primaryColor,
        width: 150,
    },
});