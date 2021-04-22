import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, SafeAreaView, Modal, Pressable, useContext } from 'react-native'
import Ion from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../navigation/AuthProvider'



const ModalSurvey2 = ({ modalSurvey2, setModalSurvey2, winnings, user, totalMoney, setTotalMoney, setWinnings, setModalWin }) => {



    const sendSurveyDataF2 = () => {

        firestore()
            .collection('Survey')
            .add({
                name: user.uid,
                period: 30,
                erVisit: false,
            })
            .then(() => {
                console.log('User survey added!');
                setModalSurvey2(false)
                setTotalMoney(totalMoney + 1.0)
                setWinnings(1.00)
                setModalWin2(true)
            });
    }

    const sendSurveyDataT2 = () => {
        firestore()
            .collection('Survey')
            .add({
                name: user.uid,
                period: 30,
                erVisit: true,
            })
            .then(() => {
                console.log('User survey added!');
                setModalSurvey2(false)
                setTotalMoney(totalMoney + 1.0)
                setWinnings(1.00)
                setModalWin(true)
            });
    }

    return (

        <Modal
            animationType="slide"
            transparent={true}
            visible={modalSurvey2}

        >
            <View style={styles.modalView2}>
                {/* <Image source={require('../assets/liquidMon.png')} style={{ width: '65%', height: '35%', resizeMode: 'contain' }} /> */}
                <Text style={styles.congrat}>Survey2!</Text>
                <Text style={styles.congratMoney}>
                    Have you been to the Emergency Room for
                    </Text>
                <Text style={styles.congratMoney}>
                    FLUID OVERLOAD
                    </Text>
                <View style={styles.congratTextHold}>
                    <Text style={styles.congratText}>in the last 12 months?</Text>
                </View>
                <View style={styles.answerHolder}>
                    <Pressable
                        style={styles.okButton}
                        onPress={() => sendSurveyDataF2()}
                    >
                        <Text style={{ fontSize: 30, color: 'black', fontWeight: 'bold' }}>No</Text>
                    </Pressable>
                    <Pressable
                        style={styles.okButton}
                        onPress={() => sendSurveyDataT2()}
                    >
                        <Text style={{ fontSize: 30, color: 'black', fontWeight: 'bold' }}>Yes</Text>
                    </Pressable>
                </View>
            </View>

        </Modal>

    )
}

export default ModalSurvey2

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