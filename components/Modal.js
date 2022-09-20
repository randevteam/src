import React from 'react';
import {
    TouchableWithoutFeedback,
    StyleSheet,
    Modal,
    View,
} from 'react-native';
import t from 'prop-types';
import { impaire_color } from '../helper/color';


class MyModal extends React.Component {
    static propTypes = {
        children: t.node.isRequired,
        visible: t.bool.isRequired,
        dismiss: t.func.isRequired,
        transparent: t.bool,
        animationType: t.string,
    };

    static defaultProps = {
        animationType: 'none',
        transparent: true,
    };

    render() {
        const { props } = this;
        return (
            <View>
                <Modal
                    visible={props.visible}
                    transparent={props.transparent}
                    onRequestClose={props.dismiss}
                    animationType={props.animationType}
                    onShow={props.onShow}
                >
                    <TouchableWithoutFeedback onPress={props.dismiss}>
                        <View style={styles.modalOverlay} />
                    </TouchableWithoutFeedback>

                    <View style={styles.modalContent}>
                        {props.children}
                    </View>
                </Modal>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    modalContent: {
        justifyContent: 'center',
        top: "68%",
        height: "32%",
        backgroundColor: impaire_color,
        marginRight: 10,
        marginLeft: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingTop: 5

    },
    modalOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        opacity: 0.2,
        backgroundColor: '#ffffff'
    },
});


export default MyModal;