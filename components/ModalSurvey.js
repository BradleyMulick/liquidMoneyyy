import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, SafeAreaView, Modal, Pressable, useContext } from 'react-native'
import Ion from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../navigation/AuthProvider'
import * as firebase from 'firebase'
import fireBase from '@react-native-firebase/app'

// const db = firebase.firestore()

const ModalSurvey = ({ modalSurvey, setModalSurvey, modalSurvey2, setModalSurvey2, winnings, user }) => {

    const sendSurveyDataF = () => {
        console.log("WORKK BIOTCHHH")
        firestore()
            .collection('Survey')
            .add({
                name: user.uid,
                period: 12,
                erVisit: false,
            })
            .then(() => {
                console.log('User survey added!');
                setModalSurvey(!modalSurvey)
                setModalSurvey2(false)
            });
    }

    const sendSurveyDataT = () => {
        firestore()
            .collection('Survey')
            .add({
                name: user.email,
                period: 12,
                erVisit: true,
            })
            .then(() => {
                console.log('User survey added!');
                setModalSurvey(!modalSurvey)
                setModalSurvey2(!modalSurvey)
            });
    }

    return (

        <Modal
            animationType="slide"
            transparent={true}
            visible={modalSurvey}

        >
            <View style={styles.modalView2}>
                {/* <Image source={require('../assets/liquidMon.png')} style={{ width: '65%', height: '35%', resizeMode: 'contain' }} /> */}
                <Text style={styles.congrat}>Survey!</Text>
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
                        onPress={() => sendSurveyDataF()}
                    >
                        <Text style={{ fontSize: 30, color: 'black', fontWeight: 'bold' }}>No</Text>
                    </Pressable>
                    <Pressable
                        style={styles.okButton}
                        onPress={() => sendSurveyDataT()}
                    >
                        <Text style={{ fontSize: 30, color: 'black', fontWeight: 'bold' }}>Yes</Text>
                    </Pressable>
                </View>
            </View>

        </Modal>

    )
}

export default ModalSurvey

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