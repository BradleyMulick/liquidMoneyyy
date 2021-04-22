import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
// import AsyncStorage from '@react-native-community/async-storage'
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'

const Stack = createStackNavigator();


const AuthStack = () => {

    const [isFirstLaunch, setIsFirstLaunch] = React.useState(null)

    useEffect(() => {
        AsyncStorage.getItem('alreadyLaunched').then(value => {
            if (value == null) {
                AsyncStorage.setItem('alreadyLaunched', 'true')
                setIsFirstLaunch(true)
            } else {
                setIsFirstLaunch(false)
            }
        })
    }, [])

    if (isFirstLaunch === null) {
        return null
    } else if (isFirstLaunch === true) {
        routeName = 'Signup'
    } else {
        routeName = 'Signup'
    }

    return (

        <Stack.Navigator
            initialRouteName={routeName}
        >

            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ header: () => null }}
            />
            <Stack.Screen name="Signup"
                component={SignupScreen}
                options={({ navigation }) => ({
                    title: '',
                    headerStyle: {
                        backgroundColor: '#bbb',

                    }
                })} />
        </Stack.Navigator>

    )

}


export default AuthStack;
