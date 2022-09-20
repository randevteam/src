import { StyleSheet } from 'react-native';
import { primaryColor } from '../../helper/color';

export default home_styles = StyleSheet.create({
    title_view: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },

    title_text: {
        fontSize: 20,
        color: primaryColor,
        textTransform: 'uppercase'
    }
});