import 'react-native-gesture-handler';
import React from 'react';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import EmailValidationScreen from './screens/EmailValidationScreen';
import BiometricAuthScreen from './screens/BiometricAuthScreen';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import WebViewScreen from './screens/WebViewScreen';

enableScreens();

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="EmailValidation" component={EmailValidationScreen} />
        <Stack.Screen name="BiometricAuth" component={BiometricAuthScreen} />
        <Stack.Screen name="Home" component={BottomTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="WebView" component={WebViewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
