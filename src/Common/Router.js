//import liraries
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Createinvoice from '../Screen/Createinvoice';
import Home from '../Screen/Home';

const Stack = createStackNavigator();

// create a component
const Router = () => {
    return (
        <NavigationContainer>
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name='Home' component={Home} options={{
                headerShown: false,
                detachPreviousScreen: false,
            }} />
             <Stack.Screen name='Createinvoice' component={Createinvoice} options={{
                headerShown: false,
                detachPreviousScreen: false,
            }} />
        </Stack.Navigator>
    </NavigationContainer>
    );
};

export default Router;
