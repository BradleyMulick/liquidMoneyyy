import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Switch, Keyboard, Modal, Pressable } from 'react-native'
import { AuthContext } from '../navigation/AuthProvider'
import { FluidContext } from '../navigation/FluidProvider'
import FormButton from '../components/FormButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { color } from 'react-native-reanimated';


const STORAGE_KEY = '@save_age'

const PROP = [
    {
        key: '0/day',
        text: '0/day',
    },
    {
        key: '1/day',
        text: '1/day',
    },
    {
        key: '3/day',
        text: '3/day',
    },
    {
        key: '6/day',
        text: '6/day',
    },
];

const FluidMax = ({ navigation, isOn, setIsOn }) => {
    const [maxFluids, setMaxFluids] = useContext(FluidContext)
    const [reminderTime, setReminderTime] = useState(0)
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [currentBox, setCurrentBox] = useState(false)
    const [showOne, setShowOne] = useState(false)
    const [showOThree, setShowThree] = useState(false)
    const [showFour, setShowFour] = useState(false)
    const [showZero, setShowZero] = useState(false)
    // const [maxFluids, setMaxFluids] = useState('')
    const [modalVisible3, setModalVisible3] = useState(false)

    const [text, setText] = useState('')
    const onChange = text => setText(text)
    
    const reminderSelector = (time) => {
        setReminderTime(time)
        console.log(reminderTime)
    }


    const saveData = async () => {

        try {

            if (text > 0 ) {
                setMaxFluids(text)
            
                await AsyncStorage.removeItem(STORAGE_KEY);
                await  AsyncStorage.setItem(STORAGE_KEY, text)
                navigation.navigate('Home')

                setText(0)
                setModalVisible3(true)
            } else {
                alert("FILL IN MAX FLUIDS!")
            }
            
        } catch (e) {
            alert('Failed to save the data to the storage')
        }
    }



    // const readData = async () => {
    //     try {
    //         const fluids = await AsyncStorage.getItem(STORAGE_KEY)

    //         if (fluids !== null) {

    //             setMaxFluids(fluids)
    //         }
    //     } catch (e) {
    //         alert('Failed to fetch the data from storage')
    //     }
    // }
    // useEffect(() => {
    //     readData()
    // }, [maxFluids])

    const clearStorage = async () => {
        try {
            // await AsyncStorage.clear()
            const keys = await AsyncStorage.getAllKeys();
            await AsyncStorage.multiRemove(keys);
            setMaxFluids(0)
            alert('Fluid MAX cleared!')

        } catch (e) {
            alert('Failed to clear the async storage.')
        }
    }


    const toggleSwitch = () => {
        setIsOn(previousState => !previousState);

    }


    const onChangeTemp = temp => setText(temp)
    const onChangeText = fluids => setMaxFluids(fluids)
    const onSubmitEditing = () => {

        if (!maxFluids)
            return
        saveData(maxFluids)

        navigation.navigate('Home')
    }

    useEffect(() => {
console.log(isOn + "FLuid max page")
    }, [isOn])

    return (


        <View style={styles.container}>

{/* MODAL FOR ALERT >>>>>>>>>>>>>>>>>>>>>>>>>>>> */}

<Modal
            animationType="slide"
                transparent={true}
                visible={modalVisible3}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible3(!modalVisible3);
                }}
            >
            <View style={styles.modalContainer}>
                <View style={styles.modalBorder}>


            {/* <Image source={require('../assets/liquidMon.png')} style={{ width: '50%', height: '25%' }} /> */}
