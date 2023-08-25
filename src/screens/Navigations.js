import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

import Signup from './Signup';
import Signin from './Signin';
import Tabbar from './Tabbar';
import FirstScreens from './FirstScreeens'; // Check your spelling here

const Stack = createNativeStackNavigator();

const Navigations = () => {
    const [isFirstLaunch, setIsFirstLaunch] = useState(null);
    const [isUserLogin, setIsUserLogin] = useState(false);

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(user => {
            setIsUserLogin(user !== null);
        });

        const checkIfFirstLaunch = async () => {
            const firstLaunch = await AsyncStorage.getItem('firstLaunch');
            if (firstLaunch === null) {
                await AsyncStorage.setItem('firstLaunch', 'false');
                setIsFirstLaunch(true);
            } else {
                setIsFirstLaunch(false);
            }
        };

        checkIfFirstLaunch();

        return () => {
            unsubscribe();
        };
    }, []);

    if (isFirstLaunch === null) {
        return null;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName={isUserLogin ? 'Product1' : 'FirstScreen'}
            >
                <Stack.Screen name='FirstScreen' component={FirstScreens} />
                <Stack.Screen name='Signup' component={Signup} />
                <Stack.Screen name='Signin' component={Signin} />
                <Stack.Screen name='Product1' component={Tabbar} />
                <Stack.Screen name='Location1' component={Tabbar} />
                <Stack.Screen name='Setting1' component={Tabbar} />


            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigations;
