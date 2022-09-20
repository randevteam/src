import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Modal,
    ActivityIndicator,
} from 'react-native';
import { WebView } from 'react-native-webview';
import Feather from 'react-native-vector-icons/Feather';
const fee = 25;
const runFirst = "var refreshIntervalId = setInterval(()=>{var is_fee = document.getElementById('fee');if(is_fee != null){document.getElementById('fee').value = " + fee + ";clearInterval(refreshIntervalId);}},10); const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.5, maximum-scale=0.5, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); var div = document.getElementsByTagName('div')[0]; div.style.display='none'";
const Paypal = ({ props, navigation }) => {
    const [showGateway, setShowGateway] = useState(false);
    const [showGatewayLcl, setShowGatewayLcl] = useState(false);
    const [prog, setProg] = useState(false);
    const [progClr, setProgClr] = useState('#000');

    function onMessage(e) {
        let data = e.nativeEvent.data;
        setShowGateway(false);
        showGatewayLcl(false);
        let payment = JSON.parse(data);
        if (payment.status === 'COMPLETED') {
            alert('Payement réussi, Votre commande sera traité dans un delai de 72h');
        } else {
            console.log(payment)
            alert('PAYMENT FAILED. PLEASE TRY AGAIN.');
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.btnCon}>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => setShowGateway(true)}>
                        <Text style={styles.btnTxt}>Pay Using PayPal</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: '20%' }}></View>

                <View style={styles.btnConSherlock}>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => setShowGatewayLcl(true)}>
                        <Text style={styles.btnTxt}>Pay Using LCL SHERLOCK</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {showGateway ? (
                <Modal
                    visible={showGateway}
                    onDismiss={() => setShowGateway(false)}
                    onRequestClose={() => setShowGateway(false)}
                    animationType={'fade'}
                    transparent>
                    <View style={styles.webViewCon}>
                        <View style={styles.wbHead}>
                            <TouchableOpacity
                                style={{ padding: 13 }}
                                onPress={() => setShowGateway(false)}>
                                <Feather name={'x'} size={24} />
                            </TouchableOpacity>
                            <Text
                                style={{
                                    flex: 1,
                                    textAlign: 'center',
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    color: '#00457C',
                                }}>
                                PayPal GateWay
                            </Text>
                            <View style={{ padding: 13, opacity: prog ? 1 : 0 }}>
                                <ActivityIndicator size={24} color={progClr} />
                            </View>
                        </View>
                        <WebView
                            source={{ uri: 'https://www.wordpress6.randev.ovh/' }}
                            style={{ flex: 1 }}
                            onLoadStart={() => {
                                setProg(true);
                                setProgClr('#000');
                            }}
                            onLoadProgress={() => {
                                setProg(true);
                                setProgClr('#00457C');
                            }}
                            onLoadEnd={() => {
                                setProg(false);
                            }}
                            onLoad={() => {
                                setProg(false);
                            }}
                            onMessage={onMessage}
                            injectedJavaScript={runFirst}
                        />

                    </View>
                </Modal>
            ) : null}
            {showGatewayLcl ? (
                <Modal
                    visible={showGatewayLcl}
                    onDismiss={() => setShowGatewayLcl(false)}
                    onRequestClose={() => setShowGatewayLcl(false)}
                    animationType={'fade'}
                    transparent>
                    <View style={styles.webViewCon}>
                        <View style={styles.wbHead}>
                            <TouchableOpacity
                                style={{ padding: 13 }}
                                onPress={() => setShowGatewayLcl(false)}>
                                <Feather name={'x'} size={24} />
                            </TouchableOpacity>
                            <Text
                                style={{
                                    flex: 1,
                                    textAlign: 'center',
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    color: '#00457C',
                                }}>
                                PayPal GateWay
                            </Text>
                            <View style={{ padding: 13, opacity: prog ? 1 : 0 }}>
                                <ActivityIndicator size={24} color={progClr} />
                            </View>
                        </View>
                        <WebView
                            source={{ uri: 'https://www.wordpress6.randev.ovh/recap.php?total=12000&mail=iotadev@randevteam.com&id_commande=4566' }}
                            style={{ flex: 1 }}
                            onLoadStart={() => {
                                setProg(true);
                                setProgClr('#000');
                            }}
                            onLoadProgress={() => {
                                setProg(true);
                                setProgClr('#00457C');
                            }}
                            onLoadEnd={() => {
                                setProg(false);
                            }}
                            onLoad={() => {
                                setProg(false);
                            }}
                            onMessage={onMessage}
                            injectedJavaScript={runFirst}
                            scalesPageToFit={false}
                        />

                    </View>
                </Modal>
            ) : null}
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    btnCon: {
        height: 45,
        width: '70%',
        elevation: 1,
        backgroundColor: '#00457C',
        borderRadius: 3,
    },
    btnConSherlock: {
        height: 45,
        width: '70%',
        elevation: 1,
        backgroundColor: '#4DA7F1',
        borderRadius: 3,
    },
    btn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnTxt: {
        color: '#fff',
        fontSize: 18,
    },
    webViewCon: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    wbHead: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        zIndex: 25,
        elevation: 2,
    },
});
export default Paypal;