<Text style={styles.alertText1}>Congrats!</Text>
<Text style={styles.alertText}>You updated your max fluids</Text>
<Pressable
                            style={styles.alertButtContain}
                            onPress={() => setModalVisible3(false)}
                        ><Text style={styles.alertTextButton}>OK</Text></Pressable>
                </View>
                </View>
            </Modal>



            <View style={styles.header}>
                <Text style={styles.title}>SETTINGS</Text>
            </View>
            <View style={styles.restrictContain}>

                <Text style={styles.title2}>Fluid Restriction</Text>
                <View style={styles.fluflu}>

                <TextInput
                        style={styles.input}
                        keyboardType='numeric'
                        placeholder={maxFluids}
                        onChangeText={ onChange}
                        onSubmitEditing={Keyboard.dismiss}
                        value={text}
                    ></TextInput>
                    <Text style={styles.millers}>mL*</Text>
                </View>
                <Text >Current Fluid Max {maxFluids}mL*</Text>
                <Text style={styles.fluidDocWarning}>* Determine this number with your physician.</Text>
            </View>

            <View style={styles.radio}>
                <Text style={styles.bigWarning}>Reminder Schedule</Text>
                <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isOn ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isOn}
        style={styles.switcher}

      />
      {/* <Text style={styles.onOff}>OFF/ON</Text>
                <Text style={styles.bigWarning}>measurement</Text>
                <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isOn ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isOn}
        style={styles.switcher}

      />
      <Text style={styles.onOff}>ml/Oz</Text> */}
            </View>
            {/* <TextInput
                style={{ height: 40 }}
                placeholder="Type here to translate!"
                onChangeText={maxFluids => setMaxFluids(maxFluids)}
                defaultValue={maxFluids}
            />
            <Text style={{ padding: 10, fontSize: 42 }}>
                {maxFluids}
            </Text> */}

            <View style={styles.warning}>
                <Text style={styles.bigWarning}>WARNING</Text>
                <Text style={styles.warningInfo}>
                    This app is meant to be used as a guide and not for medical diagnosis purposes.
                    
                         </Text>

                         <TouchableOpacity onPress={saveData} style={styles.button}>
                    <Text style={styles.buttonText}>Save and Agree</Text>
                </TouchableOpacity>
            </View>

        </View>




    )
}

export default FluidMax


const styles = StyleSheet.create({
    container: {

        flex: 1,





    },
    text: {
        fontSize: 20,
        color: '#333333'
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',


    },
    title: {
        fontSize: 44,
        width: '100%',
        color: '#4facfe',
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'

    },
    title2: {
        fontSize: 30,
        width: '100%',
        color: 'black',
        textAlign: 'center'

    },
    millers: {
        width: '25%',
        fontSize: 24
    },
    fluflu: {
        flexDirection: "row",
    },
    panel: {
        height: 50,
        backgroundColor: 'yellow',
        alignItems: 'center',
    },
    input: {
        width: "75%",
        height: 60,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 7,
        fontSize: 36,
        textAlign: 'right',
        padding: 10,
        marginLeft: 10
    },
    fluidDocWarning: {
        fontSize: 16,
    },
    warning: {
        flex: 2,
        padding: 10,

        justifyContent: 'flex-end',

        marginBottom: '20%'


    },
    button: {
        height: 50,
        width: '100%',
        backgroundColor: '#4facfe',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,


    },
    buttonText: {

    },
    bigWarning: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4facfe',
        textAlign: 'left'

    },
    warningInfo: {
        alignItems: 'center',



    },
    radio: {
        flex: 2,
        padding: 10,

        justifyContent: 'flex-end',

        marginTop: 10


    },
    radioContainer: {
        display: 'flex',
        flexDirection: 'row'
    }, 
    restrictContain: {
        padding: 5
    }, 
    modalContainer: {
        backgroundColor: 'white',
        height: '100%',

        justifyContent: 'center',
        alignItems: 'center',
    },
    alertText1: {
        fontSize: 48,
       alignItems:'center',
       textAlign: 'center',
      color: '#eca400'
    },
    alertText: {
        fontSize: 28,
       alignItems:'center',
       textAlign: 'center',
      color: 'black'
    },
    alertButtContain: {
        alignItems: 'center',
marginTop: 20,
width: '100%',
    },
    modalBorder: {
width: '90%',
height: '60%',
justifyContent: 'center',
alignItems:'center',
       textAlign: 'center',
       padding: 10,
       borderWidth: 2,
       borderColor: 'black',
       borderRadius: 8
    },
    alertTextButton: {
        width: '80%',
        height: 50,
        backgroundColor: '#4facfe',
        fontSize: 36,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        borderRadius: 8
    },
    switcher: {
         transform:[{ scaleX: 2 }, { scaleY: 2 }], 
         alignSelf: 'flex-start',

    }, 
})
