import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, SafeAreaView, Modal, Pressable } from 'react-native'


const ModalWin = ({ modalWin, setModalWin, winnings }) => {

    return (

        <Modal
            animationType="slide"
            transparent={true}
            visible={modalWin}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible2(!modalVisible2);
            }}
        >
            <View style={styles.modalView2}>
                {/* <Image source={require('../assets/liquidMon.png')} style={{ width: '65%', height: '35%', resizeMode: 'contain' }} /> */}


                <Text style={styles.congrat}>Congrats!</Text>

                <View style={styles.congratTextHold}>
                    <Text style={styles.congratMoney}>

                        $0.{winnings}
                    </Text>
                    <Text style={styles.congratText}>Google Play Edits Earned</Text>

                    <Text style={styles.congratWarning}>Your credits will expire in a year</Text>

                </View>

                <Pressable
                    style={styles.congratButton}
                    onPress={() => setModalWin(!modalWin)}
                >
                    <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>OK</Text>
                </Pressable>
            </View>

        </Modal>

    )
}

export default ModalWin

const styles = StyleSheet.create({
    taskWrapper: {
        marginTop: '5%',
        flexDirection: 'row',

        justifyContent: 'space-around',
        width: '100%',
        alignItems: 'stretch',
        minHeight: 40,
        zIndex: 199
    },
    task: {
        paddingBottom: 10,
        paddingLeft: 10,
        alignItems: 'center',
        width: 'auto',

        fontSize: 17,
        fontWeight: 'bold',
        color: 'black',
    }, congrat: {
        fontSize: 48,
        color: '#eca400',
        fontWeight: 'bold',
        textAlign: 'center'
    },

    congratMoney: {
        fontSize: 36,
        paddingVertical: 20,
        fontWeight: 'bold',
        color: 'red',
        textAlign: 'center'

    },
    congratText: {
        fontSize: 30,
        width: '50%',
        fontWeight: 'bold'
    },
    congratWarning: {
        fontSize: 16,
        marginTop: -20
    },
    congratButton: {
        width: '90%',
        height: '10%',
        backgroundColor: '#4facfe',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        position: 'absolute',
        bottom: 20,

    },

    modalView2: {
        display: 'flex',
        backgroundColor: "white",
        alignItems: "center",
        width: '100%',
        height: '100%',
        textAlign: 'center',
        alignItems: 'center',

    }

})